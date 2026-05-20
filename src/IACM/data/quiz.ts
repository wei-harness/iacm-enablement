export interface QuizQuestion {
  q: string; opts: string[]; a: number; exp: string; sku?: string
}

export const QUIZ_BANKS: Record<string, QuizQuestion[]> = {}

export const MASTER_EXTRAS: QuizQuestion[] = []

export const SKU_META: Record<string, { name: string; color: string; bg: string; bdr: string; icon: string }> = {}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
