import { useState, useEffect } from 'react'
import vendorAuthService from '../../api/vendorAuthService'

const statusColors = {
  pending:   'bg-yellow-500/15 text-yellow-400',
  contacted: 'bg-blue-500/15 text-blue-400',
  confirmed: 'bg-green-500/15 text-green-400',
  cancelled: 'bg-red-500/15 text-red-400',
}

const vendorStatuses = ['contacted', 'confirmed', 'cancelled']

function VendorBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [notes, setNotes] = useState('')
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    vendorAuthService.getMyBookings()
      .then((res) => setBookings(res.bookings || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const handleSelect = (b) => {
    setSelected(b)
    setNotes(b.vendorNotes || '')
  }

  const handleUpdate = async (status) => {
    if (!selected) return
    setUpdating(true)
    try {
      const res = await vendorAuthService.updateBooking(selected._id, { status, vendorNotes: notes })
      const updated = res.booking
      setBookings((prev) => prev.map((b) => b._id === updated._id ? updated : b))
      setSelected(updated)
    } catch (err) {
      console.error(err)
    } finally {
      setUpdating(false)
    }
  }

  const handleSaveNotes = async () => {
    if (!selected) return
    setUpdating(true)
    try {
      const res = await vendorAuthService.updateBooking(selected._id, { vendorNotes: notes })
      const updated = res.booking
      setBookings((prev) => prev.map((b) => b._id === updated._id ? updated : b))
      setSelected(updated)
    } catch (err) {
      console.error(err)
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-brand-text mb-1">My Bookings</h1>
        <p className="text-brand-muted text-sm">{bookings.length} bookings assigned to you</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Bookings List */}
        <div className="bg-deep-3 border border-gold/15 rounded-brand-xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-32 text-brand-muted text-sm">Loading…</div>
          ) : bookings.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-brand-muted text-sm">No bookings assigned yet</div>
          ) : (
            <div className="divide-y divide-white/5">
              {bookings.map((b) => {
                return (
                  <div key={b._id} onClick={() => handleSelect(b)} className={`px-6 py-4 cursor-pointer transition-all duration-150 hover:bg-white/3 ${selected?._id === b._id ? 'bg-gold/5 border-l-2 border-gold' : ''}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-brand-text text-sm font-semibold">{b.name}</div>
                        <div className="text-brand-muted text-xs mt-0.5">{b.service} · {b.city}</div>
                        <div className="text-brand-dim text-xs mt-1">{b.eventType}</div>
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

        {/* Booking Detail */}
        <div className="bg-deep-3 border border-gold/15 rounded-brand-xl p-6">
          {selected ? (
            <div>
              <h2 className="font-display text-lg font-bold text-brand-text mb-5">Booking Details</h2>

              <div className="flex flex-col gap-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-brand-dim text-xs uppercase tracking-wide">Customer</span>
                  <span className="text-brand-text text-sm font-medium">{selected.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-dim text-xs uppercase tracking-wide">Phone</span>
                  <span className="text-brand-text text-sm">{selected.phone}</span>
                </div>
                {selected.email && (
                  <div className="flex justify-between">
                    <span className="text-brand-dim text-xs uppercase tracking-wide">Email</span>
                    <span className="text-brand-text text-sm">{selected.email}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-brand-dim text-xs uppercase tracking-wide">Service</span>
                  <span className="text-brand-text text-sm">{selected.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-dim text-xs uppercase tracking-wide">Event Type</span>
                  <span className="text-brand-text text-sm">{selected.eventType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-dim text-xs uppercase tracking-wide">City</span>
                  <span className="text-brand-text text-sm">{selected.city}</span>
                </div>
                {selected.eventDate && (
                  <div className="flex justify-between">
                    <span className="text-brand-dim text-xs uppercase tracking-wide">Date</span>
                    <span className="text-brand-text text-sm">{new Date(selected.eventDate).toLocaleDateString('en-IN')}</span>
                  </div>
                )}
                {selected.details && (
                  <div className="pt-2 border-t border-white/5">
                    <span className="text-brand-dim text-xs uppercase tracking-wide block mb-1">Details</span>
                    <span className="text-brand-muted text-sm">{selected.details}</span>
                  </div>
                )}
              </div>

              {/* Update Status */}
              <div className="mb-4">
                <label className="block text-brand-dim text-xs font-semibold tracking-widest uppercase mb-2">Update Status</label>
                <div className="flex gap-2 flex-wrap">
                  {vendorStatuses.map((s) => {
                    return (
                      <button key={s} onClick={() => handleUpdate(s)} disabled={updating || selected.status === s} className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 capitalize ${selected.status === s ? `${statusColors[s]} cursor-default` : 'bg-white/5 text-brand-muted hover:bg-white/10 border border-white/10'}`}>
                        {s}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Vendor Notes */}
              <div>
                <label className="block text-brand-dim text-xs font-semibold tracking-widest uppercase mb-2">Your Notes</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Add notes about this booking…" className="w-full bg-surface border border-white/10 text-brand-text px-4 py-3 rounded-brand text-sm outline-none focus:border-gold/50 font-light resize-none" />
                <button onClick={handleSaveNotes} disabled={updating} className="mt-2 bg-gold text-deep font-semibold px-5 py-2 rounded-full text-xs hover:bg-gold-light transition-all duration-200 disabled:opacity-50">
                  {updating ? 'Saving…' : 'Save Notes'}
                </button>
              </div>
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

export default VendorBookings