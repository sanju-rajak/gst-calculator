import { useEffect, useMemo, useState } from 'react'
import {
  GST_RATES,
  DEFAULT_RATE,
  CALCULATION_MODES,
  calculateGST,
  validateAmount,
} from '../utils/gstCalculations.js'
import './Calculator.css'

const MODE_COPY = {
  [CALCULATION_MODES.EXCLUSIVE]: {
    label: 'Add GST',
    sub: 'Exclusive',
    inputLabel: 'Base amount (before GST)',
    helper: 'Enter the price before tax. GST will be added on top.',
  },
  [CALCULATION_MODES.INCLUSIVE]: {
    label: 'Remove GST',
    sub: 'Inclusive',
    inputLabel: 'Total amount (GST included)',
    helper: 'Enter the final price. GST already inside it will be reverse-calculated.',
  },
}

const AMOUNT_PATTERN = /^\d{0,9}(\.\d{0,2})?$/

export default function Calculator({ onResultChange }) {
  const [amount, setAmount] = useState('')
  const [rate, setRate] = useState(DEFAULT_RATE)
  const [mode, setMode] = useState(CALCULATION_MODES.EXCLUSIVE)
  const [touched, setTouched] = useState(false)
  const [hasCalculated, setHasCalculated] = useState(false)
  const [justCalculated, setJustCalculated] = useState(false)

  const liveError = validateAmount(amount)
  const showError = touched && Boolean(liveError)

  const result = useMemo(() => {
    if (!hasCalculated) return null
    if (validateAmount(amount)) return null
    try {
      return calculateGST(amount, rate, mode)
    } catch {
      return null
    }
  }, [amount, rate, mode, hasCalculated])

  useEffect(() => {
    onResultChange(result)
  }, [result, onResultChange])

  function handleAmountChange(event) {
    const value = event.target.value
    if (value === '' || AMOUNT_PATTERN.test(value)) {
      setAmount(value)
    }
  }

  function handleCalculate(event) {
    event.preventDefault()
    setTouched(true)
    const err = validateAmount(amount)
    if (err) {
      setHasCalculated(false)
      return
    }
    setHasCalculated(true)
    setJustCalculated(true)
    window.setTimeout(() => setJustCalculated(false), 500)
  }

  function handleReset() {
    setAmount('')
    setRate(DEFAULT_RATE)
    setMode(CALCULATION_MODES.EXCLUSIVE)
    setTouched(false)
    setHasCalculated(false)
  }

  const activeCopy = MODE_COPY[mode]

  return (
    <section className="card calculator-card glass" aria-labelledby="calculator-heading">
      <div className="card-header">
        <h2 id="calculator-heading">Calculate your GST</h2>
        <p>Pick a mode, enter an amount, choose a slab — done.</p>
      </div>

      <form onSubmit={handleCalculate} noValidate>
        <div className="field-group">
          <span className="field-label" id="mode-label">
            Calculation mode
          </span>
          <div className="segmented" role="radiogroup" aria-labelledby="mode-label">
            {Object.entries(MODE_COPY).map(([modeKey, copy]) => (
              <button
                key={modeKey}
                type="button"
                role="radio"
                aria-checked={mode === modeKey}
                className={`segmented-btn${mode === modeKey ? ' active' : ''}`}
                onClick={() => setMode(modeKey)}
              >
                <span className="segmented-btn-label">{copy.label}</span>
                <span className="segmented-btn-sub">{copy.sub}</span>
              </button>
            ))}
          </div>
          <p className="field-helper">{activeCopy.helper}</p>
        </div>

        <div className="field-group">
          <label htmlFor="amount" className="field-label">
            {activeCopy.inputLabel}
          </label>
          <div className={`input-wrap${showError ? ' input-wrap-error' : ''}`}>
            <span className="input-prefix" aria-hidden="true">
              ₹
            </span>
            <input
              id="amount"
              name="amount"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              placeholder="e.g. 10000"
              value={amount}
              onChange={handleAmountChange}
              onBlur={() => setTouched(true)}
              aria-invalid={showError}
              aria-describedby={showError ? 'amount-error' : undefined}
            />
          </div>
          {showError && (
            <p className="field-error" id="amount-error" role="alert">
              <svg viewBox="0 0 20 20" width="14" height="14" fill="none" aria-hidden="true">
                <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10 6v4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="10" cy="13.4" r="0.9" fill="currentColor" />
              </svg>
              {liveError}
            </p>
          )}
        </div>

        <div className="field-group">
          <span className="field-label" id="rate-label">
            GST rate
          </span>
          <div className="rate-grid" role="radiogroup" aria-labelledby="rate-label">
            {GST_RATES.map((r) => (
              <button
                key={r}
                type="button"
                role="radio"
                aria-checked={rate === r}
                className={`rate-pill${rate === r ? ' active' : ''}`}
                onClick={() => setRate(r)}
              >
                {r}%
              </button>
            ))}
          </div>
        </div>

        <div className="calculator-actions">
          <button type="submit" className={`btn btn-primary btn-full${justCalculated ? ' pulse' : ''}`}>
            Calculate GST
          </button>
          <button type="button" className="btn btn-ghost" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </section>
  )
}
