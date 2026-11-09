import { useState } from 'react'
import ModalShell, { Field } from './ModalShell.jsx'

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

/**
 * ⚠️  PLACEHOLDER LOGIN FORM — NOT CONNECTED TO ANY AUTH.
 * Submitting does NOT send credentials anywhere and does NOT log anyone in.
 * It only shows a "not available yet" notice. Wire handleSubmit to the real
 * MGA auth endpoint once it's decided.
 *
 * Props: open, onClose, onSwitchToSignUp
 */
export default function LoginModal({ open, onClose, onSwitchToSignUp }) {
  const [notice, setNotice] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO(auth): replace with a real login request. Nothing is sent or stored here.
    setNotice('Login isn’t available yet. Please check back soon.')
  }

  return (
    <ModalShell open={open} onClose={onClose} title="Log in" subtitle="Access your MGA Gastroenterology courses.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Email" type="email" name="email" autoComplete="email" />
        <Field label="Password" type="password" name="password" autoComplete="current-password" />

        {notice && (
          <p role="status" className="rounded-xl bg-support px-4 py-3 text-sm text-primary">
            {notice}
          </p>
        )}

        <button
          type="submit"
          className={`w-full rounded-full bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary-dark ${focusRing}`}
        >
          Log in
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-text/70">
        New to MGA?{' '}
        <button
          type="button"
          onClick={onSwitchToSignUp}
          className={`rounded font-semibold text-primary hover:text-primary-dark ${focusRing}`}
        >
          Create an account
        </button>
      </p>
    </ModalShell>
  )
}
