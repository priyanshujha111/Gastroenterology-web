// src/pages/Home.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading.jsx'
import CourseCard from '../components/CourseCard.jsx'
import CourseFeedState from '../components/CourseFeedState.jsx'
import DoctorCard from '../components/DoctorCard.jsx'
import CTASection from '../components/CTASection.jsx'
import FaqSection from '../components/FaqSection.jsx'
import Reveal from '../components/Reveal.jsx'
import ProtectedImage from '../components/ProtectedImage.jsx'
import ImageLightbox from '../components/ImageLightbox.jsx'
import { staggerDelay } from '../hooks/useReveal.js'
import { useGastroCourses } from '../api/lms.js'
import { doctors } from '../data/doctors.js'
import EnquiryModal from '../components/EnquiryModal.jsx'

/* ============================================================================
 * ACCREDITATION: real Medical Global Academy credentials, shared across all
 * MGA verticals. Data below is VERBATIM as supplied; do not reword titles,
 * alt text or details.
 * ========================================================================== */
const uploads = 'https://medicalglobalacademy.com/wp-content/uploads'

const accreditations = [
  {
    src: `${uploads}/2026/09/WhatsApp-Image-2026-09-25-at-4.27.09-PM.jpeg`,
    kind: 'logo',
    title: 'CPD Accredited Badge',
    alt: 'Accredited CPD & Training Excellence badge, PDCD1106 Dual Training & CPD Accreditation',
  },
  {
    src: `${uploads}/2026/09/WhatsApp-Image-2026-09-24-at-12.17.06-PM.jpeg`,
    kind: 'logo',
    title: 'ACTD Member Seal',
    alt: 'ACTD — American Council of Training and Development eagle seal',
  },
  {
    src: `${uploads}/2026/10/WhatsApp-Image-2026-10-17-at-10.15.41-AM.jpeg`,
    kind: 'certificate',
    width: 1024,
    height: 726,
    title: 'CPD Accreditation Certificate',
    alt: 'Official Certificate of CPD Accreditation certifying that Medical Global Academy has achieved Dual CPD & Provider of Training Excellence status with The CPD Standards Office, provider number PDCD1106, valid 2026–2028',
  },
  {
    src: `${uploads}/2026/10/WhatsApp-Image-2026-10-17-at-5.58.43-PM.jpeg`,
    kind: 'certificate',
    width: 1600,
    height: 1236,
    title: 'ACTD Certificate of Accreditation',
    alt: 'American Council of Training and Development Certificate of Accreditation certifying Medical Global Academy as an accredited professional training institution, accreditation number GNA452N, valid until September 12, 2027',
  },
]

// Each entry is one credential. Values are the same verified details as before,
// split into labelled fields so they read as a clean fact sheet.
// ACTD facts are intentionally empty (accreditation number and validity date removed
// from the section). The UI hides the fact lines when `facts` is empty.
const accreditationDetails = [
  {
    name: 'CPD Accreditation',
    body: 'Dual CPD & Provider of Training Excellence, awarded by The CPD Standards Office.',
    facts: [
      { label: 'Provider number', value: 'PDCD1106' },
      { label: 'Valid', value: '2026–2028' },
    ],
  },
  {
    name: 'ACTD Accreditation',
    body: 'Accredited professional training institution, certified by the American Council of Training and Development.',
    facts: [],
  },
]

// Pair by position: [0] CPD, [1] ACTD.
const certificateImages = accreditations.filter((a) => a.kind === 'certificate')
const logoImages = accreditations.filter((a) => a.kind === 'logo')

/* ============================================================================
 * HERO CONFIG: the whole hero is ONE full-width image.
 *
 * Save the file as  public/hero-full.jpg  (served at /hero-full.jpg).
 * The image already contains the heading, badge, feature items, buttons and the
 * stats bar (its navbar part was cropped off, so your real Navbar stays as is).
 *
 * To keep the page accessible and clickable:
 *  - the real <h1> + intro text are in the page but visually hidden (sr-only)
 *  - transparent real links sit exactly on top of the "Enroll Now" and
 *    "Watch Overview" buttons drawn in the image
 *
 * NOTE: the numbers drawn inside the image (10K+, 4.8/5, 100%) are part of the
 * picture and cannot be edited in code. Confirm they are true before launch, or
 * remove them from the image.
 * ========================================================================== */
const HERO_BG_SRC = '/hero-full.jpg'

// "Watch Overview" currently scrolls to the "Why MGA" section.
// TODO: replace with a video modal / link when the overview video is ready.
const HERO_OVERVIEW_HREF = '#why-mga'

