import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-6">
      <div>
        <div className="font-display text-8xl font-bold text-gold/20 mb-4">404</div>
        <h2 className="font-display text-3xl font-bold text-brand-text mb-3">Page not found</h2>
        <p className="text-brand-muted font-light mb-8 max-w-sm mx-auto">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="bg-gold text-deep font-semibold px-8 py-3.5 rounded-full text-base no-underline hover:bg-gold-light transition-all duration-200">
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound