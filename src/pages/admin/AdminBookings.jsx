import { useState, useEffect } from 'react'
import adminService from '../../api/adminService'
import api from '../../api/axios'

const statusColors = {
  pending:   'bg-yellow-500/15 text-yellow-400',
  contacted: 'bg-blue-500/15 text-blue-400',
  confirmed: 'bg-green-500/15 text-green-400',
  cancelled: 'bg-red-500/15 text-red-400',
}

const statuses = ['pending', 'contacted', 'confirmed', 'cancelled']

function AdminBookings() {
  const [bookings, setBookings] = useState([])
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [updating, setUpdating] = useState(null)
  const [selected, setSelected] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      const params = { limit: 100 }
      if (filter) params.status = filter
      const [bookingsRes, vendorsRes] = await Promise.all([
        adminService.getAllBookings(params),
        api.get('/vendors/admin-all?status=approved&limit=100'),
      ])
      setBookings(bookingsRes.bookings || [])
      setVendors(vendorsRes.data.vendors || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [filter])

  const handleStatusChange = async (id, status) => {
    setUpdating(id)
    try {
      await adminService.updateBooking(id, { status })
      setBookings((prev) => prev.map((b) => b._id === id ? { ...b, status } : b))
    } catch (err) {
      console.error(err)
    } finally {
      setUpdating(null)
    }
  }

  const handleAssignVendor = async (bookingId, vendorId) => {
    try {
      const res = await api.put(`/bookings/${bookingId}/assign`, { vendorId })
      const updated = res.data.booking
      setBookings((prev) => prev.map((b) => b._id === updated._id ? updated : b))
      if (selected?._id === updated._id) setSelected(updated)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this booking?')) return
    try {
      await adminService.deleteBooking(id)
      setBookings((prev) => prev.filter((b) => b._id !== id))
      if (selected?._id === id) setSelected(null)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-brand-text mb-1">Bookings</h1>
          <p className="text-brand-muted text-sm">{bookings.length} bookings</p>
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="bg-deep-3 border border-white/10 text-brand-text px-4 py-2 rounded-brand text-sm outline-none" style={{ background: '#1E1E2A' }}>
          <option value="">All Statuses</option>
          {statuses.map((s) => { return <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option> })}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Bookings list */}
        <div className="bg-deep-3 border border-gold/15 rounded-brand-xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-32 text-brand-muted text-sm">Loading…</div>
          ) : bookings.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-brand-muted text-sm">No bookings found</div>
          ) : (
            <div className="divide-y divide-white/5 max-h-screen overflow-y-auto">
              {bookings.map((b) => {
                return (
                  <div key={b._id} onClick={() => setSelected(b)} className={`px-5 py-4 cursor-pointer transition-all duration-150 hover:bg-white/3 ${selected?._id === b._id ? 'bg-gold/5 border-l-2 border-gold' : ''}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-brand-text text-sm font-semibold">{b.name}</div>
                        <div className="text-brand-muted text-xs mt-0.5">{b.service} · {b.city}</div>
                        <div className="text-brand-dim text-xs mt-1">{b.assignedVendor ? `Vendor: ${b.assignedVendor.name}` : 'No vendor assigned'}</div>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${statusColors[b.status]}`}>
                        {b.status}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Booking detail */}
        <div className="bg-deep-3 border border-gold/15 rounded-brand-xl p-6">
          {selected ? (
            <div>
              <h2 className="font-display text-lg font-bold text-brand-text mb-5">Booking Details</h2>

              <div className="flex flex-col gap-2.5 mb-5 pb-5 border-b border-white/5">
                <div className="flex justify-between"><span className="text-brand-dim text-xs uppercase tracking-wide">Name</span><span className="text-brand-text text-sm">{selected.name}</span></div>
                <div className="flex justify-between"><span className="text-brand-dim text-xs uppercase tracking-wide">Phone</span><span className="text-brand-text text-sm">{selected.phone}</span></div>
                <div className="flex justify-between"><span className="text-brand-dim text-xs uppercase tracking-wide">Service</span><span className="text-brand-text text-sm">{selected.service}</span></div>
                <div className="flex justify-between"><span className="text-brand-dim text-xs uppercase tracking-wide">Event</span><span className="text-brand-text text-sm">{selected.eventType}</span></div>
                <div className="flex justify-between"><span className="text-brand-dim text-xs uppercase tracking-wide">City</span><span className="text-brand-text text-sm">{selected.city}</span></div>
                {selected.eventDate && <div className="flex justify-between"><span className="text-brand-dim text-xs uppercase tracking-wide">Date</span><span className="text-brand-text text-sm">{new Date(selected.eventDate).toLocaleDateString('en-IN')}</span></div>}
                {selected.details && <div className="pt-2"><span className="text-brand-dim text-xs uppercase tracking-wide block mb-1">Details</span><span className="text-brand-muted text-sm">{selected.details}</span></div>}
              </div>

              {/* Update status */}
              <div className="mb-4">
                <label className="block text-brand-dim text-xs uppercase tracking-wide mb-2">Update Status</label>
                <select value={selected.status} onChange={(e) => handleStatusChange(selected._id, e.target.value)} disabled={updating === selected._id} className={`text-xs font-semibold px-3 py-2 rounded-full border-none outline-none cursor-pointer ${statusColors[selected.status]}`} style={{ background: 'transparent' }}>
                  {statuses.map((s) => { return <option key={s} value={s} style={{ background: '#1E1E2A', color: '#F0EDE6' }}>{s}</option> })}
                </select>
              </div>

              {/* Assign vendor */}
              <div className="mb-5">
                <label className="block text-brand-dim text-xs uppercase tracking-wide mb-2">Assign Vendor</label>
                <select onChange={(e) => handleAssignVendor(selected._id, e.target.value)} value={selected.assignedVendor?._id || ''} className="w-full bg-surface border border-white/10 text-brand-text px-4 py-2.5 rounded-brand text-sm outline-none focus:border-gold/50" style={{ background: '#232332' }}>
                  <option value="">No vendor assigned</option>
                  {vendors.filter((v) => v.service === selected.service.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')).map((v) => {
                    return <option key={v._id} value={v._id}>{v.name} — {v.city}</option>
                  })}
                  {vendors.filter((v) => v.service !== selected.service.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')).map((v) => {
                    return <option key={v._id} value={v._id}>{v.name} ({v.service}) — {v.city}</option>
                  })}
                </select>
              </div>

              {/* Vendor notes */}
              {selected.vendorNotes && (
                <div className="mb-5 bg-deep-2 rounded-brand p-3">
                  <div className="text-brand-dim text-xs uppercase tracking-wide mb-1">Vendor Notes</div>
                  <div className="text-brand-muted text-sm">{selected.vendorNotes}</div>
                </div>
              )}

              <button onClick={() => handleDelete(selected._id)} className="text-red-400 text-xs hover:text-red-300 transition-colors duration-200">
                Delete Booking
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full min-h-32 text-brand-dim text-sm">
              Select a booking to view details
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default AdminBookings