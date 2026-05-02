import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import authService from '../../api/authService'
import api from '../../api/axios'

const statusColors = {
  pending:   'bg-yellow-500/15 text-yellow-400',
  contacted: 'bg-blue-500/15 text-blue-400',
  confirmed: 'bg-green-500/15 text-green-400',
  cancelled: 'bg-red-500/15 text-red-400',
}

const tabs = ['My Bookings', 'Profile', 'Security']

function CustomerAccount() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('My Bookings')
  const [bookings, setBookings] = useState([])
  const [loadingBookings, setLoadingBookings] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const [profileForm, setProfileForm] = useState({ name: user?.name || '', phone: user?.phone || '' })
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })

  useEffect(() => {
    authService.getMyBookings()
      .then((res) => setBookings(res.bookings || []))
      .catch((err) => console.error(err))
      .finally(() => setLoadingBookings(false))
  }, [])

  useEffect(() => {
    if (user) setProfileForm({ name: user.name || '', phone: user.phone || '' })
  }, [user])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleSaveProfile = async () => {
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      await authService.updateProfile(profileForm)
      setSuccess('Profile updated successfully!')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const handleChangePassword = async () => {
    if (!pwForm.currentPassword || !pwForm.newPassword || !pwForm.confirmPassword) {
      setError('Please fill in all fields')
      return
    }
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      setError('New passwords do not match')
      return
    }
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      await authService.changePassword({
        currentPassword: pwForm.currentPassword,
        newPassword: pwForm.newPassword,
      })
      setSuccess('Password changed successfully!')
      setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password')
    } finally {
      setSaving(false)
    }
  }

  const inputClass = 'w-full bg-deep-3 border border-white/10 text-brand-text px-4 py-3 rounded-brand text-sm outline-none transition-all duration-200 focus:border-gold/50 font-light'
  const labelClass = 'block text-brand-dim text-xs font-semibold tracking-widest uppercase mb-2'

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="bg-deep-3 border border-gold/15 rounded-brand-xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 60% at 80% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)' }} />
          <div className="relative flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gold/15 border border-gold/20 flex items-center justify-center font-display text-2xl font-bold text-gold">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-brand-text">{user?.name}</h1>
                <p className="text-brand-muted text-sm">{user?.email}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="bg-transparent border border-white/15 text-brand-muted text-sm px-5 py-2 rounded-full hover:border-white/30 hover:text-brand-text transition-all duration-200">
              Sign Out
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-deep-3 border border-gold/10 rounded-brand p-1 mb-8 w-fit">
          {tabs.map((tab) => {
            return (
              <button key={tab} onClick={() => { setActiveTab(tab); setSuccess(''); setError('') }} className={`px-5 py-2 rounded-brand text-sm font-medium transition-all duration-200 ${activeTab === tab ? 'bg-gold text-deep' : 'text-brand-muted hover:text-brand-text'}`}>
                {tab}
              </button>
            )
          })}
        </div>

        {success && (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm px-4 py-3 rounded-brand mb-5">
            {success}
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-brand mb-5">
            {error}
          </div>
        )}

        {/* My Bookings Tab */}
        {activeTab === 'My Bookings' && (
          <div>
            {loadingBookings ? (
              <div className="flex items-center justify-center h-32 text-brand-muted text-sm">Loading bookings…</div>
            ) : bookings.length === 0 ? (
              <div className="bg-deep-3 border border-gold/15 rounded-brand-xl p-12 text-center">
                <div className="text-5xl mb-4">📋</div>
                <h3 className="font-display text-xl font-bold text-brand-text mb-2">No bookings yet</h3>
                <p className="text-brand-muted text-sm mb-6">You haven't made any bookings. Start planning your event!</p>
                <Link to="/#services" className="bg-gold text-deep font-semibold px-6 py-3 rounded-full text-sm no-underline hover:bg-gold-light transition-all duration-200 inline-block">
                  Browse Services
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {bookings.map((b) => {
                  return (
                    <div key={b._id} className="bg-deep-3 border border-gold/15 rounded-brand-xl p-6">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="font-display text-lg font-bold text-brand-text">{b.service}</h3>
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusColors[b.status]}`}>
                              {b.status}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div>
                              <div className="text-brand-dim text-xs uppercase tracking-wide mb-0.5">Event</div>
                              <div className="text-brand-text text-sm">{b.eventType}</div>
                            </div>
                            <div>
                              <div className="text-brand-dim text-xs uppercase tracking-wide mb-0.5">City</div>
                              <div className="text-brand-text text-sm">{b.city}</div>
                            </div>
                            {b.eventDate && (
                              <div>
                                <div className="text-brand-dim text-xs uppercase tracking-wide mb-0.5">Date</div>
                                <div className="text-brand-text text-sm">{new Date(b.eventDate).toLocaleDateString('en-IN')}</div>
                              </div>
                            )}
                            <div>
                              <div className="text-brand-dim text-xs uppercase tracking-wide mb-0.5">Booked On</div>
                              <div className="text-brand-text text-sm">{new Date(b.createdAt).toLocaleDateString('en-IN')}</div>
                            </div>
                          </div>

                          {/* Assigned vendor */}
                          {b.assignedVendor && (
                            <div className="mt-4 pt-4 border-t border-white/5">
                              <div className="text-brand-dim text-xs uppercase tracking-wide mb-2">Assigned Vendor</div>
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center text-gold text-xs font-bold">
                                  {b.assignedVendor.name?.charAt(0)}
                                </div>
                                <div>
                                  <div className="text-brand-text text-sm font-medium">{b.assignedVendor.name}</div>
                                  <div className="text-brand-muted text-xs">{b.assignedVendor.city}</div>
                                </div>
                                {b.assignedVendor.phone && (
                                  <a href={`tel:${b.assignedVendor.phone}`} className="ml-auto text-gold text-xs border border-gold/30 px-3 py-1 rounded-full no-underline hover:bg-gold/10 transition-all duration-200">
                                    Call
                                  </a>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Vendor notes */}
                          {b.vendorNotes && (
                            <div className="mt-3 bg-deep-2 rounded-brand px-4 py-3">
                              <div className="text-brand-dim text-xs uppercase tracking-wide mb-1">Vendor Notes</div>
                              <div className="text-brand-muted text-sm">{b.vendorNotes}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'Profile' && (
          <div className="max-w-lg">
            <div className="bg-deep-3 border border-gold/15 rounded-brand-xl p-6">
              <h2 className="font-display text-lg font-bold text-brand-text mb-5">Personal Details</h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input type="text" value={profileForm.name} onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Phone</label>
                  <input type="tel" value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <input type="email" value={user?.email} disabled className={`${inputClass} opacity-50 cursor-not-allowed`} />
                  <p className="text-brand-dim text-xs mt-1">Email cannot be changed</p>
                </div>
                <button onClick={handleSaveProfile} disabled={saving} className="w-full bg-gold text-deep font-semibold py-3 rounded-full text-sm hover:bg-gold-light transition-all duration-200 disabled:opacity-50 mt-2">
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'Security' && (
          <div className="max-w-lg">
            <div className="bg-deep-3 border border-gold/15 rounded-brand-xl p-6">
              <h2 className="font-display text-lg font-bold text-brand-text mb-5">Change Password</h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label className={labelClass}>Current Password</label>
                  <input type="password" placeholder="••••••••" value={pwForm.currentPassword} onChange={(e) => setPwForm({ ...pwForm, currentPassword: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>New Password</label>
                  <input type="password" placeholder="Min 6 characters" value={pwForm.newPassword} onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Confirm New Password</label>
                  <input type="password" placeholder="Repeat new password" value={pwForm.confirmPassword} onChange={(e) => setPwForm({ ...pwForm, confirmPassword: e.target.value })} className={inputClass} />
                </div>
                <button onClick={handleChangePassword} disabled={saving} className="w-full bg-transparent border border-gold/40 text-gold font-semibold py-3 rounded-full text-sm hover:bg-gold hover:text-deep transition-all duration-200 disabled:opacity-50">
                  {saving ? 'Updating…' : 'Update Password'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default CustomerAccount