// Hit-areas for the buttons drawn in the image, as % of the image size
// (image is 1672 x 823 after cropping the navbar).
const heroEnrollArea = { left: '5.3%', top: '64.8%', width: '14.4%', height: '9.1%' }
const heroOverviewArea = { left: '21.4%', top: '64.9%', width: '15.2%', height: '9.2%' }

// DRAFT COPY: outcome-led value points. Descriptive, not factual claims, but confirm
// each one matches how the programmes are actually taught before launch.
// Cells stretch to the tallest one in the row (h-full), so copy length can vary.
// icon = stroke path(s) drawn on a 24x24 grid.
// accent = the one card shown as the navy + amber accent (certification).
const whyFeatures = [
  {
    icon: 'M16 19v-1a4 4 0 00-4-4H7a4 4 0 00-4 4v1 M9.5 10a3 3 0 100-6 3 3 0 000 6z M21 19v-1a4 4 0 00-3-3.87 M16 4.13a3 3 0 010 5.74',
    title: 'Faculty who are still in the clinic',
    text: 'Learn from gastroenterologists seeing real patients this week, so every case discussion reflects current practice, not last decade’s textbook.',
  },
  {
    icon: 'M11 17a6 6 0 100-12 6 6 0 000 12z M20 20l-4.5-4.5',
    title: 'Know the next move, not just the answer',
    text: 'Build the pattern recognition to read liver panels, weigh endoscopic findings, and decide when to investigate further or watch and wait — in seconds, not after a search.',
  },
  {
    icon: 'M12 20a8 8 0 100-16 8 8 0 000 16z M12 8v4l3 2',
    title: 'Learn without stepping away from work',
    text: 'Structured for practising doctors, so the course moves at a pace your rota can actually keep up with.',
  },
  {
    icon: 'M12 15a6 6 0 100-12 6 6 0 000 12z M8.2 13.9L7 22l5-3 5 3-1.2-8.1',
    title: 'A certificate that does something for you',
    text: 'Finish with a CPD- and ACTD-backed certificate that adds real weight to your profile from day one.',
    accent: true,
  },
]

// TODO: confirm these hospitals are partners for the gastroenterology programmes before launch.
// The partners strip hides itself if this list is empty.
const hospitals = [
  'Medanta',
  'Fortis',
  'Manipal Hospitals',
  'Jeeban Suraksha Hospital',
  'Max Hospital',
]

// TODO: confirm with the academic team what each gastroenterology programme really includes.
// Do not mention live procedures, hands-on or clinical training unless a course offers it.
const pathwaySteps = [
  {
    title: 'Pick your programme',
    description:
      'Choose the GI fellowship or course that matches where you want to be — from first principles to complex liver and bowel disease.',
  },
  {
    title: 'Work the cases with faculty',
    description:
      'Go through real case discussions with practising gastroenterologists — the same reasoning they use on the ward, laid out step by step.',
  },
  {
    title: 'Apply it yourself',
    description:
      'Take each case from presentation to investigation to management decision, until the reasoning becomes automatic, not something you have to look up.',
  },
  {
    title: 'Walk away certified',
    description:
      'Finish with a CPD- and ACTD-backed certificate that confirms what you can now do, not just what you sat through.',
    badges: ['CPD', 'ACTD'],
  },
]

const hospitalMarqueeCss = `
@keyframes gastro-hospitals-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.gastro-hospitals-track { animation: gastro-hospitals-scroll 35s linear infinite; }
.gastro-hospitals-viewport:hover .gastro-hospitals-track { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) {
  .gastro-hospitals-track { animation: none; }
  .gastro-hospitals-viewport { overflow-x: auto; }
}
`

// SAMPLE COPY: these quotes were drafted for layout and tone only. Replace each one with the
// doctor's own words (and confirm their name, role and consent) before this goes live.
// In production the section stays hidden until TESTIMONIALS_CONFIRMED is set to true.
const TESTIMONIALS_CONFIRMED = false
const showTestimonials = import.meta.env.DEV || TESTIMONIALS_CONFIRMED

