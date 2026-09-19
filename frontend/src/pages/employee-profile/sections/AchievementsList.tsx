import React from 'react';
import { Employee } from '../../../types/employee';
import { Trophy } from 'lucide-react';

interface AchievementsListProps {
  employee: Employee;
}

export const AchievementsList: React.FC<AchievementsListProps> = ({ employee }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Achievements</h2>
      
      {employee.achievements.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200 border-dashed">
          <h3 className="text-sm font-medium text-slate-900">No achievements recorded</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {employee.achievements.map(achievement => (
            <div key={achievement.id} className="p-5 bg-white border border-amber-100 rounded-lg shadow-sm bg-gradient-to-br from-amber-50 to-white">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-semibold text-slate-900">{achievement.title}</h3>
              </div>
              <p className="text-xs text-amber-700/80 mb-3 font-medium">
                {new Date(achievement.date).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
              </p>
              <p className="text-sm text-slate-600">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
