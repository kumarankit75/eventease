import { Link } from 'react-router-dom'

const events = [
  { icon: '💍', name: 'Wedding',     id: 'wedding',      count: '3,400+ vendors', color: 'rgba(201,168,76,0.15)'  },
  { icon: '🎂', name: 'Birthday',    id: 'birthday',     count: '2,100+ vendors', color: 'rgba(232,116,90,0.15)'  },
  { icon: '🎓', name: 'Graduation',  id: 'graduation',   count: '980+ vendors',   color: 'rgba(123,108,246,0.15)' },
  { icon: '🏢', name: 'Corporate',   id: 'corporate',    count: '1,600+ vendors', color: 'rgba(29,158,117,0.15)'  },
  { icon: '🤝', name: 'Engagement',  id: 'engagement',   count: '1,200+ vendors', color: 'rgba(201,168,76,0.12)'  },
  { icon: '👶', name: 'Baby Shower', id: 'baby-shower',  count: '760+ vendors',   color: 'rgba(232,116,90,0.12)'  },
  { icon: '🪔', name: 'Festival',    id: 'festival',     count: '1,900+ vendors', color: 'rgba(123,108,246,0.12)' },
  { icon: '🎉', name: 'Any Occasion',id: 'any-occasion', count: '5,000+ vendors', color: 'rgba(29,158,117,0.12)'  },
]

function EventTypes() {
  return (
    <section id="events" className="bg-deep-2 py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-14">
          <span className="text-gold text-xs font-semibold tracking-widest uppercase mb-3 block">Event Types</span>
          <h2 className="font-display text-4xl font-bold text-brand-text mb-4" style={{ letterSpacing: '-1px' }}>Every occasion, covered.</h2>
          <p className="text-brand-muted font-light max-w-lg mx-auto leading-relaxed">From intimate birthdays to grand weddings — we have vendors ready for every type of celebration.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {events.map((e) => {
            return (
              <Link key={e.name} to={`/events/${e.id}`} className="relative bg-deep-3 border border-gold/15 rounded-brand-lg p-8 text-center cursor-pointer overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:border-gold/35 no-underline block">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 0%, ${e.color} 0%, transparent 70%)` }} />
                <span className="text-4xl mb-4 block">{e.icon}</span>
                <div className="font-semibold text-brand-text text-sm mb-1">{e.name}</div>
                <div className="text-brand-muted text-xs">{e.count}</div>
              </Link>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default EventTypes