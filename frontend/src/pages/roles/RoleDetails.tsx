import React, { useEffect, useState } from 'react';
import { Role } from '../../types/career';
import { fetchRoleById } from '../../api/careerApi';
import { RoleDetailsCard } from '../../components/roles/RoleDetailsCard';
import { useParams, useNavigate } from 'react-router-dom';

interface RoleDetailsProps {
  id?: string;
}

export const RoleDetails: React.FC<RoleDetailsProps> = ({ id: propId }) => {
  const { id: paramId } = useParams<{ id: string }>();
  const id = paramId ?? propId ?? 'r1';
  const navigate = useNavigate();
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoleById(id).then(data => {
      setRole(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading role details...</div>;
  }

  if (!role) {
    return <div className="p-8 text-center text-red-500">Role not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          &larr; Back to Roles
        </button>
      </div>
      <RoleDetailsCard role={role} />
      
      {/* Assuming a matcher component or matching employees list could go here */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Internal Match Analytics</h3>
        <p className="text-sm text-gray-600">
          This role requires strong proficiency in {role.requiredSkills.slice(0, 2).join(' and ')}.
          {role.availableOpportunities > 0
            ? ` There ${role.availableOpportunities === 1 ? 'is' : 'are'} currently ${role.availableOpportunities} open position${role.availableOpportunities === 1 ? '' : 's'}.`
            : ' There are currently no open positions for this role.'}
        </p>
      </div>
    </div>
  );
};
