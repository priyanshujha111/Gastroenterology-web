import { useState } from 'react'
import ModalShell, { Field } from './ModalShell.jsx'

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

/**
 * ⚠️  PLACEHOLDER SIGN-UP FORM — NOT CONNECTED TO ANY AUTH.
 * Submitting does NOT create an account and does NOT send data anywhere.
 * It only shows a "not available yet" notice. Wire handleSubmit to the real
 * MGA registration endpoint once it's decided.
 *
 * Props: open, onClose, onSwitchToLogin
 */
export default function SignUpModal({ open, onClose, onSwitchToLogin }) {
  const [notice, setNotice] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO(auth): replace with a real registration request. Nothing is sent or stored here.
    setNotice('Account sign-up isn’t available yet. Please check back soon.')
  }

  return (
    <ModalShell open={open} onClose={onClose} title="Create an account" subtitle="Join MGA’s Gastroenterology programmes.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Email" type="email" name="email" autoComplete="email" />
        <Field label="Password" type="password" name="password" autoComplete="new-password" />

        {notice && (
          <p role="status" className="rounded-xl bg-support px-4 py-3 text-sm text-primary">
            {notice}
          </p>
        )}

        <button
          type="submit"
          className={`w-full rounded-full bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary-dark ${focusRing}`}
        >
          Sign up
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-text/70">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className={`rounded font-semibold text-primary hover:text-primary-dark ${focusRing}`}
        >
          Log in
        </button>
      </p>
    </ModalShell>
  )
}
