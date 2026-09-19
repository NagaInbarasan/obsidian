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
      experience: [],
      projects: [],
      learning: [],
      achievements: [],
      careerGoals: [],
      roleMatches: [],
    };
  } catch {
    return null;
  }
};
