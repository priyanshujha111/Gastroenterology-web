import ModalShell from './ModalShell.jsx'
import { ApplyForm } from './CourseDetailParts.jsx'

// No course picked yet: ApplyForm's read-only "Course programme" field and the
// WhatsApp message carry this instead of a course name.
const GENERAL_ENQUIRY = { name: 'Not sure yet, help me choose' }

/**
 * General enquiry: the same ApplyForm used on Course Detail pages, in the same
 * ModalShell used by the navbar's Log in / Sign up. Submitting opens WhatsApp
 * pre-filled (ApplyForm's behaviour) and closes the modal.
 *
 * Render it only while open (like Navbar does) so the form starts empty each time:
 *   {enquiryOpen && <EnquiryModal open onClose={() => setEnquiryOpen(false)} />}
 */
export default function EnquiryModal({ open, onClose }) {
  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Get in touch"
      subtitle="Tell us a little about you and our team will help you choose the right programme."
    >
      <ApplyForm course={GENERAL_ENQUIRY} onSubmitted={onClose} />
    </ModalShell>
  )
}
