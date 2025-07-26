/**
 * Features Section - Compact and Elegant with Dark Mode
 */

'use client';

import { motion } from 'framer-motion';
import { 
  Brain, 
  Shield, 
  Coins, 
  Users, 
  Zap, 
  Trophy,
  BookOpen,
  Cpu,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Learning',
      description: 'Advanced AI generates personalized content, validates answers, and creates dynamic learning paths tailored to your progress.',
      color: 'text-[#ED1E79]',
      bgColor: 'bg-[#ED1E79]/10 dark:bg-[#ED1E79]/20',
      borderColor: 'border-[#ED1E79]/20 dark:border-[#ED1E79]/40',
      benefits: ['Personalized curricula', 'Smart assessments', 'Real-time feedback']
    },
    {
      icon: Shield,
      title: 'Decentralized Identity',
      description: 'Secure authentication with Internet Identity. No passwords, no data harvesting - just cryptographically secure access.',
      color: 'text-[#3B00B9]',
      bgColor: 'bg-[#3B00B9]/10 dark:bg-[#3B00B9]/20',
      borderColor: 'border-[#3B00B9]/20 dark:border-[#3B00B9]/40',
      benefits: ['Password-free login', 'Privacy-first', 'Cryptographic security']
    },
    {
      icon: Coins,
      title: 'Bitcoin Rewards',
      description: 'Earn real Bitcoin rewards for learning achievements, course completions, and community contributions.',
      color: 'text-[#F15A24]',
      bgColor: 'bg-[#F15A24]/10 dark:bg-[#F15A24]/20',
      borderColor: 'border-[#F15A24]/20 dark:border-[#F15A24]/40',
      benefits: ['Bitcoin earnings', 'Achievement rewards', 'Skill-based payouts']
    },
    {
      icon: Trophy,
      title: 'Gamified Experience',
      description: 'Combat Arena battles, skill competitions, and achievement systems make learning engaging and competitive.',
      color: 'text-[#29ABE2]',
      bgColor: 'bg-[#29ABE2]/10 dark:bg-[#29ABE2]/20',
      borderColor: 'border-[#29ABE2]/20 dark:border-[#29ABE2]/40',
      benefits: ['Combat battles', 'Leaderboards', 'NFT certificates']
    },
    {
      icon: Cpu,
      title: 'ICP Native',
      description: 'Built entirely on the Internet Computer Protocol with persistent storage, scalable architecture, and decentralized governance.',
      color: 'text-[#50C878]',
      bgColor: 'bg-[#50C878]/10 dark:bg-[#50C878]/20',
      borderColor: 'border-[#50C878]/20 dark:border-[#50C878]/40',
      benefits: ['Persistent data', 'Scalable canisters', 'Decentralized hosting']
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join a global community of learners, educators, and developers building the future of decentralized education.',
      color: 'text-[#9333EA]',
      bgColor: 'bg-[#9333EA]/10 dark:bg-[#9333EA]/20',
      borderColor: 'border-[#9333EA]/20 dark:border-[#9333EA]/40',
      benefits: ['Global community', 'Peer learning', 'Collaborative growth']
    }
  ];

  return (
    <section className="py-16  bg-gradient-to-b from-[#0A0B1A] via-[#1A1B2E] to-[#16213E] relative overflow-hidden">
      {/* Dark mode background pattern */}
      <div className="absolute inset-0 dark:block hidden">
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%">
            <pattern id="featureGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0,20 L40,20 M20,0 L20,40" stroke="white" strokeWidth="0.5" opacity="0.3" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#featureGrid)" />
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-[#3B00B9]/5 to-[#29ABE2]/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gradient-to-br from-[#ED1E79]/5 to-[#F15A24]/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="text-center mb-12"
>
  <div className="flex items-center justify-center mb-3">
    <div className="relative">
      <Sparkles className="h-5 w-5 text-[#ED1E79] mr-2" />
      <div className="absolute inset-0 h-5 w-5 bg-[#ED1E79] blur-sm opacity-40 mr-2 animate-pulse" />
    </div>
    <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#3B00B9] via-[#29ABE2] to-[#ED1E79] bg-clip-text text-transparent">
      Revolutionary Features
    </h2>
  </div>
  <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
    ICPlearn combines cutting-edge AI, blockchain technology, and gamification to create 
    the most advanced decentralized learning platform ever built
  </p>
</motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
  key={feature.title}
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: index * 0.1 }}
  className={`
    group relative p-6 rounded-xl border backdrop-blur-md
    bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80
    border-gray-700/50 hover:border-gray-600/70
    hover:shadow-2xl hover:shadow-[#3B00B9]/25
    transition-all duration-500 ease-out
    hover:scale-[1.02] hover:-translate-y-1
  `}
