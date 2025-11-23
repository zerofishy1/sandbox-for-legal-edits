import { useEffect, useMemo, useState } from 'react'
import useAppStore from '../store/useAppStore'
import DocumentViewer from '../components/DocumentViewer'
import IssuesPanel from '../components/IssuesPanel'
import Button from '../components/Button'

export default function Sandbox() {
  const { docs, currentDocId, analyze } = useAppStore()
  const [active, setActive] = useState<string[]>([])
  const doc = useMemo(() => docs.find(d => d.id === currentDocId) || docs[0], [docs, currentDocId])

  useEffect(()=>{ setActive([]) }, [doc?.id])

  if (!doc) {
    return <div className="card p-6 text-muted">Нет выбранного документа. Загрузите файл или откройте из «Проекты».</div>
  }

  const runAnalysis = () => analyze(doc.id)
  const onJump = (blockId: string) => setActive([blockId])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="section-title">{doc.name}</div>
            <div className="text-xs text-muted">Клауз: {doc.blocks.length}</div>
          </div>
          <Button onClick={runAnalysis} className="btn-primary">Анализировать</Button>
        </div>
        <DocumentViewer blocks={doc.blocks} activeIds={active} />
      </div>
      <IssuesPanel docId={doc.id} onJump={onJump} />
    </div>
  )
}
