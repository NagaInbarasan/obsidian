import { fetchApi } from '../services/api/client';

export const registerApi = async (data: any) => {
  const response = await fetchApi<{ token: string; employee: { systemRole: string, id: string } }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  
  localStorage.setItem('obsidian_token', response.token);
  localStorage.setItem('userRole', response.employee.systemRole);
  localStorage.setItem('userId', response.employee.id);
  return response;
};

export const loginApi = async (email: string, password: string) => {
  const response = await fetchApi<{ token: string; employee: { systemRole: string } }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  
  localStorage.setItem('obsidian_token', response.token);
  localStorage.setItem('userRole', response.employee.systemRole);
  localStorage.setItem('userId', (response.employee as any).id);
  return response;
};

export const logoutApi = () => {
  localStorage.removeItem('obsidian_token');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userId');
};

export const getCurrentUser = async () => {
  return await fetchApi<any>('/auth/me');
};
