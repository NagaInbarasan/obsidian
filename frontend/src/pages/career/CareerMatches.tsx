import React, { useEffect, useState } from 'react';
import { RoleMatch } from '../../types/career';
import { fetchRoleMatch } from '../../api/careerApi';
import { RoleMatchCard } from '../../components/matching/RoleMatchCard';

interface CareerMatchesProps {
  employeeId?: string;
}

export const CareerMatches: React.FC<CareerMatchesProps> = ({ employeeId = localStorage.getItem('userId') || '' }) => {
  const [matchData, setMatchData] = useState<RoleMatch | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the best match available for this employee
    fetchRoleMatch(employeeId, 'top').then(data => {
      setMatchData(data);
      setLoading(false);
    });
  }, [employeeId]);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Evaluating your matches...</div>;
  }

  if (!matchData) {
    return <div className="p-8 text-center text-gray-500">No matches found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Role Matches</h1>
        <p className="text-gray-600">
          Discover how your current skills align with different roles across the organization.
        </p>
      </div>

      <div className="space-y-6">
        {/* If we had multiple matches, we'd map over them. We use one mock match here */}
        <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-2">
          <h2 className="text-xl font-bold text-gray-800">Target: AI Engineer</h2>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-800">View Role Details</button>
        </div>
        <RoleMatchCard match={matchData} />
      </div>
    </div>
  );
};
