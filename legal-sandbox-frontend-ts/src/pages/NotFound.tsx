import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div className="card p-6">
      <div className="text-xl font-semibold mb-2">404 — страница не найдена</div>
      <Link to="/" className="btn btn-primary">На главную</Link>
    </div>
  )
}
