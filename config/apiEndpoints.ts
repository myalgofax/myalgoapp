// config/api.ts

const API_BASE_URL =  "http://localhost:8000/api";

export const API_ENDPOINTS = {
  // Auth
  login: `${API_BASE_URL}/auth/login`,
  signup: `${API_BASE_URL}/auth/register`,
  logout: `${API_BASE_URL}/auth/logout`,
  me: `${API_BASE_URL}/auth/me`,

  // Users
  users: `${API_BASE_URL}/users`,
  userById: (id: string) => `${API_BASE_URL}/users/${id}`,

  // Posts (example)
  posts: `${API_BASE_URL}/posts`,
  postById: (id: string) => `${API_BASE_URL}/posts/${id}`,
};
