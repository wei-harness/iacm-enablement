import { useState } from 'react'
import { CI_COMPS, CI_GROUPS, CI_ROWS, COMP_CARDS } from '../data/competitive'
import styles from '../ccm.module.scss'

type CiMode = 'dropdown' | 'multi'
type CiCat = 'all' | 'visibility' | 'optimization' | 'governance' | 'platform'

const CAT_LABELS: { id: CiCat; label: string }[] = [
  { id: 'all', label: 'All capabilities' },
  { id: 'visibility', label: 'Visibility & Allocation' },
  { id: 'optimization', label: 'Optimization & Automation' },
  { id: 'governance', label: 'Governance & Compliance' },
  { id: 'platform', label: 'Platform Integration' },
]

function cellClass(v: string): string {
  if (v === 'Y') return styles.ciVY
  if (v === 'P') return styles.ciVP
  return styles.ciVN
}

function cellLabel(v: string, isH: boolean): string {
  if (v === 'Y') return isH ? '✓' : '✓ Yes'
  if (v === 'P') return isH ? '~' : '~ Partial'
  return isH ? '—' : '— No'
}

export function CompetitiveSection() {
  const [activeCardIdx, setActiveCardIdx] = useState(0)
  const [showMatrix, setShowMatrix] = useState(false)
  const [ciMode, setCiMode] = useState<CiMode>('dropdown')
  const [ciDdVal, setCiDdVal] = useState('')
  const [ciMultiSelected, setCiMultiSelected] = useState<string[]>([])
  const [ciCat, setCiCat] = useState<CiCat>('all')

  const card = COMP_CARDS[activeCardIdx]

  const toggleMultiComp = (id: string) => {
    setCiMultiSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= 4) return prev
      return [...prev, id]
    })
  }

  const ddComp = ciDdVal ? CI_COMPS.find((c) => c.id === ciDdVal) : null

  const visibleComps =
    ciMode === 'dropdown'
      ? ddComp ? [ddComp] : CI_COMPS
      : ciMultiSelected.length > 0
        ? CI_COMPS.filter((c) => ciMultiSelected.includes(c.id))
        : CI_COMPS

  // const filteredRows = ciCat === 'all'
  //   ? CI_ROWS
  //   : CI_ROWS.filter((r) => r.grp !== undefined || r.cat === ciCat)

  // const groupedByCategory = ciCat === 'all'
  //   ? filteredRows
  //   : filteredRows.filter((r) => r.grp === undefined || CI_ROWS.some((row) => row.grp && CI_ROWS.indexOf(row) < CI_ROWS.indexOf(r) && CI_ROWS.findIndex((x) => x.cat === ciCat && CI_ROWS.indexOf(x) > CI_ROWS.indexOf(row)) > -1))

  // Simplified filter: for non-all categories, filter out group headers that don't belong
  const displayRows = ciCat === 'all'
    ? CI_ROWS
    : CI_ROWS.filter((r) => {
        if (r.grp) return false
        return r.cat === ciCat
      })

  return (
    <div>
      <div className={styles.sectionHdr}>
        <div className={styles.sectionEyebrow}>Competitive Intelligence</div>
        <h2 className={styles.sectionTitle}>Win Against the Field</h2>
        <p className={styles.sectionSub}>Battle cards for the most common competitive scenarios, plus the full capability matrix.</p>
      </div>

      {/* Battle Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 20, marginBottom: 40 }}>
        <nav className={styles.compNavList}>
          {COMP_CARDS.map((c, i) => (
            <button
              key={c.label}
              className={`${styles.compNavBtn} ${i === activeCardIdx ? styles.compNavBtnActive : ''}`}
              onClick={() => setActiveCardIdx(i)}
            >
              <div className={styles.compNavTitle}>{c.label}</div>
            </button>
          ))}
        </nav>

        <div className={styles.compPanel}>
          <div className={styles.compTitle}>{card.title}</div>
          <div className={styles.compSubtitle}>Competitor: {card.comp}</div>

          <div className={styles.stage}>
            <div className={styles.stageLabel} style={{ color: 'var(--danger)' }}>THE GAP WE ACKNOWLEDGED</div>
            <div className={styles.stageText}>{card.gap}</div>
          </div>
          <div className={styles.stage}>
            <div className={styles.stageLabel} style={{ color: 'var(--warn)' }}>WHAT WAS HAPPENING</div>
            <div className={styles.stageText}>{card.oldState}</div>
          </div>
          <div className={styles.stage}>
            <div className={styles.stageLabel} style={{ color: 'var(--success)' }}>HOW WE FIX IT</div>
            <div className={styles.stageText}>{card.fix}</div>
          </div>

          <div className={styles.counterMsg}>
            <div className={styles.counterLabel}>The Counter-Message</div>
            <div className={styles.counterText}>"{card.counter}"</div>
          </div>
        </div>
      </div>

      {/* Capability Matrix Toggle */}
      <div style={{ marginBottom: 12 }}>
        <button
          className={styles.tabBtn}
          style={{ marginBottom: 16 }}
          onClick={() => setShowMatrix(!showMatrix)}
        >
          {showMatrix ? '▲ Hide' : '▼ Show'} Full Capability Matrix ({CI_COMPS.length} competitors)
        </button>
      </div>

      {showMatrix && (
        <div>
          {/* Controls */}
          <div className={styles.ciControls}>
            {/* Mode tabs */}
            <div className={styles.ciModeTabs}>
              <button
                className={`${styles.ciModeTab} ${ciMode === 'dropdown' ? styles.ciModeTabActive : ''}`}
                onClick={() => setCiMode('dropdown')}
              >
                Head-to-Head
              </button>
              <button
                className={`${styles.ciModeTab} ${ciMode === 'multi' ? styles.ciModeTabActive : ''}`}
                onClick={() => setCiMode('multi')}
              >
                Multi-Select
              </button>
            </div>

            {/* Dropdown mode */}
            {ciMode === 'dropdown' && (
              <div className={styles.ciDdRow}>
                <div>
                  <div className={styles.ciDdLabel}>Harness CCM</div>
                  <div className={styles.ciHarnessLabel}>✓ Harness CCM — AI-Native FinOps</div>
                </div>
                <div className={styles.ciVsBadge}>vs</div>
                <div>
                  <div className={styles.ciDdLabel}>Select a competitor</div>
                  <select
                    className={styles.ciDdSelect}
                    value={ciDdVal}
                    onChange={(e) => setCiDdVal(e.target.value)}
                  >
                    <option value="">— Show all competitors —</option>
                    <optgroup label="Enterprise FinOps Platforms">
                      {['apptio', 'cloudhealth', 'flexera', 'servicenow'].map((id) => {
                        const c = CI_COMPS.find((x) => x.id === id)
                        return c ? <option key={id} value={id}>{c.name}</option> : null
                      })}
                    </optgroup>
                    <optgroup label="Cloud Provider Native">
                      {['aws', 'azure', 'gcp'].map((id) => {
                        const c = CI_COMPS.find((x) => x.id === id)
                        return c ? <option key={id} value={id}>{c.name}</option> : null
                      })}
                    </optgroup>
                    <optgroup label="Observability">
                      {['datadog'].map((id) => {
                        const c = CI_COMPS.find((x) => x.id === id)
                        return c ? <option key={id} value={id}>{c.name}</option> : null
                      })}
                    </optgroup>
                    <optgroup label="FinOps Specialists">
                      {['cloudzero', 'vantage', 'doit', 'anodot', 'finout', 'cloudbolt', 'yotascale'].map((id) => {
                        const c = CI_COMPS.find((x) => x.id === id)
                        return c ? <option key={id} value={id}>{c.name}</option> : null
                      })}
                    </optgroup>
                    <optgroup label="Governance &amp; Policy">
                      {['corestack', 'kion', 'stacklet', 'cloudfix'].map((id) => {
                        const c = CI_COMPS.find((x) => x.id === id)
                        return c ? <option key={id} value={id}>{c.name}</option> : null
                      })}
                    </optgroup>
                    <optgroup label="Kubernetes Specialists">
                      {['castai', 'scaleops', 'zesty'].map((id) => {
                        const c = CI_COMPS.find((x) => x.id === id)
                        return c ? <option key={id} value={id}>{c.name}</option> : null
                      })}
                    </optgroup>
                    <optgroup label="IaC &amp; Developer FinOps">
                      {['infracost'].map((id) => {
                        const c = CI_COMPS.find((x) => x.id === id)
                        return c ? <option key={id} value={id}>{c.name}</option> : null
                      })}
                    </optgroup>
                  </select>
                </div>
                {ddComp?.url && (
                  <a
                    href={ddComp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.ciDeepLink}
                  >
                    View Full Comparison →
                  </a>
                )}
              </div>
            )}

            {/* Multi-select mode */}
            {ciMode === 'multi' && (
              <div className={styles.ciMultiRow}>
                <div className={styles.ciMultiLabel}>Select up to 4 competitors</div>
                {CI_GROUPS.map((g) => (
                  <div key={g.label}>
                    <div className={styles.ciGroupLabel}>{g.label}</div>
                    <div className={styles.ciMultiPills}>
                      {g.ids.map((id) => {
                        const comp = CI_COMPS.find((c) => c.id === id)
                        if (!comp) return null
                        const active = ciMultiSelected.includes(id)
                        const disabled = !active && ciMultiSelected.length >= 4
                        return (
                          <button
                            key={id}
                            className={`${styles.tabBtn} ${active ? styles.tabBtnActive : ''}`}
                            onClick={() => toggleMultiComp(id)}
                            disabled={disabled}
                            style={{ fontSize: 'var(--text-label)', padding: '4px 10px', opacity: disabled ? 0.4 : 1 }}
                          >
                            {comp.short}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
                <div className={styles.ciMultiCount}>
                  Selected: <span className={styles.ciMultiCountNum}>{ciMultiSelected.length}</span> / 4
                  {ciMultiSelected.length > 0 && (
                    <button
                      className={styles.tabBtn}
                      style={{ fontSize: 'var(--text-label)', padding: '3px 10px', marginLeft: 8 }}
                      onClick={() => setCiMultiSelected([])}
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Category filter */}
            <div className={styles.ciCatRow}>
              <span className={styles.ciCatLabel}>Filter</span>
              <div className={styles.ciCatPills}>
                {CAT_LABELS.map((cat) => (
                  <button
                    key={cat.id}
                    className={`${styles.tabBtn} ${ciCat === cat.id ? styles.tabBtnActive : ''}`}
                    style={{ fontSize: 'var(--text-label)', padding: '4px 10px' }}
                    onClick={() => setCiCat(cat.id)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.ciTableWrap}>
            <table className={styles.ciTable}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', minWidth: 200 }}>Capability</th>
                  <th className={styles.ciThH}>Harness CCM</th>
                  {visibleComps.map((c) => (
                    <th key={c.id}>
                      <div>{c.short}</div>
                      {c.url && (
                        <a
                          href={c.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontSize: 'var(--text-label)', color: 'var(--accent)', display: 'block', marginTop: 2, whiteSpace: 'nowrap' }}
                        >
                          Compare →
                        </a>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(ciCat === 'all' ? CI_ROWS : displayRows).map((row, ri) => {
                  if (row.grp) {
                    return (
                      <tr key={`grp-${ri}`}>
                        <td colSpan={2 + visibleComps.length} className={styles.ciRowGrp}>{row.grp}</td>
                      </tr>
                    )
                  }
                  const [hv, hn] = (row.h || 'N').split('|')
                  return (
                    <tr key={`row-${ri}`}>
                      <td className={styles.ciRowFeat}>{row.feat}</td>
                      <td className={styles.ciThH} style={{ background: 'var(--accent-sub)' }}>
                        <span className={cellClass(hv)}>{cellLabel(hv, true)}</span>
                        {hn && <span className={styles.ciVNote}>{hn}</span>}
                      </td>
                      {visibleComps.map((c) => {
                        const raw = (row[c.id] as string) || 'N'
                        const [v, note] = raw.split('|')
                        return (
                          <td key={c.id}>
                            <span className={cellClass(v)}>{cellLabel(v, false)}</span>
                            {note && <span className={styles.ciVNote}>{note}</span>}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
