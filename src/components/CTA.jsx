function CTA({ onBookNow }) {
  return (
    <section className="bg-deep py-28 px-6 text-center">
      <div className="max-w-2xl mx-auto">

        <h2 className="font-display font-black text-brand-text mb-5" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', letterSpacing: '-1.5px', lineHeight: '1.1' }}>
          Your perfect event starts{' '}
          <em className="text-gold not-italic">right here.</em>
        </h2>

        <p className="text-brand-muted font-light text-lg mb-10 leading-relaxed">
          Join over 85,000 hosts who have planned unforgettable moments with EventEase. It's free to browse, easy to book.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <button onClick={onBookNow} className="bg-gold text-deep font-semibold px-8 py-3.5 rounded-full text-base transition-all duration-200 hover:bg-gold-light hover:-translate-y-0.5">
            Get Started Free
          </button>
          <a href="#services" className="bg-transparent text-brand-text font-medium px-8 py-3.5 rounded-full text-base border border-white/25 transition-all duration-200 hover:border-white/50 hover:bg-white/5 no-underline">
            Explore Services
          </a>
        </div>

      </div>
    </section>
  )
}

export default CTA