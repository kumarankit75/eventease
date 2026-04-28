import { Link } from 'react-router-dom'

const services = [
  {
    id: 'decoration',
    icon: '🎨',
    name: 'Decoration',
    desc: 'Transform your venue into a breathtaking setting. Floral arrangements, lighting, themes, and custom setups.',
    features: ['Floral & balloon arrangements', 'Themed stage & backdrop setup', 'LED & fairy light installations', 'Table centrepieces & draping'],
    price: '₹5,000',
    unit: '/ event',
    badge: 'Most Popular',
    badgeColor: 'bg-gold/15 text-gold',
    iconBg: 'bg-gold/10',
    featured: true,
  },
  {
    id: 'dj-entertainment',
    icon: '🎧',
    name: 'DJ & Entertainment',
    desc: 'Keep the energy alive with professional DJs, live bands, emcees, and custom playlists.',
    features: ['Professional DJ with equipment', 'Live band & musicians', 'Emcee & anchor services', 'Sound & lighting rigs'],
    price: '₹8,000',
    unit: '/ event',
    badge: 'Trending',
    badgeColor: 'bg-brand-accent2/15 text-brand-accent2',
    iconBg: 'bg-brand-accent2/10',
    featured: false,
  },
  {
    id: 'catering',
    icon: '🍽️',
    name: 'Catering',
    desc: 'Delight your guests with exquisite menus crafted by professional chefs. From street food to fine dining.',
    features: ['Multi-cuisine buffet setups', 'Live counter stations', 'Custom cake & dessert bars', 'Waitstaff & service crew'],
    price: '₹350',
    unit: '/ plate',
    badge: 'Top Rated',
    badgeColor: 'bg-gold/15 text-gold',
    iconBg: 'bg-brand-accent/10',
    featured: false,
  },
  {
    id: 'photography',
    icon: '📸',
    name: 'Photography & Video',
    desc: 'Capture every precious moment with our curated photographers. Cinematic reels, photo booths & more.',
    features: ['Candid & portrait photography', 'Cinematic wedding films', '360° photo booth setup', 'Drone & aerial shots'],
    price: '₹12,000',
    unit: '/ event',
    badge: 'New',
    badgeColor: 'bg-brand-accent2/15 text-brand-accent2',
    iconBg: 'bg-green-500/10',
    featured: false,
  },
  {
    id: 'makeup-styling',
    icon: '💄',
    name: 'Makeup & Styling',
    desc: 'Look and feel your absolute best with professional makeup artists and hair stylists at your doorstep.',
    features: ['Bridal makeup & hairstyling', 'Group makeup packages', 'Mehendi artists', 'On-site touch-up team'],
    price: '₹3,500',
    unit: '/ session',
    badge: 'Trending',
    badgeColor: 'bg-brand-accent2/15 text-brand-accent2',
    iconBg: 'bg-gold/10',
    featured: false,
  },
  {
    id: 'venue',
    icon: '🏛️',
    name: 'Venue Booking',
    desc: 'Find the perfect space — rooftop terraces, farmhouses, banquet halls and outdoor gardens.',
    features: ['Banquet halls & party rooms', 'Outdoor & garden venues', 'Rooftop & farmhouse spaces', '5-star hotel ballrooms'],
    price: '₹15,000',
    unit: '/ day',
    badge: 'Top Rated',
    badgeColor: 'bg-gold/15 text-gold',
    iconBg: 'bg-brand-accent2/10',
    featured: false,
  },
]

function Services({ onBookNow }) {
  return (
    <section id="services" className="bg-deep py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="mb-14">
          <span className="text-gold text-xs font-semibold tracking-widest uppercase mb-3 block">Our Services</span>
          <h2 className="font-display text-4xl font-bold text-brand-text mb-4" style={{ letterSpacing: '-1px' }}>Everything you need,<br />in one booking.</h2>
          <p className="text-brand-muted font-light max-w-lg leading-relaxed">Hand-picked, verified professionals ready to make your event unforgettable.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s) => {
            const cardClass = s.featured
              ? 'bg-deep-3 border border-gold/40 rounded-brand-lg p-8 flex flex-col transition-all duration-300 hover:-translate-y-1'
              : 'bg-deep-3 border border-gold/15 rounded-brand-lg p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-gold/40'

            return (
              <div key={s.name} className={cardClass}>

                <div className="flex items-start justify-between mb-5">
                  <div className={`flex items-center justify-center text-2xl rounded-xl ${s.iconBg}`} style={{ width: '52px', height: '52px' }}>{s.icon}</div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${s.badgeColor}`}>{s.badge}</span>
                </div>

                <h3 className="font-display text-xl font-bold text-brand-text mb-2">{s.name}</h3>
                <p className="text-brand-muted text-sm font-light leading-relaxed mb-5">{s.desc}</p>

                <ul className="flex flex-col gap-2 mb-6">
                  {s.features.map((f) => {
                    return (
                      <li key={f} className="flex items-center gap-2 text-brand-muted text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                        {f}
                      </li>
                    )
                  })}
                </ul>

                <div className="flex items-center gap-1 mb-5 mt-auto">
                  <span className="text-brand-muted text-xs">from</span>
                  <span className="font-display text-2xl font-bold text-gold">{s.price}</span>
                  <span className="text-brand-muted text-xs">{s.unit}</span>
                </div>

                <div className="flex gap-3">
                  <Link to={`/services/${s.id}`} className="flex-1 text-center bg-transparent text-brand-muted border border-white/15 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:border-gold/30 hover:text-gold no-underline">
                    View Details
                  </Link>
                  <button onClick={() => onBookNow(s.name)} className="flex-1 bg-transparent text-gold border border-gold/40 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:bg-gold hover:text-deep">
                    Book Now →
                  </button>
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default Services