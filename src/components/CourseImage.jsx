import { useState } from 'react'

/**
 * Course image with a graceful fallback when the file is missing or the URL is wrong.
 * Usage: <CourseImage course={course} className="h-full w-full object-cover" />
 */
export default function CourseImage({ course, className = '' }) {
  const src = course?.imageUrl
  const [failedSrc, setFailedSrc] = useState(null)

  if (!src || failedSrc === src) {
    return (
      <div
        role="img"
        aria-label={course?.imageAlt || course?.name || 'Course'}
        className={`flex items-center justify-center bg-linear-to-br from-[#D9F3EF] via-[#B6E9E2] to-[#5EEAD4]/60 text-primary/60 ${className}`}
      >
        <svg viewBox="0 0 24 24" className="h-14 w-14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 3h9l4 4v8 M14 3v5h5 M6 3v16h7 M9 11h6 M9 14h4" />
          <circle cx="17.5" cy="17" r="2.5" />
          <path d="M16.3 19.2L15.5 22l2-1 2 1-.8-2.8" />
        </svg>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={course.imageAlt || course.name}
      loading="lazy"
      onError={() => setFailedSrc(src)}
      className={className}
    />
  )
}