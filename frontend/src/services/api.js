import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  // Auth
  login: (credentials) => apiClient.post('/auth/login', credentials),
  logout: () => apiClient.post('/auth/logout'),
  getMe: () => apiClient.get('/auth/me'),

  // Public & Admin endpoints
  getProjects: () => apiClient.get('/projects'),
  getProjectById: (id) => apiClient.get(`/projects/${id}`),
  createProject: (data) => apiClient.post('/projects', data),
  updateProject: (id, data) => apiClient.put(`/projects/${id}`, data),
  deleteProject: (id) => apiClient.delete(`/projects/${id}`),

  getSkills: () => apiClient.get('/skills'),
  createSkill: (data) => apiClient.post('/skills', data),
  updateSkill: (id, data) => apiClient.put(`/skills/${id}`, data),
  deleteSkill: (id) => apiClient.delete(`/skills/${id}`),

  getExperiences: () => apiClient.get('/experiences'),
  createExperience: (data) => apiClient.post('/experiences', data),
  updateExperience: (id, data) => apiClient.put(`/experiences/${id}`, data),
  deleteExperience: (id) => apiClient.delete(`/experiences/${id}`),

  getEducation: () => apiClient.get('/education'),
  createEducation: (data) => apiClient.post('/education', data),
  updateEducation: (id, data) => apiClient.put(`/education/${id}`, data),
  deleteEducation: (id) => apiClient.delete(`/education/${id}`),

  getCertifications: () => apiClient.get('/certifications'),
  createCertification: (data) => apiClient.post('/certifications', data),
  updateCertification: (id, data) => apiClient.put(`/certifications/${id}`, data),
  deleteCertification: (id) => apiClient.delete(`/certifications/${id}`),

  getAchievements: () => apiClient.get('/achievements'),
  createAchievement: (data) => apiClient.post('/achievements', data),
  updateAchievement: (id, data) => apiClient.put(`/achievements/${id}`, data),
  deleteAchievement: (id) => apiClient.delete(`/achievements/${id}`),

  sendMessage: (data) => apiClient.post('/messages', data),
  getMessages: () => apiClient.get('/messages'),
  markMessageRead: (id, isRead) => apiClient.patch(`/messages/${id}/read`, { isRead }),
  deleteMessage: (id) => apiClient.delete(`/messages/${id}`),

  getDashboardSummary: () => apiClient.get('/admin/dashboard'),
};

export default apiClient;
