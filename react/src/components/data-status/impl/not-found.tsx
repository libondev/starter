import { Link } from 'react-router'

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-4 text-center">
      <p className="text-xl font-medium"> Page Not Found </p>

      <Link className="underline" to="/" viewTransition>
        Back to Home
      </Link>
    </main>
  )
}
