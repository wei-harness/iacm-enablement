import { SKU_DATA } from '../data/skus'
import { CCMIcon } from '../CCMIcon'
import styles from '../ccm.module.scss'

const EXEC_STATS = [
  { v: '$11-21M+', l: 'Annual impact per $100M spend' },
  { v: '4 SKUs', l: 'Covering visibility to automation' },
  { v: '60-80%', l: 'Non-prod cost reduction (AutoStopping)' },
  { v: '91%', l: 'RI coverage achieved (Gartner)' },
]

const SKU_TIERS = [
  {
    label: 'Foundation (Required First)',
    name: 'Cost Insights',
    sub: 'Asset Governance (included)',
    tag: 'Start Here',
    desc: 'Get visibility before you can optimize. Every other SKU depends on this baseline.',
    val: '$1-3M+',
    color: 'var(--color-finops)',
  },
  {
    label: 'Waste Elimination',
    name: 'AutoStopping',
    sub: '',
    tag: 'Fastest ROI',
    desc: 'Often pays for the entire platform in the first month. Zero production risk.',
    val: '60-80%',
    color: 'var(--color-quality)',
  },
  {
    label: 'Smarter Savings',
    name: 'Commitment Orchestrator',
    sub: '',
    tag: 'Long-Term',
    desc: 'For orgs ready to automate RI and Savings Plan strategy at scale.',
    val: '$2-5M',
    color: 'var(--color-appsec)',
  },
  {
    label: 'Container Optimization',
    name: 'Cluster Orchestrator',
    sub: '',
    tag: 'K8s Heavy',
    desc: 'For organizations with significant Kubernetes workloads on EKS.',
    val: '25-40%',
    color: 'var(--near-black)',
  },
]

export function OverviewSection() {
  return (
    <div>
      <div className={styles.sectionHdr}>
        <div className={styles.sectionEyebrow}>Platform Overview</div>
        <h2 className={styles.sectionTitle}>Harness CCM</h2>
        <p className={styles.sectionSub}>
          Cloud Cost Management — from visibility to fully automated optimization. Four modular SKUs that stack to deliver $11-21M+ impact per $100M in cloud spend.
        </p>
      </div>

      <div className={`${styles.statGrid} ${styles.reveal}`}>
        {EXEC_STATS.map((s) => (
          <div key={s.l} className={styles.statCard}>
            <div className={styles.statVal}>{s.v}</div>
            <div className={styles.statLabel}>{s.l}</div>
          </div>
        ))}
      </div>

      <div className={styles.skuGrid}>
        {SKU_DATA.map((sku) => (
          <div
            key={sku.id}
            className={`${styles.skuCard} ${styles.reveal}`}
            style={{ '--active-color': sku.color, '--active-bg': sku.bg } as React.CSSProperties}
          >
            <div className={styles.skuCardHdr}>
              <div
                className={styles.skuIcon}
                style={{ background: sku.bg, border: `1px solid ${sku.bdr}`, color: sku.color }}
              >
                <CCMIcon name={sku.icon} size={18} />
              </div>
              <div>
                <div className={styles.skuName}>{sku.name}</div>
              </div>
            </div>
            <div className={styles.skuTagline}>{sku.tagline}</div>
            <div className={styles.skuValue} style={{ color: sku.color }}>{sku.value}</div>
            <div className={styles.skuValueLabel}>{sku.valueLabel}</div>
          </div>
        ))}
      </div>

      <div className={styles.platformStory}>
        <div className={styles.platformStoryTitle}>The Full Platform Story</div>
        <div className={styles.platformSteps}>
          {[
            { stage: '1. Crawl', label: 'Inform', desc: 'Cost Insights → see where money goes', color: 'var(--danger)' },
            { stage: '2. Walk', label: 'Optimize', desc: 'Asset Governance + AutoStopping → eliminate waste', color: 'var(--warn)' },
            { stage: '3. Run', label: 'Operate', desc: 'Commitment Orch + Cluster Orch → maximize efficiency', color: 'var(--success)' },
          ].map((s) => (
            <div key={s.stage} className={styles.platformStep}>
              <div className={styles.platformStepLabel} style={{ color: s.color }}>{s.stage} — {s.label}</div>
              <div className={styles.platformStepDesc}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.skuRelSection} ${styles.reveal}`}>
        <div className={styles.skuRelSectionTitle}>How the SKUs relate</div>
        <div className={styles.skuRelGrid}>
          {SKU_TIERS.map((t) => (
            <div
              key={t.label}
              className={styles.skuRelRow}
              style={{ borderLeftColor: t.color } as React.CSSProperties}
            >
              <div className={styles.skuRelTier}>
                <div className={styles.skuRelTierLabel} style={{ color: t.color }}>{t.label}</div>
                <div className={styles.skuRelTierName}>
                  {t.name}
                  {t.sub && <><br /><span style={{ fontSize: 'var(--text-label)', fontWeight: 400, color: 'var(--text-secondary)' }}>{t.sub}</span></>}
                </div>
              </div>
              <div
                className={styles.skuRelTag}
                style={{
                  background: `color-mix(in srgb, ${t.color} 10%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${t.color} 25%, transparent)`,
                  color: t.color,
                }}
              >
                {t.tag}
              </div>
              <div className={styles.skuRelDesc}>
                {t.desc}
                <div style={{ fontSize: 'var(--text-label)', color: 'var(--text-muted)', marginTop: 4 }}>Based on $100M annual cloud spend</div>
              </div>
              <div className={styles.skuRelVal} style={{ color: t.color }}>{t.val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
