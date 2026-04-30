// import { useState } from 'react'
// import { Link } from 'react-router-dom'

// function Contact({ onBookNow }) {
//   const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
//   const [sent, setSent] = useState(false)

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = () => {
//     setSent(true)
//     setForm({ name: '', email: '', phone: '', message: '' })
//   }

//   const inputClass = 'w-full bg-surface border border-white/10 text-brand-text px-4 py-3 rounded-brand text-sm outline-none transition-all duration-200 focus:border-gold/50 font-light'
//   const labelClass = 'block text-brand-dim text-xs font-semibold tracking-widest uppercase mb-2'

//   return (
//     <div className="min-h-screen pt-24 pb-16 px-6">
//       <div className="max-w-4xl mx-auto">

//         {/* Back */}
//         <Link to="/" className="inline-flex items-center gap-2 text-brand-muted text-sm no-underline hover:text-gold transition-colors duration-200 mb-10 group">
//           <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
//           Back to Home
//         </Link>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

//           {/* Left */}
//           <div>
//             <span className="text-gold text-xs font-semibold tracking-widest uppercase mb-3 block">Get in Touch</span>
//             <h1 className="font-display text-4xl font-bold text-brand-text mb-4" style={{ letterSpacing: '-1px' }}>Let's plan your perfect event.</h1>
//             <p className="text-brand-muted font-light leading-relaxed mb-8">Have questions? Want a custom quote? Our team is available 7 days a week to help you find the right vendors.</p>

//             <div className="flex flex-col gap-5">
//               <div className="flex items-center gap-4">
//                 <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-base flex-shrink-0">📧</div>
//                 <div>
//                   <div className="text-brand-text text-sm font-medium">Email</div>
//                   <div className="text-brand-muted text-xs">hello@eventease.in</div>
//                 </div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-base flex-shrink-0">📞</div>
//                 <div>
//                   <div className="text-brand-text text-sm font-medium">Phone</div>
//                   <div className="text-brand-muted text-xs">+91 98765 43210</div>
//                 </div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-base flex-shrink-0">📍</div>
//                 <div>
//                   <div className="text-brand-text text-sm font-medium">Based in</div>
//                   <div className="text-brand-muted text-xs">Kolkata, India — serving 200+ cities</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right — Form */}
//           <div className="bg-deep-3 border border-gold/15 rounded-brand-xl p-8">
//             {sent ? (
//               <div className="text-center py-8">
//                 <div className="text-5xl mb-4">🎉</div>
//                 <h3 className="font-display text-2xl font-bold text-brand-text mb-2">Message Sent!</h3>
//                 <p className="text-brand-muted font-light mb-6">We'll get back to you within 24 hours.</p>
//                 <button onClick={() => setSent(false)} className="bg-gold text-deep font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-gold-light transition-all duration-200">
//                   Send Another
//                 </button>
//               </div>
//             ) : (
//               <div className="flex flex-col gap-4">
//                 <div>
//                   <label className={labelClass}>Your Name</label>
//                   <input name="name" type="text" placeholder="Full name" value={form.name} onChange={handleChange} className={inputClass} />
//                 </div>
//                 <div>
//                   <label className={labelClass}>Email</label>
//                   <input name="email" type="email" placeholder="you@email.com" value={form.email} onChange={handleChange} className={inputClass} />
//                 </div>
//                 <div>
//                   <label className={labelClass}>Phone</label>
//                   <input name="phone" type="tel" placeholder="+91 00000 00000" value={form.phone} onChange={handleChange} className={inputClass} />
//                 </div>
//                 <div>
//                   <label className={labelClass}>Message</label>
//                   <textarea name="message" rows={4} placeholder="Tell us about your event…" value={form.message} onChange={handleChange} className={`${inputClass} resize-none`} />
//                 </div>
//                 <button onClick={handleSubmit} className="w-full bg-gold text-deep font-semibold py-3 rounded-full text-sm transition-all duration-200 hover:bg-gold-light mt-2">
//                   Send Message →
//                 </button>
//               </div>
//             )}
//           </div>

//         </div>
//       </div>
//     </div>
//   )
// }

// export default Contact





// // import { useState } from 'react'

// // function Contact({ onBookNow }) {
// //   const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
// //   const [sent, setSent] = useState(false)

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value })
// //   }

// //   const handleSubmit = () => {
// //     setSent(true)
// //     setForm({ name: '', email: '', phone: '', message: '' })
// //   }

// //   const inputClass = 'w-full bg-surface border border-white/10 text-brand-text px-4 py-3 rounded-brand text-sm outline-none transition-all duration-200 focus:border-gold/50 font-light'
// //   const labelClass = 'block text-brand-dim text-xs font-semibold tracking-widest uppercase mb-2'

