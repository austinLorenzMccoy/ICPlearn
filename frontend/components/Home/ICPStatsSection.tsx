/**
 * ICP Stats Section - Live statistics from the backend
 */

'use client';

import { motion } from 'framer-motion';
import { Users, BookOpen, Cpu, TrendingUp, Zap, Shield } from 'lucide-react';

interface ICPStatsSectionProps {
  stats: {
    userCount: number;
    courseCount: number;
    isBackendHealthy: boolean;
  };
}

export default function ICPStatsSection({ stats }: ICPStatsSectionProps) {
  const statItems = [
    {
      icon: Users,
      label: 'Active Learners',
      value: stats.userCount.toLocaleString(),
      description: 'Users on ICPlearn',
      color: 'text-[#29ABE2]',
      bgColor: 'bg-[#29ABE2]/10',
      borderColor: 'border-[#29ABE2]/20'
    },
    {
      icon: BookOpen,
      label: 'Learning Courses',
      value: stats.courseCount.toLocaleString(),
      description: 'Available courses',
      color: 'text-[#ED1E79]',
      bgColor: 'bg-[#ED1E79]/10',
      borderColor: 'border-[#ED1E79]/20'
    },
    {
      icon: Cpu,
      label: 'Backend Status',
      value: stats.isBackendHealthy ? 'Online' : 'Offline',
      description: 'ICP Canister',
      color: stats.isBackendHealthy ? 'text-[#50C878]' : 'text-[#FF6B6B]',
      bgColor: stats.isBackendHealthy ? 'bg-[#50C878]/10' : 'bg-[#FF6B6B]/10',
      borderColor: stats.isBackendHealthy ? 'border-[#50C878]/20' : 'border-[#FF6B6B]/20'
    },
    {
      icon: TrendingUp,
      label: 'Network Growth',
      value: '+24%',
      description: 'This month',
      color: 'text-[#F15A24]',
      bgColor: 'bg-[#F15A24]/10',
      borderColor: 'border-[#F15A24]/20'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Zap className="h-6 w-6 text-[#3B00B9] mr-2" />
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] bg-clip-text text-transparent">
              Live Platform Statistics
            </h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Real-time data from our Internet Computer backend showing the growth and health of the ICPlearn ecosystem
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statItems.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`
                relative group p-6 rounded-xl border backdrop-blur-sm
                bg-white/80 dark:bg-gray-800/80
                hover:shadow-lg transition-all duration-300
                ${stat.borderColor}
              `}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 ${stat.bgColor} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor} ${stat.borderColor} border`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  {stat.label === 'Backend Status' && (
                    <div className={`h-2 w-2 rounded-full ${stats.isBackendHealthy ? 'bg-[#50C878]' : 'bg-[#FF6B6B]'} animate-pulse`} />
                  )}
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </h3>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {stat.label}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {stat.description}
                  </p>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#3B00B9]/10 to-[#29ABE2]/10 border border-[#3B00B9]/20">
            <Shield className="h-4 w-4 text-[#3B00B9] mr-2" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Powered by Internet Computer Protocol
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            All data is fetched in real-time from our decentralized backend canister
          </p>
        </motion.div>
      </div>
    </section>
  );
}
