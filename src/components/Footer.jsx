const footerLinks = {
  Services: ['Decoration', 'DJ & Music', 'Catering', 'Photography', 'Venues', 'Makeup'],
  Events:   ['Weddings', 'Birthdays', 'Corporate', 'Festivals', 'Baby Shower', 'Graduation'],
  Company:  ['About Us', 'Become a Vendor', 'Blog', 'Careers', 'Support', 'Privacy Policy'],
}

function Footer() {
  return (
    <footer className="bg-deep-2 border-t border-gold/15 px-6 pt-16 pb-8">
      <div className="max-w-6xl mx-auto">

        {/* Top */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-display text-xl font-bold text-gold mb-3">
              Event<span className="text-brand-text">Ease</span>
            </h3>
            <p className="text-brand-muted text-sm font-light leading-relaxed max-w-xs">
              India's most trusted platform for discovering and booking premium event services. Making every celebration extraordinary.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => {
            return (
              <div key={heading}>
                <h4 className="text-brand-dim text-xs font-semibold tracking-widest uppercase mb-4">{heading}</h4>
                <ul className="flex flex-col gap-2 list-none">
                  {links.map((link) => {
                    return (
                      <li key={link}>
                        <a href="#" className="text-brand-muted text-sm font-light no-underline transition-colors duration-200 hover:text-gold">
                          {link}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gold/10 flex flex-wrap justify-between items-center gap-4">
          <p className="text-brand-dim text-xs">© 2025 EventEase. All rights reserved. Built with ❤ for India.</p>
          <p className="text-brand-dim text-xs">Available in 200+ cities across India</p>
        </div>

      </div>
    </footer>
  )
}

export default Footer