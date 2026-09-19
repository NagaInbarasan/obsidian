export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('obsidian_token');
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (options.headers) {
    const optsHeaders = new Headers(options.headers);
    optsHeaders.forEach((value, key) => {
      headers[key] = value;
    });
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = 'An error occurred while fetching data';
    try {
      const errorData = await response.json();
      errorMessage = errorData.error?.message || errorData.message || errorMessage;
    } catch {
      // Ignored
    }
    throw new Error(errorMessage);
  }

  const json = await response.json();
  return json.data !== undefined ? json.data : json;
}
