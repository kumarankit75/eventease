import { useState, useEffect } from 'react'
import adminService from '../../api/adminService'
import api from '../../api/axios'

const serviceOptions = ['decoration', 'dj-entertainment', 'catering', 'photography', 'makeup-styling', 'venue']

const statusColors = {
  pending:  'bg-yellow-500/15 text-yellow-400',
  approved: 'bg-green-500/15 text-green-400',
  rejected: 'bg-red-500/15 text-red-400',
}

const emptyForm = {
  name: '', service: '', city: '', description: '',
  price: '', priceUnit: 'per event', phone: '', email: '',
}

function AdminVendors() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [filter, setFilter] = useState('')

  const fetchVendors = async () => {
    setLoading(true)
    try {
      const params = { limit: 100 }
      if (filter) params.status = filter
      const res = await api.get('/vendors/admin-all', { params })
      setVendors(res.data.vendors || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVendors()
  }, [filter])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setSaving(true)
    try {
      if (editId) {
        await adminService.updateVendor(editId, form)
      } else {
        await adminService.createVendor(form)
      }
      setShowForm(false)
      setForm(emptyForm)
      setEditId(null)
      fetchVendors()
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (vendor) => {
    setForm({
      name: vendor.name,
      service: vendor.service,
      city: vendor.city,
      description: vendor.description,
      price: vendor.price,
      priceUnit: vendor.priceUnit,
      phone: vendor.phone || '',
      email: vendor.email || '',
    })
    setEditId(vendor._id)
    setShowForm(true)
  }

  const handleApprove = async (id, status) => {
    try {
      await api.put(`/vendors/${id}/approve`, { status })
      setVendors((prev) => prev.map((v) => v._id === id ? { ...v, status } : v))
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this vendor?')) return
    try {
      await adminService.deleteVendor(id)
      setVendors((prev) => prev.filter((v) => v._id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const inputClass = 'w-full bg-surface border border-white/10 text-brand-text px-4 py-2.5 rounded-brand text-sm outline-none focus:border-gold/50 font-light'
  const labelClass = 'block text-brand-dim text-xs font-semibold tracking-widest uppercase mb-1.5'

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-brand-text mb-1">Vendors</h1>
          <p className="text-brand-muted text-sm">{vendors.length} vendors</p>
        </div>
        <div className="flex gap-3">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="bg-deep-3 border border-white/10 text-brand-text px-4 py-2 rounded-brand text-sm outline-none" style={{ background: '#1E1E2A' }}>
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <button onClick={() => { setShowForm(true); setEditId(null); setForm(emptyForm) }} className="bg-gold text-deep font-semibold px-5 py-2 rounded-full text-sm hover:bg-gold-light transition-all duration-200">
            + Add Vendor
          </button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-deep-3 border border-gold/20 rounded-brand-xl p-6 mb-8">
          <h2 className="font-display text-lg font-bold text-brand-text mb-5">{editId ? 'Edit Vendor' : 'Add New Vendor'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div><label className={labelClass}>Vendor Name</label><input name="name" value={form.name} onChange={handleChange} placeholder="Vendor name" className={inputClass} /></div>
            <div>
              <label className={labelClass}>Service</label>
              <select name="service" value={form.service} onChange={handleChange} className={inputClass} style={{ background: '#232332' }}>
                <option value="">Select service</option>
                {serviceOptions.map((s) => { return <option key={s} value={s}>{s}</option> })}
              </select>
            </div>
            <div><label className={labelClass}>City</label><input name="city" value={form.city} onChange={handleChange} placeholder="City" className={inputClass} /></div>
            <div><label className={labelClass}>Starting Price (₹)</label><input name="price" type="number" value={form.price} onChange={handleChange} placeholder="5000" className={inputClass} /></div>
            <div><label className={labelClass}>Phone</label><input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 00000 00000" className={inputClass} /></div>
            <div><label className={labelClass}>Email</label><input name="email" value={form.email} onChange={handleChange} placeholder="vendor@email.com" className={inputClass} /></div>
          </div>
          <div className="mb-4"><label className={labelClass}>Description</label><textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Vendor description…" className={`${inputClass} resize-none`} /></div>
          <div className="flex gap-3">
            <button onClick={() => { setShowForm(false); setEditId(null); setForm(emptyForm) }} className="bg-transparent border border-white/15 text-brand-muted px-5 py-2 rounded-full text-sm hover:border-white/30 transition-all duration-200">Cancel</button>
            <button onClick={handleSubmit} disabled={saving} className="bg-gold text-deep font-semibold px-6 py-2 rounded-full text-sm hover:bg-gold-light transition-all duration-200 disabled:opacity-50">{saving ? 'Saving…' : editId ? 'Update' : 'Add Vendor'}</button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-deep-3 border border-gold/15 rounded-brand-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-32 text-brand-muted text-sm">Loading…</div>
        ) : vendors.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-brand-muted text-sm">No vendors found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/5 bg-deep-2">
                <tr>
                  <th className="text-left text-brand-dim text-xs uppercase tracking-wide px-6 py-4">Name</th>
                  <th className="text-left text-brand-dim text-xs uppercase tracking-wide px-4 py-4">Service</th>
                  <th className="text-left text-brand-dim text-xs uppercase tracking-wide px-4 py-4">City</th>
                  <th className="text-left text-brand-dim text-xs uppercase tracking-wide px-4 py-4">Price</th>
                  <th className="text-left text-brand-dim text-xs uppercase tracking-wide px-4 py-4">Status</th>
                  <th className="text-left text-brand-dim text-xs uppercase tracking-wide px-4 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((v) => {
                  return (
                    <tr key={v._id} className="border-b border-white/5 hover:bg-white/2 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <div className="text-brand-text text-sm font-medium">{v.name}</div>
                        <div className="text-brand-dim text-xs">{v.user?.email}</div>
                      </td>
                      <td className="px-4 py-4 text-brand-muted text-sm">{v.service}</td>
                      <td className="px-4 py-4 text-brand-muted text-sm">{v.city}</td>
                      <td className="px-4 py-4 text-gold text-sm font-semibold">₹{v.price?.toLocaleString()}</td>
                      <td className="px-4 py-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusColors[v.status]}`}>
                          {v.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          {v.status === 'pending' && (
                            <>
                              <button onClick={() => handleApprove(v._id, 'approved')} className="text-green-400 text-xs hover:text-green-300 transition-colors duration-200">Approve</button>
                              <button onClick={() => handleApprove(v._id, 'rejected')} className="text-red-400 text-xs hover:text-red-300 transition-colors duration-200">Reject</button>
                            </>
                          )}
                          {v.status === 'approved' && (
                            <button onClick={() => handleApprove(v._id, 'rejected')} className="text-red-400 text-xs hover:text-red-300 transition-colors duration-200">Reject</button>
                          )}
                          {v.status === 'rejected' && (
                            <button onClick={() => handleApprove(v._id, 'approved')} className="text-green-400 text-xs hover:text-green-300 transition-colors duration-200">Approve</button>
                          )}
                          <button onClick={() => handleEdit(v)} className="text-gold text-xs hover:text-gold-light transition-colors duration-200">Edit</button>
                          <button onClick={() => handleDelete(v._id)} className="text-red-400 text-xs hover:text-red-300 transition-colors duration-200">Delete</button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminVendors