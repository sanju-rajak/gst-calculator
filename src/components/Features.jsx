import './Features.css'

const FEATURES = [
  {
    title: 'Accurate',
    desc: 'Built on exact GST formulas with rounding handled to the paisa, so the math always matches your invoice.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
        <path d="M12 3 4 6.5v5c0 5 3.4 8.7 8 9.5 4.6-.8 8-4.5 8-9.5v-5L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="m8.5 12 2.4 2.4L16 9.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Instant',
    desc: 'Results update the moment you change the amount, rate, or mode — no page reloads, no waiting.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
        <path d="M12.5 2.5 4 13.5h6l-1 8 8.5-11.5h-6l1-7.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Free',
    desc: 'No sign-up, no paywall, no limits. A calculator you can bookmark and use every single day.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9.5 9.2c0-1.5 1.1-2.4 2.6-2.4s2.5.8 2.5 2c0 1.6-2.6 1.8-2.6 3.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="12" cy="16.2" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Mobile friendly',
    desc: 'Designed mobile-first with large tap targets, so it works as well on a phone as it does on a desktop.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
        <rect x="7" y="2.5" width="10" height="19" rx="2.2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M11 18.2h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function Features() {
  return (
    <section className="section features-section" id="benefits" aria-labelledby="features-heading">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            Why this tool
          </span>
          <h2 id="features-heading">Made for everyday GST math</h2>
          <p>Whether you bill clients, file returns, or just check a receipt — it&apos;s built to be trustworthy.</p>
        </div>

        <div className="features-grid">
          {FEATURES.map((feature) => (
            <div className="feature-card glass" key={feature.title}>
              <span className="feature-icon" aria-hidden="true">
                {feature.icon}
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
