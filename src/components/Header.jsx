import ThemeToggle from './ThemeToggle.jsx'
import './Header.css'

export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="site-header">
      <div className="container nav-row">
        <a href="#calculator" className="brand">
          <span className="brand-mark" aria-hidden="true">
            ₹%
          </span>
          <span className="brand-name">GST Calculator</span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          <a href="#calculator">Calculator</a>
          <a href="#benefits">Why this tool</a>
        </nav>

        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>

      <div className="container hero">
        <span className="eyebrow">
          <span className="eyebrow-dot" aria-hidden="true" />
          5% · 12% · 18% · 28% slabs supported
        </span>

        <h1 className="hero-title">
          GST Calculator,
          <br />
          <span className="hero-title-accent">built for accuracy.</span>
        </h1>

        <p className="hero-subtitle">
          Calculate GST-inclusive and GST-exclusive amounts instantly, with a full
          CGST / SGST breakdown for every Indian tax slab. No sign-up, no spreadsheets,
          no rounding errors.
        </p>

        <div className="hero-meta" aria-hidden="true">
          <div className="hero-meta-item">
            <strong>4</strong>
            <span>GST slabs</span>
          </div>
          <div className="hero-meta-divider" />
          <div className="hero-meta-item">
            <strong>0₹</strong>
            <span>Always free</span>
          </div>
          <div className="hero-meta-divider" />
          <div className="hero-meta-item">
            <strong>&lt;1s</strong>
            <span>To a result</span>
          </div>
        </div>
      </div>
    </header>
  )
}
