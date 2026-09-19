import React, { useEffect, useState } from 'react';
import { Opportunity, RoleMatch } from '../../types/career';
import { fetchOpportunityById, fetchRoleMatch } from '../../api/careerApi';
import { useParams, useNavigate } from 'react-router-dom';
import { RoleMatchCard } from '../../components/matching/RoleMatchCard';
import { MapPin, Briefcase, Clock, FileText } from 'lucide-react';

const DEFAULT_EMPLOYEE_ID = 'emp1';

export const OpportunityDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [match, setMatch] = useState<RoleMatch | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(false);

    fetchOpportunityById(id)
      .then(async (oppData) => {
        setOpportunity(oppData);
        if (oppData) {
          // C-3 fix: use the opportunity's actual roleId, not a hardcoded value
          const matchData = await fetchRoleMatch(DEFAULT_EMPLOYEE_ID, oppData.roleId);
          setMatch(matchData);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading opportunity details...</div>;
  }

  if (error || !opportunity) {
    return <div className="p-8 text-center text-red-500">Opportunity not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          &larr; Back to Opportunities
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{opportunity.title}</h1>
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8 border-b border-gray-100 pb-6">
          <span className="flex items-center gap-2"><MapPin size={18} className="text-gray-400" /> {opportunity.location}</span>
          <span className="flex items-center gap-2"><Briefcase size={18} className="text-gray-400" /> {opportunity.type}</span>
          <span className="flex items-center gap-2"><Clock size={18} className="text-gray-400" /> Posted {opportunity.postedAt}</span>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <FileText size={20} className="text-blue-600" /> Description
          </h2>
          <p className="text-gray-700 leading-relaxed">
            This opportunity is part of the {opportunity.title} role. Review the role details and your profile match below before applying.
          </p>
        </div>

        <button className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm">
          Apply Now
        </button>
      </div>

      {match && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Profile Match</h2>
          <RoleMatchCard match={match} />
        </div>
      )}
    </div>
  );
};
