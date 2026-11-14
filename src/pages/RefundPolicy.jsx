import LegalPage from '../components/LegalPage.jsx'

// TODO: jab bhi policy update ho, ye date badalna. Page ke top par dikhti hai.
const LAST_UPDATED = '2026'

const EMAIL = 'support@medicalglobalacademy.com'
const PHONE = '+91 9289994218'

/* ============================================================================
 * Refund & Cancellation Policy content (as supplied by MGA). Rendered by components/LegalPage.jsx.
 * Block types: 'p' paragraph · 'ul' bullet list · 'lines' address-style lines.
 * EMAIL and PHONE inside the text become links (see `links` below).
 * ========================================================================== */
const sections = [
  {
    title: '1. Overview',
    blocks: [
      {
        type: 'p',
        text: 'At Medical Global Academy, we strive to provide high-quality training and educational content for MBBS, MD, and other degree holders in the medical field. However, we understand that there may be circumstances where you may request a refund. Please read our refund policy carefully before enrolling in any course.',
      },
    ],
  },
  {
    title: '2. No Refunds',
    blocks: [
      {
        type: 'p',
        text: 'Due to the nature of digital educational content, once access to the course materials has been granted, no refunds will be issued. By completing the registration and payment process, you agree that all sales are final.',
      },
    ],
  },
  {
    title: '3. Course Cancellation',
    blocks: [
      {
        type: 'p',
        text: 'In the event that Medical Global Academy cancels a course due to unforeseen circumstances or technical issues, we will provide a full refund to all registered participants. The refund will be processed within 10 business days from the date of cancellation.',
      },
    ],
  },
  {
    title: '4. Duplicate Payment',
    blocks: [
      {
        type: 'p',
        text: `If you mistakenly make multiple payments for the same course, please notify us immediately at ${EMAIL}. We will process a refund for the duplicate payment after verifying the details, typically within 7 business days.`,
      },
    ],
  },
  {
    title: '5. Technical Issues',
    blocks: [
      {
        type: 'p',
        text: 'If you experience any technical issues that prevent you from accessing course content, please contact our support team. While we do not offer refunds for technical problems, we will make every effort to resolve the issue and ensure you have access to the course material.',
      },
    ],
  },
  {
    title: '6. Exceptions',
    blocks: [
      { type: 'p', text: 'Refunds will only be considered under exceptional circumstances, such as:' },
      {
        type: 'ul',
        items: ['Incorrect payment made due to system error.', 'Special cases with documented medical emergencies.'],
      },
      {
        type: 'p',
        text: 'All exceptions will be considered on a case-by-case basis, and the decision of Medical Global Academy will be final.',
      },
    ],
  },
  {
    title: '7. Refund Processing',
    blocks: [
      {
        type: 'p',
        text: 'Approved refunds will be processed back to the original payment method. Depending on the payment provider, it may take up to 7–10 business days for the refund to reflect in your account.',
      },
    ],
  },
  {
    title: '8. Contact Us',
    blocks: [
      { type: 'p', text: 'For any inquiries related to refunds or payments, please contact us at:' },
      {
        type: 'lines',
        lines: ['Medical Global Academy — Support', `Email: ${EMAIL}`, `Phone: ${PHONE}`],
      },
    ],
  },
]

export default function RefundPolicy() {
  return (
    <>
      <title>Refund &amp; Cancellation Policy | GastroenterologyNow</title>
      <meta
        name="description"
        content="The refund and cancellation policy for Medical Global Academy courses: course cancellations, duplicate payments, exceptions and refund processing times."
      />
      <LegalPage
        title="Refund & Cancellation Policy"
        intro="Please read our refund policy carefully before enrolling in any course. By enrolling in any of our courses, you acknowledge that you have read, understood, and agreed to this refund policy."
        lastUpdated={LAST_UPDATED}
        sections={sections}
        contentsLabel="Refund policy contents"
        contactTitle="Questions about refunds or payments?"
        email={EMAIL}
        links={[
          { text: EMAIL, href: `mailto:${EMAIL}` },
          { text: PHONE, href: `tel:${PHONE.replace(/\s/g, '')}` },
        ]}
      />
    </>
  )
}
