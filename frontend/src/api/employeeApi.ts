import { Employee, EmployeeFilters } from '../types/employee';
import { fetchApi } from '../services/api/client';

export const fetchEmployees = async (filters?: EmployeeFilters): Promise<Employee[]> => {
  const query = new URLSearchParams();
  if (filters?.search) query.append('search', filters.search);
  if (filters?.department) query.append('department', filters.department);
  if (filters?.role) query.append('role', filters.role);
  // Optional skill filter
  
  const rawEmployees = await fetchApi<any[]>(`/employees?${query.toString()}`);
  
  return rawEmployees.map(e => ({
    id: e.id,
    name: `${e.firstName} ${e.lastName}`,
    currentRole: e.title || '',
    department: e.department || '',
    experienceYears: 0, // Fallback
    profileStatus: 'active', // Fallback
    skills: e.skills?.map((s: any) => ({
      id: s.skillId,
      name: s.skill?.name || '',
      type: s.status === 'explicit' ? 'explicit' : 'inferred',
      score: s.level * 20,
    })) || [],
    experience: [],
    projects: [],
    learning: [],
    achievements: [],
    careerGoals: [],
    roleMatches: [],
  }));
};

export const fetchEmployeeById = async (id: string): Promise<Employee | null> => {
  try {
    const e = await fetchApi<any>(`/employees/${id}/profile`);
    return {
      id: e.id,
      name: `${e.firstName} ${e.lastName}`,
      currentRole: e.title || '',
      department: e.department || '',
      experienceYears: 0,
      profileStatus: 'active',
      skills: e.skills?.map((s: any) => ({
        id: s.skillId,
        name: s.skill?.name || '',
        type: s.status === 'explicit' ? 'explicit' : 'inferred',
        score: s.level * 20,
      })) || [],
      experience: e.experiences?.map((exp: any) => ({
        id: exp.id,
        role: exp.title,
        company: exp.company,
        period: `${new Date(exp.startDate).getFullYear()} - ${exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}`,
        description: exp.description,
        skills: []
      })) || [],
      projects: e.projects?.map((proj: any) => ({
        id: proj.id,
        name: proj.name,
        role: 'Contributor',
        period: `${new Date(proj.startDate).getFullYear()} - ${proj.endDate ? new Date(proj.endDate).getFullYear() : 'Present'}`,
        description: proj.description,
        skills: []
      })) || [],
      learning: [],
      achievements: [],
      careerGoals: e.careerGoals?.map((goal: any) => ({
        id: goal.id,
        title: goal.targetRole,
        description: goal.notes || '',
        targetDate: goal.targetDate ? new Date(goal.targetDate).toISOString().split('T')[0] : 'TBD',
        progress: 0,
        milestones: []
      })) || [],
      roleMatches: e.roleMatches?.map((match: any) => {
        let matchedSkills = [];
        let missingSkills = [];
        try {
          matchedSkills = JSON.parse(match.matchedSkills || '[]');
          missingSkills = JSON.parse(match.missingSkills || '[]');
        } catch {}
        
        return {
          roleId: match.roleId,
          roleName: match.role?.title || 'Unknown Role',
          matchScore: match.score * 100,
          matchedSkills,
          missingSkills
        };
      }) || [],
    };
  } catch {
    return null;
  }
};
