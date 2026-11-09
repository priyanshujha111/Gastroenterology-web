import { useState } from 'react'

/**
 * Image wrapper for credential images (badges, certificates).
 *
 * - Load failure: renders nothing (never a broken-image icon) and calls
 *   onFail(src) so the parent can drop the whole item from its layout.
 * - Light deterrent against casual copying: not draggable, no right-click
 *   menu, not selectable. This is NOT real protection: anything a browser
 *   displays can still be saved.
 */
export default function ProtectedImage({ src, alt, onFail, className = '', loading = 'lazy', ...rest }) {
  const [failedSrc, setFailedSrc] = useState(null)
  if (failedSrc === src) return null

  return (
    <img
      {...rest}
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      draggable={false}
      onContextMenu={(e) => e.preventDefault()}
      onError={() => {
        setFailedSrc(src)
        onFail?.(src)
      }}
      className={`select-none ${className}`}
    />
  )
}
