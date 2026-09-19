import React from 'react';
import { RoleMatch } from '../../types/career';
import { Check, Minus, X, Info } from 'lucide-react';

interface RoleMatchCardProps {
  match: RoleMatch;
}

export const RoleMatchCard: React.FC<RoleMatchCardProps> = ({ match }) => {
  // Simple visual bar calculation
  const barWidth = `${match.score}%`;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 w-full">
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Match</h3>
        <div className="flex items-center gap-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-500" 
              style={{ width: barWidth }}
            />
          </div>
          <span className="text-2xl font-bold text-gray-900">{match.score}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <h4 className="font-semibold text-green-700 mb-3 text-sm">Strong Matches</h4>
          <ul className="space-y-2">
            {match.matchedSkills.map(skill => (
              <li key={skill} className="flex items-start gap-2 text-sm text-gray-700">
                <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                <span>{skill}</span>
              </li>
            ))}
            {match.matchedSkills.length === 0 && (
              <span className="text-gray-400 text-sm italic">None</span>
            )}
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-yellow-700 mb-3 text-sm">Partial</h4>
          <ul className="space-y-2">
            {match.partialMatches.map(skill => (
              <li key={skill} className="flex items-start gap-2 text-sm text-gray-700">
                <Minus size={16} className="text-yellow-500 mt-0.5 shrink-0" />
                <span>{skill}</span>
              </li>
            ))}
            {match.partialMatches.length === 0 && (
              <span className="text-gray-400 text-sm italic">None</span>
            )}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-red-700 mb-3 text-sm">Gaps</h4>
          <ul className="space-y-2">
            {match.missingSkills.map(skill => (
              <li key={skill} className="flex items-start gap-2 text-sm text-gray-700">
                <X size={16} className="text-red-500 mt-0.5 shrink-0" />
                <span>{skill}</span>
              </li>
            ))}
            {match.missingSkills.length === 0 && (
              <span className="text-gray-400 text-sm italic">None</span>
            )}
          </ul>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
          <Info size={14} />
          Why this match?
        </h4>
        <p className="text-sm text-slate-700 leading-relaxed">
          {match.explanation}
        </p>
      </div>
      
      {match.evidence && match.evidence.length > 0 && (
        <div className="mt-4 border-t border-gray-100 pt-4">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Evidence</h4>
          <ul className="space-y-2">
            {match.evidence.map((ev, i) => (
              <li key={i} className="text-xs text-gray-600">
                <span className="font-medium text-gray-800">{ev.skill}:</span> {ev.evidence}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
