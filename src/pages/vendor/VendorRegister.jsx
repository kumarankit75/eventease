import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/axios'

const serviceOptions = [
  { value: 'decoration',      label: 'Decoration' },
  { value: 'dj-entertainment',label: 'DJ & Entertainment' },
  { value: 'catering',        label: 'Catering' },
  { value: 'photography',     label: 'Photography & Video' },
  { value: 'makeup-styling',  label: 'Makeup & Styling' },
  { value: 'venue',           label: 'Venue Booking' },
]

function VendorRegister() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    service: '',
    city: '',
    description: '',
    price: '',
    priceUnit: 'per event',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleNext = () => {
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
    setError('')
    setStep(2)
  }

  const handleSubmit = async () => {
    if (!form.service || !form.city || !form.description || !form.price) {
      setError('Please fill in all fields')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await api.post('/auth/vendor-register', {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        service: form.service,
        city: form.city,
        description: form.description,
        price: Number(form.price),
        priceUnit: form.priceUnit,
      })
      if (res.data.token) localStorage.setItem('token', res.data.token)
      navigate('/vendor/pending')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = 'w-full bg-surface border border-white/10 text-brand-text px-4 py-3 rounded-brand text-sm outline-none transition-all duration-200 focus:border-gold/50 font-light'
  const labelClass = 'block text-brand-dim text-xs font-semibold tracking-widest uppercase mb-2'

  return (
    <div className="min-h-screen bg-deep flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="font-display text-3xl font-bold text-gold no-underline">
            Event<span className="text-brand-text">Ease</span>
          </Link>
          <p className="text-brand-muted text-sm mt-2">Join as a Vendor</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-8">
          <div className={`flex items-center gap-2 flex-1 ${step >= 1 ? 'text-gold' : 'text-brand-dim'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border ${step >= 1 ? 'bg-gold text-deep border-gold' : 'border-white/10 text-brand-dim'}`}>1</div>
            <span className="text-xs font-medium">Account</span>
          </div>
          <div className={`flex-1 h-px ${step >= 2 ? 'bg-gold' : 'bg-white/10'}`} />
          <div className={`flex items-center gap-2 flex-1 justify-end ${step >= 2 ? 'text-gold' : 'text-brand-dim'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border ${step >= 2 ? 'bg-gold text-deep border-gold' : 'border-white/10 text-brand-dim'}`}>2</div>
            <span className="text-xs font-medium">Business</span>
          </div>
        </div>

        <div className="bg-deep-3 border border-gold/15 rounded-brand-xl p-8">

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-brand mb-5">
              {error}
            </div>
          )}

          {step === 1 && (
            <div className="flex flex-col gap-4">
              <h2 className="font-display text-xl font-bold text-brand-text mb-2">Create your account</h2>

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
                <input name="confirmPassword" type="password" placeholder="Repeat password" value={form.confirmPassword} onChange={handleChange} className={inputClass} />
              </div>

              <button onClick={handleNext} className="w-full bg-gold text-deep font-semibold py-3 rounded-full text-sm transition-all duration-200 hover:bg-gold-light mt-2">
                Continue →
              </button>

              <p className="text-center text-brand-dim text-xs">
                Already registered?{' '}
                <Link to="/vendor/login" className="text-gold no-underline hover:text-gold-light">Sign in</Link>
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-4">
              <h2 className="font-display text-xl font-bold text-brand-text mb-2">Your business details</h2>

              <div>
                <label className={labelClass}>Service Type</label>
                <select name="service" value={form.service} onChange={handleChange} className={inputClass} style={{ background: '#232332' }}>
                  <option value="">Select your service</option>
                  {serviceOptions.map((s) => {
                    return <option key={s.value} value={s.value}>{s.label}</option>
                  })}
                </select>
              </div>

              <div>
                <label className={labelClass}>City</label>
                <input name="city" type="text" placeholder="e.g. Kolkata, Mumbai…" value={form.city} onChange={handleChange} className={inputClass} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Starting Price (₹)</label>
                  <input name="price" type="number" placeholder="5000" value={form.price} onChange={handleChange} className={inputClass} />
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
                <label className={labelClass}>Business Description</label>
                <textarea name="description" rows={4} placeholder="Tell us about your services, experience, and what makes you special…" value={form.description} onChange={handleChange} className={`${inputClass} resize-none`} />
              </div>

              <div className="flex gap-3 mt-2">
                <button onClick={() => setStep(1)} className="bg-transparent border border-white/15 text-brand-muted px-5 py-3 rounded-full text-sm hover:border-white/30 transition-all duration-200">
                  ← Back
                </button>
                <button onClick={handleSubmit} disabled={loading} className="flex-1 bg-gold text-deep font-semibold py-3 rounded-full text-sm transition-all duration-200 hover:bg-gold-light disabled:opacity-50">
                  {loading ? 'Submitting…' : 'Submit Application →'}
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default VendorRegister