import Placeholder from './Placeholder.jsx'

/**
 * Faculty card (centred, static: no "View profile" link).
 *   name → specialty focus → qualification pill → divider → focus-area tags
 * Used by Home (faculty preview) and the Doctors page; one implementation.
 *
 * doctor: { name, focus, qualification, focusAreas[] }
 * Any bracketed value is a placeholder and gets the dashed placeholder outline.
 */
export default function DoctorCard({ doctor }) {
  const { name, focus, qualification, focusAreas = [] } = doctor

  return (
    <article className="flex h-full flex-col items-center rounded-3xl bg-white p-6 text-center shadow-soft ring-1 ring-primary/5 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-soft-lg">
      <h3 className="font-display text-xl font-semibold text-text">
        <Placeholder>{name}</Placeholder>
      </h3>

      {focus && (
        <p className="mt-1 text-sm font-semibold text-secondary">
          <Placeholder>{focus}</Placeholder>
        </p>
      )}

      {qualification && (
        // rounded-2xl (not rounded-full) so a qualification that wraps onto two lines at
        // 375px still reads as a tidy chip instead of a squashed pill.
        <p className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-support px-4 py-2 text-sm leading-snug font-medium text-balance text-primary">
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 3L2 8l10 5 10-5-10-5z M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" />
          </svg>
          <Placeholder>{qualification}</Placeholder>
        </p>
      )}

      {focusAreas.length > 0 && (
        <>
          <hr className="my-4 w-full border-support" />
          <ul className="flex flex-wrap justify-center gap-2" aria-label="Focus areas">
            {focusAreas.map((area, i) => (
              <li
                key={i}
                className="rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white"
              >
                <Placeholder>{area}</Placeholder>
              </li>
            ))}
          </ul>
        </>
      )}
    </article>
  )
}
