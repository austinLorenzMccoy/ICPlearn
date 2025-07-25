export default function FAQ() {
    return (
        <section id="faq" data-section="faq" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
                <div>
                    <h3 className="text-xl font-medium mb-2">What is EduStake?</h3>
                    <p className="text-gray-600">
                        EduStake is a platform that combines blockchain staking with educational incentives. Users can stake EDU tokens to earn rewards, and those rewards can be amplified by completing educational courses and activities.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-medium mb-2">How do educational multipliers work?</h3>
                    <p className="text-gray-600">
                        Educational multipliers increase your staking rewards based on the courses you complete. For example, if you have a 1.3x multiplier and would normally earn 100 EDU tokens, you'll instead earn 130 EDU tokens. Multipliers from different courses stack additively.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-medium mb-2">What happens if I withdraw my stake early?</h3>
                    <p className="text-gray-600">
                        Early withdrawals are subject to a fee that decreases over time. The fee starts at 10% and decreases linearly until the end of the lock period. For example, if you withdraw halfway through your lock period, you'll pay a 5% fee on your staked amount.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-medium mb-2">Can I transfer my educational achievements to another account?</h3>
                    <p className="text-gray-600">
                        Educational achievements are linked to your specific account and cannot be transferred. However, they are recorded on the blockchain, so they remain with you even if you change wallets by connecting your new wallet to your existing account.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-medium mb-2">How are the educational courses created and verified?</h3>
                    <p className="text-gray-600">
                        Educational content is created by a combination of the EduStake team and verified community contributors. All courses undergo a rigorous review process to ensure quality and accuracy before being published on the platform.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-medium mb-2">What happens to my staking rewards if I don't complete any courses?</h3>
                    <p className="text-gray-600">
                        You'll still earn the base APY rewards for your chosen staking pool, but you won't benefit from any educational multipliers. Completing courses is optional but strongly encouraged to maximize your returns.
                    </p>
                </div>
            </div>
        </section>
    );
}