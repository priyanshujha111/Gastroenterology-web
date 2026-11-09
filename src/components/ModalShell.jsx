import { useEffect, useId, useRef } from 'react'

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

/**
 * Accessible modal built on the native <dialog> element: showModal() provides
 * focus trapping, Escape-to-close and the backdrop for free.
 *
 * Props: open, onClose, title, subtitle, children
 */
export default function ModalShell({ open, onClose, title, subtitle, children }) {
  const ref = useRef(null)
  const openRef = useRef(open)
  const titleId = useId()

  useEffect(() => {
    const dialog = ref.current
    openRef.current = open
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  // Lock page scroll while the modal is open.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // The native "close" event fires on Escape and on programmatic close();
  // only notify the parent if it still thinks the modal is open.
  const handleClose = () => {
    if (openRef.current) onClose?.()
  }

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={handleClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose?.() // click on backdrop
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-3xl bg-bg p-0 text-text shadow-2xl shadow-primary/20 backdrop:bg-text/50 backdrop:backdrop-blur-sm"
    >
      <div className="p-7 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id={titleId} className="font-display text-2xl font-medium text-primary">
              {title}
            </h2>
            {subtitle && <p className="mt-1 text-sm text-text/70">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={`-mt-1 -mr-2 rounded-full p-2 text-text/60 transition hover:bg-support hover:text-primary ${focusRing}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </dialog>
  )
}

export function Field({ label, type = 'text', name, autoComplete, required = true }) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-text">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className={`mt-1.5 block w-full rounded-xl border border-primary/20 bg-white px-4 py-2.5 text-text placeholder:text-text/40 transition focus:border-primary ${focusRing}`}
      />
    </div>
  )
}
