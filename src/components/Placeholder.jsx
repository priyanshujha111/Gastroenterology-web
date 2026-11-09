/**
 * Highlights placeholder content so it is easy to spot (and swap) before launch.
 *
 * Convention: any placeholder string contains square brackets, e.g.
 *   "Dr. [Name 1]"  or  "Bio pending — [full profile to be supplied]"
 * Search the codebase for "[" inside src/data to find everything left to replace.
 *
 * Strings without brackets render untouched, so this can safely wrap real content
 * once it's swapped in.
 */
const PLACEHOLDER_PATTERN = /\[[^\]]+\]/

function isPlaceholder(value) {
  return typeof value === 'string' && PLACEHOLDER_PATTERN.test(value)
}

export default function Placeholder({ children, className = '' }) {
  if (!isPlaceholder(children)) return children
  return (
    <span
      title="Placeholder — replace before launch"
      className={`rounded-sm outline-1 outline-offset-2 outline-dashed outline-primary/60 ${className}`}
    >
      {children}
    </span>
  )
}

/** Small tag for blocks (e.g. stats) whose values are placeholders. */
export function PlaceholderTag({ children = 'Placeholder — replace before launch', className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-dashed border-current px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${className}`}
    >
      <span aria-hidden="true">●</span>
      {children}
    </span>
  )
}
