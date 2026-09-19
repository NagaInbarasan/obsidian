import React, { useEffect, useState } from 'react';
import { Role } from '../../types/career';
import { useNavigate } from 'react-router-dom';
import { fetchRoles } from '../../api/careerApi';
import { Briefcase, ChevronRight } from 'lucide-react';

export const RolesList: React.FC = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoles().then(data => {
      setRoles(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading roles...</div>;
  }

  if (roles.length === 0) {
    return <div className="p-8 text-center text-gray-500">No roles found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Career Paths & Roles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map(role => (
          <div 
            key={role.id} 
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(`/roles/${role.id}`)}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-2">{role.title}</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Briefcase size={16} />
              {role.department}
            </div>
            <p className="text-gray-600 text-sm line-clamp-3 mb-6">
              {role.description}
            </p>
            <div className="flex justify-between items-center mt-auto">
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {role.availableOpportunities} Openings
              </span>
              <button className="text-gray-400 hover:text-blue-600">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
