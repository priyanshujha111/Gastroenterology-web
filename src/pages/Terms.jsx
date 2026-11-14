import LegalPage from '../components/LegalPage.jsx'

// TODO: jab bhi terms update hon, ye date badalna. Page ke top par dikhti hai.
const LAST_UPDATED = 'September 25, 2026'

const EMAIL = 'support@medicalglobalacademy.com'
const WEBSITE = 'medicalglobalacademy.com'

/* ============================================================================
 * Terms & Conditions content (as supplied by MGA). Rendered by components/LegalPage.jsx.
 * Block types: 'p' paragraph · 'ul' bullet list · 'lines' address-style lines.
 * EMAIL, WEBSITE and "Privacy Policy" inside the text become links (see `links` below).
 * ========================================================================== */
const sections = [
  {
    title: '1. Acceptance of Terms',
    blocks: [
      {
        type: 'p',
        text: 'Welcome to Medical Global Academy. These terms and conditions outline the rules and regulations for the use of our website and services. By accessing this website, we assume you accept these terms and conditions. Do not continue to use Medical Global Academy if you do not agree to all the terms and conditions stated on this page.',
      },
    ],
  },
  {
    title: '2. Eligibility',
    blocks: [
      {
        type: 'p',
        text: 'Medical Global Academy provides training facilities for MBBS, MD, and other degree holders in the medical field. To enroll in our courses, you must hold a valid degree in a related field (e.g., MBBS, MD, etc.) from a recognized institution.',
      },
    ],
  },
  {
    title: '3. Services Offered',
    blocks: [
      {
        type: 'p',
        text: 'Medical Global Academy offers professional training programs aimed at enhancing the skills and knowledge of medical professionals. Our training programs are developed by experts in the field, but they do not substitute for any medical board certification or licensing requirements.',
      },
    ],
  },
  {
    title: '4. User Responsibilities',
    blocks: [
      { type: 'p', text: 'By using our website and enrolling in our courses, you agree to:' },
      {
        type: 'ul',
        items: [
          'Provide accurate information during registration.',
          'Use the website and training materials solely for your personal, professional development.',
          'Comply with all applicable laws and regulations.',
        ],
      },
    ],
  },
  {
    title: '5. Payment and Fees',
    blocks: [
      {
        type: 'p',
        text: 'All courses offered by Medical Global Academy are subject to fees, which are listed on the website. Payments must be made in full at the time of registration. No refunds will be issued once access to the course materials has been granted.',
      },
    ],
  },
  {
    title: '6. Intellectual Property',
    blocks: [
      {
        type: 'p',
        text: 'All content on the Medical Global Academy website, including course materials, videos, and resources, is the property of Medical Global Academy.',
      },
      {
        type: 'p',
        text: 'Users may not reproduce, distribute, or use the content for any purpose other than personal education without prior written consent.',
      },
    ],
  },
  {
    title: '7. Privacy Policy',
    blocks: [
      {
        type: 'p',
        text: 'Your privacy is important to us. We collect and use personal information according to our Privacy Policy, which is available on our website.',
      },
    ],
  },
  {
    title: '8. Limitation of Liability',
    blocks: [
      {
        type: 'p',
        text: 'Medical Global Academy is not responsible for any errors or omissions in the content provided or any adverse outcomes that arise from applying the skills learned in our courses. Use of the information provided is at your own risk.',
      },
    ],
  },
  {
    title: '9. Termination of Access',
    blocks: [
      {
        type: 'p',
        text: 'Medical Global Academy reserves the right to terminate your access to the website and its services if you breach any of these terms.',
      },
    ],
  },
  {
    title: '10. Changes to the Terms',
    blocks: [
      {
        type: 'p',
        text: 'Medical Global Academy may update these terms and conditions from time to time. Any changes will be posted on this page, and continued use of the website implies acceptance of the updated terms.',
      },
    ],
  },
  {
    title: '11. Governing Law',
    blocks: [
      {
        type: 'p',
        text: 'These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes related to these terms will be subject to the exclusive jurisdiction of the courts in India.',
      },
    ],
  },
  {
    title: '12. Contact Us',
    blocks: [
      {
        type: 'p',
        text: 'If you have any questions or need further clarification on these terms, please contact us at:',
      },
      {
        type: 'lines',
        lines: ['Medical Global Academy', `Email: ${EMAIL}`, `Website: ${WEBSITE}`],
      },
    ],
  },
]

export default function Terms() {
  return (
    <>
      <title>Terms &amp; Conditions | GastroenterologyNow</title>
      <meta
        name="description"
        content="The terms and conditions for using the Medical Global Academy website and enrolling in its courses."
      />
      <LegalPage
        title="Terms & Conditions"
        intro="Please read these Terms & Conditions carefully before using the Medical Global Academy website or enrolling in any of our courses. By accessing our website, you accept these terms in full."
        lastUpdated={LAST_UPDATED}
        sections={sections}
        contentsLabel="Terms and conditions contents"
        contactTitle="Questions about these terms?"
        email={EMAIL}
        links={[
          { text: EMAIL, href: `mailto:${EMAIL}` },
          { text: WEBSITE, href: `https://${WEBSITE}` },
          { text: 'Privacy Policy', href: '/privacy-policy' },
        ]}
      />
    </>
  )
}
