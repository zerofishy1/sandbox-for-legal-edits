import { useEffect, useRef } from 'react'
import type { Block } from '../types/models'

export default function DocumentViewer({ blocks, activeIds=[] }: { blocks: Block[]; activeIds?: string[] }) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(()=>{
    if (activeIds.length && ref.current) {
      const el = ref.current.querySelector(`[data-id="${activeIds[0]}"]`) as HTMLElement | null
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [activeIds])

  return (
    <div ref={ref} className="card p-4 h-[calc(100vh-200px)] overflow-auto scroll-thin">
      <div className="section-title">Документ</div>
      <div className="space-y-4">
        {blocks.map((b, i) => (
          <p key={b.id} data-id={b.id}
             className={`leading-relaxed ${activeIds.includes(b.id) ? 'highlight rounded-lg p-2' : ''}`}>
            <span className="text-muted text-xs mr-2">§{i+1}</span>
            {b.text}
          </p>
        ))}
      </div>
    </div>
  )
}
