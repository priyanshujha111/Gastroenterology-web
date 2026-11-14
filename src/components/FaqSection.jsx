// src/components/FaqSection.jsx
import { useState } from 'react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import EnquiryModal from './EnquiryModal.jsx'
import { COUNSELLOR_PHONE_DISPLAY } from '../data/contact.js'

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
const onDarkFocusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

// DRAFT COPY: keep answers general; confirm each one with the academic team before launch.
const faqs = [
  {
    question: 'Who are the programmes for?',
    answer:
      'They are designed for practising doctors and medical professionals who want to build confidence in digestive and liver disease.',
  },
  {
    question: 'Can I study alongside my clinical work?',
    answer:
      'The programmes are designed around working doctors, so learning can fit around your rota. Each course page describes its exact format.',
  },
  {
    question: 'Is the certification accredited?',
    answer:
      'Medical Global Academy holds Dual CPD & Provider of Training Excellence status with The CPD Standards Office (provider no. PDCD1106) and is accredited by the American Council of Training and Development (accreditation no. GNA452N). The certificates are shown in the accreditation section above.',
  },
  {
    question: 'Where can I find fees and intake dates?',
    answer: 'Every course page lists the current intake and the registration fee.',
  },
  // DRAFT COPY (new): confirm the weekly time commitment with the academic team before launch.
  {
    question: 'How many hours a week does this take?',
    answer:
      'Most doctors manage the coursework in a few focused hours a week around their existing rota. Each course page breaks down the exact weekly time commitment.',
  },
  {
    question: 'How do I enrol?',
    answer: `Open a course and choose Enroll Now, or call our counsellor on ${COUNSELLOR_PHONE_DISPLAY} and we will help you pick the right programme.`,
  },
]

/* FAQ: flat off-white. Heading + teal counsellor card on the left (white/85 body
   on primary 5.09:1), numbered accordion on the right. */
export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState(0)
  const [enquiryOpen, setEnquiryOpen] = useState(false)

  return (
    <section className="relative">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-5 md:py-20 lg:grid-cols-[5fr_7fr] lg:gap-14 lg:px-6">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="FAQ"
            title={
              <>
                Frequently Asked <strong>Questions</strong>
              </>
            }
            intro="Quick answers before you enrol."
          />
          <div className="relative isolate mt-8 overflow-hidden rounded-3xl bg-linear-to-br from-primary to-primary-dark p-6 text-white shadow-soft-lg md:p-7">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold-light/70 to-transparent" />
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -bottom-20 -z-10 h-56 w-56 rounded-full bg-secondary/40 blur-3xl" />
            <p className="font-display text-xl font-medium">Not sure which programme fits?</p>
            <p className="mt-2 text-base leading-relaxed text-white/85">
              Tell us what you&rsquo;re looking for and we&rsquo;ll help you choose.
            </p>
            <button
              type="button"
              onClick={() => setEnquiryOpen(true)}
              className={`mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 font-semibold whitespace-nowrap text-primary shadow-soft transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-support hover:shadow-soft-lg ${onDarkFocusRing}`}
            >
              Get in touch
            </button>
          </div>
          {enquiryOpen && <EnquiryModal open onClose={() => setEnquiryOpen(false)} />}
        </Reveal>

        <Reveal delay={150}>
          <div className="flex flex-col gap-4">
            {faqs.map((f, i) => (
              <FaqItem
                key={f.question}
                id={`faq-${i}`}
                index={i}
                question={f.question}
                answer={f.answer}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/**
 * One accordion row. Height animates via grid-template-rows, so no measuring is needed.
 * Numbered disc: gold-light on secondary/navy (7.11:1; on primary-dark it would be 4.37:1
 * and fail). Toggle: white on primary (6.35:1), white on secondary when open (15.32:1).
 * Open rows get a support/40 wash and a navy left accent bar; question text is primary
 * on support/40 (≈5.9:1), answer text/80 (7.36:1).
 */
export function FaqItem({ id, index, question, answer, open, onToggle }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl ring-1 transition duration-300 ease-out motion-reduce:transition-none ${
        open
          ? 'bg-support/40 shadow-soft-lg ring-secondary/30'
          : 'bg-white shadow-soft ring-primary/10 hover:-translate-y-0.5 hover:shadow-soft-lg'
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-y-0 left-0 w-1 transition-colors duration-300 ${open ? 'bg-secondary' : 'bg-primary/15'}`}
      />
      <h3>
        <button
          type="button"
          id={`${id}-question`}
          aria-expanded={open}
          aria-controls={`${id}-answer`}
          onClick={onToggle}
          className={`flex w-full items-center gap-4 rounded-2xl py-5 pr-5 pl-5 text-left font-display text-lg leading-snug font-medium text-primary sm:pr-6 sm:pl-6 ${focusRing}`}
        >
          <span
            aria-hidden="true"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary font-sans text-sm font-semibold text-gold-light tabular-nums"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="min-w-0 flex-1">{question}</span>
          <span
            aria-hidden="true"
            className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white shadow-soft transition duration-300 ease-out motion-reduce:transition-none ${
              open ? 'rotate-45 bg-secondary' : 'bg-primary'
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
        </button>
      </h3>
      <div
        id={`${id}-answer`}
        role="region"
        aria-labelledby={`${id}-question`}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="pr-6 pb-6 pl-5 text-base leading-relaxed text-text/80 sm:pl-19">{answer}</p>
        </div>
      </div>
    </div>
  )
}
