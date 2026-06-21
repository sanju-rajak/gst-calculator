import { useEffect, useState, useCallback } from 'react'
import Header from './components/Header.jsx'
import Calculator from './components/Calculator.jsx'
import ResultCards from './components/ResultCards.jsx'
import Features from './components/Features.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

const THEME_STORAGE_KEY = 'gst-calculator-theme'

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light'
  const saved = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (saved === 'light' || saved === 'dark') return saved
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme)
  const [calculation, setCalculation] = useState(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  return (
    <>
      <div className="mesh-bg" aria-hidden="true">
        <span />
      </div>

      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main>
        <section className="section calculator-section" id="calculator" aria-label="GST calculator">
          <div className="container calculator-grid">
            <Calculator onResultChange={setCalculation} />
            <ResultCards calculation={calculation} />
          </div>
        </section>

        <Features />
      </main>

      <Footer />
    </>
  )
}
