import React, { useEffect, useState } from 'react';
import { Opportunity } from '../../types/career';
import { useNavigate } from 'react-router-dom';
import { fetchOpportunities } from '../../api/careerApi';
import { MapPin, Briefcase, Clock } from 'lucide-react';

export const OpportunitiesList: React.FC = () => {
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOpportunities().then(data => {
      setOpportunities(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading opportunities...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Internal Mobility Opportunities</h1>
      <div className="space-y-4">
        {opportunities.map(opp => (
          <div 
            key={opp.id} 
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row md:items-center justify-between hover:border-blue-300 transition-colors cursor-pointer"
            onClick={() => navigate(`/opportunities/${opp.id}`)}
          >
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{opp.title}</h2>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1"><MapPin size={16} /> {opp.location}</span>
                <span className="flex items-center gap-1"><Briefcase size={16} /> {opp.type}</span>
                <span className="flex items-center gap-1"><Clock size={16} /> Posted {opp.postedAt}</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
        {opportunities.length === 0 && (
          <div className="p-8 text-center text-gray-500">No opportunities available at the moment.</div>
        )}
      </div>
    </div>
  );
};
