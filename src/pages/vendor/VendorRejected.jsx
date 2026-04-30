import { Link } from 'react-router-dom'

function VendorRejected() {
  return (
    <div className="min-h-screen bg-deep flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">

        <div className="text-6xl mb-6">❌</div>

        <h1 className="font-display text-3xl font-bold text-brand-text mb-3">
          Application Not Approved
        </h1>

        <p className="text-brand-muted font-light leading-relaxed mb-6">
          Unfortunately your vendor application was not approved at this time.
          Please contact our support team for more information.
        </p>

        <div className="flex gap-3 justify-center flex-wrap">
          <Link to="/contact" className="bg-gold text-deep font-semibold px-6 py-3 rounded-full text-sm no-underline hover:bg-gold-light transition-all duration-200 inline-block">
            Contact Support
          </Link>
          <Link to="/" className="bg-transparent text-brand-text border border-white/20 font-medium px-6 py-3 rounded-full text-sm no-underline hover:border-white/40 transition-all duration-200 inline-block">
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  )
}

export default VendorRejected