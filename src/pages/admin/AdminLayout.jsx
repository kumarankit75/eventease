import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
  { label: 'Bookings',  href: '/admin/bookings',  icon: '📋' },
  { label: 'Vendors',   href: '/admin/vendors',   icon: '🏪' },
  { label: 'Contacts',  href: '/admin/contacts',  icon: '📨' },
]

function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin')
  }

  const linkClass = ({ isActive }) => {
    const base = 'flex items-center gap-3 px-4 py-3 rounded-brand text-sm font-medium transition-all duration-200 no-underline'
    return isActive
      ? `${base} bg-gold/15 text-gold border border-gold/20`
      : `${base} text-brand-muted hover:text-brand-text hover:bg-white/5`
  }

  return (
    <div className="min-h-screen bg-deep flex">

      {/* Sidebar */}
      <aside className="w-64 bg-deep-2 border-r border-gold/10 flex flex-col fixed top-0 left-0 h-full z-50">

        {/* Logo */}
        <div className="px-6 py-5 border-b border-gold/10">
          <h1 className="font-display text-xl font-bold text-gold">
            Event<span className="text-brand-text">Ease</span>
          </h1>
          <p className="text-brand-dim text-xs mt-0.5">Admin Panel</p>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1 p-4 flex-1">
          {navItems.map((item) => {
            return (
              <NavLink key={item.href} to={item.href} className={linkClass}>
                <span>{item.icon}</span>
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        {/* User + Logout */}
        <div className="p-4 border-t border-gold/10">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center text-gold text-xs font-bold flex-shrink-0">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div>
              <div className="text-brand-text text-xs font-semibold">{user?.name}</div>
              <div className="text-brand-dim text-xs">Administrator</div>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full text-brand-muted text-xs border border-white/10 py-2 rounded-brand hover:border-white/20 hover:text-brand-text transition-all duration-200">
            Sign Out
          </button>
        </div>

      </aside>

      {/* Main content — Outlet renders the child route here */}
      <main className="flex-1 ml-64 p-8 min-h-screen">
        <Outlet />
      </main>

    </div>
  )
}

export default AdminLayout