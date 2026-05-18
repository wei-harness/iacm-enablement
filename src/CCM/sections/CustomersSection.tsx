import { useState } from 'react'
import { CUSTOMERS, GWP_IN_PROGRESS, GWP_SHIPPED, LESSONS_DATA } from '../data/customers'
import type { CheckpointStatus } from '../data/customers'
import styles from '../ccm.module.scss'

type LessonTab = 'problem' | 'changed' | 'story'

const STATUS_COLOR: Record<CheckpointStatus, string> = {
  red: 'var(--danger)',
  yellow: 'var(--warn)',
  green: 'var(--success)',
}

const STATUS_DOT_CLASS: Record<CheckpointStatus, string> = {
  red: styles.timelineDotRed,
  yellow: styles.timelineDotYellow,
  green: styles.timelineDotGreen,
}

export function CustomersSection() {
  const [activeCustomer, setActiveCustomer] = useState(0)
  const [activeCheckpoint, setActiveCheckpoint] = useState(0)
  const [activeLessonIdx, setActiveLessonIdx] = useState(0)
  const [lessonTab, setLessonTab] = useState<LessonTab>('problem')

  const customer = CUSTOMERS[activeCustomer]
  const checkpoint = customer.checkpoints[activeCheckpoint]
  const lesson = LESSONS_DATA[activeLessonIdx]

  function selectLesson(idx: number) {
    setActiveLessonIdx(idx)
    setLessonTab('problem')
  }

  return (
    <div>
      <div className={styles.sectionHdr}>
        <div className={styles.sectionEyebrow}>Customer Intelligence</div>
        <h2 className={styles.sectionTitle}>Customer Journeys</h2>
        <p className={styles.sectionSub}>Health snapshots, checkpoint details, and lessons learned from our top CCM accounts.</p>
      </div>

      {/* Customer Nav */}
      <div className={styles.customerNavGrid}>
        {CUSTOMERS.map((c, i) => (
          <button
            key={c.name}
            className={`${styles.customerNavCard} ${i === activeCustomer ? styles.customerNavCardActive : ''}`}
            style={{ '--active-color': c.color } as React.CSSProperties}
            onClick={() => { setActiveCustomer(i); setActiveCheckpoint(0) }}
          >
            <div className={styles.customerNavName} style={{ color: i === activeCustomer ? c.color : undefined }}>{c.name}</div>
            <div className={styles.customerNavIndustry}>{c.sku}</div>
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className={styles.statGrid} style={{ marginBottom: 20 }}>
        {customer.stats.map((s) => (
          <div key={s.l} className={styles.statCard}>
            <div className={styles.statVal} style={{ color: customer.color }}>{s.v}</div>
            <div className={styles.statLabel}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', padding: 'var(--space-lg) var(--space-xl)', marginBottom: 20 }}>
        <div style={{ fontSize: 'var(--text-label)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--text-muted)', marginBottom: 8 }}>Health Timeline</div>
        <div className={styles.timelineTrack}>
          {customer.checkpoints.map((cp, i) => (
            <button
              key={i}
              className={`${styles.timelineDot} ${STATUS_DOT_CLASS[cp.status]} ${i === activeCheckpoint ? styles.timelineDotActive : ''}`}
              style={{ left: customer.checkpoints.length > 1 ? `${(i / (customer.checkpoints.length - 1)) * 100}%` : '50%', background: STATUS_COLOR[cp.status], border: 'none', cursor: 'pointer' }}
              aria-label={`${cp.date} checkpoint — ${cp.status === 'green' ? 'healthy' : cp.status === 'yellow' ? 'at risk' : 'needs attention'}`}
              aria-pressed={i === activeCheckpoint}
              onClick={() => setActiveCheckpoint(i)}
            >
              <span className={styles.timelineLabel} aria-hidden="true">{cp.date}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Checkpoint Detail */}
      <div className={styles.checkpointPanel} style={{ marginBottom: 28 }}>
        <div className={styles.checkpointDate}>{checkpoint.label} Check-in</div>
        <div className={styles.stage}>
          <div className={styles.stageLabel} style={{ color: 'var(--danger)' }}>ISSUE / RISK</div>
          <div className={styles.stageText}>{checkpoint.issue}</div>
        </div>
        <div className={styles.stage}>
          <div className={styles.stageLabel} style={{ color: 'var(--success)' }}>STATUS / FIX</div>
          <div className={styles.stageText}>{checkpoint.fix}</div>
        </div>
      </div>

      {/* Customer detail */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)', marginBottom: 20 }}>
        <div className={styles.checkpointPanel}>
          <div style={{ fontSize: 'var(--text-label)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--text-muted)', marginBottom: 10 }}>Challenge</div>
          <div style={{ fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{customer.challenge}</div>
        </div>
        <div className={styles.checkpointPanel}>
          <div style={{ fontSize: 'var(--text-label)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--text-muted)', marginBottom: 10 }}>Solution</div>
          {customer.solution.map((s) => <div key={s} style={{ fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)', padding: 'var(--space-xs) 0', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{s}</div>)}
        </div>
      </div>

      {/* What Is Next */}
      {customer.next && (
        <div className={styles.customerNextBlock} style={{ marginBottom: 20 }}>
          <div className={styles.customerNextLabel}>What Is Next</div>
          <div style={{ fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{customer.next}</div>
        </div>
      )}

      {/* Summary */}
      <div style={{ background: 'var(--accent-sub)', border: '1px solid var(--accent-bdr)', borderRadius: 'var(--r-lg)', padding: 'var(--space-md)', marginBottom: 40 }}>
        <div style={{ fontSize: 'var(--text-label)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--accent)', marginBottom: 6 }}>Account Summary</div>
        <div style={{ fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{customer.summary}</div>
      </div>

      {/* Lessons Learned */}
      <div style={{ marginBottom: 12 }}>
        <div className={styles.sectionEyebrow}>Lessons Learned</div>
        <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 'var(--text-body-lg)', fontWeight: 400, color: 'var(--text-primary)', margin: '4px 0 0' }}>What We Fixed Across All Accounts</h3>
      </div>

      <div className={styles.lessonLayout}>
        <nav className={styles.lessonNav}>
          {LESSONS_DATA.map((l, i) => (
            <button
              key={l.num}
              className={`${styles.lessonNavBtn} ${i === activeLessonIdx ? styles.lessonNavBtnActive : ''}`}
              onClick={() => selectLesson(i)}
            >
              <div className={styles.lessonNavNum}>{l.num}</div>
              <div className={styles.lessonNavTitle}>{l.title}</div>
            </button>
          ))}
        </nav>

        <div className={styles.lessonPanel}>
          <span className={styles.lessonTag} style={{ background: lesson.tagBg, color: lesson.tagColor, border: `1px solid ${lesson.tagBdr}` }}>{lesson.tag}</span>
          <div className={styles.lessonTitle}>{lesson.title}</div>
          <div className={styles.lessonCustomers}>Affected accounts: {lesson.customers}</div>

          {/* Tabs */}
          <div className={styles.lessonTabRow}>
            {(['problem', 'changed', 'story'] as LessonTab[]).map((tab) => (
              <button
                key={tab}
                className={`${styles.lessonTabBtn} ${lessonTab === tab ? styles.lessonTabBtnActive : ''}`}
                onClick={() => setLessonTab(tab)}
              >
                {tab === 'problem' ? 'The Problem' : tab === 'changed' ? 'What We Changed' : 'Story for Sales'}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {lessonTab === 'story' ? (
            <div className={styles.lessonStory}>{lesson.story}</div>
          ) : (
            <div className={styles.lessonSectionText}>
              {lessonTab === 'problem' ? lesson.problem : lesson.changed}
            </div>
          )}

          {/* Prev / Next navigation */}
          <div className={styles.lessonPanelNav}>
            <button
              className={styles.lessonPanelNavBtn}
              disabled={activeLessonIdx === 0}
              onClick={() => selectLesson(activeLessonIdx - 1)}
            >
              ← Previous
            </button>
            <span className={styles.lessonPanelNavCount}>{activeLessonIdx + 1} of {LESSONS_DATA.length}</span>
            <button
              className={styles.lessonPanelNavBtn}
              disabled={activeLessonIdx === LESSONS_DATA.length - 1}
              onClick={() => selectLesson(activeLessonIdx + 1)}
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* GWP */}
      <div style={{ marginTop: 40 }}>
        <div className={styles.sectionEyebrow}>Get Well Plan</div>
        <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 'var(--text-body-lg)', fontWeight: 400, color: 'var(--text-primary)', margin: '4px 0 16px' }}>Shipped This Quarter</h3>
        <div className={styles.gwpGrid} style={{ marginBottom: 24 }}>
          {GWP_SHIPPED.map((g) => (
            <div key={g.name} className={styles.gwpItem}>
              <div className={styles.gwpArea}>{g.area}</div>
              <div className={styles.gwpName}>{g.name}</div>
              <div className={styles.gwpDesc}>{g.desc}</div>
            </div>
          ))}
        </div>
        <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 'var(--text-body-serif)', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 14 }}>In Progress</h3>
        <div className={styles.gwpGrid}>
          {GWP_IN_PROGRESS.map((g) => (
            <div key={g.name} className={styles.gwpItem} style={{ borderColor: 'color-mix(in srgb, var(--warning-amber) 25%, transparent)' }}>
              <div className={styles.gwpArea} style={{ color: 'var(--warn)' }}>{g.area}</div>
              <div className={styles.gwpName}>{g.name}</div>
              <div className={styles.gwpDesc}>{g.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
