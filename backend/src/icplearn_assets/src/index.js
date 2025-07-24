// Import necessary libraries from dfinity
import { Actor, HttpAgent } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
import { idlFactory } from '../../declarations/icplearn_backend/icplearn_backend.did.js';

// Global variables
let actor;
let authClient;
let identity;
let isAuthenticated = false;
let userId;

// DOM elements
const loginButton = document.getElementById('loginButton');
const dashboard = document.getElementById('dashboard');
const stakesContainer = document.getElementById('stakes-container');
const nftsContainer = document.getElementById('nfts-container');
const battlesContainer = document.getElementById('battles-container');
const rewardsContainer = document.getElementById('rewards-container');
const createStakeBtn = document.getElementById('createStakeBtn');
const createBattleBtn = document.getElementById('createBattleBtn');

// Initialize the application
async function init() {
  // Create an auth client
  authClient = await AuthClient.create();
  
  // Check if the user is already authenticated
  isAuthenticated = await authClient.isAuthenticated();
  
  if (isAuthenticated) {
    identity = authClient.getIdentity();
    await connectToBackend();
    showDashboard();
  }
  
  // Add event listeners
  loginButton.addEventListener('click', login);
  createStakeBtn.addEventListener('click', showCreateStakeModal);
  createBattleBtn.addEventListener('click', showCreateBattleModal);
}

// Connect to the backend canister
async function connectToBackend() {
  // Create an agent with the user's identity
  const agent = new HttpAgent({
    identity,
    host: process.env.DFX_NETWORK === 'ic' ? 'https://ic0.app' : 'http://localhost:8000',
  });
  
  // In development, we need to fetch the root key
  if (process.env.DFX_NETWORK !== 'ic') {
    await agent.fetchRootKey();
  }
  
  // Create an actor with the agent
  actor = Actor.createActor(idlFactory, {
    agent,
    canisterId: process.env.ICPLEARN_BACKEND_CANISTER_ID,
  });
  
  // Get the user's ID
  try {
    const user = await actor.get_user();
    userId = user.id;
  } catch (error) {
    console.error('Error getting user:', error);
  }
}

// Login with Internet Identity
async function login() {
  await authClient.login({
    identityProvider: process.env.DFX_NETWORK === 'ic' 
      ? 'https://identity.ic0.app' 
      : `http://localhost:8000?canisterId=${process.env.INTERNET_IDENTITY_CANISTER_ID}`,
    onSuccess: async () => {
      identity = authClient.getIdentity();
      isAuthenticated = true;
      await connectToBackend();
      
      // Try to get the user, if not found, register a new user
      try {
        const user = await actor.get_user();
        userId = user.id;
      } catch (error) {
        // Register a new user
        try {
          const email = prompt('Please enter your email:');
          const name = prompt('Please enter your name:');
          const user = await actor.register_user(name, email);
          userId = user.id;
        } catch (registerError) {
          console.error('Error registering user:', registerError);
        }
      }
      
      showDashboard();
      loadDashboardData();
    },
    onError: (error) => {
      console.error('Login failed:', error);
    }
  });
}

// Show the dashboard
function showDashboard() {
  document.querySelector('.hero').classList.add('hidden');
  dashboard.classList.remove('hidden');
  loginButton.textContent = 'Logout';
  loginButton.removeEventListener('click', login);
  loginButton.addEventListener('click', logout);
}

// Logout
async function logout() {
  await authClient.logout();
  isAuthenticated = false;
  document.querySelector('.hero').classList.remove('hidden');
  dashboard.classList.add('hidden');
  loginButton.textContent = 'Login with Internet Identity';
  loginButton.removeEventListener('click', logout);
  loginButton.addEventListener('click', login);
}

// Load dashboard data
async function loadDashboardData() {
  if (!isAuthenticated || !actor) return;
  
  try {
    // Load stakes
    const stakes = await actor.get_user_stakes();
    displayStakes(stakes);
    
    // Load NFTs
    const nfts = await actor.get_user_nfts();
    displayNFTs(nfts);
    
    // Load battles
    const battles = await actor.get_user_battles();
    displayBattles(battles);
    
    // Load Bitcoin rewards
    const rewards = await actor.get_user_bitcoin_rewards(userId);
    displayRewards(rewards);
  } catch (error) {
    console.error('Error loading dashboard data:', error);
  }
}

