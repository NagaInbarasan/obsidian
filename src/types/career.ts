export interface Role {
  id: string;
  title: string;
  department: string;
  description: string;
  requiredSkills: string[];
  preferredSkills: string[];
  experience: string;
  availableOpportunities: number;
}

export interface MatchEvidence {
  skill: string;
  evidence: string;
}

export interface RoleMatch {
  roleId: string;
  score: number;
  matchedSkills: string[];
  partialMatches: string[];
  missingSkills: string[];
  evidence: MatchEvidence[];
  explanation: string; // From AI
}

export interface SkillGap {
  targetRole: string;
  currentCapability: string;
  requiredSkills: string[];
  skillGaps: string[];
  priority: 'High' | 'Medium' | 'Low';
  learningRecommendations: string[];
}

export interface RoadmapMilestone {
  day: number; // 30, 60, 90
  skill: string;
  learningResource: string;
  project: string;
  expectedOutcome: string;
  progress: number; // 0-100
}

export interface CareerRoadmap {
  milestones: RoadmapMilestone[];
}

export interface Opportunity {
  id: string;
  roleId: string;
  title: string;
  location: string;
  type: string;
  postedAt: string;
}
