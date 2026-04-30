import { useState, useEffect } from 'react'
import vendorAuthService from '../../api/vendorAuthService'

const statusColors = {
  pending:   'bg-yellow-500/15 text-yellow-400',
  contacted: 'bg-blue-500/15 text-blue-400',
  confirmed: 'bg-green-500/15 text-green-400',
  cancelled: 'bg-red-500/15 text-red-400',
}

function VendorDashboard() {
  const [bookings, setBookings] = useState([])
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsRes, profileRes] = await Promise.all([
          vendorAuthService.getMyBookings(),
          vendorAuthService.getMyProfile(),
        ])
        setBookings(bookingsRes.bookings || [])
        setProfile(profileRes.vendor)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-brand-muted text-sm">Loading…</div>
      </div>
    )
  }

  const total = bookings.length
  const pending = bookings.filter((b) => b.status === 'pending').length
  const confirmed = bookings.filter((b) => b.status === 'confirmed').length
  const recent = bookings.slice(0, 5)

  const statCards = [
    { label: 'Total Assigned',  value: total,     icon: '📋', color: 'text-gold' },
    { label: 'Pending',         value: pending,   icon: '⏳', color: 'text-yellow-400' },
    { label: 'Confirmed',       value: confirmed, icon: '✅', color: 'text-green-400' },
    { label: 'Profile Status',  value: profile?.status || '—', icon: '🏪', color: profile?.status === 'approved' ? 'text-green-400' : 'text-yellow-400' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-brand-text mb-1">
          Welcome, {profile?.name}!
        </h1>
        <p className="text-brand-muted text-sm">Here's your vendor overview.</p>
      </div>

      {/* Profile status banner */}
      {profile?.status !== 'approved' && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm px-5 py-3 rounded-brand mb-6 flex items-center gap-2">
          <span>⚠️</span>
          Your profile is <strong>{profile?.status}</strong>. You won't receive bookings until approved by admin.
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {statCards.map((s) => {
          return (
            <div key={s.label} className="bg-deep-3 border border-gold/15 rounded-brand-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{s.icon}</span>
                <span className="text-brand-dim text-xs uppercase tracking-wide">{s.label}</span>
              </div>
              <div className={`font-display text-3xl font-bold capitalize ${s.color}`}>{s.value}</div>
            </div>
          )
        })}
      </div>

      {/* Recent Bookings */}
      <div className="bg-deep-3 border border-gold/15 rounded-brand-xl p-6">
        <h2 className="font-display text-lg font-bold text-brand-text mb-5">Recent Bookings</h2>

        {recent.length === 0 ? (
          <div className="text-center py-8 text-brand-muted text-sm">
            No bookings assigned yet. Check back soon!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-brand-dim text-xs uppercase tracking-wide pb-3 pr-4">Customer</th>
                  <th className="text-left text-brand-dim text-xs uppercase tracking-wide pb-3 pr-4">Service</th>
                  <th className="text-left text-brand-dim text-xs uppercase tracking-wide pb-3 pr-4">Event</th>
                  <th className="text-left text-brand-dim text-xs uppercase tracking-wide pb-3 pr-4">City</th>
                  <th className="text-left text-brand-dim text-xs uppercase tracking-wide pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((b) => {
                  return (
                    <tr key={b._id} className="border-b border-white/5">
                      <td className="py-3 pr-4 text-brand-text text-sm font-medium">{b.name}</td>
                      <td className="py-3 pr-4 text-brand-muted text-sm">{b.service}</td>
                      <td className="py-3 pr-4 text-brand-muted text-sm">{b.eventType}</td>
                      <td className="py-3 pr-4 text-brand-muted text-sm">{b.city}</td>
                      <td className="py-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[b.status]}`}>
                          {b.status}
                        </span>
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

export default VendorDashboard