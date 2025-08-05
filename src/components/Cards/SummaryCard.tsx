import React from "react";
import { LuTrash2, LuCalendar, LuBrain, LuTrendingUp } from "react-icons/lu";
import { getInitials } from "../../utils/helper";

type SummaryCardProps = {
  role: string;
  topicToFocus: string;
  experience: number | string;
  questions: number | string;
  description: string;
  lastUpdated: string;
  onSelect: () => void;
  onDelete: () => void;
};

const SummaryCard: React.FC<SummaryCardProps> = ({
  role,
  topicToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  const getRandomGradient = () => {
    const gradients = [
      'from-red-500 to-pink-600',
      'from-red-600 to-rose-600',
      'from-pink-500 to-red-500',
      'from-orange-500 to-red-600',
      'from-red-400 to-pink-500',
      'from-rose-500 to-pink-600',
      'from-red-500 to-orange-600',
      'from-pink-600 to-red-600',
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  const gradient = getRandomGradient();

  return (
    <button
      className="card-modern group relative overflow-hidden cursor-pointer animate-float w-full text-left"
      onClick={onSelect}
      style={{ animationDelay: `${Math.random() * 2}s` }}
    >
      {/* Gradient overlay for hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-pink-600/0 group-hover:from-red-500/5 group-hover:to-pink-600/10 transition-all duration-300 rounded-2xl"></div>
      
      {/* Header with role badge */}
      <div className="relative mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${gradient} rounded-2xl text-white font-bold text-lg shadow-lg`}>
            {getInitials(role)}
          </div>
          
          <button
            className="opacity-0 group-hover:opacity-100 transition-all duration-300 p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <LuTrash2 className="text-lg" />
          </button>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">
          {role}
        </h3>
        <p className="text-red-600 font-medium text-sm bg-red-50 px-3 py-1 rounded-full inline-block">
          {topicToFocus}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl">
          <div className="flex-shrink-0">
            <LuTrendingUp className="text-red-500 text-lg" />
          </div>
          <div>
            <div className="text-sm text-gray-600">Experience</div>
            <div className="font-bold text-gray-800">{experience} {experience == 1 ? "Year" : "Years"}</div>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl">
          <div className="flex-shrink-0">
            <LuBrain className="text-pink-500 text-lg" />
          </div>
          <div>
            <div className="text-sm text-gray-600">Questions</div>
            <div className="font-bold text-gray-800">{questions} Q&A</div>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
        {description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <LuCalendar className="text-sm" />
          <span>Updated {lastUpdated}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-500">Active</span>
        </div>
      </div>

      {/* Hover indicator */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
    </button>
  );
};

export default SummaryCard;
