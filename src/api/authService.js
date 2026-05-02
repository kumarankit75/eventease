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

  updateProfile: async (data) => {
    const res = await api.put('/auth/update-profile', data)
    return res.data
  },

  changePassword: async (data) => {
    const res = await api.put('/auth/change-password', data)
    return res.data
  },

  getMyBookings: async () => {
    const res = await api.get('/bookings/user-bookings')
    return res.data
  },
}

export default authService