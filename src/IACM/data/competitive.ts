export interface CompCard {
  label: string; title: string; comp: string
  color: string; bg: string; bdr: string
  gap: string; oldState: string; fix: string; counter: string
}

export interface CiComp {
  id: string; name: string; short: string; grp: string; url: string | null
}

export interface CiRow {
  cat: 'visibility' | 'optimization' | 'governance' | 'platform'
  grp?: string
  feat: string
  h: string
  [key: string]: string | undefined
}

export const COMP_CARDS: CompCard[] = []

export const CI_COMPS: CiComp[] = []

export const CI_GROUPS: { label: string; ids: string[] }[] = []

export const CI_ROWS: CiRow[] = []
