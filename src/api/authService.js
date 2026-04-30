import api from './axios'

const authService = {
  register: async (data) => {
    const res = await api.post('/auth/register', data)
    if (res.data.token) localStorage.setItem('token', res.data.token)
    return res.data
  },

  login: async (data) => {
    const res = await api.post('/auth/login', data)
    if (res.data.token) localStorage.setItem('token', res.data.token)
    return res.data
  },

  logout: () => {
    localStorage.removeItem('token')
  },

  getMe: async () => {
    const res = await api.get('/auth/me')
    return res.data
  },
}

export default authService