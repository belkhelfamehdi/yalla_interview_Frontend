import React from 'react';
import { LuTrendingUp, LuBrain, LuClock, LuTarget } from 'react-icons/lu';

interface StatsData {
  totalSessions: number;
  totalQuestions: number;
  averageExperience: number;
  completionRate: number;
}

interface StatsChartProps {
  data: StatsData;
}

const StatsChart: React.FC<StatsChartProps> = ({ data }) => {
  const getProgressValue = (index: number): number => {
    switch (index) {
      case 0: return data.totalSessions / 10;
      case 1: return data.totalQuestions / 100;
      case 2: return data.averageExperience / 10;
      case 3: return data.completionRate / 100;
      default: return 0;
    }
  };

  const stats = [
    {
      icon: LuTarget,
      label: 'Total Sessions',
      value: data.totalSessions,
      color: 'from-red-500 to-pink-500',
      bgColor: 'from-red-50 to-pink-50',
    },
    {
      icon: LuBrain,
      label: 'Questions Prepared',
      value: data.totalQuestions,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'from-pink-50 to-rose-50',
    },
    {
      icon: LuClock,
      label: 'Avg Experience',
      value: `${data.averageExperience}y`,
      color: 'from-red-600 to-pink-600',
      bgColor: 'from-red-50 to-pink-50',
    },
    {
      icon: LuTrendingUp,
      label: 'Completion Rate',
      value: `${data.completionRate}%`,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="card-modern relative overflow-hidden group"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.bgColor} rounded-full blur-xl opacity-50 transform translate-x-6 -translate-y-6`}></div>
          
          <div className="relative">
            <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl text-white mb-4`}>
              <stat.icon className="text-lg" />
            </div>
            
            <div>
              <div className="text-2xl font-bold text-gray-800 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">
                {stat.label}
              </div>
            </div>
          </div>

          {/* Progress bar for visual appeal */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100">
            <div 
              className={`h-full bg-gradient-to-r ${stat.color} transform origin-left transition-transform duration-1000 ease-out`}
              style={{ 
                transform: `scaleX(${Math.min(getProgressValue(index), 1)})` 
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsChart;
