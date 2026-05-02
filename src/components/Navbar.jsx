import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { label: 'Events',       href: '/#events',       isRoute: false },
  { label: 'Services',     href: '/#services',     isRoute: false },
  { label: 'How it Works', href: '/#how',          isRoute: false },
  { label: 'Reviews',      href: '/#testimonials', isRoute: false },
  { label: 'Contact',      href: '/contact',       isRoute: true  },
]

function Navbar({ onBookNow }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navClass = scrolled
    ? 'bg-deep/90 backdrop-blur-xl border-b border-gold/15 shadow-lg shadow-black/20'
    : 'bg-deep/60 backdrop-blur-md border-b border-gold/10'

  const baseClass = 'fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-300'

  const linkClass = (href) => {
    const isActive = pathname === href
    return `text-sm font-medium no-underline transition-colors duration-200 ${isActive ? 'text-gold' : 'text-brand-muted hover:text-gold'}`
  }

  const mobileLinkClass = (href) => {
    const isActive = pathname === href
    return `text-2xl font-display font-bold no-underline transition-colors duration-200 ${isActive ? 'text-gold' : 'text-brand-text hover:text-gold'}`
  }

  return (
    <>
      <nav className={`${baseClass} ${navClass}`}>

        <Link to="/" className="font-display text-2xl font-bold text-gold tracking-tight no-underline">
          Event<span className="text-brand-text">Ease</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {navLinks.map((link) => {
            return (
              <li key={link.href}>
                {link.isRoute ? (
                  <Link to={link.href} className={linkClass(link.href)}>{link.label}</Link>
                ) : (
                  <a href={link.href} className={linkClass(link.href)}>{link.label}</a>
                )}
              </li>
            )
          })}
        </ul>

        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <Link to="/account" className="flex items-center gap-2 text-brand-muted text-sm font-medium no-underline hover:text-gold transition-colors duration-200">
              <div className="w-7 h-7 rounded-full bg-gold/15 border border-gold/20 flex items-center justify-center text-gold text-xs font-bold">
                {user.name?.charAt(0)}
              </div>
              {user.name?.split(' ')[0]}
            </Link>
          ) : (
            <Link to="/login" className="text-brand-muted text-sm font-medium no-underline hover:text-gold transition-colors duration-200">
              Sign In
            </Link>
          )}
          <button onClick={onBookNow} className="bg-gold text-deep text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200 hover:bg-gold-light hover:scale-105 active:scale-95">
            Book Now
          </button>
        </div>

        {/* Mobile right side */}
        <div className="flex md:hidden items-center gap-3">
          <button onClick={onBookNow} className="bg-gold text-deep text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 hover:bg-gold-light">
            Book Now
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-brand border border-gold/20 bg-deep-3 transition-all duration-200 hover:border-gold/40">
            <span className={`block w-4 h-0.5 bg-brand-text transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-4 h-0.5 bg-brand-text transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-4 h-0.5 bg-brand-text transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 transition-all duration-300 md:hidden ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <div className={`absolute top-0 right-0 h-full w-72 bg-deep-2 border-l border-gold/15 flex flex-col transition-all duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>

          <div className="flex items-center justify-between px-6 py-5 border-b border-gold/10">
            <span className="font-display text-lg font-bold text-gold">Event<span className="text-brand-text">Ease</span></span>
            <button onClick={() => setMenuOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 text-brand-muted hover:text-brand-text transition-all duration-200 text-sm">✕</button>
          </div>

          <div className="flex flex-col px-6 py-8 gap-6 flex-1">
            {navLinks.map((link) => {
              return (
                <div key={link.href}>
                  {link.isRoute ? (
                    <Link to={link.href} className={mobileLinkClass(link.href)} onClick={() => setMenuOpen(false)}>{link.label}</Link>
                  ) : (
                    <a href={link.href} className={mobileLinkClass(link.href)} onClick={() => setMenuOpen(false)}>{link.label}</a>
                  )}
                </div>
              )
            })}
            {user ? (
              <Link to="/account" className="text-2xl font-display font-bold text-brand-text no-underline hover:text-gold transition-colors duration-200" onClick={() => setMenuOpen(false)}>
                My Account
              </Link>
            ) : (
              <Link to="/login" className="text-2xl font-display font-bold text-brand-text no-underline hover:text-gold transition-colors duration-200" onClick={() => setMenuOpen(false)}>
                Sign In
              </Link>
            )}
          </div>

          <div className="px-6 py-8 border-t border-gold/10">
            <button onClick={() => { onBookNow(); setMenuOpen(false) }} className="w-full bg-gold text-deep font-semibold py-3.5 rounded-full text-sm transition-all duration-200 hover:bg-gold-light">
              Book Now →
            </button>
            {user && (
              <button onClick={() => { logout(); setMenuOpen(false) }} className="w-full mt-3 text-brand-muted text-sm border border-white/10 py-2.5 rounded-full hover:border-white/20 transition-all duration-200">
                Sign Out
              </button>
            )}
            <p className="text-brand-dim text-xs text-center mt-4">Available in 200+ cities across India</p>
          </div>

        </div>
      </div>
    </>
  )
}

export default Navbar