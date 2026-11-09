import { useEffect, useRef, useState } from 'react'

/**
 * Reveals an element once it scrolls into view (one-shot).
 * Returns { ref, visible }. Falls back to visible if IntersectionObserver is missing.
 */
export function useReveal({ threshold = 0.15, rootMargin = '0px 0px -8% 0px' } = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const el = ref.current
    if (!el || visible) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold, rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, rootMargin, visible])

  return { ref, visible }
}

/**
 * Natural stagger for grid items: each step is a little shorter than the last
 * (0, 70, 110, 140, 165 … ms) so a row settles rather than ticking evenly.
 */
export const staggerDelay = (index, base = 110) => Math.round(base * Math.log2(index + 2) - base)
