export interface MaturityStage {
  stage: number; name: string; label: string
  labelColor: string; labelBg: string; labelBdr: string
  desc: string; actions: string[]
  rec: string; recColor: string; recBg: string
}

export interface WorkshopItem { n: number; title: string; desc: string }

export const MATURITY_STAGES: MaturityStage[] = []

export const WORKSHOP_ITEMS: WorkshopItem[] = []

export const LISTEN_ITEMS: string[] = []
