import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'Events',       href: '/#events'      },
  { label: 'Services',     href: '/#services'    },
  { label: 'How it Works', href: '/#how'         },
  { label: 'Reviews',      href: '/#testimonials'},
  { label: 'Contact',      href: '/contact', isRoute: true },
]

function Navbar({ onBookNow }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navClass = scrolled
    ? 'bg-deep/90 backdrop-blur-xl border-b border-gold/15 shadow-lg shadow-black/20'
    : 'bg-deep/60 backdrop-blur-md border-b border-gold/10'

  const baseClass = 'fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-4 transition-all duration-300'

  return (
    <nav className={`${baseClass} ${navClass}`}>

      <Link to="/" className="font-display text-2xl font-bold text-gold tracking-tight no-underline">
        Event<span className="text-brand-text">Ease</span>
      </Link>

      <ul className="hidden md:flex items-center gap-8 list-none">
        {navLinks.map((link) => {
          if (link.isRoute) {
            return (
              <li key={link.href}>
                <Link to={link.href} className="text-brand-muted text-sm font-medium no-underline transition-colors duration-200 hover:text-gold">
                  {link.label}
                </Link>
              </li>
            )
          }
          return (
            <li key={link.href}>
              <a href={link.href} className="text-brand-muted text-sm font-medium no-underline transition-colors duration-200 hover:text-gold">
                {link.label}
              </a>
            </li>
          )
        })}
      </ul>

      <button onClick={onBookNow} className="bg-gold text-deep text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200 hover:bg-gold-light hover:scale-105 active:scale-95">
        Book Now
      </button>

    </nav>
  )
}

export default Navbar