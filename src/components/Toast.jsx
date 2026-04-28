import { useEffect } from 'react'

function Toast({ message, show, onHide }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => onHide(), 3500)
      return () => clearTimeout(timer)
    }
  }, [show, onHide])

  const baseClass = 'fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-deep-3 border border-gold/40 text-brand-text px-6 py-4 rounded-brand text-sm max-w-xs transition-all duration-500'
  const visibleClass = show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'

  return (
    <div className={`${baseClass} ${visibleClass}`}>
      <span className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
      {message}
    </div>
  )
}

export default Toast