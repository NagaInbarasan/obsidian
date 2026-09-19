export type SkillType = 'explicit' | 'inferred' | 'potential' | 'self-declared';

export interface Skill {
  id: string;
  name: string;
  type: SkillType;
  score?: number; // Backend provided score, not calculated by UI
  evidence?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  skillsUsed: string[];
}

export interface Learning {
  id: string;
  courseName: string;
  provider: string;
  status: 'completed' | 'in-progress' | 'planned';
  completionDate?: string;
}

export interface Achievement {
  id: string;
  title: string;
  date: string;
  description: string;
}

export interface CareerGoal {
  id: string;
  targetRole: string;
  timeframe: string;
}

export interface RoleMatch {
  roleId: string;
  roleName: string;
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
}

export interface Employee {
  id: string;
  name: string;
  currentRole: string;
  department: string;
  experienceYears: number;
  profileStatus: 'active' | 'incomplete' | 'review-needed';
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  learning: Learning[];
  achievements: Achievement[];
  careerGoals: CareerGoal[];
  roleMatches: RoleMatch[];
}

export interface EmployeeFilters {
  search: string;
  department: string;
  role: string;
  skill: string;
}
