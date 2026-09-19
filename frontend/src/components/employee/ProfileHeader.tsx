import React from 'react';
import { Employee } from '../../types/employee';
import { Building2, Briefcase, Calendar, ShieldCheck, AlertCircle, Clock } from 'lucide-react';

interface ProfileHeaderProps {
  employee: Employee;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ employee }) => {
  const renderStatus = () => {
    switch (employee.profileStatus) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            Profile Active
          </span>
        );
      case 'review-needed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">
            <Clock className="w-3.5 h-3.5" />
            Review Needed
          </span>
        );
      case 'incomplete':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
            <AlertCircle className="w-3.5 h-3.5" />
            Incomplete
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center border-4 border-white shadow-md text-3xl font-bold text-slate-500">
              {employee.name.charAt(0)}
            </div>
            
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{employee.name}</h1>
              
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-slate-400" />
                  {employee.currentRole}
                </div>
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  {employee.department}
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  {employee.experienceYears} Years Experience
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-3">
            {renderStatus()}
          </div>
        </div>
      </div>
    </div>
  );
};
