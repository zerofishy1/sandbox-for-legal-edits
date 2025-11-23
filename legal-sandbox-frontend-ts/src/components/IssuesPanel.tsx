import useAppStore from '../store/useAppStore'
import Badge from './Badge'
import type { Issue } from '../types/models'

export default function IssuesPanel({ docId, onJump }: { docId: string; onJump?: (id: string) => void }) {
  const issuesMap = useAppStore(s => s.issues)
  const issues = issuesMap[docId] || []

  const byType = issues.reduce<Record<string, Issue[]>>((acc, it) => {
    (acc[it.type] ||= []).push(it)
    return acc
  }, {})

  return (
    <div className="card p-3 h-[calc(100vh-200px)] overflow-auto scroll-thin">
      <div className="flex items-center justify-between mb-3">
        <div className="section-title">Найденные проблемы</div>
        <Badge>{issues.length}</Badge>
      </div>

      {issues.length === 0 && (
        <div className="text-muted text-sm">Запустите анализ, чтобы увидеть дубли и конфликты.</div>
      )}

      {Object.entries(byType).map(([type, arr]) => (
        <div key={type} className="mb-4">
          <div className="font-semibold mb-2">{type === 'duplicate' ? 'Дубли' : 'Конфликты'}</div>
          <div className="space-y-2">
            {arr.map(it => (
              <div key={it.id} className="p-3 rounded-xl border border-border bg-[#14151a]">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-semibold text-sm">{it.message}</div>
                  <Badge tone={it.severity}>{it.severity}</Badge>
                </div>
                <div className="text-xs text-muted mb-2">Refs: {it.refs.length} • {it.subtype || it.type}</div>
                <div className="text-sm">{it.suggestion}</div>
                <div className="mt-2 flex gap-2">
                  {it.refs.map(ref => (
                    <button key={ref} onClick={() => onJump?.(ref)} className="tag hover:bg-[#1b1c22]">
                      Перейти к клаузе
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
