import { Link } from 'react-router-dom'
import Button from '../components/Button'

export default function NotFound() {
  return (
    <div className="container-x py-32 text-center">
      <h1 className="font-display font-bold text-6xl text-primary">404</h1>
      <p className="text-muted mt-4">Looks like this page wandered off the menu.</p>
      <Link to="/" className="inline-block mt-8">
        <Button>Back to home</Button>
      </Link>
    </div>
  )
}
