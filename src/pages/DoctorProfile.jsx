import { useParams } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb.jsx'
import CTASection from '../components/CTASection.jsx'
import Placeholder from '../components/Placeholder.jsx'
import { getDoctorById } from '../data/doctors.js'
import NotFound from './NotFound.jsx'

export default function DoctorProfile() {
  const { id } = useParams()
  const doctor = getDoctorById(id)
  if (!doctor) return <NotFound />

  const { name, qualification, focus, photo, bio, qualifications, focusAreas } = doctor

  return (
    <>
      <title>{`${name} | Faculty | GastroenterologyNow`}</title>
      <meta name="description" content={`${name}: ${qualification}. ${focus}.`} />

      <section className="bg-support/60">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-5 lg:px-6">
          <Breadcrumb items={[{ label: 'Doctors', to: '/doctors' }, { label: name }]} />
        </div>
      </section>

      <article className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Portrait column: pulled up into the sage band */}
          <div className="lg:col-span-4">
            <div className="relative overflow-hidden rounded-3xl bg-support ring-8 ring-bg lg:sticky lg:top-28 lg:mt-6">
              <div className="aspect-[4/5]">
                {photo ? (
                  <img src={photo} alt={`Portrait of ${name}`} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-end justify-center">
                    <svg viewBox="0 0 120 140" className="h-4/5 w-4/5 text-primary/20" fill="currentColor" aria-hidden="true">
                      <circle cx="60" cy="48" r="26" />
                      <path d="M10 140c4-32 24-50 50-50s46 18 50 50z" />
                    </svg>
                    <span className="absolute top-4 left-4 rounded-full bg-bg/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                      Photo pending
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4 pb-24 lg:col-span-8 lg:pt-14 md:pb-32">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">Faculty profile</p>
            <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-primary lg:text-5xl">
              <Placeholder>{name}</Placeholder>
            </h1>
            <p className="mt-3 text-lg text-text/80">
              <Placeholder>{qualification}</Placeholder>
            </p>
            <p className="mt-1 font-semibold text-secondary">
              <Placeholder>{focus}</Placeholder>
            </p>

            <section className="mt-10">
              <h2 className="font-display text-2xl font-medium text-primary">Biography</h2>
              <div className="mt-4 space-y-4 text-lg leading-relaxed text-text/80">
                {bio.map((p, i) => (
                  <p key={i}>
                    <Placeholder>{p}</Placeholder>
                  </p>
                ))}
              </div>
            </section>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <section className="rounded-2xl border border-primary/10 bg-white p-6">
                <h2 className="font-display text-xl font-medium text-primary">Qualifications</h2>
                <ul className="mt-4 space-y-3">
                  {qualifications.map((q, i) => (
                    <li key={i} className="flex gap-3 text-sm text-text/80">
                      <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                      <Placeholder>{q}</Placeholder>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-2xl bg-support/60 p-6">
                <h2 className="font-display text-xl font-medium text-primary">Specialty focus</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {focusAreas.map((f, i) => (
                    <li key={i} className="rounded-full bg-bg px-3 py-1.5 text-sm font-medium text-primary">
                      <Placeholder>{f}</Placeholder>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </article>

      <CTASection title="Learn with our faculty." text="See which programmes are open for enrolment." />
    </>
  )
}
