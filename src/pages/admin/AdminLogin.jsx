import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    setLoading(true)
    setError('')
    try {
      const data = await login(email, password)
      if (data.user.role !== 'admin') {
        setError('Access denied — admin only')
        return
      }
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = 'w-full bg-surface border border-white/10 text-brand-text px-4 py-3 rounded-brand text-sm outline-none transition-all duration-200 focus:border-gold/50 font-light'
  const labelClass = 'block text-brand-dim text-xs font-semibold tracking-widest uppercase mb-2'

  return (
    <div className="min-h-screen bg-deep flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-gold mb-2">
            Event<span className="text-brand-text">Ease</span>
          </h1>
          <p className="text-brand-muted text-sm">Admin Dashboard</p>
        </div>

        <div className="bg-deep-3 border border-gold/15 rounded-brand-xl p-8">
          <h2 className="font-display text-xl font-bold text-brand-text mb-6">Sign In</h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-brand mb-4">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div>
              <label className={labelClass}>Email</label>
              <input type="email" placeholder="admin@eventease.in" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Password</label>
              <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit() }} />
            </div>
            <button onClick={handleSubmit} disabled={loading} className="w-full bg-gold text-deep font-semibold py-3 rounded-full text-sm transition-all duration-200 hover:bg-gold-light disabled:opacity-50 mt-2">
              {loading ? 'Signing in…' : 'Sign In →'}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AdminLogin