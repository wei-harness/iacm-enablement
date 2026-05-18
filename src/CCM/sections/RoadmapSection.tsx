import { useState } from 'react'
import { ROADMAP_DATA } from '../data/roadmap'
import type { RoadmapStatus } from '../data/roadmap'
import styles from '../ccm.module.scss'

const TAG_COLORS: Record<string, string> = {
  'Cost Insights': 'var(--color-finops)',
  'Cluster Orchestrator': 'var(--danger)',
  'AutoStopping': 'var(--color-quality)',
  'Commitment Orchestrator': 'var(--warn)',
  'Shift Left': 'var(--success)',
  'AI / New': 'var(--color-appsec)',
}

const TAG_BGS: Record<string, string> = {
  'Cost Insights': 'color-mix(in srgb, var(--color-finops) 10%, transparent)',
  'Cluster Orchestrator': 'color-mix(in srgb, var(--danger) 10%, transparent)',
  'AutoStopping': 'color-mix(in srgb, var(--color-quality) 10%, transparent)',
  'Commitment Orchestrator': 'color-mix(in srgb, var(--warn) 10%, transparent)',
  'Shift Left': 'color-mix(in srgb, var(--success) 10%, transparent)',
  'AI / New': 'color-mix(in srgb, var(--color-appsec) 10%, transparent)',
}

const STATUS_LABEL: Record<RoadmapStatus, string> = {
  now: 'Shipping Now',
  soon: 'Coming Soon',
  later: 'Later in 2026',
}

const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'] as const

export function RoadmapSection() {
  const [expanded, setExpanded] = useState<string | null>(null)

  const toggle = (id: string) => setExpanded(expanded === id ? null : id)

  const renderItem = (item: (typeof ROADMAP_DATA)[0]) => {
    const tagColor = TAG_COLORS[item.tag] ?? 'var(--text-muted)'
    const tagBg = TAG_BGS[item.tag] ?? 'var(--bg-panel)'
    return (
      <button
        key={item.name}
        className={styles.roadmapItem}
        aria-expanded={expanded === item.name}
        onClick={() => toggle(item.name)}
      >
        <div
          className={styles.roadmapTagBadge}
          style={{
            background: tagBg,
            color: tagColor,
            border: `1px solid color-mix(in srgb, ${tagColor} 30%, transparent)`,
          }}
        >
          {item.tag}
        </div>
        <div className={styles.roadmapItemHeader}>
          <div className={styles.roadmapItemName}>{item.name}</div>
          <span className={`${styles.roadmapBadge} ${item.status === 'now' ? styles.roadmapBadgeNow : item.status === 'soon' ? styles.roadmapBadgeSoon : styles.roadmapBadgeLater}`}>
            {STATUS_LABEL[item.status]}
          </span>
        </div>
        {expanded === item.name && (
          <div className={styles.roadmapDesc}>{item.desc}</div>
        )}
      </button>
    )
  }

  return (
    <div>
      <div className={styles.sectionHdr}>
        <div className={styles.sectionEyebrow}>Product Roadmap</div>
        <h2 className={styles.sectionTitle}>What's Coming</h2>
        <p className={styles.sectionSub}>Click any item to expand the description. Use this to handle "what's next?" objections and set expectations.</p>
      </div>

      {/* AI Highlight Callout */}
      <div className={`${styles.aiHighlight} ${styles.reveal}`}>
        <div className={styles.aiHighlightBody}>
          <div className={styles.aiHighlightEyebrow}>The Big Bet — Q3 2026</div>
          <div className={styles.aiHighlightTitle}>AI Cost Management</div>
          <div className={styles.aiHighlightDesc}>
            Full FinOps for LLM APIs and GPU infrastructure — attribution, optimization, governance, and anomaly detection for AI costs. The first platform to connect cloud billing to model-level spend.
          </div>
        </div>
        <div className={styles.aiHighlightStats}>
          <div className={styles.aiHighlightStat}>
            <div className={styles.aiHighlightStatVal}>98%</div>
            <div className={styles.aiHighlightStatLabel}>FinOps teams now manage AI spend</div>
          </div>
          <div className={styles.aiHighlightStat}>
            <div className={styles.aiHighlightStatVal}>23%</div>
            <div className={styles.aiHighlightStatLabel}>can accurately measure AI ROI</div>
          </div>
        </div>
      </div>

      {/* Q1/Q2/Q3/Q4 Grid */}
      <div className={`${styles.roadmapGrid4} ${styles.reveal}`}>
        {QUARTERS.map((q) => {
          const items = ROADMAP_DATA.filter((r) => r.q === q)
          return (
            <div key={q} className={styles.roadmapCol}>
              <div className={styles.roadmapColHdr}>CY&apos;26 {q}</div>
              {items.map(renderItem)}
            </div>
          )
        })}
      </div>
    </div>
  )
}
