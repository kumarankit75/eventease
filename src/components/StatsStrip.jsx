const stats = [
  { num: '12,000+', label: 'Verified Vendors' },
  { num: '85,000+', label: 'Events Planned' },
  { num: '4.9★',    label: 'Average Rating' },
  { num: '200+',    label: 'Cities Covered' },
]

function StatsStrip() {
  return (
    <div className="flex justify-center flex-wrap gap-16 px-8 py-10 bg-deep-2 border-t border-b border-gold/15">
      {stats.map((s) => {
        return (
          <div key={s.label} className="text-center">
            <div className="font-display text-3xl font-bold text-gold mb-1">{s.num}</div>
            <div className="text-brand-muted text-xs tracking-wide uppercase">{s.label}</div>
          </div>
        )
      })}
    </div>
  )
}

export default StatsStrip