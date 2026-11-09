/**
 * Original abstract line illustrations. Calm curves that loosely suggest a
 * pathway, never anatomy or instruments. Colours come only from theme tokens
 * (CSS variables / utilities).
 *
 *   FlowRibbonArt  hero illustration (Home hero): thin S-curve + two floating cards
 *   RibbonTrace    full-width ribbon along a section's bottom edge (colour via text-*)
 *   RibbonPattern  faint background art for dark/primary cards (absolute, fills parent)
 */

/**
 * Home hero art. Sized exactly as before (same wrapper classes, 480×540 viewBox), so the
 * Hero layout is unchanged. Layers, back to front:
 *   1. faint dot grid (secondary at 7%), fading out towards the edges
 *   2. one thin S-curve, stroke gradient teal (primary) → navy (secondary)
 *   3. two small HTML cards placed in open space beside the curve (not on it),
 *      positioned in % of the 480×540 box so they track the SVG at every width.
 * Purely decorative: the whole block is aria-hidden.
 */
export function FlowRibbonArt() {
  // Starts top-left, swings right, crosses the centre, swings left, ends bottom-right.
  const curve = 'M60 90 C 360 90, 420 230, 240 270 C 60 310, 120 450, 420 450'

  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-md lg:-mt-16 lg:max-w-none">
      <svg viewBox="0 0 480 540" className="h-auto w-full">
        <defs>
          <pattern id="gn-dot-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="1.5" style={{ fill: 'var(--color-secondary)' }} />
          </pattern>
          {/* Soft radial fade so the grid has no hard rectangular edge */}
          <radialGradient id="gn-dot-fade" cx="50%" cy="50%" r="55%">
            <stop offset="55%" stopColor="#fff" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="gn-dot-mask">
            <rect width="480" height="540" fill="url(#gn-dot-fade)" />
          </mask>
          <linearGradient id="gn-flow-line" gradientUnits="userSpaceOnUse" x1="60" y1="90" x2="420" y2="450">
            <stop offset="0%" style={{ stopColor: 'var(--color-primary)' }} />
            <stop offset="100%" style={{ stopColor: 'var(--color-secondary)' }} />
          </linearGradient>
        </defs>

        {/* 1. Background texture */}
        <rect width="480" height="540" fill="url(#gn-dot-grid)" opacity="0.07" mask="url(#gn-dot-mask)" />

        {/* 2. The line, with small open end-points */}
        <path d={curve} fill="none" stroke="url(#gn-flow-line)" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="60" cy="90" r="6" className="fill-bg stroke-primary" strokeWidth="2.5" />
        <circle cx="420" cy="450" r="6" className="fill-bg stroke-secondary" strokeWidth="2.5" />
      </svg>

      {/* 3. Floating cards: left of the curve's upper swing, right of its lower swing */}
      <FloatCard className="top-[30%] left-[8%]" tone="primary" label="Case reviewed">
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </FloatCard>
      <FloatCard className="top-[62%] right-[6%]" tone="secondary" label="Confident diagnosis">
        <path d="M3 12h4l2.5-6 4 12 2.5-6H21" />
      </FloatCard>
    </div>
  )
}

/** Small white card: tinted icon disc + one short label. Text is charcoal on white. */
function FloatCard({ className = '', tone, label, children }) {
  const disc = tone === 'secondary' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'
  return (
    <div
      className={`absolute inline-flex w-max items-center gap-2 rounded-xl bg-white/95 py-2 pr-3 pl-2 shadow-soft ring-1 ring-primary/10 ${className}`}
    >
      <span className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${disc}`}>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {children}
        </svg>
      </span>
      <span className="text-xs font-semibold whitespace-nowrap text-text">{label}</span>
    </div>
  )
}

/**
 * Full-width ribbon along the bottom of a section. Set colour and strength with
 * text-* and opacity-* classes, e.g. "text-primary-light opacity-50".
 * preserveAspectRatio "slice" keeps the curves undistorted; narrow screens show the middle.
 */
export function RibbonTrace({ className = '' }) {
  const wave = 'M-40 74 C 140 22, 300 118, 470 66 S 780 18, 940 70 S 1130 116, 1240 52'
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 120"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-24 w-full ${className}`}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
    >
      <path d={wave} strokeWidth="16" strokeOpacity="0.55" />
      <path d={wave} strokeWidth="2" strokeDasharray="0.1 16" transform="translate(0 20)" />
      <path d="M1046 34 a4 4 0 0 1 8 0 a8 8 0 0 1 -16 0 a12 12 0 0 1 24 0" strokeWidth="2" />
    </svg>
  )
}

/** Faint ribbons, spiral and orbs behind content on a primary-coloured card. */
export function RibbonPattern() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
      fill="none"
    >
      <g className="stroke-white" strokeLinecap="round">
        <path d="M-20 250 C 70 200, 150 290, 240 236 S 360 196, 420 224" strokeWidth="26" strokeOpacity="0.07" />
        <path d="M-20 250 C 70 200, 150 290, 240 236 S 360 196, 420 224" strokeWidth="2" strokeOpacity="0.25" strokeDasharray="0.1 14" />
        <path d="M-20 140 C 40 116, 90 166, 160 132" strokeWidth="14" strokeOpacity="0.06" />
      </g>
      <path
        d="M336 64 a6 6 0 0 1 12 0 a12 12 0 0 1 -24 0 a18 18 0 0 1 36 0 a24 24 0 0 1 -48 0"
        className="stroke-primary-light"
        strokeOpacity="0.45"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="80" cy="60" r="10" className="fill-white" fillOpacity="0.06" />
      <circle cx="300" cy="170" r="5" className="fill-primary-light" fillOpacity="0.35" />
      <circle cx="190" cy="120" r="3" className="fill-white" fillOpacity="0.2" />
    </svg>
  )
}
