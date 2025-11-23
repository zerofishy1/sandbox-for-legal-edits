import type { Block, Rules, Issue } from '../types/models'

function normalize(s: string): string {
  return s.toLowerCase()
    .replace(/[.,;:()«»"']/g, ' ')
    .replace(/\s+/g,' ')
    .trim()
}
function tokens(s: string): Set<string> {
  return new Set(normalize(s).split(' ').filter(w => w.length>2))
}
function jaccard(a: string, b: string): number {
  const A = tokens(a), B = tokens(b)
  const inter = new Set([...A].filter(x => B.has(x))).size
  const uni = new Set([...A, ...B]).size || 1
  return inter / uni
}
function hasNumber(s: string): boolean { return /\d+[\d\s.,%/-]*/.test(s) }
function extractNumbers(s: string): string[] {
  return (s.match(/\d+[\d\s.,%/-]*/g)||[]).map(x=>x.trim())
}
function hasAny(s: string, arr: string[]): boolean { return arr.some(k => normalize(s).includes(k)) }

export async function analyzeText(blocks: Block[], rules: Rules): Promise<Issue[]> {
  const issues: Issue[] = []
  const dupThr = rules.duplicateThreshold ?? 0.9

  // Duplicates
  for (let i=0;i<blocks.length;i++) {
    for (let j=i+1;j<blocks.length;j++) {
      const sim = jaccard(blocks[i].text, blocks[j].text)
      if (sim >= dupThr) {
        issues.push({
          id: `${i}-${j}-dup`,
          type: 'duplicate',
          severity: sim > 0.95 ? 'medium' : 'low',
          score: sim,
          message: `Похожие формулировки (сходство ${(sim*100).toFixed(1)}%)`,
          refs: [blocks[i].id, blocks[j].id],
          suggestion: 'Оставить одну формулировку или объединить положения.'
        })
      }
    }
  }

  // Conflicts: jurisdiction
  if (rules.checkJurisdiction) {
    const courtWords = ['подсудность', 'арбитражн', 'суд', 'юр. адрес', 'место рассмотрения']
    const candidates = blocks.filter(b => hasAny(b.text, courtWords))
    for (let i=0;i<candidates.length;i++) {
      for (let j=i+1;j<candidates.length;j++) {
        const A = candidates[i].text, B = candidates[j].text
        const city = /(москв|санкт-петербург|екатеринбург|новосибирск|казан|россия|рф|хмао|москва)/i
        const ca = A.match(city)?.[0] || null
        const cb = B.match(city)?.[0] || null
        if (ca && cb && ca !== cb) {
          issues.push({
            id: `jur-${i}-${j}`,
            type: 'conflict',
            subtype: 'jurisdiction',
            severity: 'high',
            message: `Разная подсудность/регион (${ca} vs ${cb})`,
            refs: [candidates[i].id, candidates[j].id],
            suggestion: 'Установить единую подсудность (один суд/регион) во всех разделах.'
          })
        }
      }
    }
  }

  // Conflicts: terms
  if (rules.checkTerms) {
    const termWords = ['срок', 'дн', 'месяц', 'оплат', 'исполнен', 'поставк', 'предоставлен']
    const candidates = blocks.filter(b => hasAny(b.text, termWords) && hasNumber(b.text))
    for (let i=0;i<candidates.length;i++) {
      for (let j=i+1;j<candidates.length;j++) {
        const A = candidates[i].text, B = candidates[j].text
        const event = /(оплат[аеы]?|поставк[аи]?|исполнен[ия]?|предоставлен[ия]?)/i
        const ea = A.match(event)?.[0]
        const eb = B.match(event)?.[0]
        if (ea && eb && normalize(ea)===normalize(eb)) {
          const na = extractNumbers(A).join(' ')
          const nb = extractNumbers(B).join(' ')
          if (na && nb && na !== nb) {
            issues.push({
              id: `term-${i}-${j}`,
              type: 'conflict',
              subtype: 'terms',
              severity: 'high',
              message: `Разные сроки по одному событию (${ea}): «${na}» vs «${nb}».`,
              refs: [candidates[i].id, candidates[j].id],
              suggestion: 'Задать единый срок и привести упоминания к консистентной формулировке.'
            })
          }
        }
      }
    }
  }

  // Conflicts: penalty
  if (rules.checkPenalty) {
    const penWords = ['неусто', 'штраф', 'пеня', '%', 'процент']
    const candidates = blocks.filter(b => hasAny(b.text, penWords) && hasNumber(b.text))
    for (let i=0;i<candidates.length;i++) {
      for (let j=i+1;j<candidates.length;j++) {
        const na = extractNumbers(candidates[i].text).join(' ')
        const nb = extractNumbers(candidates[j].text).join(' ')
        if (na && nb && na !== nb) {
          issues.push({
            id: `pen-${i}-${j}`,
            type: 'conflict',
            subtype: 'penalty',
            severity: 'medium',
            message: `Разные размеры штрафных санкций: «${na}» vs «${nb}».`,
            refs: [candidates[i].id, candidates[j].id],
            suggestion: 'Гармонизировать размер неустойки/штрафа; добавить оговорку о максимуме.'
          })
        }
      }
    }
  }

  return issues
}
