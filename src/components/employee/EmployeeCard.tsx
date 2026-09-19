import React from 'react';
import { Employee } from '../../types/employee';
import { Briefcase, Building, Star } from 'lucide-react';

interface EmployeeCardProps {
  employee: Employee;
  onClick?: (id: string) => void;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onClick }) => {
  const topSkills = employee.skills.filter(s => s.type === 'explicit').slice(0, 3);

  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick && onClick(employee.id)}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{employee.name}</h3>
          <p className="text-sm text-slate-500 flex items-center mt-1">
            <Briefcase className="w-4 h-4 mr-1" />
            {employee.currentRole}
          </p>
          <p className="text-sm text-slate-500 flex items-center mt-1">
            <Building className="w-4 h-4 mr-1" />
            {employee.department}
          </p>
        </div>
        <div className="bg-slate-100 px-3 py-1 rounded-full text-xs font-medium text-slate-600">
          {employee.experienceYears}y exp
        </div>
      </div>
      
      <div>
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Top Skills</h4>
        <div className="flex flex-wrap gap-2">
          {topSkills.map(skill => (
            <span key={skill.id} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
              <Star className="w-3 h-3 mr-1" />
              {skill.name}
            </span>
          ))}
          {employee.skills.length > 3 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-50 text-slate-600 border border-slate-200">
              +{employee.skills.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
