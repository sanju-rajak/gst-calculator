import { formatCurrency } from '../utils/formatCurrency.js'
import { useCountUp } from '../hooks/useCountUp.js'
import './ResultCards.css'

const ICONS = {
  base: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="18" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 10h18" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 14.5h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  gst: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <circle cx="7.5" cy="7.5" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16.5" cy="16.5" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M18 6 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  total: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path
        d="M6 3h12v17.2c0 .7-.7 1.1-1.3.8L13 19l-1.7 2a1.1 1.1 0 0 1-1.6 0L8 19l-3.7 2c-.6.3-1.3-.1-1.3-.8V4c0-.6.4-1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M8 9h8M8 12.5h8M8 16h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
}

function StatCard({ label, value, accent, icon }) {
  const animated = useCountUp(value)
  return (
    <div className={`stat-card glass${accent ? ` stat-card-${accent}` : ''}`}>
      <span className="stat-card-icon" aria-hidden="true">
        {icon}
      </span>
      <span className="stat-card-label">{label}</span>
      <span className="stat-card-value tabular">{formatCurrency(animated)}</span>
    </div>
  )
}

function EmptyState() {
  return (
    <section className="card results-empty glass" aria-live="polite">
      <span className="results-empty-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
          <rect x="4" y="2.5" width="16" height="19" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 7h8M8 11h2.2M13 11h3M8 14.5h2.2M13 14.5h3M8 18h2.2M13 18h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>
      <h3>Your results will appear here</h3>
      <p>
        Enter an amount on the left and select <strong>Calculate GST</strong> to see the base amount, GST
        amount, total, and a full CGST / SGST breakdown.
      </p>
    </section>
  )
}

export default function ResultCards({ calculation }) {
  if (!calculation) {
    return <EmptyState />
  }

  const { baseAmount, gstAmount, totalAmount, cgst, sgst, rate, mode } = calculation
  const halfRate = rate / 2

  return (
    <div className="results-dashboard" aria-live="polite">
      <div className="stat-grid">
        <StatCard label="Base amount" value={baseAmount} icon={ICONS.base} />
        <StatCard label={`GST amount (${rate}%)`} value={gstAmount} accent="gold" icon={ICONS.gst} />
        <StatCard label="Total amount" value={totalAmount} accent="green" icon={ICONS.total} />
      </div>

      <section className="card breakdown-card glass" aria-label="Tax breakdown">
        <div className="receipt-edge" />

        <div className="breakdown-header">
          <h3>Tax breakdown</h3>
          <span className="breakdown-mode-tag">
            {mode === 'inclusive' ? 'GST removed from total' : 'GST added to base'}
          </span>
        </div>

        <ul className="breakdown-list">
          <li>
            <span>Base amount</span>
            <span className="tabular">{formatCurrency(baseAmount)}</span>
          </li>
          <li>
            <span>
              CGST <em>({halfRate}%)</em>
            </span>
            <span className="tabular">{formatCurrency(cgst)}</span>
          </li>
          <li>
            <span>
              SGST <em>({halfRate}%)</em>
            </span>
            <span className="tabular">{formatCurrency(sgst)}</span>
          </li>
          <li className="breakdown-note">
            <span>
              or IGST <em>({rate}%, inter-state)</em>
            </span>
            <span className="tabular">{formatCurrency(gstAmount)}</span>
          </li>
        </ul>

        <div className="breakdown-total">
          <span>Total payable</span>
          <span className="tabular">{formatCurrency(totalAmount)}</span>
        </div>

        <div className="receipt-edge receipt-edge-bottom" />
      </section>
    </div>
  )
}
