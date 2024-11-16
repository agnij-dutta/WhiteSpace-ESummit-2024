import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true
});

export const apiClient = {
  auth: {
    login: async (credentials: { email: string; password: string }) => {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include'
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Login failed');
      }
      
      return response.json();
    },

    register: async (data: { 
      email: string; 
      password: string;
      accountType: 'personal' | 'company';
      companyName?: string;
    }) => {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Registration failed');
      }
      
      return response.json();
    }
  },
  
  profiles: {
    create: (formData: FormData) => 
      api.post('/profiles/create', formData),
    getMyProfile: () => 
      api.get('/profiles/me'),
    getRecommendations: (profileId: string) =>
      api.get(`/profiles/${profileId}/recommendations`)
  },
  
  hackathons: {
    list: (filters?: {
      query?: string;
      track?: string;
      difficulty?: string;
      status?: string;
    }) => api.get('/hackathons/search', { params: filters }),
    
    create: (data: {
      name: string;
      description: string;
      startDate: string;
      endDate: string;
      primaryTrack: string;
      difficulty: string;
      prizePool?: number;
      externalUrl?: string;
      quickApplyEnabled: boolean;
      applicationDeadline: string;
    }) => api.post('/hackathons/create', data),
    
    apply: (hackathonId: string, data: {
      profileId: string;
      applyType: 'quick' | 'normal';
    }) => api.post(`/hackathons/${hackathonId}/apply`, data),
    
    getApplications: (hackathonId: string) =>
      api.get(`/hackathons/${hackathonId}/applications`),
      
    approveApplication: (hackathonId: string, applicationId: string) =>
      api.post(`/hackathons/${hackathonId}/applications/${applicationId}/approve`)
  }
}; 