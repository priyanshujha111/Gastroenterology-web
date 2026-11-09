import { useEffect, useRef } from 'react'
import ProtectedImage from './ProtectedImage.jsx'

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

/**
 * Full-size image viewer built on the native <dialog> element (focus trap and
 * Escape-to-close come for free). Click the backdrop or the × to close.
 *
 * Props:
 *   image   { src, alt, title, width?, height? } or null (closed)
 *   onClose called when the viewer should close
 *   onFail  optional, called with src if the full-size image fails to load
 */
export default function ImageLightbox({ image, onClose, onFail }) {
  const ref = useRef(null)
  const open = Boolean(image)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  // Lock page scroll while open.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-label={image?.title}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose() // click on backdrop / empty area
      }}
      className="m-auto w-[min(92vw,64rem)] overflow-visible bg-transparent p-0 backdrop:bg-text/80 backdrop:backdrop-blur-sm"
    >
      {image && (
        <figure className="relative mx-auto w-fit max-w-full rounded-2xl bg-white p-3 shadow-2xl shadow-text/30">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={`absolute -top-3 -right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-lg transition hover:text-primary-dark ${focusRing}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <ProtectedImage
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="eager"
            onFail={(src) => {
              onFail?.(src)
              onClose()
            }}
            className="mx-auto max-h-[78vh] w-auto rounded-lg object-contain"
          />
          {image.title && (
            <figcaption className="px-2 pt-3 pb-1 text-center font-display text-base text-primary">
              {image.title}
            </figcaption>
          )}
        </figure>
      )}
    </dialog>
  )
}
