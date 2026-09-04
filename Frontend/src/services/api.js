import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://localhost:7054';

const api = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const complaintsApi = {
    getAll: (params) => api.get('/complaints', { params }),
    getById: (id) => api.get(`/complaints/${id}`),
    create: (data) => api.post('/complaints', data),
    updateStatus: (id, status) => api.put(`/complaints/${id}`, { status }),
    getDashboardStats: () => api.get('/complaints/dashboard'),
};

export default api;
