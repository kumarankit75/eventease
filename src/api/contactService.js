import api from './axios'

const contactService = {
  submit: async (data) => {
    const res = await api.post('/contact', data)
    return res.data
  },
}

export default contactService