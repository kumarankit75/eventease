import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function VendorProtected({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-deep flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
          <div className="text-brand-muted text-sm">Loading…</div>
        </div>
      </div>
    )
  }

  if (!user || user.role !== 'vendor') {
    return <Navigate to="/vendor/login" replace />
  }

  return children
}

export default VendorProtected