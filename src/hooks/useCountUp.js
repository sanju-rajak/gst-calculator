import { useEffect, useRef, useState } from 'react'

/**
 * Animates a number smoothly from its previous value to a new target
 * whenever the target changes. Used to give the result cards a tactile,
 * "instant calculation" feel. Respects prefers-reduced-motion.
 */
export function useCountUp(target, duration = 550) {
  const numericTarget = Number.isFinite(target) ? target : 0
  const [value, setValue] = useState(numericTarget)
  const fromRef = useRef(numericTarget)
  const rafRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setValue(numericTarget)
      fromRef.current = numericTarget
      return undefined
    }

    const from = fromRef.current
    const to = numericTarget
    const startTime = performance.now()

    if (rafRef.current) cancelAnimationFrame(rafRef.current)

    function tick(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setValue(from + (to - from) * eased)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        fromRef.current = to
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numericTarget, duration])

  return value
}
