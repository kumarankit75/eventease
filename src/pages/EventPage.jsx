import { useParams, Link } from 'react-router-dom'
import events from '../data/events'
import services from '../data/services'

function EventPage({ onBookNow }) {
  const { id } = useParams()
  const event = events.find((e) => e.id === id)

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-6 pt-24">
        <div>
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="font-display text-3xl font-bold text-brand-text mb-3">Event not found</h2>
          <p className="text-brand-muted mb-6">The event type you're looking for doesn't exist.</p>
          <Link to="/" className="bg-gold text-deep font-semibold px-6 py-3 rounded-full text-sm no-underline hover:bg-gold-light transition-all duration-200">Back to Home</Link>
        </div>
      </div>
    )
  }

  const relatedServices = services.filter((s) => event.services.includes(s.id))

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Back */}
        <Link to="/" className="inline-flex items-center gap-2 text-brand-muted text-sm no-underline hover:text-gold transition-colors duration-200 mb-10 group">
          <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
          Back to Home
        </Link>

        {/* Hero block */}
        <div className="bg-deep-3 border border-gold/15 rounded-brand-xl p-10 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 60% at 80% 50%, ${event.color} 0%, transparent 70%)` }} />
          <div className="relative">
            <span className="text-6xl block mb-4">{event.icon}</span>
            <h1 className="font-display text-4xl font-bold text-brand-text mb-2" style={{ letterSpacing: '-1px' }}>{event.name}</h1>
            <p className="text-gold font-medium mb-3">{event.tagline}</p>
            <p className="text-brand-muted font-light max-w-xl leading-relaxed">{event.desc}</p>
            <div className="mt-6 inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-xs font-semibold px-4 py-2 rounded-full">
              {event.vendors.toLocaleString()}+ verified vendors available
            </div>
          </div>
        </div>

        {/* Recommended Services */}
        <h2 className="font-display text-2xl font-bold text-brand-text mb-6">Recommended Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {relatedServices.map((s) => {
            return (
              <div key={s.id} className="bg-deep-3 border border-gold/15 rounded-brand-lg p-6 flex items-center justify-between gap-4 hover:border-gold/35 transition-all duration-200 group">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${s.iconBg}`}>{s.icon}</div>
                  <div>
                    <div className="text-brand-text font-semibold text-sm mb-0.5">{s.name}</div>
                    <div className="text-brand-muted text-xs">{s.price} {s.unit}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link to={`/services/${s.id}`} className="text-brand-muted text-xs border border-white/15 px-3 py-1.5 rounded-full no-underline hover:border-gold/30 hover:text-gold transition-all duration-200">
                    View
                  </Link>
                  <button onClick={() => onBookNow(s.name)} className="bg-gold text-deep text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-gold-light transition-all duration-200">
                    Book
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="bg-deep-3 border border-gold/40 rounded-brand-xl p-8 text-center">
          <h2 className="font-display text-2xl font-bold text-brand-text mb-2">Plan your {event.name} today</h2>
          <p className="text-brand-muted font-light mb-6">Let us match you with the perfect vendors for your celebration.</p>
          <button onClick={() => onBookNow()} className="bg-gold text-deep font-semibold px-10 py-3.5 rounded-full text-base transition-all duration-200 hover:bg-gold-light hover:-translate-y-0.5">
            Get Started Free →
          </button>
        </div>

      </div>
    </div>
  )
}

export default EventPage