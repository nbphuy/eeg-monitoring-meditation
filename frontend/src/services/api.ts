import axios from 'axios'
import { Session } from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const sessionAPI = {
  getAll: async (): Promise<Session[]> => {
    const response = await api.get('/sessions')
    return response.data
  },

  getById: async (id: number): Promise<Session> => {
    const response = await api.get(`/sessions/${id}`)
    return response.data
  },

  create: async (data: { user_id: string; notes?: string }): Promise<Session> => {
    const response = await api.post('/sessions', data)
    return response.data
  },

  update: async (id: number, data: Partial<Session>): Promise<Session> => {
    const response = await api.put(`/sessions/${id}`, data)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/sessions/${id}`)
  },

  end: async (id: number): Promise<Session> => {
    const response = await api.post(`/sessions/${id}/end`)
    return response.data
  },
}

export default api
