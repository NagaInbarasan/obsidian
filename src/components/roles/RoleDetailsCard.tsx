import React from 'react';
import { Role } from '../../types/career';
import { Briefcase, Users, Star, CheckCircle } from 'lucide-react';

interface RoleDetailsCardProps {
  role: Role;
}

export const RoleDetailsCard: React.FC<RoleDetailsCardProps> = ({ role }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 w-full mb-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{role.title}</h2>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Users size={16} />
              {role.department}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase size={16} />
              {role.experience}
            </span>
          </div>
        </div>
        <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-100">
          {role.availableOpportunities} Open {role.availableOpportunities === 1 ? 'Opportunity' : 'Opportunities'}
        </div>
      </div>
      
      <p className="text-gray-700 mb-6 leading-relaxed">
        {role.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
            <CheckCircle size={16} className="text-green-600" />
            Required Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {role.requiredSkills.map(skill => (
              <span key={skill} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Star size={16} className="text-purple-600" />
            Preferred Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {role.preferredSkills.map(skill => (
              <span key={skill} className="bg-purple-50 text-purple-800 border border-purple-100 px-3 py-1 rounded-md text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
