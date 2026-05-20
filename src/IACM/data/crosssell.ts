export interface IcpCriterion {
  num: string
  title: string
  desc: string
  threshold: string
  threshColor: string // CSS variable name
}

export interface DiscoFlag {
  label: string
  action: string
  text: string
}

export interface DiscoQuestion {
  num: string
  topic: string
  q: string
  green: DiscoFlag
  yellow: DiscoFlag
  red: DiscoFlag
  why: string
  solves: string[]
}

export interface MotionExpand {
  leftLabel: string
  leftItems: string[]
  rightLabel: string
  rightItems: string[]
  starter: string
}

export interface Motion {
  id: string
  color: string // CSS variable
  colorSub: string // CSS variable for bg
  icon: string
  name: string
  tagline: string
  targets: string[]
  targetColors: string[] // CSS variables
  pitch: string
  expand: MotionExpand
}

export interface PathwayStep {
  name: string
  val: string
  desc: string
}

export interface Pathway {
  id: string
  label: string
  steps: PathwayStep[]
  total: string
  note: string
  rationale: string
}

export interface MaturitySku {
  icon: string
  name: string
  color: string // CSS variable
  tag: string
  tagColor: string // CSS variable
  why: string
}

export interface MaturityStage {
  num: string
  name: string
  label: string
  labelColor: string // CSS variable
  skus: MaturitySku[]
}

export interface ConversationStarter {
  filter: string
  q: string
  context: string
  ans: string
}

export const ICP_CRITERIA: IcpCriterion[] = []

export const DISCO_QUESTIONS: DiscoQuestion[] = []

export const MOTIONS: Motion[] = []

export const OTHER_MOTIONS: Motion[] = []

export const PATHWAYS: Pathway[] = []

export const MATURITY_UPSELL: MaturityStage[] = []

export const STARTER_FILTERS: string[] = []

export const CONVERSATION_STARTERS: ConversationStarter[] = []
