export interface WorkforceMetrics {
  totalEmployees: number;
  skillsIdentified: number;
  internalOpportunities: number;
  emergingSkillGaps: number;
  aiReadyTalent: number;
}

export interface SkillDistribution {
  name: string;
  value: number;
}

export interface DepartmentSkillDistribution {
  department: string;
  [skillName: string]: string | number;
}

export interface EmergingSkillDemand {
  skill: string;
  demand: number;
  supply: number;
}

export interface SkillGapData {
  role: string;
  gapCount: number;
}

export interface RoleDemand {
  role: string;
  openings: number;
}

export interface TalentDiscoveryMatch {
  employeeId: string;
  employeeName: string;
  currentRole: string;
  department: string;
  experienceYears: number;
  relevantSkills: string[];
  matchScore: number;
  evidence: string;
}

export interface TalentDiscoveryFilters {
  role?: string;
  department?: string;
  skill?: string;
  experience?: string;
  matchScore?: string;
}

export interface InternalMobilitySeeker {
  employeeId: string;
  employeeName: string;
  currentRole: string;
  desiredRole: string;
}

export interface InternalMobilityOpportunity {
  roleId: string;
  roleName: string;
  department: string;
  matchingTalent: number;
  skillGaps: string[];
}
