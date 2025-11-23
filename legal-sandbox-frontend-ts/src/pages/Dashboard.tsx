import { Link } from 'react-router-dom'
import useAppStore from '../store/useAppStore'

export default function Dashboard() {
  const { docs, issues } = useAppStore()
  const totalIssues = Object.values(issues).reduce((n, arr) => n + (arr?.length || 0), 0)
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="text-sm text-muted">Документы</div>
          <div className="text-3xl font-bold">{docs.length}</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-muted">Найдено проблем</div>
          <div className="text-3xl font-bold">{totalIssues}</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-muted">Статус</div>
          <div className="text-3xl font-bold">Готово к работе</div>
        </div>
      </div>

      <div className="card p-6">
        <div className="section-title">Быстрые действия</div>
        <div className="flex gap-3">
          <Link to="/upload" className="btn btn-primary">Загрузить документ</Link>
          <Link to="/sandbox" className="btn">Открыть песочницу</Link>
          <Link to="/rules" className="btn">Правила</Link>
        </div>
      </div>
    </div>
  )
}
