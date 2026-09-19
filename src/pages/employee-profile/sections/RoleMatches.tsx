import React from 'react';
import { Employee } from '../../../types/employee';
import { Briefcase, CheckCircle2, XCircle } from 'lucide-react';

interface RoleMatchesProps {
  employee: Employee;
}

export const RoleMatches: React.FC<RoleMatchesProps> = ({ employee }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Role Matches</h2>
      
      {employee.roleMatches.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200 border-dashed">
          <h3 className="text-sm font-medium text-slate-900">No role matches found</h3>
          <p className="mt-1 text-sm text-slate-500">Wait for the AI to process the latest profile updates.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {employee.roleMatches.map(match => (
            <div key={match.roleId} className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-slate-400" />
                  <h3 className="text-lg font-semibold text-slate-900">{match.roleName}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500 font-medium">Match Score</span>
                  <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                    match.matchScore >= 80 ? 'bg-green-100 text-green-700' :
                    match.matchScore >= 60 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {match.matchScore}
                  </span>
                </div>
              </div>
              
              <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Matched Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {match.matchedSkills.map(skill => (
                      <span key={skill} className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-red-500" />
                    Missing Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {match.missingSkills.map(skill => (
                      <span key={skill} className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-red-50 text-red-700 border border-red-100">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