const doctorQuotes = [
  {
    name: 'Dr. Renjit',
    role: 'Medical Professional',
    quote:
      'The case discussions were the best part. Each one moved from presentation to investigations to management, so I followed the reasoning instead of memorising lists. It has changed how I think through GI cases.',
  },
  {
    name: 'Dr. Sunil',
    role: 'Medical Professional',
    quote:
      'I was worried about fitting a programme around my rota. The course is organised so that it stays manageable, and the learning material is easy to come back to for a quick revision before clinic.',
  },
  {
    name: 'Dr. Abhijit',
    role: 'Medical Professional',
    quote:
      'I valued learning from clinicians who practise gastroenterology every day. The sessions on liver tests and endoscopic findings were practical, and the faculty were generous with every question.',
  },
  {
    name: 'Dr. Krishna Reddy',
    role: 'Medical Professional',
    quote:
      'The teaching follows current clinical guidance and shows how it applies at the bedside. That is exactly what I wanted: clear, up to date and relevant to the patients I actually see.',
  },
  {
    name: 'Dr. S. Suresh',
    role: 'Medical Professional',
    quote:
      'Enrolment was smooth and the support team replied quickly. The CPD and ACTD backed certificate adds real weight to my profile, and I would recommend the course to colleagues building their GI knowledge.',
  },
]

const initialsOf = (name) =>
  name
    .replace(/^Dr\.?\s*/i, '')
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

// Two rows drifting in opposite directions. Each track holds its set twice and moves by exactly
// half, so the loop is seamless. Pauses on hover/focus. Reduced-motion users get swipeable rows.
const quotesMarqueeCss = `
@keyframes gastro-quotes-left {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@keyframes gastro-quotes-right {
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
}
.gastro-quotes-track-left { animation: gastro-quotes-left 55s linear infinite; }
.gastro-quotes-track-right { animation: gastro-quotes-right 65s linear infinite; }
.gastro-quotes-viewport:hover .gastro-quotes-track-left,
.gastro-quotes-viewport:hover .gastro-quotes-track-right,
.gastro-quotes-viewport:focus-within .gastro-quotes-track-left,
.gastro-quotes-viewport:focus-within .gastro-quotes-track-right { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) {
  .gastro-quotes-track-left, .gastro-quotes-track-right { animation: none; }
  .gastro-quotes-viewport { overflow-x: auto; }
}
`

// Shared class strings so every button/link on the page behaves the same.
const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
const onDarkFocusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
// Pathway nodes run teal → darker teal → navy → amber towards certification. Measured
// contrast (new palette): white on primary 6.35, white on primary-dark 9.42,
// gold-light on secondary 7.11, secondary on gold-light 7.11 (all pass AA).
// gold-light on primary-dark is only 4.37 and primary-dark on gold-light 4.37, so
// amber text/marks are paired with navy, never teal.
const pathwayNodes = [
  'bg-primary text-white shadow-soft-lg',
  'bg-primary-dark text-white shadow-soft-lg',
  'bg-secondary text-gold-light shadow-soft-lg',
  'bg-gold-light text-secondary shadow-lg shadow-gold-light/50',
]
// Connector after step i blends that node's colour into the next one's.
const pathwayConnectors = [
  'from-primary/40 to-primary-dark/40',
  'from-primary-dark/40 to-secondary/50',
  'from-secondary/50 to-gold-light/80',
]
const textLink = `inline-flex h-12 shrink-0 items-center gap-2 rounded-xl font-semibold text-primary transition-colors hover:text-primary-dark ${focusRing}`

