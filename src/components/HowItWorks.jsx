const steps = [
  { num: '01', title: 'Choose Your Event',  desc: 'Select the type of occasion and set your date, city, and approximate guest count.', icon: '🎯' },
  { num: '02', title: 'Browse & Compare',   desc: 'Explore verified vendors, check portfolios, read reviews, and compare packages side by side.', icon: '🔍' },
  { num: '03', title: 'Book Instantly',     desc: 'Lock in your favourite vendors with a secure booking. Get instant confirmation and contracts.', icon: '⚡' },
  { num: '04', title: 'Celebrate!',         desc: 'Sit back and enjoy your perfectly orchestrated event. We handle coordination so you don\'t have to.', icon: '🎊' },
]

function HowItWorks() {
  return (
    <section id="how" className="bg-deep-2 py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-gold text-xs font-semibold tracking-widest uppercase mb-3 block">Simple Process</span>
          <h2 className="font-display text-4xl font-bold text-brand-text mb-4" style={{ letterSpacing: '-1px' }}>Plan your event in<br />4 easy steps</h2>
          <p className="text-brand-muted font-light max-w-lg mx-auto leading-relaxed">From discovery to your big day — we've made the entire process seamless and stress-free.</p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s) => {
            return (
              <div key={s.num} className="text-center px-4">
                <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center font-display text-xl font-bold text-gold mx-auto mb-6">
                  {s.num}
                </div>
                <div className="text-2xl mb-3">{s.icon}</div>
                <h3 className="text-brand-text font-semibold text-base mb-2">{s.title}</h3>
                <p className="text-brand-muted text-sm font-light leading-relaxed">{s.desc}</p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default HowItWorks