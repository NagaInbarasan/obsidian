import { Role, RoleMatch, SkillGap, CareerRoadmap, Opportunity } from '../types/career';
import { fetchApi } from '../services/api/client';

export const fetchRoles = async (): Promise<Role[]> => {
  const roles = await fetchApi<any[]>('/roles');
  return roles.map(r => ({
    id: r.id,
    title: r.title,
    department: r.department || '',
    description: r.description || '',
    requiredSkills: [],
    preferredSkills: [],
    experience: '',
    availableOpportunities: 1,
  }));
};

export const fetchRoleById = async (id: string): Promise<Role | null> => {
  try {
    const r = await fetchApi<any>(`/roles/${id}`);
    const requiredSkills = r.skills?.filter((s:any) => s.required).map((s:any) => s.skill.name) || [];
    const preferredSkills = r.skills?.filter((s:any) => !s.required).map((s:any) => s.skill.name) || [];
    return {
      id: r.id,
      title: r.title,
      department: r.department || '',
      description: r.description || '',
      requiredSkills,
      preferredSkills,
      experience: '',
      availableOpportunities: 1,
    };
  } catch {
    return null;
  }
};

export const fetchRoleMatch = async (employeeId: string, roleId?: string): Promise<RoleMatch | null> => {
  try {
    const matches = await fetchApi<any[]>(`/employees/${employeeId}/matches`);
    
    // If no roleId is provided or it's 'top' or 'r2', pick the first match (since we seeded 1 match)
    const match = (!roleId || roleId === 'r2' || roleId === 'top') 
      ? matches[0] 
      : matches.find((m: any) => m.role.id === roleId);
    
    
    if (match) {
      return {
        roleId: match.role.id,
        score: match.score * 100,
        matchedSkills: [],
        partialMatches: [],
        missingSkills: [],
        evidence: [],
        explanation: match.explanation || 'Match calculated by backend.',
      };
    }
    return null;
  } catch {
    return null;
  }
};

// Mock endpoints that backend does not yet support:
export const fetchOpportunities = async (): Promise<Opportunity[]> => {
  return [];
};
export const fetchOpportunityById = async (_id: string): Promise<Opportunity | null> => {
  return null;
};
export const fetchSkillGaps = async (_employeeId: string): Promise<SkillGap[]> => {
  return [];
};
export const fetchCareerRoadmap = async (_employeeId: string): Promise<CareerRoadmap> => {
  return { milestones: [] };
};
