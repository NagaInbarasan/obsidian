import { Role, RoleMatch, SkillGap, CareerRoadmap, Opportunity } from '../types/career';

// Mocks

const mockRoles: Role[] = [
  {
    id: 'r1',
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    description: 'Lead frontend development for our AI-powered products.',
    requiredSkills: ['React', 'TypeScript', 'Tailwind CSS'],
    preferredSkills: ['GraphQL', 'Node.js'],
    experience: '5+ years',
    availableOpportunities: 2,
  },
  {
    id: 'r2',
    title: 'AI Engineer',
    department: 'Research',
    description: 'Build robust machine learning models and integrate them into our core platform.',
    requiredSkills: ['Python', 'PyTorch', 'SQL'],
    preferredSkills: ['RAG', 'AWS'],
    experience: '3+ years',
    availableOpportunities: 1,
  }
];

const mockMatches: Record<string, RoleMatch> = {
  'r2': {
    roleId: 'r2',
    score: 78,
    matchedSkills: ['Python', 'SQL', 'AWS'],
    partialMatches: ['Machine Learning'],
    missingSkills: ['PyTorch', 'RAG'],
    evidence: [{ skill: 'Python', evidence: 'Primary language used in current role' }],
    explanation: 'The candidate exhibits a strong foundation in backend development and data querying with Python and SQL. However, the critical requirements for PyTorch and RAG are missing. The partial match in Machine Learning suggests readiness to transition into a more specialized AI role if gaps are addressed.',
  },
  'r1': {
    roleId: 'r1',
    score: 95,
    matchedSkills: ['React', 'TypeScript', 'Tailwind CSS'],
    partialMatches: [],
    missingSkills: ['GraphQL'],
    evidence: [{ skill: 'React', evidence: 'Led front-end rebuild in Q3' }],
    explanation: 'Highly qualified candidate matching all core requirements. Only lacking GraphQL which is a preferred skill.',
  }
};

const mockGaps: SkillGap[] = [
  {
    targetRole: 'AI Engineer',
    currentCapability: 'Backend Developer',
    requiredSkills: ['Python', 'PyTorch', 'SQL', 'RAG'],
    skillGaps: ['PyTorch', 'RAG'],
    priority: 'High',
    learningRecommendations: ['Deep Learning Specialization', 'RAG implementations in LangChain']
  }
];

const mockRoadmap: CareerRoadmap = {
  milestones: [
    {
      day: 30,
      skill: 'Machine Learning Basics',
      learningResource: 'Internal ML Crash Course',
      project: 'Build a simple regression model',
      expectedOutcome: 'Understand model training loop',
      progress: 100
    },
    {
      day: 60,
      skill: 'PyTorch Fundamentals',
      learningResource: 'PyTorch Official Tutorials',
      project: 'Implement a CNN for image classification',
      expectedOutcome: 'Comfortable with PyTorch tensors and autograd',
      progress: 50
    },
    {
      day: 90,
      skill: 'RAG Architectures',
      learningResource: 'Advanced GenAI Workshop',
      project: 'Build a document Q&A system',
      expectedOutcome: 'Can implement Retrieval-Augmented Generation',
      progress: 0
    }
  ]
};

const mockOpportunities: Opportunity[] = [
  { id: 'o1', roleId: 'r1', title: 'Senior Frontend Engineer - Platform', location: 'Remote', type: 'Full-time', postedAt: '2026-09-01' },
  { id: 'o2', roleId: 'r2', title: 'AI Engineer - Core Search', location: 'New York', type: 'Full-time', postedAt: '2026-09-15' }
];

export const fetchRoles = async (): Promise<Role[]> => {
  return new Promise(resolve => setTimeout(() => resolve(mockRoles), 500));
};

export const fetchRoleById = async (id: string): Promise<Role | null> => {
  return new Promise(resolve => setTimeout(() => resolve(mockRoles.find(r => r.id === id) || null), 500));
};

export const fetchOpportunities = async (): Promise<Opportunity[]> => {
  return new Promise(resolve => setTimeout(() => resolve(mockOpportunities), 500));
};

export const fetchOpportunityById = async (id: string): Promise<Opportunity | null> => {
  return new Promise(resolve => setTimeout(() => resolve(mockOpportunities.find(o => o.id === id) || null), 500));
};

export const fetchRoleMatch = async (_employeeId: string, roleId: string): Promise<RoleMatch | null> => {
  return new Promise(resolve => setTimeout(() => resolve(mockMatches[roleId] || null), 500));
};

export const fetchSkillGaps = async (_employeeId: string): Promise<SkillGap[]> => {
  return new Promise(resolve => setTimeout(() => resolve(mockGaps), 500));
};

export const fetchCareerRoadmap = async (_employeeId: string): Promise<CareerRoadmap> => {
  return new Promise(resolve => setTimeout(() => resolve(mockRoadmap), 500));
};
