import { useEffect, useRef } from 'react'

function Hero({ onBookNow }) {
  const heroRef = useRef(null)

  useEffect(() => {
    const particles = []
    const container = heroRef.current
    if (!container) return

    for (let i = 0; i < 12; i++) {
      const p = document.createElement('div')
      const size = Math.random() * 4 + 2
      const left = Math.random() * 100
      const delay = Math.random() * 6
      const duration = Math.random() * 4 + 4
      const colors = ['#C9A84C', '#F0D98E', '#7B6CF6', '#E8745A']
      const color = colors[Math.floor(Math.random() * colors.length)]

      p.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        bottom: 10%;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        animation: floatUp ${duration}s ${delay}s linear infinite;
        opacity: 0;
      `
      container.appendChild(p)
      particles.push(p)
    }

    return () => particles.forEach((p) => p.remove())
  }, [])

  const sectionClass = 'relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32 pb-16 overflow-hidden'

  const badgeClass = 'relative flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-7'

  const primaryBtnClass = 'bg-gold text-deep font-semibold px-8 py-3.5 rounded-full text-base transition-all duration-200 hover:bg-gold-light hover:-translate-y-0.5 no-underline'

  const outlineBtnClass = 'bg-transparent text-brand-text font-medium px-8 py-3.5 rounded-full text-base border border-white/25 transition-all duration-200 hover:border-white/50 hover:bg-white/5 no-underline'

  const h1Style = {
    fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
    letterSpacing: '-2px',
    lineHeight: '1.05',
  }

  const pStyle = {
    fontSize: '1.15rem',
    lineHeight: '1.7',
  }

  return (
    <section ref={heroRef} className={sectionClass}>

      {/* Glow background */}
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />

      {/* Grid background */}
      <div className="absolute inset-0 bg-hero-grid bg-grid hero-grid-mask pointer-events-none" />

      {/* Badge */}
      <div className={badgeClass}>
        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-dot" />
        India's #1 Event Booking Platform
      </div>

      {/* Headline */}
      <h1 className="relative font-display font-black mb-6 text-brand-text" style={h1Style}>
        Every celebration,
        <br />
        <em className="text-gold not-italic">perfectly planned.</em>
      </h1>

      {/* Subtext */}
      <p className="relative text-brand-muted font-light max-w-xl mx-auto mb-10" style={pStyle}>
        Discover and instantly book top-rated decorators, DJs, caterers,
        photographers, and more — all in one place. Your dream event,
        just a few taps away.
      </p>

      {/* CTAs */}
      <div className="relative flex gap-4 flex-wrap justify-center">
        <a href="#services" className={primaryBtnClass}>Browse Services</a>
        <a href="#how" className={outlineBtnClass}>How it Works</a>
      </div>

    </section>
  )
}

export default Hero