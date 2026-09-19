import {
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
} from '../types/hr';
import { fetchApi } from '../services/api/client';

export const fetchWorkforceMetrics = async (): Promise<WorkforceMetrics> => {
  try {
    return await fetchApi<WorkforceMetrics>('/hr/metrics');
  } catch {
    return {
      totalEmployees: 0,
      skillsIdentified: 0,
      internalOpportunities: 0,
      emergingSkillGaps: 0,
      aiReadyTalent: 0
    };
  }
};

export const fetchSkillDistribution = async (): Promise<SkillDistribution[]> => {
  try {
    return await fetchApi<SkillDistribution[]>('/hr/skill-distribution');
  } catch {
    return [];
  }
};

export const fetchDepartmentSkillDistribution = async (): Promise<DepartmentSkillDistribution[]> => {
  try {
    return await fetchApi<DepartmentSkillDistribution[]>('/hr/department-skills');
  } catch {
    return [];
  }
};

export const fetchEmergingSkillDemand = async (): Promise<EmergingSkillDemand[]> => {
  try {
    return await fetchApi<EmergingSkillDemand[]>('/hr/emerging-skills');
  } catch {
    return [];
  }
};

export const fetchSkillGaps = async (): Promise<SkillGapData[]> => {
  try {
    return await fetchApi<SkillGapData[]>('/hr/skill-gaps');
  } catch {
    return [];
  }
};

export const fetchRoleDemand = async (): Promise<RoleDemand[]> => {
  try {
    return await fetchApi<RoleDemand[]>('/hr/role-demand');
  } catch {
    return [];
  }
};

export const fetchTalentDiscovery = async (filters?: TalentDiscoveryFilters): Promise<TalentDiscoveryMatch[]> => {
  try {
    const query = new URLSearchParams();
    if (filters?.role) query.append('role', filters.role);
    if (filters?.department) query.append('department', filters.department);
    if (filters?.skill) query.append('skill', filters.skill);
    if (filters?.experience) query.append('experience', filters.experience);
    return await fetchApi<TalentDiscoveryMatch[]>(`/hr/talent-discovery?${query.toString()}`);
  } catch {
    return [];
  }
};

export const fetchInternalMobilitySeekers = async (): Promise<InternalMobilitySeeker[]> => {
  try {
    return await fetchApi<InternalMobilitySeeker[]>('/hr/mobility-seekers');
  } catch {
    return [];
  }
};

export const fetchInternalMobilityOpportunities = async (): Promise<InternalMobilityOpportunity[]> => {
  try {
    return await fetchApi<InternalMobilityOpportunity[]>('/hr/mobility-opportunities');
  } catch {
    return [];
  }
};
