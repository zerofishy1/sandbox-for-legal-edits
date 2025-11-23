import { Link } from 'react-router-dom'
import useAppStore from '../store/useAppStore'

export default function Projects() {
  const { docs, setCurrentDoc } = useAppStore()
  return (
    <div className="grid gap-4">
      <div className="section-title">Проекты / Документы</div>
      {docs.length === 0 && (
        <div className="card p-6 text-muted">Пока нет документов. Загрузите первый файл на странице «Загрузка».</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {docs.map(d => (
          <div key={d.id} className="card p-4">
            <div className="font-semibold">{d.name}</div>
            <div className="text-xs text-muted">Клауз: {d.blocks.length}</div>
            <div className="mt-3 flex gap-2">
              <Link to="/sandbox" onClick={() => setCurrentDoc(d.id)} className="btn btn-primary">Открыть</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
