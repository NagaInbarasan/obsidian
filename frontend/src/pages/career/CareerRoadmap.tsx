import React, { useEffect, useState } from 'react';
import { CareerRoadmap as CareerRoadmapType } from '../../types/career';
import { fetchCareerRoadmap } from '../../api/careerApi';
import { RoadmapTimeline } from '../../components/career/RoadmapTimeline';

interface CareerRoadmapProps {
  employeeId?: string;
}

export const CareerRoadmap: React.FC<CareerRoadmapProps> = ({ employeeId = 'emp1' }) => {
  const [roadmap, setRoadmap] = useState<CareerRoadmapType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCareerRoadmap(employeeId).then(data => {
      setRoadmap(data);
      setLoading(false);
    });
  }, [employeeId]);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Generating your customized roadmap...</div>;
  }

  if (!roadmap) {
    return <div className="p-8 text-center text-red-500">Could not load career roadmap.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Growth Plan</h1>
        <p className="text-gray-600">
          Your personalized path to bridge skill gaps and achieve your target role. Stay focused on your 30/60/90 day milestones.
        </p>
      </div>

      <RoadmapTimeline roadmap={roadmap} />
    </div>
  );
};
