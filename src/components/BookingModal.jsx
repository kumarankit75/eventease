import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import bookingService from '../api/bookingService'
import { useAuth } from '../context/AuthContext'

const services = ['Decoration', 'DJ & Entertainment', 'Catering', 'Photography & Video', 'Makeup & Styling', 'Venue Booking', 'Full Event Package']
const eventTypes = ['Wedding', 'Birthday', 'Corporate', 'Graduation', 'Engagement', 'Baby Shower', 'Festival / Pooja', 'Other']

function BookingModal({ show, onClose, onSubmit, preselectedService }) {
  const { user } = useAuth()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState('')
  const [eventType, setEventType] = useState('')
  const [date, setDate] = useState('')
  const [city, setCity] = useState('')
  const [details, setDetails] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (preselectedService) setService(preselectedService)
  }, [preselectedService])

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      // reset after close
      setTimeout(() => setSubmitted(false), 300)
    }
    return () => { document.body.style.overflow = '' }
  }, [show])

  const resetForm = () => {
    setName('')
    setPhone('')
    setService('')
    setEventType('')
    setDate('')
    setCity('')
    setDetails('')
    setError('')
  }

  const handleSubmit = async () => {
    if (!name || !phone || !service || !eventType || !city) {
      setError('Please fill in all required fields')
      return
    }
    setLoading(true)
    setError('')
    try {
      await bookingService.create({
        name,
        phone,
        service,
        eventType,
        eventDate: date || undefined,
        city,
        details,
      })
      setSubmitted(true)
      onSubmit(name)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    resetForm()
    setSubmitted(false)
    onClose()
  }

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) handleClose()
  }

  const inputClass = 'w-full bg-surface border border-white/10 text-brand-text px-4 py-3 rounded-brand text-sm outline-none transition-all duration-200 focus:border-gold/50 appearance-none font-light'
  const labelClass = 'block text-brand-dim text-xs font-semibold tracking-widest uppercase mb-2'
  const overlayBase = 'fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/75 backdrop-blur-sm transition-all duration-300'
  const overlayVisible = show ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
  const modalBase = 'bg-deep-3 border border-gold/15 rounded-brand-xl w-full max-w-lg transition-all duration-300 max-h-[90vh] overflow-y-auto'
  const modalVisible = show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'

  return (
    <div className={`${overlayBase} ${overlayVisible}`} onClick={handleBackdrop}>
      <div className={`${modalBase} ${modalVisible}`}>

        {/* Success state */}
        {submitted ? (
          <div className="p-10 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="font-display text-2xl font-bold text-brand-text mb-2">Enquiry Submitted!</h3>
            <p className="text-brand-muted text-sm font-light mb-6 leading-relaxed">
              We've received your booking request for <strong className="text-brand-text">{service}</strong>.
              Our team will contact you at <strong className="text-brand-text">{phone}</strong> shortly.
            </p>

            {/* Prompt to login if not logged in */}
            {!user && (
              <div className="bg-gold/10 border border-gold/20 rounded-brand-lg p-5 mb-6 text-left">
                <div className="text-gold text-sm font-semibold mb-1">📋 Track your booking</div>
                <p className="text-brand-muted text-xs font-light leading-relaxed mb-3">
                  Create a free account to track your booking status, see assigned vendors, and manage all your events in one place.
                </p>
                <div className="flex gap-2">
                  <Link to="/register" onClick={handleClose} className="bg-gold text-deep font-semibold px-4 py-2 rounded-full text-xs no-underline hover:bg-gold-light transition-all duration-200">
                    Create Account
                  </Link>
                  <Link to="/login" onClick={handleClose} className="bg-transparent text-gold border border-gold/40 font-medium px-4 py-2 rounded-full text-xs no-underline hover:bg-gold/10 transition-all duration-200">
                    Sign In
                  </Link>
                </div>
              </div>
            )}

            {/* Already logged in */}
            {user && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-brand-lg p-4 mb-6 text-left">
                <div className="text-green-400 text-sm font-semibold mb-1">✅ Booking saved to your account</div>
                <p className="text-brand-muted text-xs font-light">
                  You can track this booking in{' '}
                  <Link to="/account" onClick={handleClose} className="text-gold no-underline hover:text-gold-light">
                    My Account
                  </Link>
                </p>
              </div>
            )}

            <button onClick={handleClose} className="bg-transparent border border-white/15 text-brand-muted px-6 py-2.5 rounded-full text-sm hover:border-white/30 hover:text-brand-text transition-all duration-200">
              Close
            </button>
          </div>
        ) : (
          <div className="p-10">

            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-brand-text mb-1">Book a Service</h3>
                <p className="text-brand-muted text-sm font-light">Tell us about your event and we'll match you with the best vendors.</p>
              </div>
              <button onClick={handleClose} className="text-brand-dim hover:text-brand-text transition-colors duration-200 text-xl leading-none ml-4">✕</button>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-brand mb-4">
                {error}
              </div>
            )}

            {/* Not logged in tip */}
            {!user && (
              <div className="bg-deep-2 border border-white/5 rounded-brand px-4 py-3 mb-4 flex items-center gap-3">
                <span className="text-base">💡</span>
                <p className="text-brand-dim text-xs font-light">
                  <Link to="/login" onClick={handleClose} className="text-gold no-underline hover:text-gold-light">Sign in</Link>
                  {' '}to track your bookings and see vendor updates.
                </p>
              </div>
            )}

            <div className="flex flex-col gap-4">

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Your Name *</label>
                  <input type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Phone *</label>
                  <input type="tel" placeholder="+91 00000 00000" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
                </div>
              </div>

              <div>
                <label className={labelClass}>Service *</label>
                <select value={service} onChange={(e) => setService(e.target.value)} className={inputClass} style={{ background: '#232332' }}>
                  <option value="">Select a service</option>
                  {services.map((s) => {
                    return <option key={s} value={s}>{s}</option>
                  })}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Event Type *</label>
                  <select value={eventType} onChange={(e) => setEventType(e.target.value)} className={inputClass} style={{ background: '#232332' }}>
                    <option value="">Select event</option>
                    {eventTypes.map((e) => {
                      return <option key={e} value={e}>{e}</option>
                    })}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Date</label>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputClass} style={{ colorScheme: 'dark' }} />
                </div>
              </div>

              <div>
                <label className={labelClass}>City *</label>
                <input type="text" placeholder="e.g. Kolkata, Mumbai…" value={city} onChange={(e) => setCity(e.target.value)} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Additional Details</label>
                <textarea placeholder="Guest count, budget, special requirements…" value={details} onChange={(e) => setDetails(e.target.value)} rows={3} className={`${inputClass} resize-none`} />
              </div>

              <div className="flex gap-3 mt-2">
                <button onClick={handleClose} className="bg-transparent border border-white/15 text-brand-muted px-6 py-2.5 rounded-full text-sm transition-all duration-200 hover:border-white/30 hover:text-brand-text">
                  Cancel
                </button>
                <button onClick={handleSubmit} disabled={loading} className="flex-1 bg-gold text-deep font-semibold py-2.5 rounded-full text-sm transition-all duration-200 hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? 'Submitting…' : 'Send Enquiry →'}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default BookingModal