import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuid } from 'uuid'
import { analyzeText } from '../utils/analyzer'
import type { Doc, Rules, Issue } from '../types/models'

interface AppState {
  docs: Doc[]
  issues: Record<string, Issue[]>
  rules: Rules
  currentDocId: string | null
  addDoc: (name: string, text: string) => string
  removeDoc: (id: string) => void
  setCurrentDoc: (id: string | null) => void
  setRules: (upd: Partial<Rules>) => void
  analyze: (docId: string) => Promise<void>
}

const initialRules: Rules = {
  duplicateThreshold: 0.9,
  checkJurisdiction: true,
  checkTerms: true,
  checkPenalty: true,
  checkTermination: true,
  checkForceMajeure: true,
}

const useAppStore = create<AppState>()(persist((set, get) => ({
  docs: [],
  issues: {},
  rules: initialRules,
  currentDocId: null,
  addDoc(name, text) {
    const id = uuid()
    const rawBlocks = text.split(/\n\s*\n/)
    const blocks = rawBlocks
      .map(t => ({ id: uuid(), text: t.trim() }))
      .filter(b => b.text.length > 0)
    const doc: Doc = { id, name, blocks, createdAt: Date.now() }
    set(state => ({ docs: [doc, ...state.docs], currentDocId: id }))
    return id
  },
  removeDoc(id) {
    set(state => ({ docs: state.docs.filter(d => d.id !== id) }))
  },
  setCurrentDoc(id) { set({ currentDocId: id }) },
  setRules(upd) { set(state => ({ rules: { ...state.rules, ...upd } })) },
  async analyze(docId) {
    const doc = get().docs.find(d => d.id === docId)
    if (!doc) return
    const issues = await analyzeText(doc.blocks, get().rules)
    set(state => ({ issues: { ...state.issues, [docId]: issues } }))
  },
}), { name: 'legal-sandbox-store-ts' }))

export default useAppStore
