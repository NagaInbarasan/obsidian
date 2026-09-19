import { useState, useEffect } from 'react';
import { 
  fetchWorkforceMetrics, 
  fetchSkillDistribution, 
  fetchDepartmentSkillDistribution, 
  fetchEmergingSkillDemand, 
  fetchSkillGaps, 
  fetchRoleDemand, 
  fetchTalentDiscovery, 
  fetchInternalMobilitySeekers, 
  fetchInternalMobilityOpportunities 
} from '@/api/hrApi';
import type { 
  WorkforceMetrics, 
  SkillDistribution, 
  DepartmentSkillDistribution, 
  EmergingSkillDemand, 
  SkillGapData, 
  RoleDemand, 
  TalentDiscoveryMatch, 
  TalentDiscoveryFilters, 
  InternalMobilitySeeker, 
  InternalMobilityOpportunity 
} from '@/types/hr';
import { WorkforceOverview } from './WorkforceOverview';
import { SkillIntelligence } from './SkillIntelligence';
import { TalentDiscovery } from './TalentDiscovery';
import { InternalMobility } from './InternalMobility';
import { LoadingPage, LoadingSpinner } from '@/components/ui/LoadingState';
import { ErrorState } from '@/components/ui/ErrorState';

export function HrDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [metrics, setMetrics] = useState<WorkforceMetrics | null>(null);
  const [skillDist, setSkillDist] = useState<SkillDistribution[]>([]);
  const [deptSkillDist, setDeptSkillDist] = useState<DepartmentSkillDistribution[]>([]);
  const [emergingDemand, setEmergingDemand] = useState<EmergingSkillDemand[]>([]);
  const [skillGaps, setSkillGaps] = useState<SkillGapData[]>([]);
  const [roleDemand, setRoleDemand] = useState<RoleDemand[]>([]);
  
  const [talentMatches, setTalentMatches] = useState<TalentDiscoveryMatch[]>([]);
  const [talentLoading, setTalentLoading] = useState(false);
  
  const [mobilitySeekers, setMobilitySeekers] = useState<InternalMobilitySeeker[]>([]);
  const [mobilityOpps, setMobilityOpps] = useState<InternalMobilityOpportunity[]>([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const [
          metricsData,
          skillDistData,
          deptSkillDistData,
          emergingData,
          gapsData,
          roleDemandData,
          talentData,
          seekersData,
          oppsData
        ] = await Promise.all([
          fetchWorkforceMetrics(),
          fetchSkillDistribution(),
          fetchDepartmentSkillDistribution(),
          fetchEmergingSkillDemand(),
          fetchSkillGaps(),
          fetchRoleDemand(),
          fetchTalentDiscovery(),
          fetchInternalMobilitySeekers(),
          fetchInternalMobilityOpportunities()
        ]);

        setMetrics(metricsData);
        setSkillDist(skillDistData);
        setDeptSkillDist(deptSkillDistData);
        setEmergingDemand(emergingData);
        setSkillGaps(gapsData);
        setRoleDemand(roleDemandData);
        setTalentMatches(talentData);
        setMobilitySeekers(seekersData);
        setMobilityOpps(oppsData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load HR dashboard data'));
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleFilterTalent = async (filters: TalentDiscoveryFilters) => {
    try {
      setTalentLoading(true);
      const data = await fetchTalentDiscovery(filters);
      setTalentMatches(data);
    } catch (err) {
      console.error('Failed to filter talent:', err);
    } finally {
      setTalentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center h-full">
        <LoadingPage />
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <div className="p-8">
        <ErrorState 
          title="Failed to load dashboard" 
          description={error?.message || 'Unknown error occurred.'} 
          onRetry={() => window.location.reload()} 
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">HR Intelligence</h1>
        <p className="text-slate-500 mt-2">
          Workforce overview, skill intelligence, and internal mobility analytics.
        </p>
      </div>

      <WorkforceOverview metrics={metrics} />
      
      <SkillIntelligence 
        skillDistribution={skillDist}
        departmentSkillDistribution={deptSkillDist}
        emergingSkillDemand={emergingDemand}
        skillGaps={skillGaps}
        roleDemand={roleDemand}
      />

      <div className="relative">
        {talentLoading && (
          <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center backdrop-blur-[1px] rounded-lg">
            <LoadingSpinner />
          </div>
        )}
        <TalentDiscovery 
          initialMatches={talentMatches} 
          onFilter={handleFilterTalent} 
        />
      </div>

      <InternalMobility 
        seekers={mobilitySeekers}
        opportunities={mobilityOpps}
      />
    </div>
  );
}
