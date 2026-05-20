export interface SkuFeature { n: string; d: string }
export interface SkuDiscovery { q: string; why: string; ans: string }
export interface RoiSlider { label: string; min: number; max: number; step: number; defaultVal: number; format: (v: number) => string }
export interface RoiResult { compute: (s1: number, s2: number) => [string, string, string, string, string, string] }
export interface Sku {
  id: string; name: string; icon: string; color: string; bg: string; bdr: string
  /** icon: Lucide icon name (e.g. 'bar-chart-2') */
  tagline: string; pitch: string; value: string; valueLabel: string
  useCases: string[]
  features: SkuFeature[]
  stats: string[]
  discovery: SkuDiscovery[]
  roi: { sliders: [RoiSlider, RoiSlider]; compute: (s1: number, s2: number) => [string, string, string, string, string, string] }
}

export function fmtM(n: number): string {
  if (n >= 1) return '$' + n.toFixed(1).replace(/\.0$/, '') + 'M'
  return '$' + Math.round(n * 1000) + 'K'
}

export const SKU_DATA: Sku[] = []
