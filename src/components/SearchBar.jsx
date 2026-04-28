function SearchBar() {
  const inputClass = 'w-full bg-surface border border-white/10 text-brand-text px-4 py-3 rounded-brand text-sm outline-none transition-all duration-200 focus:border-gold/50 appearance-none'
  const labelClass = 'block text-brand-muted text-xs font-semibold tracking-wide uppercase mb-2'

  return (
    <section id="book" className="bg-deep py-20 px-6">
      <div className="max-w-3xl mx-auto bg-deep-3 border border-gold/15 rounded-brand-xl p-10">

        <h3 className="font-display text-2xl font-bold text-brand-text text-center mb-2">Find your perfect vendor</h3>
        <p className="text-brand-muted text-sm text-center mb-8 font-light">Search by event type, city, and date to see available vendors near you.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">

          <div>
            <label className={labelClass}>Event Type</label>
            <select className={inputClass} style={{ background: '#232332' }}>
              <option>Wedding</option>
              <option>Birthday</option>
              <option>Corporate</option>
              <option>Graduation</option>
              <option>Engagement</option>
              <option>Baby Shower</option>
              <option>Festival / Pooja</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>City</label>
            <input type="text" placeholder="e.g. Kolkata, Mumbai…" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Event Date</label>
            <input type="date" className={inputClass} style={{ colorScheme: 'dark' }} />
          </div>

        </div>

        <button className="w-full bg-gold text-deep font-bold py-3 rounded-brand text-sm transition-all duration-200 hover:bg-gold-light">
          Search Vendors →
        </button>

      </div>
    </section>
  )
}

export default SearchBar