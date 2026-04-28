const testimonials = [
  {
    stars: '★★★★★',
    text: 'EventEase made our entire wedding planning feel effortless. The decorator was absolutely stunning and the caterer got rave reviews from all our guests. 10/10 would recommend!',
    name: 'Priya Rohatgi',
    event: 'Wedding · Kolkata',
    initials: 'PR',
    avatarBg: 'bg-gold/15',
    avatarColor: 'text-gold',
  },
  {
    stars: '★★★★★',
    text: 'Found an amazing DJ and photographer for my son\'s 1st birthday in just 20 minutes. The whole process was so smooth — instant confirmation, fair pricing, and professional service.',
    name: 'Aditya Mehta',
    event: 'Birthday · Mumbai',
    initials: 'AM',
    avatarBg: 'bg-brand-accent2/15',
    avatarColor: 'text-brand-accent2',
  },
  {
    stars: '★★★★★',
    text: 'Booked a corporate gala for 500 guests — catering, stage decoration, and an emcee through EventEase. Every single vendor was on time, professional, and brilliant.',
    name: 'Sunita Kapoor',
    event: 'Corporate Event · Delhi',
    initials: 'SK',
    avatarBg: 'bg-brand-accent/15',
    avatarColor: 'text-brand-accent',
  },
]

function Testimonials() {
  return (
    <section id="testimonials" className="bg-deep-2 py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-gold text-xs font-semibold tracking-widest uppercase mb-3 block">Reviews</span>
          <h2 className="font-display text-4xl font-bold text-brand-text mb-4" style={{ letterSpacing: '-1px' }}>Loved by thousands<br />of happy hosts</h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => {
            return (
              <div key={t.name} className="bg-deep-3 border border-gold/15 rounded-brand-lg p-8 flex flex-col">

                <div className="text-gold tracking-widest text-sm mb-4">{t.stars}</div>

                <p className="text-brand-muted text-sm font-light leading-relaxed italic mb-6 flex-1">"{t.text}"</p>

                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${t.avatarBg} ${t.avatarColor}`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-brand-text font-semibold text-sm">{t.name}</div>
                    <div className="text-brand-muted text-xs">{t.event}</div>
                  </div>
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default Testimonials