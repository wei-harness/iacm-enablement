export type RoadmapStatus = 'now' | 'soon' | 'later'

export interface RoadmapItem {
  q: string; name: string; tag: string; status: RoadmapStatus; desc: string
}

export const ROADMAP_DATA: RoadmapItem[] = []
