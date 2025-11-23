export type Severity = 'low' | 'medium' | 'high'
export type IssueType = 'duplicate' | 'conflict'
export type ConflictSubtype = 'jurisdiction' | 'terms' | 'penalty' | string

export interface Block {
  id: string
  text: string
}

export interface Doc {
  id: string
  name: string
  blocks: Block[]
  createdAt: number
}

export interface Rules {
  duplicateThreshold: number
  checkJurisdiction: boolean
  checkTerms: boolean
  checkPenalty: boolean
  checkTermination: boolean
  checkForceMajeure: boolean
}

export interface Issue {
  id: string
  type: IssueType
  subtype?: ConflictSubtype
  severity: Severity
  message: string
  refs: string[]
  suggestion: string
  score?: number
}