>
  {/* Animated Background Gradient */}
  <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}>
    <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} rounded-xl`} />
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-xl" />
  </div>
  
  {/* Subtle Border Glow */}
  <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${feature.borderColor} border-2 blur-sm`} />
  
  {/* Content */}
  <div className="relative z-10">
    {/* Icon with Enhanced Styling */}
    <div className={`
      inline-flex p-3 rounded-xl mb-4 relative overflow-hidden
      bg-gradient-to-br from-gray-800/80 to-gray-900/80
      border border-gray-600/40 group-hover:border-gray-500/60
      transition-all duration-300
    `}>
      <div className={`absolute inset-0 ${feature.bgColor} opacity-20 group-hover:opacity-40 transition-opacity duration-300 rounded-xl`} />
      <feature.icon className={`h-6 w-6 ${feature.color} relative z-10 group-hover:scale-110 transition-transform duration-300`} />
    </div>

    {/* Title with Gradient Effect */}
    <h3 className="text-lg font-bold mb-2 group-hover:text-white transition-colors duration-300">
      <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent group-hover:from-white group-hover:to-white">
        {feature.title}
      </span>
    </h3>

    {/* Description */}
    <p className="text-gray-300 group-hover:text-gray-200 text-sm leading-relaxed mb-4 transition-colors duration-300">
      {feature.description}
    </p>

    {/* Benefits List with Enhanced Styling */}
    <ul className="space-y-2 mb-4">
      {feature.benefits.map((benefit, benefitIndex) => (
        <li key={benefitIndex} className="flex items-center text-xs group">
          <div className={`
            w-1.5 h-1.5 rounded-full mr-3 transition-all duration-300
            ${feature.color.replace('text-', 'bg-')}
            group-hover:scale-125 group-hover:shadow-sm group-hover:shadow-current
          `} />
          <span className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
            {benefit}
          </span>
        </li>
      ))}
    </ul>

    {/* Learn More Link with Animation */}
    <div className="flex items-center text-xs font-medium group-hover:translate-x-2 transition-all duration-300">
      <span className={`${feature.color} group-hover:brightness-110 transition-all duration-300`}>
        Learn more
      </span>
      <ArrowRight className={`
        h-3 w-3 ml-1 ${feature.color} 
        group-hover:translate-x-1 group-hover:scale-110 
        transition-all duration-300
      `} />
    </div>
  </div>

  {/* Multiple Layered Glow Effects */}
  <div className={`
    absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 
    transition-opacity duration-500 pointer-events-none
    bg-gradient-to-br from-transparent via-white/3 to-transparent
  `} />
  
  {/* Subtle Particle Effect */}
  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
    <div className={`w-2 h-2 rounded-full ${feature.color.replace('text-', 'bg-')} animate-pulse`} />
  </div>
  
  {/* Bottom Accent Line */}
  <div className={`
    absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl
    bg-gradient-to-r ${feature.color.replace('text-', 'from-')} to-transparent
    opacity-0 group-hover:opacity-100 transition-opacity duration-500
  `} />
</motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="inline-flex flex-col sm:flex-row gap-3">
            <Button className="bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:from-[#2E0092] hover:to-[#1E8BB8] text-white px-6 py-2.5">
              <BookOpen className="h-4 w-4 mr-2" />
              Start Learning
            </Button>
            <Button variant="outline" className="border-[#ED1E79] text-[#ED1E79] hover:bg-[#ED1E79] hover:text-white dark:border-[#ED1E79]/60 dark:text-[#ED1E79] dark:hover:bg-[#ED1E79] px-6 py-2.5">
              <Zap className="h-4 w-4 mr-2" />
              View Demo
            </Button>
          </div>
          
         <p className="text-xs text-gray-400 mt-3">
  Join thousands of learners earning while they learn on the Internet Computer
</p>
        </motion.div>
      </div>
    </section>
  );
}