export interface QaCard {
  q: string; tag: string; tagColor: string; tagBg: string; tagBdr: string; why: string; ans: string
}

export const QA_DATA: Record<string, QaCard[]> = {}

export const QA_SKU_NAMES: Record<string, string> = {}
