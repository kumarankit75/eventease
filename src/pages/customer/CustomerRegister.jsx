import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function CustomerRegister() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone || !form.password || !form.confirmPassword) {
      setError('Please fill in all fields')
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }),
      })
      const data = await res.json()
      if (!data.success) {
        setError(data.message)
        return
      }
      localStorage.setItem('token', data.token)
      navigate('/account')
    } catch (err) {
      setError('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = 'w-full bg-deep-3 border border-white/10 text-brand-text px-4 py-3 rounded-brand text-sm outline-none transition-all duration-200 focus:border-gold/50 font-light'
  const labelClass = 'block text-brand-dim text-xs font-semibold tracking-widest uppercase mb-2'

  return (
    <div className="min-h-screen bg-deep flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <Link to="/" className="font-display text-3xl font-bold text-gold no-underline">
            Event<span className="text-brand-text">Ease</span>
          </Link>
          <p className="text-brand-muted text-sm mt-2">Create your account</p>
        </div>

        <div className="bg-deep-2 border border-gold/15 rounded-brand-xl p-8">
          <h2 className="font-display text-xl font-bold text-brand-text mb-6">Sign Up</h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-brand mb-4">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div>
              <label className={labelClass}>Full Name</label>
              <input name="name" type="text" placeholder="Your full name" value={form.name} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input name="email" type="email" placeholder="you@email.com" value={form.email} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input name="phone" type="tel" placeholder="+91 00000 00000" value={form.phone} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Password</label>
              <input name="password" type="password" placeholder="Min 6 characters" value={form.password} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Confirm Password</label>
              <input name="confirmPassword" type="password" placeholder="Repeat password" value={form.confirmPassword} onChange={handleChange} className={inputClass} onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit() }} />
            </div>

            <button onClick={handleSubmit} disabled={loading} className="w-full bg-gold text-deep font-semibold py-3 rounded-full text-sm transition-all duration-200 hover:bg-gold-light disabled:opacity-50 mt-2">
              {loading ? 'Creating account…' : 'Create Account →'}
            </button>

            <p className="text-center text-brand-dim text-xs">
              Already have an account?{' '}
              <Link to="/login" className="text-gold no-underline hover:text-gold-light">Sign in</Link>
            </p>

            <div className="border-t border-white/5 pt-4 text-center">
              <p className="text-brand-dim text-xs">
                Are you a vendor?{' '}
                <Link to="/vendor/register" className="text-gold no-underline hover:text-gold-light">Register here</Link>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CustomerRegister