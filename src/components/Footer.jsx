import './Footer.css'

// TODO: replace with your real email before publishing/submitting this project.
const DEVELOPER_NAME = 'Sanju Rajak'
const DEVELOPER_EMAIL = 'sanju.rajak@example.com'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="brand-mark" aria-hidden="true">
              ₹%
            </span>
            <div>
              <p className="footer-brand-name">GST Calculator</p>
              <p className="footer-tagline">Instant, accurate GST math for every Indian tax slab.</p>
            </div>
          </div>

          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary digital-heroes-btn"
          >
            Built for Digital Heroes
          </a>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="developer-credit">
            <span>
              Full Name: <strong>{DEVELOPER_NAME}</strong>
            </span>
            <span className="credit-sep" aria-hidden="true">
              ·
            </span>
            <span>
              Email:{' '}
              <a href={`mailto:${DEVELOPER_EMAIL}`} className="credit-link">
                {DEVELOPER_EMAIL}
              </a>
            </span>
          </p>
          <p className="footer-copyright">© {year} GST Calculator. All calculations performed locally in your browser.</p>
        </div>
      </div>
    </footer>
  )
}