// //   return (
// //     <div className="min-h-screen pt-24 pb-16 px-6">
// //       <div className="max-w-5xl mx-auto">

// //         {/* Page Header */}
// //         <div className="bg-deep-3 border border-gold/15 rounded-brand-xl p-10 mb-8 relative overflow-hidden">
// //           <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 60% at 80% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)' }} />
// //           <div className="relative">
// //             <span className="text-gold text-xs font-semibold tracking-widest uppercase mb-3 block">Contact Us</span>
// //             <h1 className="font-display text-4xl font-bold text-brand-text mb-2" style={{ letterSpacing: '-1px' }}>Let's plan your perfect event.</h1>
// //             <p className="text-gold font-medium mb-3">We're here to help, 7 days a week.</p>
// //             <p className="text-brand-muted font-light max-w-xl leading-relaxed">Have questions? Want a custom quote? Our team is available to help you find the right vendors for your celebration.</p>
// //             <div className="mt-6 inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-xs font-semibold px-4 py-2 rounded-full">
// //               Average response time — under 2 hours
// //             </div>
// //           </div>
// //         </div>

// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

// //           {/* Left — Contact Info */}
// //           <div className="flex flex-col gap-4">

// //             <div className="bg-deep-3 border border-gold/15 rounded-brand-xl p-6">
// //               <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-base mb-4">📧</div>
// //               <div className="text-brand-text text-sm font-semibold mb-1">Email</div>
// //               <div className="text-brand-muted text-xs font-light">hello@eventease.in</div>
// //             </div>

// //             <div className="bg-deep-3 border border-gold/15 rounded-brand-xl p-6">
// //               <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-base mb-4">📞</div>
// //               <div className="text-brand-text text-sm font-semibold mb-1">Phone</div>
// //               <div className="text-brand-muted text-xs font-light">+91 98765 43210</div>
// //             </div>

// //             <div className="bg-deep-3 border border-gold/15 rounded-brand-xl p-6">
// //               <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-base mb-4">📍</div>
// //               <div className="text-brand-text text-sm font-semibold mb-1">Based in</div>
// //               <div className="text-brand-muted text-xs font-light">Kolkata, India — serving 200+ cities</div>
// //             </div>

// //             <div className="bg-deep-3 border border-gold/15 rounded-brand-xl p-6">
// //               <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-base mb-4">🕐</div>
// //               <div className="text-brand-text text-sm font-semibold mb-1">Working Hours</div>
// //               <div className="text-brand-muted text-xs font-light">Mon – Sun, 9am to 9pm IST</div>
// //             </div>

// //           </div>

// //           {/* Right — Form */}
// //           <div className="md:col-span-2 bg-deep-3 border border-gold/15 rounded-brand-xl p-8">
// //             {sent ? (
// //               <div className="text-center py-16">
// //                 <div className="text-6xl mb-4">🎉</div>
// //                 <h3 className="font-display text-2xl font-bold text-brand-text mb-2">Message Sent!</h3>
// //                 <p className="text-brand-muted font-light mb-6">We'll get back to you within 2 hours.</p>
// //                 <button onClick={() => setSent(false)} className="bg-gold text-deep font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-gold-light transition-all duration-200">
// //                   Send Another
// //                 </button>
// //               </div>
// //             ) : (
// //               <div className="flex flex-col gap-4">

// //                 <h2 className="font-display text-xl font-bold text-brand-text mb-2">Send us a message</h2>

// //                 <div className="grid grid-cols-2 gap-4">
// //                   <div>
// //                     <label className={labelClass}>Your Name</label>
// //                     <input name="name" type="text" placeholder="Full name" value={form.name} onChange={handleChange} className={inputClass} />
// //                   </div>
// //                   <div>
// //                     <label className={labelClass}>Phone</label>
// //                     <input name="phone" type="tel" placeholder="+91 00000 00000" value={form.phone} onChange={handleChange} className={inputClass} />
// //                   </div>
// //                 </div>

// //                 <div>
// //                   <label className={labelClass}>Email</label>
// //                   <input name="email" type="email" placeholder="you@email.com" value={form.email} onChange={handleChange} className={inputClass} />
// //                 </div>

// //                 <div>
// //                   <label className={labelClass}>Message</label>
// //                   <textarea name="message" rows={5} placeholder="Tell us about your event — type, date, city, guest count…" value={form.message} onChange={handleChange} className={`${inputClass} resize-none`} />
// //                 </div>

