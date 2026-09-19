import React from 'react';
import { Employee } from '../../../types/employee';
import { Target, ArrowRight } from 'lucide-react';

interface CareerGoalsProps {
  employee: Employee;
}

export const CareerGoals: React.FC<CareerGoalsProps> = ({ employee }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Career Targets</h2>
      
      {employee.careerGoals.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200 border-dashed">
          <h3 className="text-sm font-medium text-slate-900">No career goals set</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {employee.careerGoals.map(goal => (
            <div key={goal.id} className="p-5 bg-white border border-indigo-100 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-indigo-500" />
                  <h3 className="text-base font-semibold text-slate-900">Target Role</h3>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                  {goal.timeframe}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 line-through decoration-slate-300 text-sm">
                  {employee.currentRole}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
                <span className="font-medium text-indigo-900">
                  {goal.targetRole}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