export default function Home() {
  const { status, courses, error, retry } = useGastroCourses()
  const featured = courses.slice(0, 4)

  // Accreditation images that failed to load are dropped from the layout.
  const [failedImages, setFailedImages] = useState(() => new Set())
  const [lightboxImage, setLightboxImage] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const markFailed = (src) =>
    setFailedImages((prev) => (prev.has(src) ? prev : new Set(prev).add(src)))
  const isVisible = (img) => (img && !failedImages.has(img.src) ? img : null)

  const credentials = accreditationDetails.map((detail, i) => ({
    detail,
    certificate: isVisible(certificateImages[i]),
    seal: isVisible(logoImages[i]),
  }))
  const activeCredential = credentials[activeIndex]
  const activeCertificate = activeCredential.certificate

  // Arrow keys move between credentials, as in a standard tab list.
  const onCredentialKeyDown = (e) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]
    if (!step) return
    e.preventDefault()
    const next = (activeIndex + step + credentials.length) % credentials.length
    setActiveIndex(next)
    document.getElementById(`accreditation-tab-${next}`)?.focus()
  }

  return (
    <>
      <title>GastroenterologyNow | Gastroenterology Fellowship & Courses by MGA</title>
      <meta
        name="description"
        content="Gastroenterology fellowship and course programmes from Medical Global Academy, taught by practising specialists."
      />

      {/* 1 ── Hero: ONE full-width image (heading, badge, features, buttons and stats bar are
             all drawn inside it). Navbar is NOT part of this file or of the image.
             - Real <h1> + intro are sr-only (SEO / screen readers).
             - Two transparent links sit on top of the "Enroll Now" and "Watch Overview"
               buttons in the image.
             - On small screens the image keeps a readable minimum width and the hero can be
               swiped sideways; from lg up it simply fills the width. */}
      <section aria-label="Gastroenterology courses by Medical Global Academy" className="relative overflow-x-auto bg-[#F4FBFA] lg:overflow-visible">
        <h1 className="sr-only">Step into the World of Gastroenterology</h1>
        <p className="sr-only">
          Enhance your knowledge, sharpen your skills, and build confidence with expert-led courses in
          Gastroenterology. Expert faculty, interactive learning and certification provided.
        </p>

        <div className="relative mx-auto min-w-[860px] max-w-[1920px] lg:min-w-0">
          <img
            src={HERO_BG_SRC}
            alt="Step into the World of Gastroenterology: Medical Global Academy expert-led gastroenterology courses with expert faculty, interactive learning and certification provided"
            width={1672}
            height={823}
            fetchPriority="high"
            className="block h-auto w-full select-none"
            draggable={false}
          />

          {/* Transparent hit-areas over the buttons drawn in the image */}
          <Link
            to="/courses"
            aria-label="Enroll Now"
            style={heroEnrollArea}
            className={`absolute rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
          >
            <span className="sr-only">Enroll Now</span>
          </Link>
          <a
            href={HERO_OVERVIEW_HREF}
            aria-label="Watch Overview"
            style={heroOverviewArea}
            className={`absolute rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
          >
            <span className="sr-only">Watch Overview</span>
          </a>
        </div>
      </section>

      {/* 3 ── Accreditation: credential viewer. Pick a credential on the left,
              its certificate is shown large on a lit stage on the right.
              Panel is navy (secondary): accreditation is navy's "authority" role, and
              navy is the only base where the amber labels pass. A teal glow keeps the
              teal identity.
              Contrast (measured, new palette, WCAG AA): eyebrow + fact labels are
              gold-light on navy (7.11:1; 5.10:1 at the peak of the primary/40 glow).
              On a teal panel they would be 2.95:1 and fail. Unselected tab subline is
              white/85 on the bg-white/10 tab (8.68:1). Selected tab subline is
              text/70 on white (5.52:1). */}
      <section className="px-4 pt-16 sm:px-5 md:pt-20 lg:px-6">
        <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-secondary px-5 py-12 text-white shadow-soft-lg sm:px-10 md:py-16">
          {/* Amber hairline along the top edge + glows. Glows stay dark (primary,
              primary-dark) so the amber text above them keeps ≥5:1; a primary-light
              glow would drop it to ~2.3:1. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold-light/70 to-transparent" />
          <div aria-hidden="true" className="pointer-events-none absolute -top-40 -right-24 -z-10 h-[30rem] w-[30rem] rounded-full bg-primary/40 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-32 -z-10 h-96 w-96 rounded-full bg-primary-dark/40 blur-3xl" />

          <div className="grid items-center gap-10 lg:grid-cols-[5fr_7fr] lg:gap-14">
            {/* Left: heading + credential selector */}
            <Reveal>
              <p className="mb-5 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.22em] whitespace-nowrap text-gold-light uppercase">
                <span aria-hidden="true" className="h-px w-8 bg-gold-light" />
                Accreditation
              </p>
              <h2 className="font-display text-3xl leading-tight font-medium md:text-4xl">
                Accredited, independently recognised training
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-white/75 md:text-lg">
                Medical Global Academy holds Dual CPD &amp; Provider of Training Excellence status with The CPD Standards Office, and is an accredited professional training institution with the American Council of Training and Development.
              </p>

              <div
                role="tablist"
                aria-label="Accreditations"
                aria-orientation="vertical"
                className="mt-8 flex flex-col gap-4"
                onKeyDown={onCredentialKeyDown}
              >
                {credentials.map(({ detail, seal }, i) => {
                  const selected = i === activeIndex
                  const firstFact = detail.facts[0]
                  return (
                    <button
                      key={detail.name}
                      type="button"
                      role="tab"
                      id={`accreditation-tab-${i}`}
                      aria-selected={selected}
                      aria-controls="accreditation-panel"
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setActiveIndex(i)}
                      className={`flex items-center gap-4 rounded-2xl p-4 pr-5 text-left ring-1 transition duration-300 ease-out motion-reduce:transition-none ${onDarkFocusRing} ${
                        selected
                          ? 'bg-white text-primary shadow-soft-lg ring-gold-light/60'
                          : 'bg-white/10 text-white ring-white/10 hover:-translate-y-0.5 hover:bg-white/15 hover:ring-gold-light/40'
                      }`}
                    >
                      {seal && (
                        <span className="shrink-0 rounded-xl bg-white p-1 ring-1 ring-primary/10">
                          <ProtectedImage
                            src={seal.src}
                            alt={seal.alt}
                            onFail={markFailed}
                            className="h-14 w-14 rounded-lg object-contain"
                          />
                        </span>
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-lg leading-snug font-medium">{detail.name}</span>
                        {firstFact && (
                          <span className={`mt-0.5 block text-sm ${selected ? 'text-text/70' : 'text-white/85'}`}>
                            {firstFact.label} {firstFact.value}
                          </span>
                        )}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition duration-300 ${
                          selected ? 'bg-secondary text-white' : 'bg-white/10 text-transparent'
                        }`}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12.5l4.5 4.5L19 7.5" />
                        </svg>
                      </span>
                    </button>
                  )
                })}
              </div>
            </Reveal>

            {/* Right: certificate stage + verified details */}
            <Reveal delay={150}>
              <div id="accreditation-panel" role="tabpanel" aria-labelledby={`accreditation-tab-${activeIndex}`}>
                <div className="relative">
                  <div aria-hidden="true" className="pointer-events-none absolute inset-x-10 -bottom-5 h-16 rounded-full bg-black/30 blur-2xl" />
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-white/30">
                    {credentials.map(({ certificate }, i) =>
                      certificate ? (
                        <button
                          key={certificate.src}
                          type="button"
                          onClick={() => setLightboxImage(certificate)}
                          aria-label={`${certificate.title}: view full size`}
                          aria-hidden={i !== activeIndex}
                          tabIndex={i === activeIndex ? 0 : -1}
                          className={`group absolute inset-3 block cursor-zoom-in transition-opacity duration-500 ease-out motion-reduce:transition-none sm:inset-4 ${focusRing} ${
                            i === activeIndex ? 'opacity-100' : 'pointer-events-none opacity-0'
                          }`}
                        >
                          <ProtectedImage
                            src={certificate.src}
                            alt={certificate.alt}
                            width={certificate.width}
                            height={certificate.height}
                            onFail={markFailed}
                            className="h-full w-full object-contain"
                          />
                        </button>
                      ) : null,
                    )}
                    {!activeCertificate && (
                      <p className="absolute inset-0 flex items-center justify-center px-8 text-center text-base text-text/70">
                        Certificate preview is unavailable right now.
                      </p>
                    )}
                  </div>
                </div>

                <div aria-live="polite" className="mt-8">
                  <p className="max-w-xl text-base leading-relaxed text-white/80 md:text-lg">{activeCredential.detail.body}</p>
                  <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
                    {activeCredential.detail.facts.length > 0 && (
                      <dl className="flex flex-wrap gap-x-10 gap-y-4">
                        {activeCredential.detail.facts.map((f) => (
                          <div key={f.label}>
                            <dt className="text-sm text-gold-light">{f.label}</dt>
                            <dd className="mt-1 text-xl font-semibold">{f.value}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                    {activeCertificate && (
                      <button
                        type="button"
                        onClick={() => setLightboxImage(activeCertificate)}
                        className={`inline-flex h-12 items-center gap-2 rounded-xl bg-white px-5 font-semibold text-primary shadow-soft transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-soft-lg ${onDarkFocusRing}`}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <circle cx="11" cy="11" r="6" />
                          <path d="M20 20l-4.5-4.5M9 11h4M11 9v4" />
                        </svg>
                        View full size
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ImageLightbox image={lightboxImage} onClose={() => setLightboxImage(null)} onFail={markFailed} />
      {enquiryOpen && <EnquiryModal open onClose={() => setEnquiryOpen(false)} />}

      {/* 4 ── Doctors preview: flat cream, cards in thin outline frames (double bezel) */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-5 md:py-20 lg:px-6">
          <Reveal className="flex flex-col gap-6 border-b border-secondary/25 pb-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Faculty"
              title={
                <>
                  Learn from <strong>practising gastroenterologists</strong>
                </>
              }
              intro="Clinicians who bring today’s wards, clinics and endoscopy suites into every session."
            />
            <Link to="/doctors" className={textLink}>
              View all faculty <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 md:mt-12 md:gap-6 lg:grid-cols-4">
            {doctors.slice(0, 4).map((d, i) => (
              <Reveal key={d.id} delay={staggerDelay(i)} className="h-full">
                <div className="h-full rounded-[1.75rem] p-1.5 ring-1 ring-primary/10 transition duration-300 ease-out hover:ring-secondary/40">
                  <DoctorCard doctor={d} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5 ── Hospital partners: slow marquee, pauses on hover */}
      {hospitals.length > 0 && (
        <section
          aria-label="Hospital partners"
          className="relative isolate overflow-hidden bg-linear-to-r from-primary-dark via-primary to-primary-dark py-12 md:py-14"
        >
          <style>{hospitalMarqueeCss}</style>
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold-light/50 to-transparent" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-gold-light/30 to-transparent" />
          {/* Label: white/90 on primary 5.48:1. gold-light on primary is only 2.95:1 (fails),
              so amber stays on the decorative hairlines and dots only. */}
          <p className="mb-8 flex items-center justify-center gap-4 px-4 text-xs font-semibold tracking-[0.22em] whitespace-nowrap text-white/90 uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-gold-light/60 sm:w-12" />
            Our hospital partners
            <span aria-hidden="true" className="h-px w-8 bg-gold-light/60 sm:w-12" />
          </p>
          <div className="gastro-hospitals-viewport overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="gastro-hospitals-track flex w-max items-center">
              {[...hospitals, ...hospitals, ...hospitals, ...hospitals].map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  aria-hidden={i >= hospitals.length}
                  className="mx-3 inline-flex shrink-0 items-center gap-3 rounded-full bg-white/5 px-6 py-3 font-display text-lg font-medium whitespace-nowrap text-white/90 ring-1 ring-white/10 transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/10 hover:text-white hover:ring-gold-light/50 md:mx-4 md:px-8 md:text-xl"
                >
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold-light" />
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6 ── Featured courses: staggered grid on an off-white wash with a teal corner glow.
              Text on this wash: primary 5.74:1, secondary (navy) 13.86:1. Never gold-light (≈2:1). */}
      <section className="relative isolate overflow-hidden bg-linear-to-b from-support to-support/40">
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-32 -z-10 h-96 w-96 rounded-full bg-primary-light/15 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute bottom-0 -left-48 -z-10 h-96 w-96 rounded-full bg-white/60 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-5 md:py-20 lg:px-6">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Programmes"
              title={
                <>
                  Featured <strong>Gastroenterology</strong> courses
                </>
              }
              intro="Current intakes, live from the MGA learning platform."
            />
            <Link to="/courses" className={textLink}>
              All courses <span aria-hidden="true">→</span>
            </Link>
          </Reveal>

          <div className="mt-10 md:mt-12">
            {status === 'ready' ? (
              <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:[&>*:nth-child(even)]:mt-12">
                {featured.map((c, i) => (
                  <Reveal key={c.id} delay={staggerDelay(i)} className="h-full">
                    <CourseCard course={c} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <Reveal>
                <CourseFeedState status={status} error={error} onRetry={retry} skeletonCount={3} />
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* 7 ── Career pathway: flat cream, outline step cards, numbered nodes that warm
              from teal through navy to amber towards certification (all node pairings pass AA). */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-5 md:py-20 lg:px-6">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Your pathway"
              title={
                <>
                  From enrolment to <strong>certification</strong> in four steps
                </>
              }
              intro="A structured learning journey for medical professionals building their gastroenterology career."
            />
          </Reveal>

          <ol className="mt-10 grid gap-0 md:mt-14 lg:grid-cols-4 lg:gap-8">
            {pathwaySteps.map((step, i) => {
              const isLast = i === pathwaySteps.length - 1
              return (
                <Reveal as="li" key={step.title} delay={staggerDelay(i)} className="relative pb-10 pl-16 last:pb-0 lg:pt-20 lg:pb-0 lg:pl-0">
                  {/* Connector to the next step */}
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className={`absolute top-12 bottom-0 left-6 w-px bg-linear-to-b lg:top-6 lg:bottom-auto lg:left-12 lg:h-px lg:w-[calc(100%-1rem)] lg:bg-linear-to-r ${pathwayConnectors[i]}`}
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className={`absolute top-0 left-0 flex h-12 w-12 items-center justify-center rounded-full font-display text-lg font-medium ring-4 ring-bg ${pathwayNodes[i]}`}
                  >
                    {isLast ? (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </span>

                  <div
                    className={`h-full rounded-2xl p-6 ring-1 transition duration-300 ease-out hover:-translate-y-1 hover:bg-white hover:shadow-soft-lg ${
                      isLast ? 'ring-secondary/40' : 'ring-primary/15'
                    }`}
                  >
                    <p className="text-xs font-semibold tracking-[0.18em] text-text/70 uppercase">Step {i + 1}</p>
                    <h3 className="mt-2 font-display text-xl leading-snug font-medium text-primary">{step.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-text/75">{step.description}</p>
                    {step.badges && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {step.badges.map((b) => (
                          <li key={b} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-sm font-semibold whitespace-nowrap text-secondary ring-1 ring-secondary/30">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M5 12.5l4.5 4.5L19 7.5" />
                            </svg>
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              )
            })}
          </ol>
        </div>
      </section>

      {/* 8 ── Why choose: one contained white panel with an amber top line (decorative); inside,
             a hairline-divided four-cell grid (spec-sheet style). The certification cell
             (accent: true) is the navy + amber accent.
             id="why-mga" is the target of the hero's "Watch Overview" button. */}
      <section id="why-mga" className="scroll-mt-24 px-4 pb-16 sm:px-5 md:pb-20 lg:px-6">
        <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-white px-5 py-10 shadow-soft ring-1 ring-primary/10 sm:px-8 md:px-12 md:py-14">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-10 top-0 h-0.5 rounded-full bg-linear-to-r from-transparent via-gold-light to-transparent" />
          <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-32 -z-10 h-80 w-80 rounded-full bg-support/70 blur-3xl" />
          <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Why MGA"
              title={
                <>
                  Why choose <strong>Gastroenterology with MGA</strong>
                </>
              }
              intro="A programme shaped around how gastroenterology is really practised."
            />
            <div className="flex shrink-0 flex-col gap-5 lg:items-end">
              <ul aria-label="Accreditations" className="flex flex-wrap gap-3">
                {['CPD Accredited', 'ACTD Accredited'].map((label) => (
                  <li
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold whitespace-nowrap text-secondary ring-1 ring-secondary/30"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                    {label}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/courses"
                  className={`inline-flex h-12 items-center justify-center rounded-xl bg-primary px-7 font-semibold text-white shadow-soft transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-soft-lg ${focusRing}`}
                >
                  Explore courses
                </Link>
                <button
                  type="button"
                  onClick={() => setEnquiryOpen(true)}
                  className={`inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 font-semibold text-secondary shadow-soft ring-1 ring-secondary/20 transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-soft-lg ${focusRing}`}
                >
                  Get in touch
                </button>
              </div>
            </div>
          </Reveal>

          {/* Hairline-divided grid: the 1px gap shows the primary/10 backing as dividers.
              4 cells: 1 col (mobile) → 2×2 (sm) → 1×4 (lg), so no row is ever half-filled.
              Accent cell contrast: white/85 body on navy 8.68:1+, amber icon on the glass
              tile 5.23:1 (3.81:1 at the teal glow's peak; icons need 3:1). */}
          <div className="mt-10 grid gap-px overflow-hidden rounded-3xl bg-primary/10 ring-1 ring-primary/10 sm:grid-cols-2 md:mt-12 lg:grid-cols-4">
            {whyFeatures.map((f, i) => {
              const dark = Boolean(f.accent)
              return (
                <Reveal key={f.title} delay={staggerDelay(i)} className="h-full">
                  <article
                    className={`group relative isolate flex h-full flex-col overflow-hidden p-6 transition duration-300 ease-out md:p-7 ${
                      dark ? 'bg-secondary text-white' : 'bg-white hover:bg-support/40'
                    }`}
                  >
                    {dark && (
                      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -bottom-16 -z-10 h-56 w-56 rounded-full bg-primary/40 blur-3xl" />
                    )}
                    <IconTile dark={dark}>
                      <path d={f.icon} />
                    </IconTile>
                    <h3 className={`mt-6 font-display text-xl leading-snug font-medium ${dark ? 'text-white' : 'text-primary'}`}>
                      {f.title}
                    </h3>
                    <p className={`mt-3 text-base leading-relaxed ${dark ? 'text-white/85' : 'text-text/75'}`}>{f.text}</p>
                    <span aria-hidden="true" className="mt-auto block pt-6">
                      <span
                        className={`block h-0.5 w-8 origin-left transition-transform duration-300 ease-out group-hover:scale-x-250 motion-reduce:transition-none ${
                          dark ? 'bg-gold-light' : 'bg-primary'
                        }`}
                      />
                    </span>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* 9 ── What our doctors say: two marquee rows, opposite directions, pause on hover.
              Sample copy, hidden in production until TESTIMONIALS_CONFIRMED is true. */}
      {showTestimonials && (
        <section className="relative isolate overflow-hidden bg-linear-to-t from-support to-support/40">
          <style>{quotesMarqueeCss}</style>
          <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-0 -z-10 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
          <div className="py-16 md:py-20">
            {!TESTIMONIALS_CONFIRMED && (
              <p className="mb-8 px-4 text-center font-mono text-xs text-primary">
                DEV ONLY: sample quotes. This section is hidden in production until real, confirmed quotes replace them.
              </p>
            )}
            <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-6">
              <Reveal>
                <SectionHeading
                  align="center"
                  eyebrow="Doctors"
                  title={
                    <>
                      What our <strong>doctors</strong> say
                    </>
                  }
                  intro="Hear from medical professionals about learning gastroenterology with MGA."
                />
              </Reveal>
            </div>

            <div className="mt-10 flex flex-col gap-6 md:mt-12">
              {['left', 'right'].map((dir) => (
                <div
                  key={dir}
                  className="gastro-quotes-viewport overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
                >
                  <div className={`gastro-quotes-track-${dir} flex w-max`}>
                    {[0, 1].map((copy) => (
                      <div key={copy} aria-hidden={copy === 1} className="flex">
                        {(dir === 'left' ? doctorQuotes : [...doctorQuotes].reverse()).map((q) => (
                          <figure
                            key={q.name}
                            className="group relative mx-3 flex w-[300px] shrink-0 flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-soft ring-1 ring-primary/10 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-soft-lg sm:w-[380px] sm:p-8"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-secondary to-gold-light transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
                            />
                            <div className="flex items-center justify-between gap-4">
                              <svg width="32" height="24" viewBox="0 0 32 24" fill="currentColor" className="text-secondary/40" aria-hidden="true">
                                <path d="M0 24V14C0 6.3 4.1 1.6 12.3 0l1.3 3.1C9.3 4.4 7.1 6.9 6.8 10.6H13V24H0zm18 0V14c0-7.7 4.1-12.4 12.3-14l1.3 3.1c-4.3 1.3-6.5 3.8-6.8 7.5H31V24H18z" />
                              </svg>
                              <div role="img" aria-label="5 out of 5 stars" className="flex gap-0.5 text-secondary">
                                {[0, 1, 2, 3, 4].map((s) => (
                                  <svg key={s} viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                                    <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                            <blockquote className="mt-5 flex-1 text-base leading-relaxed text-text/80">{q.quote}</blockquote>
                            <figcaption className="mt-6 flex items-center gap-3 border-t border-primary/10 pt-5">
                              <span
                                aria-hidden="true"
                                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary to-primary-light font-display text-base font-medium text-white"
                              >
                                {initialsOf(q.name)}
                              </span>
                              <span className="min-w-0">
                                <span className="block truncate font-display text-lg font-medium text-primary">{q.name}</span>
                                <span className="block truncate text-sm text-text/60">{q.role}</span>
                              </span>
                            </figcaption>
                          </figure>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10 ── FAQ */}
      <FaqSection />

      {/* 11 ── CTA band (white CTA on blue band: Book a Seat) */}
      <Reveal>
        <CTASection
          title={
            <>
              Your next step in <strong>gastroenterology</strong> starts here.
            </>
          }
          text="Explore current intakes and reserve your place."
          buttonLabel="Book a Seat"
          compact
        />
      </Reveal>
    </>
  )
}

/**
 * Two-tone icon housing: teal outer ring around a soft teal inner tile; icon is primary
 * on primary/10 (5.48:1). On hover (inside a `group`) the tile fills with the teal
 * gradient and the icon turns white (6.35:1+). gold-light on teal is only 2.95:1, so it
 * is not used here.
 * `dark` = the tile sits on the navy accent card: glass tile, gold-light icon (5.23:1).
 */
function IconTile({ dark = false, children }) {
  return (
    <span
      className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl p-1 ring-1 ${
        dark ? 'ring-gold-light/40' : 'ring-primary/25'
      }`}
    >
      <span
        className={`inline-flex h-full w-full items-center justify-center rounded-xl transition duration-300 ease-out motion-reduce:transition-none ${
          dark
            ? 'bg-white/10 text-gold-light'
            : 'bg-primary/10 text-primary group-hover:bg-linear-to-br group-hover:from-primary group-hover:to-primary-dark group-hover:text-white'
        }`}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {children}
        </svg>
      </span>
    </span>
  )
}
