import { useState } from 'react'
import styles from '../ccm.module.scss'
import {
  ICP_CRITERIA,
  DISCO_QUESTIONS,
  CCM_MOTIONS,
  OTHER_MOTIONS,
  PATHWAYS,
  MATURITY_UPSELL,
  STARTER_FILTERS,
  CONVERSATION_STARTERS,
  type Motion,
} from '../data/crosssell'

type TopTab = 'whitespace' | 'upsell'
type UpsellTab = 'motions' | 'pathways' | 'maturity' | 'starters'
type FlagColor = 'green' | 'yellow' | 'red'

/* ── Colour helpers for flag semantics (mapped to tokens) ── */
const FLAG_TOKENS = {
  green: {
    dot: 'var(--state-success)',
    label: 'var(--state-success)',
    bg: 'var(--state-success-bg)',
    border: 'color-mix(in srgb, var(--state-success) 30%, transparent)',
  },
  yellow: {
    dot: 'var(--warning-amber)',
    label: 'var(--warning-amber)',
    bg: 'var(--warn-bg)',
    border: 'color-mix(in srgb, var(--warning-amber) 30%, transparent)',
  },
  red: {
    dot: 'var(--danger)',
    label: 'var(--danger)',
    bg: 'var(--danger-bg)',
    border: 'color-mix(in srgb, var(--danger) 30%, transparent)',
  },
}

