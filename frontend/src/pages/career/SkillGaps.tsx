import React, { useEffect, useState } from 'react';
import { SkillGap } from '../../types/career';
import { fetchSkillGaps } from '../../api/careerApi';
import { SkillGapCard } from '../../components/career/SkillGapCard';
import { AlertCircle } from 'lucide-react';

interface SkillGapsProps {
  employeeId?: string;
}

export const SkillGaps: React.FC<SkillGapsProps> = ({ employeeId = 'emp1' }) => {
  const [gaps, setGaps] = useState<SkillGap[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkillGaps(employeeId).then(data => {
      setGaps(data);
      setLoading(false);
    });
  }, [employeeId]);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Analyzing your skill gaps...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Skill Gap Analysis</h1>
        <p className="text-gray-600">
          Identify missing skills required for your target roles and explore recommendations to bridge the gap.
        </p>
      </div>

      {gaps.length === 0 ? (
        <div className="bg-green-50 border border-green-200 p-6 rounded-xl flex items-start gap-4">
          <AlertCircle className="text-green-600 mt-0.5" />
          <div>
            <h3 className="text-green-800 font-bold">You're on track!</h3>
            <p className="text-green-700 text-sm mt-1">We haven't identified any major skill gaps for your current targets.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {gaps.map((gap, index) => (
            <SkillGapCard key={index} gap={gap} />
          ))}
        </div>
      )}
    </div>
  );
};
