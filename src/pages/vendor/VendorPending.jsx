import { Link } from 'react-router-dom'

function VendorPending() {
  return (
    <div className="min-h-screen bg-deep flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">

        <div className="text-6xl mb-6">⏳</div>

        <h1 className="font-display text-3xl font-bold text-brand-text mb-3">
          Application Under Review
        </h1>

        <p className="text-brand-muted font-light leading-relaxed mb-6">
          Thank you for registering! Our team is reviewing your application.
          You'll be notified once your profile is approved — usually within 24 hours.
        </p>

        <div className="bg-deep-3 border border-gold/15 rounded-brand-xl p-6 mb-8 text-left">
          <h3 className="text-brand-text font-semibold text-sm mb-3">What happens next?</h3>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-2 text-brand-muted text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
              Our team reviews your profile and documents
            </li>
            <li className="flex items-center gap-2 text-brand-muted text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
              We verify your service details and pricing
            </li>
            <li className="flex items-center gap-2 text-brand-muted text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
              You get notified via email once approved
            </li>
            <li className="flex items-center gap-2 text-brand-muted text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
              Your listing goes live and bookings start coming in!
            </li>
          </ul>
        </div>

        <Link to="/" className="bg-gold text-deep font-semibold px-8 py-3 rounded-full text-sm no-underline hover:bg-gold-light transition-all duration-200 inline-block">
          Back to Home
        </Link>

      </div>
    </div>
  )
}

export default VendorPending