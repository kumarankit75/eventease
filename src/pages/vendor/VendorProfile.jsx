import { useState, useEffect } from 'react'
import vendorAuthService from '../../api/vendorAuthService'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/axios'

const serviceOptions = [
  { value: 'decoration',       label: 'Decoration' },
  { value: 'dj-entertainment', label: 'DJ & Entertainment' },
  { value: 'catering',         label: 'Catering' },
  { value: 'photography',      label: 'Photography & Video' },
  { value: 'makeup-styling',   label: 'Makeup & Styling' },
  { value: 'venue',            label: 'Venue Booking' },
]

const statusColors = {
  pending:  'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  approved: 'bg-green-500/15 text-green-400 border-green-500/30',
  rejected: 'bg-red-500/15 text-red-400 border-red-500/30',
}

function VendorProfile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '', service: '', city: '',
    description: '', price: '', priceUnit: 'per event',
    phone: '', email: '',
  })

  const [pwForm, setPwForm] = useState({
    currentPassword: '', newPassword: '', confirmPassword: '',
  })

  useEffect(() => {
    vendorAuthService.getMyProfile()
      .then((res) => {
        const v = res.vendor
        setProfile(v)
        setForm({
          name: v.name || '',
          service: v.service || '',
          city: v.city || '',
          description: v.description || '',
          price: v.price || '',
          priceUnit: v.priceUnit || 'per event',
          phone: v.phone || '',
          email: v.email || '',
        })
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSaveProfile = async () => {
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const res = await vendorAuthService.updateMyProfile({ ...form, price: Number(form.price) })
      setProfile(res.vendor)
      setSuccess('Profile updated successfully!')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const handleChangePassword = async () => {
    if (!pwForm.currentPassword || !pwForm.newPassword || !pwForm.confirmPassword) {
      setError('Please fill in all password fields')
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
      await api.put('/auth/change-password', {
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

  const inputClass = 'w-full bg-surface border border-white/10 text-brand-text px-4 py-3 rounded-brand text-sm outline-none transition-all duration-200 focus:border-gold/50 font-light'
  const labelClass = 'block text-brand-dim text-xs font-semibold tracking-widest uppercase mb-2'

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-brand-muted text-sm">Loading…</div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-brand-text mb-1">My Profile</h1>
        <p className="text-brand-muted text-sm">Manage your vendor listing and account settings.</p>
      </div>

      {/* Status banner */}
      {profile && (
        <div className={`border rounded-brand px-5 py-3 text-sm flex items-center gap-2 mb-6 ${statusColors[profile.status]}`}>
          <span>{profile.status === 'approved' ? '✅' : profile.status === 'pending' ? '⏳' : '❌'}</span>
          Profile status: <strong className="capitalize">{profile.status}</strong>
          {profile.status === 'pending' && ' — under review by admin'}
          {profile.status === 'approved' && ' — your listing is live!'}
          {profile.status === 'rejected' && ' — contact support for more info'}
        </div>
      )}

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Business Profile */}
        <div className="bg-deep-3 border border-gold/15 rounded-brand-xl p-6">
          <h2 className="font-display text-lg font-bold text-brand-text mb-5">Business Details</h2>

          <div className="flex flex-col gap-4">
            <div>
              <label className={labelClass}>Business Name</label>
              <input name="name" value={form.name} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Service Type</label>
              <select name="service" value={form.service} onChange={handleChange} className={inputClass} style={{ background: '#232332' }}>
                {serviceOptions.map((s) => {
                  return <option key={s.value} value={s.value}>{s.label}</option>
                })}
              </select>
            </div>
            <div>
              <label className={labelClass}>City</label>
              <input name="city" value={form.city} onChange={handleChange} className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Starting Price (₹)</label>
                <input name="price" type="number" value={form.price} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Price Unit</label>
                <select name="priceUnit" value={form.priceUnit} onChange={handleChange} className={inputClass} style={{ background: '#232332' }}>
                  <option value="per event">per event</option>
                  <option value="per day">per day</option>
                  <option value="per plate">per plate</option>
                  <option value="per session">per session</option>
                </select>
              </div>
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input name="email" value={form.email} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Description</label>
              <textarea name="description" rows={4} value={form.description} onChange={handleChange} className={`${inputClass} resize-none`} />
            </div>
            <button onClick={handleSaveProfile} disabled={saving} className="w-full bg-gold text-deep font-semibold py-3 rounded-full text-sm hover:bg-gold-light transition-all duration-200 disabled:opacity-50">
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Account Settings */}
        <div className="flex flex-col gap-6">

          {/* Account Info */}
          <div className="bg-deep-3 border border-gold/15 rounded-brand-xl p-6">
            <h2 className="font-display text-lg font-bold text-brand-text mb-5">Account Info</h2>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-brand-dim text-xs uppercase tracking-wide">Name</span>
                <span className="text-brand-text text-sm">{user?.name}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-brand-dim text-xs uppercase tracking-wide">Email</span>
                <span className="text-brand-text text-sm">{user?.email}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-brand-dim text-xs uppercase tracking-wide">Role</span>
                <span className="text-gold text-sm font-semibold capitalize">{user?.role}</span>
              </div>
            </div>
          </div>

          {/* Change Password */}
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
      </div>
    </div>
  )
}

export default VendorProfile