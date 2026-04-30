import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function VendorLogin() {
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
      if (data.user.role !== 'vendor') {
        setError('This account is not a vendor account')
        return
      }
      if (data.vendor?.status === 'pending') {
        navigate('/vendor/pending')
        return
      }
      if (data.vendor?.status === 'rejected') {
        navigate('/vendor/rejected')
        return
      }
      navigate('/vendor/dashboard')
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
          <Link to="/" className="font-display text-3xl font-bold text-gold no-underline">
            Event<span className="text-brand-text">Ease</span>
          </Link>
          <p className="text-brand-muted text-sm mt-2">Vendor Portal</p>
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
              <input type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Password</label>
              <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit() }} className={inputClass} />
            </div>
            <button onClick={handleSubmit} disabled={loading} className="w-full bg-gold text-deep font-semibold py-3 rounded-full text-sm transition-all duration-200 hover:bg-gold-light disabled:opacity-50 mt-2">
              {loading ? 'Signing in…' : 'Sign In →'}
            </button>

            <p className="text-center text-brand-dim text-xs">
              Not registered yet?{' '}
              <Link to="/vendor/register" className="text-gold no-underline hover:text-gold-light">Join as a Vendor</Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default VendorLogin