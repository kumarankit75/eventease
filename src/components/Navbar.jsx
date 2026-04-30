// import { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'

// const navLinks = [
//   { label: 'Events',       href: '/#events'      },
//   { label: 'Services',     href: '/#services'    },
//   { label: 'How it Works', href: '/#how'         },
//   { label: 'Reviews',      href: '/#testimonials'},
//   // { label: 'Contact',      href: '/#contact'},
//   { label: 'Contact',      href: '/contact', isRoute: true },
// ]

// function Navbar({ onBookNow }) {
//   const [scrolled, setScrolled] = useState(false)

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 20)
//     window.addEventListener('scroll', onScroll)
//     return () => window.removeEventListener('scroll', onScroll)
//   }, [])

//   const navClass = scrolled
//     ? 'bg-deep/90 backdrop-blur-xl border-b border-gold/15 shadow-lg shadow-black/20'
//     : 'bg-deep/60 backdrop-blur-md border-b border-gold/10'

//   const baseClass = 'fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-4 transition-all duration-300'

//   return (
//     <nav className={`${baseClass} ${navClass}`}>

//       <Link to="/" className="font-display text-2xl font-bold text-gold tracking-tight no-underline">
//         Event<span className="text-brand-text">Ease</span>
//       </Link>

//       <ul className="hidden md:flex items-center gap-8 list-none">
//         {navLinks.map((link) => {
//           if (link.isRoute) {
//             return (
//               <li key={link.href}>
//                 <Link to={link.href} className="text-brand-muted text-sm font-medium no-underline transition-colors duration-200 hover:text-gold">
//                   {link.label}
//                 </Link>
//               </li>
//             )
//           }
//           return (
//             <li key={link.href}>
//               <a href={link.href} className="text-brand-muted text-sm font-medium no-underline transition-colors duration-200 hover:text-gold">
//                 {link.label}
//               </a>
//             </li>
//           )
//         })}
//       </ul>

//       <button onClick={onBookNow} className="bg-gold text-deep text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200 hover:bg-gold-light hover:scale-105 active:scale-95">
//         Book Now
//       </button>

//     </nav>
//   )
// }

// export default Navbar












import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

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
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // lock body scroll when menu open
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

        {/* Logo */}
        <Link to="/" className="font-display text-2xl font-bold text-gold tracking-tight no-underline">
          Event<span className="text-brand-text">Ease</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {navLinks.map((link) => {
            return (
              <li key={link.href}>
                {link.isRoute ? (
                  <Link to={link.href} className={linkClass(link.href)}>
                    {link.label}
                  </Link>
                ) : (
                  <a href={link.href} className={linkClass(link.href)}>
                    {link.label}
                  </a>
                )}
              </li>
            )
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <button onClick={onBookNow} className="bg-gold text-deep text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200 hover:bg-gold-light hover:scale-105 active:scale-95">
            Book Now
          </button>
        </div>

        {/* Mobile right side */}
        <div className="flex md:hidden items-center gap-3">
          <button onClick={onBookNow} className="bg-gold text-deep text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 hover:bg-gold-light">
            Book Now
          </button>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-brand border border-gold/20 bg-deep-3 transition-all duration-200 hover:border-gold/40">
            <span className={`block w-4 h-0.5 bg-brand-text transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-4 h-0.5 bg-brand-text transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-4 h-0.5 bg-brand-text transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 transition-all duration-300 md:hidden ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>

        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />

        {/* Drawer */}
        <div className={`absolute top-0 right-0 h-full w-72 bg-deep-2 border-l border-gold/15 flex flex-col transition-all duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>

          {/* Drawer header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gold/10">
            <span className="font-display text-lg font-bold text-gold">
              Event<span className="text-brand-text">Ease</span>
            </span>
            <button onClick={() => setMenuOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 text-brand-muted hover:text-brand-text hover:border-white/20 transition-all duration-200 text-sm">
              ✕
            </button>
          </div>

          {/* Drawer links */}
          <div className="flex flex-col px-6 py-8 gap-6 flex-1">
            {navLinks.map((link) => {
              return (
                <div key={link.href}>
                  {link.isRoute ? (
                    <Link to={link.href} className={mobileLinkClass(link.href)} onClick={() => setMenuOpen(false)}>
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className={mobileLinkClass(link.href)} onClick={() => setMenuOpen(false)}>
                      {link.label}
                    </a>
                  )}
                </div>
              )
            })}
          </div>

          {/* Drawer footer */}
          <div className="px-6 py-8 border-t border-gold/10">
            <button onClick={() => { onBookNow(); setMenuOpen(false) }} className="w-full bg-gold text-deep font-semibold py-3.5 rounded-full text-sm transition-all duration-200 hover:bg-gold-light">
              Book Now →
            </button>
            <p className="text-brand-dim text-xs text-center mt-4">Available in 200+ cities across India</p>
          </div>

        </div>
      </div>
    </>
  )
}

export default Navbar