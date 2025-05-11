import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { getInitials } from "../../utils/helper";

type SummaryCardProps = {
  colors: { bgcolor: string };
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
  colors,
  role,
  topicToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      className="bg-white border border-gray-200 rounded-xl p-2 overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group"
      onClick={onSelect}
    >
      <div
        className="rounded-lg p-4 relative"
        style={{ background: colors.bgcolor }}
      >
        <div className="flex items-start">
          <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center mr-4 text-[#d9182e] font-bold text-sm">
            {getInitials(role)}
          </div>

          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-[17px] font-semibold text-black">{role}</h2>
                <p className="text-xs font-medium text-gray-900">{topicToFocus}</p>
              </div>
            </div>
          </div>
        </div>

        <button
          className="hidden group-hover:flex items-center gap-2 text-xs text-[#d9182e] font-medium bg-[#fef2f2] px-3 py-1 rounded border border-[#fcdcdc] hover:border-[#f8b4b4] absolute top-2 right-2"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <LuTrash2 />
        </button>
      </div>

      <div className="px-3 pb-3">
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="text-[10px] font-medium text-black px-3 py-1 border border-black rounded-full">
            Experience: {experience} {experience == 1 ? "Year" : "Years"}
          </span>
          <span className="text-[10px] font-medium text-black px-3 py-1 border border-black rounded-full">
            {questions} Q&A
          </span>
          <span className="text-[10px] font-medium text-black px-3 py-1 border border-black rounded-full">
            Last Updated: {lastUpdated}
          </span>
        </div>

        <p className="text-[12px] text-gray-600 font-medium line-clamp-2 mt-3">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
