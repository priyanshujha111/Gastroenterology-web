import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-start px-4 py-28 sm:px-5 lg:px-6">
      <title>Page not found | GastroenterologyNow</title>
      <meta name="robots" content="noindex" />
      <p className="font-display text-7xl text-primary">404</p>
      <h1 className="mt-4 font-display text-3xl font-medium text-primary">We couldn’t find that page.</h1>
      <p className="mt-3 text-text/70">It may have moved, or the link may be out of date.</p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary-dark"
      >
        Back to home
      </Link>
    </section>
  )
}
