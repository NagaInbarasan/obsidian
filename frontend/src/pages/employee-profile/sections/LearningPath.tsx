import React from 'react';
import { Employee } from '../../../types/employee';
import { GraduationCap, BookOpen, CheckCircle2 } from 'lucide-react';

interface LearningPathProps {
  employee: Employee;
}

export const LearningPath: React.FC<LearningPathProps> = ({ employee }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Learning & Development</h2>
      
      {employee.learning.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200 border-dashed">
          <h3 className="text-sm font-medium text-slate-900">No learning history recorded</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {employee.learning.map(item => (
            <div key={item.id} className="flex items-center p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
              <div className="flex-shrink-0 mr-4">
                <div className={`p-3 rounded-full ${
                  item.status === 'completed' ? 'bg-green-100 text-green-600' :
                  item.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                  'bg-slate-100 text-slate-600'
                }`}>
                  {item.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> :
                   item.status === 'in-progress' ? <BookOpen className="w-5 h-5" /> :
                   <GraduationCap className="w-5 h-5" />}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-slate-900">{item.courseName}</h3>
                <p className="text-sm text-slate-500">{item.provider}</p>
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                  item.status === 'completed' ? 'bg-green-100 text-green-800' :
                  item.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-slate-100 text-slate-800'
                }`}>
                  {item.status.replace('-', ' ')}
                </span>
                {item.completionDate && (
                  <p className="text-xs text-slate-400 mt-1">
                    Completed: {new Date(item.completionDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
