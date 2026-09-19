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

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchWorkforceMetrics = async (): Promise<WorkforceMetrics> => {
  await delay(500);
  return {
    totalEmployees: 1245,
    skillsIdentified: 8740,
    internalOpportunities: 42,
    emergingSkillGaps: 15,
    aiReadyTalent: 350
  };
};

export const fetchSkillDistribution = async (): Promise<SkillDistribution[]> => {
  await delay(500);
  return [
    { name: 'Engineering', value: 450 },
    { name: 'Data Science', value: 200 },
    { name: 'Design', value: 150 },
    { name: 'Product', value: 180 },
    { name: 'Sales', value: 265 }
  ];
};

export const fetchDepartmentSkillDistribution = async (): Promise<DepartmentSkillDistribution[]> => {
  await delay(500);
  return [
    { department: 'Engineering', React: 120, Node: 150, Go: 80 },
    { department: 'Data', Python: 160, SQL: 140, Go: 20 },
    { department: 'Product', SQL: 40, Agile: 120, Python: 10 }
  ];
};

export const fetchEmergingSkillDemand = async (): Promise<EmergingSkillDemand[]> => {
  await delay(500);
  return [
    { skill: 'Rust', demand: 80, supply: 10 },
    { skill: 'AI/ML', demand: 150, supply: 40 },
    { skill: 'Kubernetes', demand: 120, supply: 60 },
    { skill: 'GraphQL', demand: 90, supply: 50 }
  ];
};

export const fetchSkillGaps = async (): Promise<SkillGapData[]> => {
  await delay(500);
  return [
    { role: 'Senior AI Engineer', gapCount: 15 },
    { role: 'Cloud Architect', gapCount: 12 },
    { role: 'Data Scientist', gapCount: 8 },
    { role: 'Frontend Lead', gapCount: 5 }
  ];
};

export const fetchRoleDemand = async (): Promise<RoleDemand[]> => {
  await delay(500);
  return [
    { role: 'AI Engineer', openings: 12 },
    { role: 'Full Stack Dev', openings: 8 },
    { role: 'Product Manager', openings: 5 },
    { role: 'Data Analyst', openings: 7 }
  ];
};

const MOCK_TALENT_MATCHES: TalentDiscoveryMatch[] = [
  {
    employeeId: '1',
    employeeName: 'Alice Johnson',
    currentRole: 'Senior Frontend Engineer',
    department: 'Engineering',
    experienceYears: 6,
    relevantSkills: ['React', 'TypeScript', 'GraphQL'],
    matchScore: 92,
    evidence: 'Extensive use of React and TypeScript in Project X. Completed advanced GraphQL training.'
  },
  {
    employeeId: '2',
    employeeName: 'Bob Smith',
    currentRole: 'Backend Engineer',
    department: 'Engineering',
    experienceYears: 4,
    relevantSkills: ['Node.js', 'PostgreSQL'],
    matchScore: 78,
    evidence: 'Strong backend experience but missing direct GraphQL experience. Has potential based on similar technologies.'
  },
  {
    employeeId: '3',
    employeeName: 'Charlie Davis',
    currentRole: 'Full Stack Developer',
    department: 'Engineering',
    experienceYears: 5,
    relevantSkills: ['React', 'Node.js', 'TypeScript'],
    matchScore: 85,
    evidence: 'Solid full stack background. Self-declared high proficiency in React.'
  }
];

export const fetchTalentDiscovery = async (filters?: TalentDiscoveryFilters): Promise<TalentDiscoveryMatch[]> => {
  await delay(600);
  let matches = [...MOCK_TALENT_MATCHES];

  if (filters) {
    if (filters.role) {
      matches = matches.filter(m => m.currentRole.toLowerCase().includes(filters.role!.toLowerCase()));
    }
    if (filters.department) {
      matches = matches.filter(m => m.department.toLowerCase() === filters.department!.toLowerCase());
    }
    if (filters.skill) {
      const skillLower = filters.skill.toLowerCase();
      matches = matches.filter(m => m.relevantSkills.some(s => s.toLowerCase().includes(skillLower)));
    }
    if (filters.experience) {
      const exp = parseInt(filters.experience);
      if (!isNaN(exp)) {
        matches = matches.filter(m => m.experienceYears >= exp);
      }
    }
  }

  // Sort by match score descending
  return matches.sort((a, b) => b.matchScore - a.matchScore);
};

export const fetchInternalMobilitySeekers = async (): Promise<InternalMobilitySeeker[]> => {
  await delay(500);
  return [
    { employeeId: '4', employeeName: 'Diana Prince', currentRole: 'QA Engineer', desiredRole: 'Frontend Developer' },
    { employeeId: '5', employeeName: 'Evan Wright', currentRole: 'Data Analyst', desiredRole: 'Data Scientist' },
    { employeeId: '6', employeeName: 'Fiona Gallagher', currentRole: 'Backend Developer', desiredRole: 'Cloud Architect' }
  ];
};

export const fetchInternalMobilityOpportunities = async (): Promise<InternalMobilityOpportunity[]> => {
  await delay(500);
  return [
    { roleId: 'r1', roleName: 'Frontend Developer', department: 'Engineering', matchingTalent: 5, skillGaps: ['React Native'] },
    { roleId: 'r2', roleName: 'Data Scientist', department: 'Data', matchingTalent: 2, skillGaps: ['Machine Learning', 'Deep Learning'] },
    { roleId: 'r3', roleName: 'Cloud Architect', department: 'Infrastructure', matchingTalent: 1, skillGaps: ['Kubernetes Advanced', 'AWS Certified'] }
  ];
};
