import { useParams, Link } from 'react-router-dom'
import services from '../data/services'

function ServiceDetail({ onBookNow }) {
  const { id } = useParams()
  const service = services.find((s) => s.id === id)

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-6 pt-24">
        <div>
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="font-display text-3xl font-bold text-brand-text mb-3">Service not found</h2>
          <p className="text-brand-muted mb-6">The service you're looking for doesn't exist.</p>
          <Link to="/" className="bg-gold text-deep font-semibold px-6 py-3 rounded-full text-sm no-underline hover:bg-gold-light transition-all duration-200">Back to Home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Back */}
        <Link to="/" className="inline-flex items-center gap-2 text-brand-muted text-sm no-underline hover:text-gold transition-colors duration-200 mb-10 group">
          <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
          Back to Home
        </Link>

        {/* Hero block */}
        <div className="bg-deep-3 border border-gold/15 rounded-brand-xl p-10 mb-8">
          <div className="flex items-start justify-between flex-wrap gap-6">
            <div className="flex items-center gap-5">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl ${service.iconBg}`}>{service.icon}</div>
              <div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${service.badgeColor} mb-2 inline-block`}>{service.badge}</span>
                <h1 className="font-display text-4xl font-bold text-brand-text" style={{ letterSpacing: '-1px' }}>{service.name}</h1>
                <p className="text-brand-muted mt-1">{service.tagline}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-brand-muted text-xs mb-1">Starting from</div>
              <div className="font-display text-3xl font-bold text-gold">{service.price}</div>
              <div className="text-brand-muted text-xs">{service.unit}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* About */}
          <div className="md:col-span-2 bg-deep-3 border border-gold/15 rounded-brand-xl p-8">
            <h2 className="font-display text-xl font-bold text-brand-text mb-4">About this Service</h2>
            <p className="text-brand-muted font-light leading-relaxed mb-6">{service.desc}</p>

            <h3 className="font-semibold text-brand-text text-sm mb-3">What's Included</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.features.map((f) => {
                return (
                  <li key={f} className="flex items-center gap-2 text-brand-muted text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    {f}
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Stats */}
          <div className="flex flex-col gap-4">
            <div className="bg-deep-3 border border-gold/15 rounded-brand-xl p-6 text-center">
              <div className="font-display text-3xl font-bold text-gold mb-1">{service.vendors.toLocaleString()}+</div>
              <div className="text-brand-muted text-xs uppercase tracking-wide">Verified Vendors</div>
            </div>
            <div className="bg-deep-3 border border-gold/15 rounded-brand-xl p-6 text-center">
              <div className="font-display text-3xl font-bold text-gold mb-1">{service.rating}★</div>
              <div className="text-brand-muted text-xs uppercase tracking-wide">Average Rating</div>
            </div>
            <div className="bg-deep-3 border border-gold/15 rounded-brand-xl p-6 text-center">
              <div className="font-display text-3xl font-bold text-gold mb-1">{service.reviewCount.toLocaleString()}+</div>
              <div className="text-brand-muted text-xs uppercase tracking-wide">Reviews</div>
            </div>
          </div>

        </div>

        {/* Gallery */}
        <div className="bg-deep-3 border border-gold/15 rounded-brand-xl p-8 mb-8">
          <h2 className="font-display text-xl font-bold text-brand-text mb-6">Gallery</h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {service.gallery.map((item, i) => {
              return (
                <div key={i} className="aspect-square bg-deep-2 border border-gold/10 rounded-brand flex items-center justify-center text-4xl hover:border-gold/30 transition-all duration-200 cursor-pointer hover:scale-105">
                  {item}
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-deep-3 border border-gold/40 rounded-brand-xl p-8 text-center">
          <h2 className="font-display text-2xl font-bold text-brand-text mb-2">Ready to book {service.name}?</h2>
          <p className="text-brand-muted font-light mb-6">Get matched with the best vendors in your city instantly.</p>
          <button onClick={() => onBookNow(service.name)} className="bg-gold text-deep font-semibold px-10 py-3.5 rounded-full text-base transition-all duration-200 hover:bg-gold-light hover:-translate-y-0.5">
            Book Now →
          </button>
        </div>

      </div>
    </div>
  )
}

export default ServiceDetail