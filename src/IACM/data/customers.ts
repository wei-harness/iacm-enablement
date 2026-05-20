export type CheckpointStatus = 'red' | 'yellow' | 'green'

export interface Checkpoint {
  date: string; status: CheckpointStatus; label: string; issue: string; fix: string
}

export interface CustomerStat { v: string; l: string }

export interface Customer {
  name: string; industry: string; sku: string; color: string; acv: string
  stats: CustomerStat[]
  checkpoints: Checkpoint[]
  challenge: string
  solution: string[]
  next: string
  summary: string
}

export interface Lesson {
  num: string; title: string; customers: string; problem: string
  changed: string; story: string; tag: string; tagColor: string; tagBg: string; tagBdr: string
}

export interface GwpItem { area: string; name: string; desc: string }

export const CUSTOMERS: Customer[] = []

export const LESSONS_DATA: Lesson[] = []

export const GWP_SHIPPED: GwpItem[] = []

export const GWP_IN_PROGRESS: GwpItem[] = []