/* ═══ Tab 1: Whitespace Discovery ═══ */
function WhitespaceTab() {
  const [icpState, setIcpState] = useState<Record<number, boolean>>({})
  const [activeQ, setActiveQ] = useState(0)
  const [qFlags, setQFlags] = useState<Record<number, FlagColor>>({})

  const passedCount = Object.values(icpState).filter(Boolean).length
  const failedCount = Object.values(icpState).filter((v) => v === false).length
  const answeredCount = Object.keys(icpState).length

  function icpVerdict(): { text: string; desc: string; color: string } | null {
    if (answeredCount === 0) return null
    if (passedCount === 6 && failedCount === 0)
      return { text: 'Qualifies as CCM ICP target', desc: 'All 6 criteria met. This account qualifies for the CCM whitespace motion. Proceed to the 8-question discovery guide below.', color: 'var(--state-success)' }
    if (failedCount > 0)
      return { text: 'Does not qualify — criteria not met', desc: 'One or more required criteria are not met. Do not run the CCM whitespace motion on this account. Log for future review at renewal or when spend grows.', color: 'var(--danger)' }
    return { text: 'Partial — finish assessing', desc: 'Keep marking criteria to get a full qualification read.', color: 'var(--warning-amber)' }
  }

  const verdict = icpVerdict()

  const greens = Object.values(qFlags).filter((f) => f === 'green').length
  const yellows = Object.values(qFlags).filter((f) => f === 'yellow').length
  const reds = Object.values(qFlags).filter((f) => f === 'red').length
  const allAnswered = Object.keys(qFlags).length === 8

  function scoringTierActive(): number {
    if (!allAnswered) return -1
    if (greens >= 3) return 0
    if (greens >= 1) return 1
    return 2
  }
  const activeTier = scoringTierActive()

  const scoringTiers = [
    { dot: 'var(--state-success)', label: '3+ Green Flags', labelColor: 'var(--state-success)', action: 'Schedule CCM discovery immediately', desc: 'You have enough signal. Get the CCM Advisory Director on the call and lock in next steps before the conversation ends. Don\'t wait.' },
    { dot: 'var(--warning-amber)', label: '1–2 Green Flags', labelColor: 'var(--warning-amber)', action: 'Probe one more level — worth a short intro demo', desc: 'There\'s signal but not full conviction yet. Ask one follow-up, then offer to connect them with the CCM team for a short no-pressure intro.' },
    { dot: 'var(--danger)', label: '0 Green Flags', labelColor: 'var(--danger)', action: 'Park it — revisit at renewal', desc: 'Don\'t force it. Log for a future trigger — renewal, re-org, new champion — and move on. A bad-fit conversation hurts your credibility as a CD champion.' },
  ]

  const q = DISCO_QUESTIONS[activeQ]

  return (
    <div>
      {/* Per-tab page header */}
      <div style={{ marginBottom: 'var(--space-lg)' }}>
        <div className={styles.sectionEyebrow}>CCM Whitespace Program · Step 1</div>
        <h2 className={styles.sectionTitle}>Qualify the account. Run the discovery.</h2>
        <p className={styles.sectionSub}>
          Use this before any CCM conversation with an existing CI or CD customer. First check the ICP criteria — if they qualify, work through the 8 discovery questions to gauge readiness and surface pain.
        </p>
      </div>

      {/* Warning callout */}
      <div style={{ background: 'var(--danger-bg)', border: '1px solid color-mix(in srgb, var(--danger) 25%, transparent)', borderRadius: 'var(--r-md)', padding: 'var(--space-sm) var(--space-md)', marginBottom: 'var(--space-lg)', display: 'flex', gap: 'var(--space-sm)', alignItems: 'flex-start', fontSize: 'var(--text-label)', color: 'var(--text-secondary)' }}>
        <span style={{ color: 'var(--danger)', fontWeight: 700, flexShrink: 0 }}>⚠ Not for</span>
        <span>New reps or new logo pursuits. This is a cross-sell motion only for existing CI/CD/IaCM customers with account context and relationship history.</span>
      </div>

      {/* ── ICP Checklist ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)', flexWrap: 'wrap' }}>
        <div className={styles.sectionEyebrow} style={{ marginBottom: 0 }}>ICP Qualification Checklist</div>
        <span style={{ fontSize: 'var(--text-label)', color: 'var(--text-muted)' }}>— Mark each criterion met or not met</span>
        <button
          onClick={() => setIcpState({})}
          style={{ marginLeft: 'auto', background: 'none', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-label)', fontWeight: 600, color: 'var(--text-secondary)', padding: '3px var(--space-md)', cursor: 'pointer' }}
        >
          Reset all
        </button>
      </div>

      <div className={styles.csIcpGrid}>
        {ICP_CRITERIA.map((c, i) => {
          const st = icpState[i]
          const borderColor = st === true ? 'color-mix(in srgb, var(--state-success) 40%, transparent)' : st === false ? 'color-mix(in srgb, var(--danger) 40%, transparent)' : 'var(--border)'
          const bg = st === true ? 'var(--state-success-bg)' : st === false ? 'var(--danger-bg)' : 'var(--bg-card)'
          return (
            <div key={i} className={styles.csIcpCard} style={{ borderColor, background: bg }}>
              <div className={styles.csIcpNum}>
                <span className={styles.csIcpNumBadge} style={{ background: `color-mix(in srgb, ${c.threshColor} 12%, transparent)`, color: c.threshColor, border: `1px solid color-mix(in srgb, ${c.threshColor} 25%, transparent)` }}>{c.num}</span>
                {st === true && <span style={{ color: 'var(--state-success)', fontSize: 'var(--text-body-sm)' }}>✓</span>}
                {st === false && <span style={{ color: 'var(--danger)', fontSize: 'var(--text-body-sm)' }}>✗</span>}
              </div>
              <div className={styles.csIcpTitle}>{c.title}</div>
              <div className={styles.csIcpDesc}>{c.desc}</div>
              <div className={styles.csIcpThreshold} style={{ background: `color-mix(in srgb, ${c.threshColor} 10%, transparent)`, color: c.threshColor, border: `1px solid color-mix(in srgb, ${c.threshColor} 25%, transparent)` }}>{c.threshold}</div>
              <div className={styles.csIcpToggle}>
                <button
                  className={styles.csIcpBtn}
                  style={{ borderColor: 'color-mix(in srgb, var(--state-success) 40%, transparent)', color: 'var(--state-success)', background: st === true ? 'var(--state-success-bg)' : 'transparent' }}
                  onClick={() => setIcpState((prev) => ({ ...prev, [i]: true }))}
                >
                  ✓ Met
                </button>
                <button
                  className={styles.csIcpBtn}
                  style={{ borderColor: 'color-mix(in srgb, var(--danger) 40%, transparent)', color: 'var(--danger)', background: st === false ? 'var(--danger-bg)' : 'transparent' }}
                  onClick={() => setIcpState((prev) => ({ ...prev, [i]: false }))}
                >
                  ✗ Not met
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* ICP Result */}
      {verdict && (
        <div className={`${styles.csIcpResult} ${styles.csIcpResultShow}`}>
          <div className={styles.csIcpScoreBig} style={{ color: verdict.color }}>{passedCount}/6</div>
          <div>
            <div className={styles.csIcpVerdict} style={{ color: verdict.color }}>{verdict.text}</div>
            <div className={styles.csIcpVerdictDesc}>{verdict.desc}</div>
          </div>
        </div>
      )}

      {/* ── Discovery Guide ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)', flexWrap: 'wrap' }}>
        <div className={styles.sectionEyebrow} style={{ marginBottom: 0 }}>Discovery Guide — 8 Questions</div>
        <span style={{ fontSize: 'var(--text-label)', color: 'var(--text-muted)' }}>— Click a flag on each question to record your read</span>
        <button
          onClick={() => { setQFlags({}); setActiveQ(0) }}
          style={{ marginLeft: 'auto', background: 'none', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-label)', fontWeight: 600, color: 'var(--text-secondary)', padding: '3px var(--space-md)', cursor: 'pointer' }}
        >
          Reset all
        </button>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', padding: 'var(--space-sm) var(--space-md)', fontSize: 'var(--text-label)', color: 'var(--text-secondary)', marginBottom: 'var(--space-md)', lineHeight: 'var(--leading-relaxed)' }}>
        For CI/CD champion conversations — surface pain naturally, don't pitch a product. After 2–3 questions you should have a clear sense of whether to schedule a dedicated CCM discovery call.
      </div>

      <div className={styles.csDiscoLayout}>
        {/* Nav */}
        <div className={styles.csDiscoNav}>
          <div className={styles.csDiscoNavHdr}>
            <div className={styles.csDiscoNavTitle}>Questions</div>
            <div className={styles.csScoreBadges}>
              {greens > 0 && <span className={styles.csScoreChip} style={{ background: 'var(--state-success-bg)', color: 'var(--state-success)', border: '1px solid color-mix(in srgb, var(--state-success) 30%, transparent)' }}>{greens} ▲</span>}
              {yellows > 0 && <span className={styles.csScoreChip} style={{ background: 'var(--warn-bg)', color: 'var(--warning-amber)', border: '1px solid color-mix(in srgb, var(--warning-amber) 30%, transparent)' }}>{yellows} ~</span>}
              {reds > 0 && <span className={styles.csScoreChip} style={{ background: 'var(--danger-bg)', color: 'var(--danger)', border: '1px solid color-mix(in srgb, var(--danger) 30%, transparent)' }}>{reds} ▼</span>}
            </div>
          </div>
          {DISCO_QUESTIONS.map((dq, i) => {
            const flag = qFlags[i]
            const flagToken = flag ? FLAG_TOKENS[flag] : null
            const isActive = i === activeQ
            return (
              <button
                key={i}
                className={`${styles.csDqNavBtn} ${isActive ? styles.csDqNavBtnActive : ''}`}
                onClick={() => setActiveQ(i)}
              >
                <div
                  className={styles.csDqNavNum}
                  style={{
                    background: isActive ? 'var(--accent-sub)' : 'var(--bg-panel)',
                    color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                    border: `1px solid ${isActive ? 'var(--accent-bdr)' : 'var(--border)'}`,
                  }}
                >
                  {dq.num}
                </div>
                <div className={styles.csDqNavTopic}>{dq.topic}</div>
                {flagToken && <div className={styles.csDqNavFlag} style={{ background: flagToken.dot }} />}
              </button>
            )
          })}
        </div>

        {/* Panel */}
        <div className={styles.csDiscoPanel}>
          <div className={styles.csDqQNum}>{q.num} of 8 — {q.topic}</div>
          <div className={styles.csDqQText}>{q.q}</div>
          {!qFlags[activeQ] && (
            <div style={{ fontSize: 'var(--text-label)', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: 'var(--space-sm)' }}>
              ↓ Click the flag that matches the customer's response
            </div>
          )}

          <div className={styles.csFlagCards}>
            {(['green', 'yellow', 'red'] as FlagColor[]).map((fk) => {
              const ft = FLAG_TOKENS[fk]
              const flagData = q[fk]
              const isSelected = qFlags[activeQ] === fk
              return (
                <button
                  key={fk}
                  className={styles.csFlagCard}
                  style={{
                    borderColor: isSelected ? ft.dot : ft.border,
                    background: isSelected ? ft.bg : 'var(--bg-card)',
                    boxShadow: isSelected ? `0 0 0 2px ${ft.dot}` : undefined,
                    width: '100%',
                    textAlign: 'left',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'inherit',
                    color: 'inherit',
                  }}
                  onClick={() => setQFlags((prev) => ({ ...prev, [activeQ]: fk }))}
                >
                  <div className={styles.csFlagCardHdr} style={{ background: isSelected ? ft.bg : 'var(--bg-panel)' }}>
                    <div className={styles.csFlagDot} style={{ background: ft.dot }} />
                    <span className={styles.csFlagLabel} style={{ color: ft.label }}>{flagData.label}</span>
                    <span className={styles.csFlagAction} style={{ color: ft.label }}>{flagData.action}</span>
                    {isSelected && <span style={{ marginLeft: 'auto', fontSize: 'var(--text-label)', fontWeight: 700, color: ft.label }}>✓ Selected</span>}
                  </div>
                  <div className={styles.csFlagBody}>{flagData.text}</div>
                </button>
              )
            })}
          </div>

          <div className={styles.csDqBottom}>
            <div style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', padding: 'var(--space-md)' }}>
              <div className={styles.csDqWhyLbl}>Why it matters</div>
              <div className={styles.csDqWhy}>{q.why}</div>
            </div>
            <div style={{ background: 'var(--bg-panel)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', padding: 'var(--space-md)' }}>
              <div className={styles.csDqSolvesLbl}>CCM solves with</div>
              <div className={styles.csDqSolves} style={{ marginTop: 'var(--space-sm)' }}>
                {q.solves.map((s) => <span key={s} className={styles.csDqSolveTag}>{s}</span>)}
              </div>
            </div>
          </div>

          {activeQ < 7 && (
            <div style={{ marginTop: 'var(--space-md)', textAlign: 'right' }}>
              <button
                onClick={() => setActiveQ(activeQ + 1)}
                style={{ background: 'var(--near-black)', color: 'var(--bg-white)', border: 'none', fontFamily: 'var(--font-body)', fontSize: 'var(--text-label)', fontWeight: 700, padding: 'var(--space-sm) var(--space-md)', borderRadius: 'var(--r-md)', cursor: 'pointer' }}
              >
                Next → Q{activeQ + 2}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Scoring Summary ── */}
      <div style={{ marginTop: 'var(--space-xl)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)', flexWrap: 'wrap' }}>
          <div className={styles.sectionEyebrow} style={{ marginBottom: 0 }}>Scoring — What to do after the conversation</div>
          {allAnswered && (
            <span style={{
              fontSize: 'var(--text-label)',
              fontWeight: 700,
              padding: '2px var(--space-sm)',
              borderRadius: 'var(--radius-large)',
              background: activeTier === 0 ? 'var(--state-success-bg)' : activeTier === 1 ? 'var(--warn-bg)' : 'var(--danger-bg)',
              color: activeTier === 0 ? 'var(--state-success)' : activeTier === 1 ? 'var(--warning-amber)' : 'var(--danger)',
              border: `1px solid ${activeTier === 0 ? 'color-mix(in srgb, var(--state-success) 30%, transparent)' : activeTier === 1 ? 'color-mix(in srgb, var(--warning-amber) 30%, transparent)' : 'color-mix(in srgb, var(--danger) 30%, transparent)'}`,
            }}>
              {greens} green flag{greens !== 1 ? 's' : ''} — {scoringTiers[activeTier].action}
            </span>
          )}
          {!allAnswered && Object.keys(qFlags).length > 0 && (
            <span style={{ fontSize: 'var(--text-label)', color: 'var(--text-muted)' }}>({Object.keys(qFlags).length} of 8 answered — finish all 8 to see your result)</span>
          )}
        </div>

        <div className={styles.csScoringBar}>
          {scoringTiers.map((tier, i) => {
            const isDimmed = allAnswered && i !== activeTier
            const isActive = allAnswered && i === activeTier
            return (
              <div
                key={i}
                className={styles.csScTier}
                style={{
                  opacity: isDimmed ? 0.35 : 1,
                  background: isActive
                    ? (i === 0 ? 'var(--state-success-bg)' : i === 1 ? 'var(--warn-bg)' : 'var(--danger-bg)')
                    : 'var(--bg-card)',
                  borderColor: isActive
                    ? (i === 0 ? 'color-mix(in srgb, var(--state-success) 50%, transparent)' : i === 1 ? 'color-mix(in srgb, var(--warning-amber) 50%, transparent)' : 'color-mix(in srgb, var(--danger) 50%, transparent)')
                    : 'var(--border)',
                }}
              >
                <div className={styles.csScTierHdr}>
                  <div className={styles.csScTierDot} style={{ background: tier.dot }} />
                  <div className={styles.csScTierLabel} style={{ color: tier.labelColor }}>{tier.label}</div>
                </div>
                <div className={styles.csScTierAction} style={{ color: tier.labelColor }}>{tier.action}</div>
                <div className={styles.csScTierDesc}>{tier.desc}</div>
              </div>
            )
          })}
        </div>

        <div style={{ fontSize: 'var(--text-label)', color: 'var(--text-muted)', fontStyle: 'italic', paddingTop: 'var(--space-sm)' }}>
          Note: Q7 and Q8 are related but distinct. Q7 surfaces cross-functional ownership gaps; Q8 confirms whether a formal FinOps role exists. Use Q7 first and only go to Q8 if the answer is ambiguous.
        </div>
      </div>
    </div>
  )
}

/* ═══ Motion Card ═══ */
function MotionCard({ m, isSelected, onToggle }: { m: Motion; isSelected: boolean; onToggle: () => void }) {
  return (
    <button
      className={styles.csFlowCard}
      style={{ borderColor: isSelected ? m.color : 'var(--border)', width: '100%', textAlign: 'left', fontFamily: 'var(--font-body)', fontSize: 'inherit', color: 'inherit' }}
      onClick={onToggle}
    >
      <div className={styles.csFcBanner} style={{ background: `color-mix(in srgb, ${m.color} 8%, transparent)` }}>
        <div className={styles.csFcIcon} style={{ background: `color-mix(in srgb, ${m.color} 10%, transparent)`, borderColor: `color-mix(in srgb, ${m.color} 25%, transparent)` }}>
          {m.icon}
        </div>
        <div>
          <div className={styles.csFcName} style={{ color: m.color }}>{m.name}</div>
          <div className={styles.csFcTagline} style={{ color: m.color }}>{m.tagline}</div>
        </div>
      </div>
      <div className={styles.csFcBody}>
        <div className={styles.csFcLabel}>Best for</div>
        <div className={styles.csFcTargets}>
          {m.targets.map((t, i) => (
            <span key={t} className={styles.csFcTarget} style={{ color: m.targetColors[i], background: `color-mix(in srgb, ${m.targetColors[i]} 10%, transparent)`, borderColor: `color-mix(in srgb, ${m.targetColors[i]} 25%, transparent)` }}>{t}</span>
          ))}
        </div>
        <div className={styles.csFcPitch} style={{ borderColor: m.color, background: `color-mix(in srgb, ${m.color} 6%, transparent)` }}>{m.pitch}</div>
      </div>
    </button>
  )
}

/* ═══ Detail Panel ═══ */
function MotionDetail({ m, onClose }: { m: Motion; onClose: () => void }) {
  return (
    <div className={`${styles.csDetailPanel} ${styles.csDetailPanelOpen}`}>
      <div className={styles.csDpHeader} style={{ background: `color-mix(in srgb, ${m.color} 8%, transparent)` }}>
        <div>
          <div style={{ fontSize: 'var(--text-label)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: m.color, marginBottom: 2 }}>{m.icon} {m.name}</div>
          <div className={styles.csDpTagline} style={{ color: m.color }}>{m.tagline}</div>
        </div>
        <button className={styles.csDpClose} onClick={onClose}>Close ✕</button>
      </div>
      <div className={styles.csDpBody}>
        <div className={styles.csDpCol}>
          <div className={styles.csDpColLabel} style={{ color: m.color }}>{m.expand.leftLabel}</div>
          {m.expand.leftItems.map((item) => <div key={item} className={styles.csDpItem}>{item}</div>)}
        </div>
        <div className={styles.csDpCol}>
          <div className={styles.csDpColLabel} style={{ color: m.color }}>{m.expand.rightLabel}</div>
          {m.expand.rightItems.map((item) => <div key={item} className={styles.csDpItem}>{item}</div>)}
        </div>
      </div>
      <div className={styles.csDpStarter}>
        <div className={styles.csDpStarterLbl}>Conversation starter</div>
        <div className={styles.csDpStarterText}>"{m.expand.starter}"</div>
      </div>
    </div>
  )
}

/* ═══ Tab 2: Module Upsell Guide ═══ */
function UpsellTab() {
  const [upsellTab, setUpsellTab] = useState<UpsellTab>('motions')
  const [activeMotionId, setActiveMotionId] = useState<string | null>(null)
  const [activeScenario, setActiveScenario] = useState(PATHWAYS[0].id)
  const [activeStarterFilter, setActiveStarterFilter] = useState('All')
  const [openStarters, setOpenStarters] = useState<Record<number, boolean>>({})

  const allMotions = [...CCM_MOTIONS, ...OTHER_MOTIONS]
  const activeMotion = activeMotionId ? allMotions.find((m) => m.id === activeMotionId) ?? null : null

  function toggleMotion(id: string) {
    setActiveMotionId((prev) => (prev === id ? null : id))
  }

  const currentPathway = PATHWAYS.find((p) => p.id === activeScenario) ?? PATHWAYS[0]
  const stepColors = ['var(--accent)', 'var(--color-quality)', 'var(--warning-amber)', 'var(--danger)']

  const filteredStarters = activeStarterFilter === 'All'
    ? CONVERSATION_STARTERS
    : CONVERSATION_STARTERS.filter((s) => s.filter === activeStarterFilter)

  return (
    <div>
      {/* Per-tab page header */}
      <div style={{ marginBottom: 'var(--space-lg)' }}>
        <div className={styles.sectionEyebrow}>Module Upsell Guide · Step 2</div>
        <h2 className={styles.sectionTitle}>Harness CCM Upsell Playbook</h2>
        <p className={styles.sectionSub}>
          Every module you sell alongside CCM multiplies the customer's value — and your deal size. Use this guide to identify the right upsell motion, the right persona, and the exact conversation starter for each scenario.
        </p>
      </div>

      {/* Sub-tabs */}
      <div className={styles.qaSkuTabs} style={{ marginBottom: 'var(--space-lg)' }}>
        {(['motions', 'pathways', 'maturity', 'starters'] as UpsellTab[]).map((t) => {
          const labels: Record<UpsellTab, string> = { motions: 'Upsell Motions', pathways: 'Savings Pathways', maturity: 'By Maturity Stage', starters: 'Conversation Starters' }
          return (
            <button
              key={t}
              className={`${styles.qaSkuTab} ${upsellTab === t ? styles.qaSkuTabActive : ''}`}
              onClick={() => setUpsellTab(t)}
            >
              {labels[t]}
            </button>
          )
        })}
      </div>

      {/* ── Motions ── */}
      {upsellTab === 'motions' && (
        <div>
          {/* CCM Upsells */}
          <div className={styles.csRowSection}>
            <div className={styles.csRowLabel}>
              <span className={styles.csRowLabelPill} style={{ background: 'var(--accent-sub)', border: '1px solid var(--accent-bdr)', color: 'var(--accent)' }}>CCM Upsells</span>
              <span className={styles.csRowLabelHint}>— click any card for full details &amp; conversation starters</span>
            </div>
            <div className={styles.csFlowGrid}>
              {CCM_MOTIONS.map((m) => (
                <MotionCard key={m.id} m={m} isSelected={activeMotionId === m.id} onToggle={() => toggleMotion(m.id)} />
              ))}
            </div>
          </div>

          {/* Other Modules */}
          <div className={styles.csRowSection}>
            <div className={styles.csRowLabel}>
              <span className={styles.csRowLabelPill} style={{ background: 'var(--sku-ag-bg)', border: '1px solid var(--sku-ag-bdr)', color: 'var(--color-devops)' }}>Other Harness Modules</span>
              <span className={styles.csRowLabelHint} style={{ color: 'var(--color-devops)' }}>— click any card for full details &amp; conversation starters</span>
            </div>
            <div className={styles.csFlowGrid}>
              {OTHER_MOTIONS.map((m) => (
                <MotionCard key={m.id} m={m} isSelected={activeMotionId === m.id} onToggle={() => toggleMotion(m.id)} />
              ))}
            </div>
          </div>

          {/* Detail panel */}
          {activeMotion && (
            <MotionDetail m={activeMotion} onClose={() => setActiveMotionId(null)} />
          )}
        </div>
      )}

      {/* ── Pathways ── */}
      {upsellTab === 'pathways' && (
        <div>
          <div className={styles.sectionEyebrow} style={{ marginBottom: 'var(--space-sm)' }}>Customer starting point</div>
          <div className={styles.csScenarioRow}>
            {PATHWAYS.map((p) => (
              <button
                key={p.id}
                className={`${styles.csScBtn} ${activeScenario === p.id ? styles.csScBtnActive : ''}`}
                onClick={() => setActiveScenario(p.id)}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className={styles.csPathwayTitle}>Recommended upsell sequence — {currentPathway.label}</div>

          <div className={styles.csPathSteps}>
            {currentPathway.steps.map((step, i) => (
              <>
                {i > 0 && <div key={`arrow-${i}`} className={styles.csPathArrow}>→</div>}
                <div key={step.name} className={styles.csPathStep}>
                  <div className={styles.csPathStepInner} style={{ borderTopColor: stepColors[i % stepColors.length] }}>
                    <div className={styles.csPathStepNum} style={{ color: stepColors[i % stepColors.length] }}>Step {i + 1}</div>
                    <div className={styles.csPathStepName}>{step.name}</div>
                    <div className={styles.csPathStepVal} style={{ color: stepColors[i % stepColors.length] }}>{step.val}</div>
                    <div className={styles.csPathStepDesc}>{step.desc}</div>
                  </div>
                </div>
              </>
            ))}
          </div>

          <div className={styles.csPathTotal}>
            <div>
              <div className={styles.csPathTotalLabel}>Combined annual impact</div>
              <div className={styles.csPathTotalVal}>{currentPathway.total}</div>
            </div>
            <div className={styles.csPathTotalNote}>{currentPathway.note}</div>
          </div>

          <div className={styles.csRationaleBox}>
            <div className={styles.csRationaleLabel}>Why this sequence</div>
            <div style={{ fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{currentPathway.rationale}</div>
          </div>
        </div>
      )}

      {/* ── Maturity ── */}
      {upsellTab === 'maturity' && (
        <div>
          <div className={styles.csMatGrid}>
            {MATURITY_UPSELL.map((stage) => (
              <div key={stage.num} className={styles.csMatCol}>
                <div className={styles.csMatStageNum}>{stage.num}</div>
                <div className={styles.csMatStageName}>{stage.name}</div>
                <div className={styles.csMatStageLabel} style={{ color: stage.labelColor }}>{stage.label}</div>
                <div className={styles.csMatSkuCards}>
                  {stage.skus.map((sku) => (
                    <div key={sku.name} className={styles.csMatSkuCard} style={{ borderTopColor: sku.color }}>
                      <div className={styles.csMscHeader}>
                        <span className={styles.csMscIcon}>{sku.icon}</span>
                        <span className={styles.csMscName} style={{ color: sku.color }}>{sku.name}</span>
                        <span className={styles.csMscTag} style={{ background: `color-mix(in srgb, ${sku.tagColor} 10%, transparent)`, color: sku.tagColor, border: `1px solid color-mix(in srgb, ${sku.tagColor} 25%, transparent)` }}>{sku.tag}</span>
                      </div>
                      <div className={styles.csMscWhy}>{sku.why}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.csPitchBox}>
            <div className={styles.csPitchLabel}>The maturity pitch</div>
            <div className={styles.csPitchText}>"Let me show you where you are on the FinOps maturity curve — and which Harness SKUs get you to the next stage. Most teams leave $2–5M on the table by staying at Crawl."</div>
          </div>
        </div>
      )}

      {/* ── Conversation Starters ── */}
      {upsellTab === 'starters' && (
        <div>
          <div className={styles.csScenarioRow} style={{ marginBottom: 'var(--space-lg)' }}>
            {STARTER_FILTERS.map((f) => (
              <button
                key={f}
                className={`${styles.csScBtn} ${activeStarterFilter === f ? styles.csScBtnActive : ''}`}
                onClick={() => { setActiveStarterFilter(f); setOpenStarters({}) }}
              >
                {f}
              </button>
            ))}
          </div>

          <div className={styles.qaCards}>
            {filteredStarters.map((s, i) => (
              <button
                key={i}
                className={`${styles.qaCard} ${openStarters[i] ? styles.qaCardOpen : ''}`}
                aria-expanded={openStarters[i] ?? false}
                onClick={() => setOpenStarters((prev) => ({ ...prev, [i]: !prev[i] }))}
              >
                <div className={styles.qaCardHdr}>
                  <div className={styles.qaQ}>"{s.q}"</div>
                  <span className={`${styles.qaArrow} ${openStarters[i] ? styles.qaArrowOpen : ''}`}>▼</span>
                </div>
                <div className={styles.csQContext}>Context: {s.context}</div>
                <div className={`${styles.qaAnswer} ${openStarters[i] ? styles.qaAnswerOpen : ''}`}>
                  {s.ans}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ═══ Main Section ═══ */
export function CrossSellSection() {
  const [tab, setTab] = useState<TopTab>('whitespace')

  return (
    <div>
      <div className={styles.sectionHdr}>
        <div className={styles.sectionEyebrow}>CCM Sales Playbook · 2026</div>
        <h2 className={styles.sectionTitle}>Cross-Sell Playbook</h2>
        <p className={styles.sectionSub}>
          Identify CCM whitespace in existing accounts and convert it to pipeline. Step 1 qualifies and discovers. Step 2 maps the right modules to close.
        </p>
      </div>

      {/* Top tabs */}
      <div className={styles.lessonTabRow} style={{ marginBottom: 'var(--space-xl)' }}>
        <button
          className={`${styles.lessonTabBtn} ${tab === 'whitespace' ? styles.lessonTabBtnActive : ''}`}
          onClick={() => setTab('whitespace')}
        >
          Whitespace Discovery
          <span style={{ fontSize: 'var(--text-label)', fontWeight: 700, padding: '1px var(--space-sm)', borderRadius: 'var(--radius-large)', background: 'var(--accent-sub)', border: '1px solid var(--accent-bdr)', color: 'var(--accent)' }}>Step 1</span>
        </button>
        <button
          className={`${styles.lessonTabBtn} ${tab === 'upsell' ? styles.lessonTabBtnActive : ''}`}
          onClick={() => setTab('upsell')}
        >
          Module Upsell Guide
          <span style={{ fontSize: 'var(--text-label)', fontWeight: 700, padding: '1px var(--space-sm)', borderRadius: 'var(--radius-large)', background: 'var(--sku-ag-bg)', border: '1px solid var(--sku-ag-bdr)', color: 'var(--color-devops)' }}>Step 2</span>
        </button>
      </div>

      {tab === 'whitespace' && <WhitespaceTab />}
      {tab === 'upsell' && <UpsellTab />}
    </div>
  )
}
