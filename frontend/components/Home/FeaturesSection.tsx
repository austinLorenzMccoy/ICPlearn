/**
 * Features Section - Highlighting ICPlearn's key features
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
      bgColor: 'bg-[#ED1E79]/10',
      borderColor: 'border-[#ED1E79]/20',
      benefits: ['Personalized curricula', 'Smart assessments', 'Real-time feedback']
    },
    {
      icon: Shield,
      title: 'Decentralized Identity',
      description: 'Secure authentication with Internet Identity. No passwords, no data harvesting - just cryptographically secure access.',
      color: 'text-[#3B00B9]',
      bgColor: 'bg-[#3B00B9]/10',
      borderColor: 'border-[#3B00B9]/20',
      benefits: ['Password-free login', 'Privacy-first', 'Cryptographic security']
    },
    {
      icon: Coins,
      title: 'Bitcoin Rewards',
      description: 'Earn real Bitcoin rewards for learning achievements, course completions, and community contributions.',
      color: 'text-[#F15A24]',
      bgColor: 'bg-[#F15A24]/10',
      borderColor: 'border-[#F15A24]/20',
      benefits: ['Bitcoin earnings', 'Achievement rewards', 'Skill-based payouts']
    },
    {
      icon: Trophy,
      title: 'Gamified Experience',
      description: 'Combat Arena battles, skill competitions, and achievement systems make learning engaging and competitive.',
      color: 'text-[#29ABE2]',
      bgColor: 'bg-[#29ABE2]/10',
      borderColor: 'border-[#29ABE2]/20',
      benefits: ['Combat battles', 'Leaderboards', 'NFT certificates']
    },
    {
      icon: Cpu,
      title: 'ICP Native',
      description: 'Built entirely on the Internet Computer Protocol with persistent storage, scalable architecture, and decentralized governance.',
      color: 'text-[#50C878]',
      bgColor: 'bg-[#50C878]/10',
      borderColor: 'border-[#50C878]/20',
      benefits: ['Persistent data', 'Scalable canisters', 'Decentralized hosting']
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join a global community of learners, educators, and developers building the future of decentralized education.',
      color: 'text-[#9333EA]',
      bgColor: 'bg-[#9333EA]/10',
      borderColor: 'border-[#9333EA]/20',
      benefits: ['Global community', 'Peer learning', 'Collaborative growth']
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-6 w-6 text-[#ED1E79] mr-2" />
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#3B00B9] to-[#ED1E79] bg-clip-text text-transparent">
              Revolutionary Features
            </h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            ICPlearn combines cutting-edge AI, blockchain technology, and gamification to create 
            the most advanced decentralized learning platform ever built
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`
                group relative p-8 rounded-2xl border backdrop-blur-sm
                bg-gray-50/50 dark:bg-gray-800/50
                hover:shadow-xl transition-all duration-300
                ${feature.borderColor}
                hover:border-opacity-50
              `}
            >
              {/* Background Gradient on Hover */}
              <div className={`absolute inset-0 ${feature.bgColor} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-xl ${feature.bgColor} ${feature.borderColor} border mb-6`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Benefits List */}
                <ul className="space-y-2 mb-6">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-sm">
                      <div className={`w-1.5 h-1.5 rounded-full ${feature.color.replace('text-', 'bg-')} mr-3`} />
                      <span className="text-gray-700 dark:text-gray-200">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* Learn More Link */}
                <div className="flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform duration-200">
                  <span className={feature.color}>Learn more</span>
                  <ArrowRight className={`h-4 w-4 ml-1 ${feature.color}`} />
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${feature.bgColor}`} />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Button className="bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:from-[#2E0092] hover:to-[#1E8BB8] text-white px-8 py-3 text-lg">
              <BookOpen className="h-5 w-5 mr-2" />
              Start Learning
            </Button>
            <Button variant="outline" className="border-[#ED1E79] text-[#ED1E79] hover:bg-[#ED1E79] hover:text-white px-8 py-3 text-lg">
              <Zap className="h-5 w-5 mr-2" />
              View Demo
            </Button>
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Join thousands of learners earning while they learn on the Internet Computer
          </p>
        </motion.div>
      </div>
    </section>
  );
}