// //                 <div className="flex gap-3 mt-2">
// //                   <button onClick={handleSubmit} className="flex-1 bg-gold text-deep font-semibold py-3 rounded-full text-sm transition-all duration-200 hover:bg-gold-light">
// //                     Send Message →
// //                   </button>
// //                   <button onClick={onBookNow} className="bg-transparent text-gold border border-gold/40 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:bg-gold hover:text-deep">
// //                     Book Directly
// //                   </button>
// //                 </div>

// //               </div>
// //             )}
// //           </div>

// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default Contact
















import { useState } from 'react'
import contactService from '../api/contactService'

function Contact({ onBookNow }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)
    setError('')

    try {
      await contactService.submit(form)
      setSent(true)
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = 'w-full bg-surface border border-white/10 text-brand-text px-4 py-3 rounded-brand text-sm outline-none transition-all duration-200 focus:border-gold/50 font-light'
  const labelClass = 'block text-brand-dim text-xs font-semibold tracking-widest uppercase mb-2'

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="bg-deep-3 border border-gold/15 rounded-brand-xl p-10 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 60% at 80% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)' }} />
          <div className="relative">
            <span className="text-gold text-xs font-semibold tracking-widest uppercase mb-3 block">Contact Us</span>
            <h1 className="font-display text-4xl font-bold text-brand-text mb-2" style={{ letterSpacing: '-1px' }}>Let's plan your perfect event.</h1>
            <p className="text-gold font-medium mb-3">We're here to help, 7 days a week.</p>
            <p className="text-brand-muted font-light max-w-xl leading-relaxed">Have questions? Want a custom quote? Our team is available to help you find the right vendors for your celebration.</p>
            <div className="mt-6 inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-xs font-semibold px-4 py-2 rounded-full">
              Average response time — under 2 hours
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="flex flex-col gap-4">
            <div className="bg-deep-3 border border-gold/15 rounded-brand-xl p-6">
              <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-base mb-4">📧</div>
              <div className="text-brand-text text-sm font-semibold mb-1">Email</div>
              <div className="text-brand-muted text-xs font-light">hello@eventease.in</div>
            </div>
            <div className="bg-deep-3 border border-gold/15 rounded-brand-xl p-6">
              <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-base mb-4">📞</div>
              <div className="text-brand-text text-sm font-semibold mb-1">Phone</div>
              <div className="text-brand-muted text-xs font-light">+91 98765 43210</div>
            </div>
            <div className="bg-deep-3 border border-gold/15 rounded-brand-xl p-6">
              <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-base mb-4">📍</div>
              <div className="text-brand-text text-sm font-semibold mb-1">Based in</div>
              <div className="text-brand-muted text-xs font-light">Kolkata, India — serving 200+ cities</div>
            </div>
            <div className="bg-deep-3 border border-gold/15 rounded-brand-xl p-6">
              <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-base mb-4">🕐</div>
              <div className="text-brand-text text-sm font-semibold mb-1">Working Hours</div>
              <div className="text-brand-muted text-xs font-light">Mon – Sun, 9am to 9pm IST</div>
            </div>
          </div>

          <div className="md:col-span-2 bg-deep-3 border border-gold/15 rounded-brand-xl p-8">
            {sent ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="font-display text-2xl font-bold text-brand-text mb-2">Message Sent!</h3>
                <p className="text-brand-muted font-light mb-6">We'll get back to you within 2 hours.</p>
                <button onClick={() => setSent(false)} className="bg-gold text-deep font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-gold-light transition-all duration-200">
                  Send Another
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <h2 className="font-display text-xl font-bold text-brand-text mb-2">Send us a message</h2>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-brand">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Your Name *</label>
                    <input name="name" type="text" placeholder="Full name" value={form.name} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Phone</label>
                    <input name="phone" type="tel" placeholder="+91 00000 00000" value={form.phone} onChange={handleChange} className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Email *</label>
                  <input name="email" type="email" placeholder="you@email.com" value={form.email} onChange={handleChange} className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>Message *</label>
                  <textarea name="message" rows={5} placeholder="Tell us about your event — type, date, city, guest count…" value={form.message} onChange={handleChange} className={`${inputClass} resize-none`} />
                </div>

                <div className="flex gap-3 mt-2">
                  <button onClick={handleSubmit} disabled={loading} className="flex-1 bg-gold text-deep font-semibold py-3 rounded-full text-sm transition-all duration-200 hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? 'Sending…' : 'Send Message →'}
                  </button>
                  <button onClick={onBookNow} className="bg-transparent text-gold border border-gold/40 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:bg-gold hover:text-deep">
                    Book Directly
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Contact