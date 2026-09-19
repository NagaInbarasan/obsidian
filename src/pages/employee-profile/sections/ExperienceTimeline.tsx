import React from 'react';
import { Employee } from '../../../types/employee';

interface ExperienceTimelineProps {
  employee: Employee;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ employee }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Experience Timeline</h2>
      
      {employee.experience.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200 border-dashed">
          <h3 className="text-sm font-medium text-slate-900">No experience records</h3>
        </div>
      ) : (
        <div className="relative border-l border-slate-200 ml-3">
          {employee.experience.map((exp, index) => (
            <div key={exp.id} className="mb-8 ml-6">
              <span className="absolute flex items-center justify-center w-4 h-4 bg-blue-100 rounded-full -left-2 ring-4 ring-white">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              </span>
              <h3 className="flex items-center mb-1 text-lg font-semibold text-slate-900">
                {exp.role}
                {index === 0 && !exp.endDate && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded ml-3">Current</span>
                )}
              </h3>
              <time className="block mb-2 text-sm font-normal leading-none text-slate-400">
                {new Date(exp.startDate).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })} 
                {' - '} 
                {exp.endDate ? new Date(exp.endDate).toLocaleDateString(undefined, { month: 'long', year: 'numeric' }) : 'Present'}
              </time>
              <p className="text-base font-normal text-slate-600 font-medium mb-1">{exp.company}</p>
              <p className="mb-4 text-sm font-normal text-slate-500">{exp.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
