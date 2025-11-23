import type { ReactNode } from 'react'

export default function Badge({ children, tone='default' }: { children: ReactNode; tone?: 'default'|'low'|'medium'|'high' }) {
  const tones: Record<string, string> = {
    default: 'border-border text-muted',
    low: 'border-border text-muted',
    medium: 'border-border text-white bg-[#1b1c22]',
    high: 'border-danger/40 text-white bg-danger/20 border-danger/40'
  }
  return <span className={`tag ${tones[tone]||tones.default}`}>{children}</span>
}
