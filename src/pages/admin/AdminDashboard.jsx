import { useState, useEffect } from 'react'
import adminService from '../../api/adminService'

const statusColors = {
  pending:   'bg-yellow-500/15 text-yellow-400',
  contacted: 'bg-blue-500/15 text-blue-400',
  confirmed: 'bg-green-500/15 text-green-400',
  cancelled: 'bg-red-500/15 text-red-400',
}

function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminService.getStats()
      .then((data) => setStats(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-brand-muted text-sm">Loading dashboard…</div>
      </div>
    )
  }

  const totalBookings = stats?.bookings?.total || 0
  const totalVendors = stats?.vendors?.total || 0
  const totalContacts = stats?.contacts?.contacts?.length || 0
  const pendingBookings = stats?.bookings?.bookings?.filter((b) => b.status === 'pending').length || 0
  const recentBookings = stats?.bookings?.bookings?.slice(0, 5) || []

  const statCards = [
    { label: 'Total Bookings',   value: totalBookings,   icon: '📋', color: 'text-gold' },
    { label: 'Pending Bookings', value: pendingBookings, icon: '⏳', color: 'text-yellow-400' },
    { label: 'Total Vendors',    value: totalVendors,    icon: '🏪', color: 'text-brand-accent2' },
    { label: 'Contact Messages', value: totalContacts,   icon: '📨', color: 'text-brand-accent' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-brand-text mb-1">Dashboard</h1>
        <p className="text-brand-muted text-sm">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {statCards.map((s) => {
          return (
            <div key={s.label} className="bg-deep-3 border border-gold/15 rounded-brand-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{s.icon}</span>
                <span className="text-brand-dim text-xs uppercase tracking-wide">{s.label}</span>
              </div>
              <div className={`font-display text-3xl font-bold ${s.color}`}>{s.value}</div>
            </div>
          )
        })}
      </div>

      {/* Recent Bookings */}
      <div className="bg-deep-3 border border-gold/15 rounded-brand-xl p-6">
        <h2 className="font-display text-lg font-bold text-brand-text mb-5">Recent Bookings</h2>

        {recentBookings.length === 0 ? (
          <div className="text-center py-8 text-brand-muted text-sm">No bookings yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-brand-dim text-xs uppercase tracking-wide pb-3 pr-4">Name</th>
                  <th className="text-left text-brand-dim text-xs uppercase tracking-wide pb-3 pr-4">Service</th>
                  <th className="text-left text-brand-dim text-xs uppercase tracking-wide pb-3 pr-4">Event</th>
                  <th className="text-left text-brand-dim text-xs uppercase tracking-wide pb-3 pr-4">City</th>
                  <th className="text-left text-brand-dim text-xs uppercase tracking-wide pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((b) => {
                  return (
                    <tr key={b._id} className="border-b border-white/5 hover:bg-white/2 transition-colors duration-150">
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

export default AdminDashboard