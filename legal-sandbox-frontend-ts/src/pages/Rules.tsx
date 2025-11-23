import useAppStore from '../store/useAppStore'

export default function Rules() {
  const rules = useAppStore(s => s.rules)
  const setRules = useAppStore(s => s.setRules)

  return (
    <div className="grid gap-4 max-w-2xl">
      <div className="section-title">Правила анализа</div>
      <div className="card p-4 space-y-4">
        <div>
          <label className="block text-sm mb-1">Порог сходства для дублей</label>
          <input type="range" min={0.5} max={0.99} step={0.01}
            value={rules.duplicateThreshold}
            onChange={e => setRules({ duplicateThreshold: parseFloat((e.target as HTMLInputElement).value) })}
            className="w-full" />
          <div className="text-xs text-muted mt-1">Текущее значение: {Math.round(rules.duplicateThreshold*100)}%</div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={rules.checkJurisdiction}
              onChange={e => setRules({ checkJurisdiction: (e.target as HTMLInputElement).checked })} />
            Подсудность
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={rules.checkTerms}
              onChange={e => setRules({ checkTerms: (e.target as HTMLInputElement).checked })} />
            Сроки
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={rules.checkPenalty}
              onChange={e => setRules({ checkPenalty: (e.target as HTMLInputElement).checked })} />
            Штрафные санкции
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={rules.checkTermination}
              onChange={e => setRules({ checkTermination: (e.target as HTMLInputElement).checked })} />
            Расторжение (зарезервировано)
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={rules.checkForceMajeure}
              onChange={e => setRules({ checkForceMajeure: (e.target as HTMLInputElement).checked })} />
            Форс-мажор (зарезервировано)
          </label>
        </div>
      </div>
      <div className="text-sm text-muted">Правила сохраняются локально и применяются при анализе.</div>
    </div>
  )
}
