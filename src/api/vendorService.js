import api from './axios'

const vendorService = {
  getAll: async (params) => {
    const res = await api.get('/vendors', { params })
    return res.data
  },

  getOne: async (id) => {
    const res = await api.get(`/vendors/${id}`)
    return res.data
  },
}

export default vendorService