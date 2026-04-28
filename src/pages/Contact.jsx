import { useState } from 'react'
import { Link } from 'react-router-dom'

function Contact({ onBookNow }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    setSent(true)
    setForm({ name: '', email: '', phone: '', message: '' })
  }

  const inputClass = 'w-full bg-surface border border-white/10 text-brand-text px-4 py-3 rounded-brand text-sm outline-none transition-all duration-200 focus:border-gold/50 font-light'
  const labelClass = 'block text-brand-dim text-xs font-semibold tracking-widest uppercase mb-2'

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Back */}
        <Link to="/" className="inline-flex items-center gap-2 text-brand-muted text-sm no-underline hover:text-gold transition-colors duration-200 mb-10 group">
          <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
          Back to Home
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Left */}
          <div>
            <span className="text-gold text-xs font-semibold tracking-widest uppercase mb-3 block">Get in Touch</span>
            <h1 className="font-display text-4xl font-bold text-brand-text mb-4" style={{ letterSpacing: '-1px' }}>Let's plan your perfect event.</h1>
            <p className="text-brand-muted font-light leading-relaxed mb-8">Have questions? Want a custom quote? Our team is available 7 days a week to help you find the right vendors.</p>

            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-base flex-shrink-0">📧</div>
                <div>
                  <div className="text-brand-text text-sm font-medium">Email</div>
                  <div className="text-brand-muted text-xs">hello@eventease.in</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-base flex-shrink-0">📞</div>
                <div>
                  <div className="text-brand-text text-sm font-medium">Phone</div>
                  <div className="text-brand-muted text-xs">+91 98765 43210</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-base flex-shrink-0">📍</div>
                <div>
                  <div className="text-brand-text text-sm font-medium">Based in</div>
                  <div className="text-brand-muted text-xs">Kolkata, India — serving 200+ cities</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-deep-3 border border-gold/15 rounded-brand-xl p-8">
            {sent ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="font-display text-2xl font-bold text-brand-text mb-2">Message Sent!</h3>
                <p className="text-brand-muted font-light mb-6">We'll get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)} className="bg-gold text-deep font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-gold-light transition-all duration-200">
                  Send Another
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div>
                  <label className={labelClass}>Your Name</label>
                  <input name="name" type="text" placeholder="Full name" value={form.name} onChange={handleChange} className={inputClass} />
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
                  <label className={labelClass}>Message</label>
                  <textarea name="message" rows={4} placeholder="Tell us about your event…" value={form.message} onChange={handleChange} className={`${inputClass} resize-none`} />
                </div>
                <button onClick={handleSubmit} className="w-full bg-gold text-deep font-semibold py-3 rounded-full text-sm transition-all duration-200 hover:bg-gold-light mt-2">
                  Send Message →
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Contact