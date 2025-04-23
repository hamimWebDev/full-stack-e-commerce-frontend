import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: 'up' | 'down';
  };
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, color }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-sm p-6 border border-neutral-100"
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-neutral-500 text-sm">{title}</p>
          <h3 className="mt-1 text-2xl font-semibold">{value}</h3>
          
          {change && (
            <div className="mt-2 flex items-center">
              <span 
                className={`text-sm font-medium ${
                  change.trend === 'up' ? 'text-success-600' : 'text-error-600'
                }`}
              >
                {change.trend === 'up' ? '+' : '-'}{Math.abs(change.value)}%
              </span>
              <span className="ml-1 text-neutral-500 text-xs">vs last month</span>
            </div>
          )}
        </div>
        
        <div className={`p-2 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;