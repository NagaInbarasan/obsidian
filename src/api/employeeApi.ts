import { Employee, EmployeeFilters } from '../types/employee';

// Mock Data
const MOCK_EMPLOYEES: Employee[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    currentRole: 'Senior Frontend Engineer',
    department: 'Engineering',
    experienceYears: 6,
    profileStatus: 'active',
    skills: [
      { id: 's1', name: 'React', type: 'explicit', score: 95 },
      { id: 's2', name: 'TypeScript', type: 'explicit', score: 90 },
      { id: 's3', name: 'GraphQL', type: 'inferred', score: 75, evidence: 'Used extensively in project X' },
      { id: 's4', name: 'Figma', type: 'self-declared', score: 60 },
      { id: 's5', name: 'Node.js', type: 'potential', evidence: 'Completed internal training' },
    ],
    experience: [
      { id: 'e1', role: 'Senior Frontend Engineer', company: 'TechCorp', startDate: '2022-01-01', description: 'Leading frontend architecture.' },
      { id: 'e2', role: 'Frontend Engineer', company: 'TechCorp', startDate: '2019-06-01', endDate: '2021-12-31', description: 'Developed user interfaces.' },
    ],
    projects: [
      { id: 'p1', name: 'Project X', description: 'A large scale migration.', skillsUsed: ['React', 'TypeScript', 'GraphQL'] }
    ],
    learning: [
      { id: 'l1', courseName: 'Advanced Node.js', provider: 'Internal', status: 'completed', completionDate: '2023-05-01' }
    ],
    achievements: [
      { id: 'a1', title: 'Employee of the Month', date: '2023-08-01', description: 'For outstanding delivery on Project X.' }
    ],
    careerGoals: [
      { id: 'c1', targetRole: 'Frontend Architect', timeframe: '1-2 years' }
    ],
    roleMatches: [
      { roleId: 'r1', roleName: 'Frontend Architect', matchScore: 85, matchedSkills: ['React', 'TypeScript'], missingSkills: ['System Design'] }
    ]
  },
  {
    id: '2',
    name: 'Bob Smith',
    currentRole: 'Backend Engineer',
    department: 'Engineering',
    experienceYears: 4,
    profileStatus: 'review-needed',
    skills: [
      { id: 's6', name: 'Go', type: 'explicit', score: 85 },
      { id: 's7', name: 'PostgreSQL', type: 'explicit', score: 80 },
      { id: 's8', name: 'Kubernetes', type: 'inferred', score: 70, evidence: 'Committed to k8s manifests repo' },
    ],
    experience: [
      { id: 'e3', role: 'Backend Engineer', company: 'TechCorp', startDate: '2021-03-01', description: 'Building scalable APIs.' }
    ],
    projects: [],
    learning: [],
    achievements: [],
    careerGoals: [],
    roleMatches: []
  }
];

export const fetchEmployees = async (filters?: EmployeeFilters): Promise<Employee[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  let filtered = [...MOCK_EMPLOYEES];
  
  if (filters) {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(e => e.name.toLowerCase().includes(searchLower));
    }
    if (filters.department) {
      filtered = filtered.filter(e => e.department === filters.department);
    }
    if (filters.role) {
      filtered = filtered.filter(e => e.currentRole === filters.role);
    }
    if (filters.skill) {
      const skillLower = filters.skill.toLowerCase();
      filtered = filtered.filter(e => e.skills.some(s => s.name.toLowerCase().includes(skillLower)));
    }
  }

  return filtered;
};

export const fetchEmployeeById = async (id: string): Promise<Employee | null> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_EMPLOYEES.find(e => e.id === id) || null;
};