// Display stakes
function displayStakes(stakes) {
  if (stakes.length === 0) {
    stakesContainer.innerHTML = '<p>No stakes found. Create your first stake!</p>';
    return;
  }
  
  stakesContainer.innerHTML = stakes.map(stake => `
    <div class="stake-item">
      <h4>Stake #${stake.id.substring(0, 8)}</h4>
      <p>Amount: ${stake.amount}</p>
      <p>Duration: ${stake.duration_days} days</p>
      <p>Streak: ${stake.streak}</p>
      <p>Status: ${stake.status}</p>
      <button class="btn secondary update-streak-btn" data-stake-id="${stake.id}">Update Streak</button>
    </div>
  `).join('');
  
  // Add event listeners to update streak buttons
  document.querySelectorAll('.update-streak-btn').forEach(button => {
    button.addEventListener('click', async () => {
      const stakeId = button.getAttribute('data-stake-id');
      try {
        await actor.update_streak(stakeId);
        loadDashboardData();
      } catch (error) {
        console.error('Error updating streak:', error);
      }
    });
  });
}

// Display NFTs
function displayNFTs(nfts) {
  if (nfts.length === 0) {
    nftsContainer.innerHTML = '<p>No NFTs found. Complete learning goals to earn NFTs!</p>';
    return;
  }
  
  nftsContainer.innerHTML = nfts.map(nft => `
    <div class="nft-item">
      <h4>${nft.metadata.name || 'NFT #' + nft.id.substring(0, 8)}</h4>
      <p>${nft.metadata.description || 'No description'}</p>
      <p>Created: ${new Date(Number(nft.created_at) / 1000000).toLocaleDateString()}</p>
    </div>
  `).join('');
}

// Display battles
function displayBattles(battles) {
  if (battles.length === 0) {
    battlesContainer.innerHTML = '<p>No battles found. Create your first battle!</p>';
    return;
  }
  
  battlesContainer.innerHTML = battles.map(battle => `
    <div class="battle-item">
      <h4>Battle #${battle.id.substring(0, 8)}</h4>
      <p>Status: ${battle.status}</p>
      <p>Stake: ${battle.stake_amount}</p>
      ${battle.status === 'completed' ? 
        `<p>Result: ${battle.winner_id === userId ? 'You won!' : battle.winner_id === null ? 'Draw' : 'You lost'}</p>` : 
        battle.status === 'active' ? 
        `<button class="btn secondary play-battle-btn" data-battle-id="${battle.id}">Play Battle</button>` : 
        ''}
    </div>
  `).join('');
  
  // Add event listeners to play battle buttons
  document.querySelectorAll('.play-battle-btn').forEach(button => {
    button.addEventListener('click', () => {
      const battleId = button.getAttribute('data-battle-id');
      showBattleGame(battleId);
    });
  });
}

// Display rewards
function displayRewards(rewards) {
  if (rewards.length === 0) {
    rewardsContainer.innerHTML = '<p>No Bitcoin rewards found. Complete skills to earn rewards!</p>';
    return;
  }
  
  rewardsContainer.innerHTML = rewards.map(reward => `
    <div class="reward-item">
      <h4>Reward #${reward.id.substring(0, 8)}</h4>
      <p>Amount: ${reward.amount} BTC</p>
      <p>Status: ${reward.status}</p>
      <p>Created: ${new Date(Number(reward.created_at) / 1000000).toLocaleDateString()}</p>
    </div>
  `).join('');
}

// Show create stake modal
function showCreateStakeModal() {
  const amount = prompt('Enter stake amount:');
  const duration = prompt('Enter duration in days:');
  
  if (amount && duration) {
    createStake(parseFloat(amount), parseInt(duration));
  }
}

// Create a stake
async function createStake(amount, duration) {
  try {
    await actor.create_stake(amount, duration);
    loadDashboardData();
  } catch (error) {
    console.error('Error creating stake:', error);
  }
}

// Show create battle modal
function showCreateBattleModal() {
  const opponentId = prompt('Enter opponent ID:');
  const stakeAmount = prompt('Enter stake amount:');
  
  if (opponentId && stakeAmount) {
    createBattle(opponentId, parseFloat(stakeAmount));
  }
}

// Create a battle
async function createBattle(opponentId, stakeAmount) {
  try {
    const battle = await actor.create_battle(opponentId, stakeAmount);
    await actor.start_battle(battle.id);
    loadDashboardData();
  } catch (error) {
    console.error('Error creating battle:', error);
  }
}

// Show battle game
function showBattleGame(battleId) {
  // This would be implemented in a real application
  alert('Battle gameplay would be shown here');
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);
