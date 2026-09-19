import React from 'react';
import { SkillGap } from '../../types/career';
import { Target, BookOpen, AlertTriangle } from 'lucide-react';

interface SkillGapCardProps {
  gap: SkillGap;
}

export const SkillGapCard: React.FC<SkillGapCardProps> = ({ gap }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-700 bg-red-50 border-red-200';
      case 'Medium': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-green-700 bg-green-50 border-green-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 w-full mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Target size={18} className="text-blue-600" />
            <h3 className="text-lg font-bold text-gray-900">Target: {gap.targetRole}</h3>
          </div>
          <p className="text-sm text-gray-500 ml-6">Current: {gap.currentCapability}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getPriorityColor(gap.priority)} flex items-center gap-1`}>
          <AlertTriangle size={14} />
          {gap.priority} Priority
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Required Skills</h4>
          <div className="flex flex-wrap gap-2">
            {gap.requiredSkills.map(skill => (
              <span key={skill} className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-bold text-red-500 uppercase tracking-wider mb-2">Identified Gaps</h4>
          <div className="flex flex-wrap gap-2">
            {gap.skillGaps.map(skill => (
              <span key={skill} className="bg-red-50 text-red-700 border border-red-100 px-2.5 py-1 rounded-md text-xs font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
        <h4 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-3 flex items-center gap-2">
          <BookOpen size={14} />
          Learning Recommendations
        </h4>
        <ul className="space-y-2">
          {gap.learningRecommendations.map((rec, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-blue-900">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 shrink-0" />
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
