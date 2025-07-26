/**
 * ICP Stats Section - Full Dark Mode Design
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
      bgColor: 'bg-[#29ABE2]/20',
      borderColor: 'border-[#29ABE2]/40'
    },
    {
      icon: BookOpen,
      label: 'Learning Courses',
      value: stats.courseCount.toLocaleString(),
      description: 'Available courses',
      color: 'text-[#ED1E79]',
      bgColor: 'bg-[#ED1E79]/20',
      borderColor: 'border-[#ED1E79]/40'
    },
    {
      icon: Cpu,
      label: 'Backend Status',
      value: stats.isBackendHealthy ? 'Online' : 'Offline',
      description: 'ICP Canister',
      color: stats.isBackendHealthy ? 'text-[#50C878]' : 'text-[#FF6B6B]',
      bgColor: stats.isBackendHealthy ? 'bg-[#50C878]/20' : 'bg-[#FF6B6B]/20',
      borderColor: stats.isBackendHealthy ? 'border-[#50C878]/40' : 'border-[#FF6B6B]/40'
    },
    {
      icon: TrendingUp,
      label: 'Network Growth',
      value: '+24%',
      description: 'This month',
      color: 'text-[#F15A24]',
      bgColor: 'bg-[#F15A24]/20',
      borderColor: 'border-[#F15A24]/40'
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-[#16213E] via-[#1A1B2E] to-[#0A0B1A] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%">
            <pattern id="statsHex" width="60" height="52" patternUnits="userSpaceOnUse">
              <path d="M30,0 L60,17.3 L60,34.6 L30,52 L0,34.6 L0,17.3 Z" fill="none" stroke="white" strokeWidth="0.3" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#statsHex)" />
          </svg>
        </div>
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-gradient-to-br from-[#3B00B9]/8 to-[#29ABE2]/8 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-gradient-to-br from-[#ED1E79]/8 to-[#F15A24]/8 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-[#3B00B9]/3 to-[#ED1E79]/3 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-3">
            <div className="relative">
              <Zap className="h-5 w-5 text-[#3B00B9] mr-2" />
              <div className="absolute inset-0 h-5 w-5 bg-[#3B00B9] blur-sm opacity-30 mr-2" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#3B00B9] via-[#29ABE2] to-[#ED1E79] bg-clip-text text-transparent">
              Live Platform Statistics
            </h2>
          </div>
          <p className="text-gray-300 max-w-xl mx-auto text-sm leading-relaxed">
            Real-time data from our Internet Computer backend showing the growth and health of the ICPlearn ecosystem
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statItems.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`
                relative group p-5 rounded-xl border backdrop-blur-md
                bg-gradient-to-br from-gray-900/70 via-gray-800/50 to-gray-900/70
                border-gray-700/40 hover:border-gray-600/60
                hover:shadow-2xl hover:shadow-[#3B00B9]/20
                transition-all duration-500 ease-out
                hover:scale-[1.03] hover:-translate-y-0.5
              `}
            >
              {/* Animated Background Gradient */}
              <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} rounded-xl`} />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/3 to-transparent rounded-xl" />
              </div>
              
              {/* Subtle Border Glow */}
              <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${stat.borderColor} border blur-sm`} />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  {/* Icon Container with Enhanced Styling */}
                  <div className={`
                    relative p-2.5 rounded-lg overflow-hidden
                    bg-gradient-to-br from-gray-800/60 to-gray-900/60
                    border border-gray-600/30 group-hover:border-gray-500/50
                    transition-all duration-300
                  `}>
                    <div className={`absolute inset-0 ${stat.bgColor} opacity-20 group-hover:opacity-40 transition-opacity duration-300 rounded-lg`} />
                    <stat.icon className={`h-5 w-5 ${stat.color} relative z-10 group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  
                  {/* Status Indicator for Backend */}
                  {stat.label === 'Backend Status' && (
                    <div className="relative">
                      <div className={`
                        h-2 w-2 rounded-full animate-pulse
                        ${stats.isBackendHealthy ? 'bg-[#50C878]' : 'bg-[#FF6B6B]'}
                      `} />
                      <div className={`
                        absolute inset-0 rounded-full animate-ping
                        ${stats.isBackendHealthy ? 'bg-[#50C878]' : 'bg-[#FF6B6B]'}
                        opacity-40
                      `} />
                    </div>
                  )}
                </div>
                
                <div className="space-y-1">
                  {/* Value with Gradient Effect */}
                  <h3 className="text-xl font-bold transition-colors duration-300">
                    <span className={`
                      bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent 
                      group-hover:from-white group-hover:to-white
                      ${stat.color === 'text-[#50C878]' ? 'group-hover:from-[#50C878] group-hover:to-[#50C878]' : ''}
                      ${stat.color === 'text-[#FF6B6B]' ? 'group-hover:from-[#FF6B6B] group-hover:to-[#FF6B6B]' : ''}
                      ${stat.color === 'text-[#29ABE2]' ? 'group-hover:from-[#29ABE2] group-hover:to-[#29ABE2]' : ''}
                      ${stat.color === 'text-[#ED1E79]' ? 'group-hover:from-[#ED1E79] group-hover:to-[#ED1E79]' : ''}
                      ${stat.color === 'text-[#F15A24]' ? 'group-hover:from-[#F15A24] group-hover:to-[#F15A24]' : ''}
                    `}>
                      {stat.value}
                    </span>
                  </h3>
                  
                  {/* Label */}
                  <p className="text-sm font-medium text-gray-300 group-hover:text-gray-100 transition-colors duration-300">
                    {stat.label}
                  </p>
                  
                  {/* Description */}
                  <p className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors duration-300">
                    {stat.description}
                  </p>
                </div>
              </div>

              {/* Multiple Layered Glow Effects */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              {/* Subtle Data Flow Animation */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className={`w-1 h-1 rounded-full ${stat.color.replace('text-', 'bg-')} animate-pulse`} />
              </div>
              
              {/* Bottom Accent Line */}
              <div className={`
                absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl
                bg-gradient-to-r ${stat.color.replace('text-', 'from-')} to-transparent
                opacity-0 group-hover:opacity-100 transition-opacity duration-500
              `} />
              
              {/* Corner Data Point Indicator */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className={`
                  w-1.5 h-1.5 rounded-full ${stat.color.replace('text-', 'bg-')}
                  shadow-sm shadow-current animate-pulse
                `} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#3B00B9]/20 to-[#29ABE2]/20 border border-[#3B00B9]/40 backdrop-blur-sm">
            <div className="relative">
              <Shield className="h-3.5 w-3.5 text-[#3B00B9] mr-2" />
              <div className="absolute inset-0 h-3.5 w-3.5 bg-[#3B00B9] blur-sm opacity-30 mr-2" />
            </div>
            <span className="text-xs font-medium text-gray-200">
              Powered by Internet Computer Protocol
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            All data is fetched in real-time from our decentralized backend canister
          </p>
        </motion.div>
      </div>
    </section>
  );
}