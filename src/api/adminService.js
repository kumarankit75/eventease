import api from './axios'

const adminService = {
  // Stats
  getStats: async () => {
    const [bookings, vendors, contacts] = await Promise.all([
      api.get('/bookings?limit=1000'),
      api.get('/vendors?limit=1000'),
      api.get('/contact'),
    ])
    return {
      bookings: bookings.data,
      vendors: vendors.data,
      contacts: contacts.data,
    }
  },

  // Bookings
  getAllBookings: async (params) => {
    const res = await api.get('/bookings', { params })
    return res.data
  },
  updateBooking: async (id, data) => {
    const res = await api.put(`/bookings/${id}`, data)
    return res.data
  },
  deleteBooking: async (id) => {
    const res = await api.delete(`/bookings/${id}`)
    return res.data
  },

  // Vendors
  getAllVendors: async (params) => {
    const res = await api.get('/vendors', { params })
    return res.data
  },
  createVendor: async (data) => {
    const res = await api.post('/vendors', data)
    return res.data
  },
  updateVendor: async (id, data) => {
    const res = await api.put(`/vendors/${id}`, data)
    return res.data
  },
  deleteVendor: async (id) => {
    const res = await api.delete(`/vendors/${id}`)
    return res.data
  },

  // Contacts
  getAllContacts: async () => {
    const res = await api.get('/contact')
    return res.data
  },
}

export default adminService