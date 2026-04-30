import api from './axios'

const bookingService = {
  create: async (data) => {
    const res = await api.post('/bookings', data)
    return res.data
  },
}

export default bookingService