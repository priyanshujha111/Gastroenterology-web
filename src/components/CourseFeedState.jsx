/**
 * Non-"ready" states for the LMS course feed: loading, not-configured, error, empty.
 * Shared by Home (featured courses) and the Courses page.
 */
export default function CourseFeedState({ status, error, onRetry, skeletonCount = 3 }) {
  if (status === 'loading') {
    return (
      <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3" aria-busy="true" aria-label="Loading courses">
        {Array.from({ length: skeletonCount }, (_, i) => (
          <div key={i} className="h-72 animate-pulse rounded-3xl bg-white/70 shadow-soft" />
        ))}
      </div>
    )
  }

  // 'empty' = the API answered but no course matched Gastroenterology:
  // show "on their way" rather than unrelated courses.
  const onTheirWay = {
    title: 'Course listings are on their way',
    body: 'Our Gastroenterology programmes will appear here shortly. Check back soon.',
  }
  const messages = {
    empty: onTheirWay,
    'not-configured': onTheirWay,
    error: {
      title: 'We couldn’t load courses right now',
      body: 'Please try again in a moment.',
    },
  }
  const msg = messages[status] ?? messages.error

  return (
    <div className="flex flex-col items-center rounded-3xl bg-white/80 px-8 py-16 text-center shadow-soft">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 6.5C4 5.7 4.7 5 5.5 5H10l2 2h6.5c.8 0 1.5.7 1.5 1.5v9c0 .8-.7 1.5-1.5 1.5h-13C4.7 19 4 18.3 4 17.5z" />
          <path d="M9 13h6" />
        </svg>
      </span>
      <p className="mt-6 font-display text-2xl text-primary">{msg.title}</p>
      <p className="mt-2 max-w-md text-base leading-relaxed text-text/70">{msg.body}</p>

      {status === 'error' && onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-8 inline-flex h-12 items-center rounded-xl bg-primary px-6 text-sm font-semibold text-white shadow-soft transition duration-300 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-soft-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Try again
        </button>
      )}

      {/* Developer-only hint, never shown in production builds */}
      {import.meta.env.DEV && (
        <p className="mt-8 max-w-lg rounded-2xl bg-bg px-4 py-4 text-left font-mono text-xs text-text/60">
          DEV: status = “{status}”.{' '}
          {status === 'empty'
            ? 'The LMS answered, but 0 courses matched matchesGastroenterology() in src/api/lms.js. See the [lms] console line for total vs matched counts.'
            : error?.message}
        </p>
      )}
    </div>
  )
}
