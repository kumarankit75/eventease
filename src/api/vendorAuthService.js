import api from './axios'

const vendorAuthService = {
  register: async (data) => {
    const res = await api.post('/auth/vendor-register', data)
    if (res.data.token) localStorage.setItem('token', res.data.token)
    return res.data
  },

  login: async (data) => {
    const res = await api.post('/auth/login', data)
    if (res.data.token) localStorage.setItem('token', res.data.token)
    return res.data
  },

  getMyProfile: async () => {
    const res = await api.get('/vendors/my-profile')
    return res.data
  },

  updateMyProfile: async (data) => {
    const res = await api.put('/vendors/my-profile', data)
    return res.data
  },

  getMyBookings: async () => {
    const res = await api.get('/bookings/my-bookings')
    return res.data
  },

  updateBooking: async (id, data) => {
    const res = await api.put(`/bookings/${id}/vendor-update`, data)
    return res.data
  },
}

export default vendorAuthService