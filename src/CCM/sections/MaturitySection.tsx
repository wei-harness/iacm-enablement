import { LISTEN_ITEMS, MATURITY_STAGES, WORKSHOP_ITEMS } from '../data/maturity'
import styles from '../ccm.module.scss'

export function MaturitySection() {
  return (
    <div>
      <div className={styles.sectionHdr}>
        <div className={styles.sectionEyebrow}>FinOps Maturity</div>
        <h2 className={styles.sectionTitle}>Crawl · Walk · Run</h2>
        <p className={styles.sectionSub}>Use the maturity model to meet customers where they are and build a roadmap to the full platform.</p>
      </div>

      <div className={styles.maturityGrid}>
        {MATURITY_STAGES.map((m) => (
          <div key={m.stage} className={styles.mStage}>
            <div className={styles.mStageNum}>{String(m.stage).padStart(2, '0')}</div>
            <div className={styles.mStageLabelLine} style={{ color: m.labelColor }}>{m.name} — {m.label}</div>
            <h3 className={styles.mStageH3}>{m.name}: {m.label}</h3>
            <div className={styles.mStageDesc}>{m.desc}</div>
            <div>
              {m.actions.map((a) => (
                <div key={a} className={styles.mAction}>{a}</div>
              ))}
            </div>
            <div className={styles.mRec} style={{ background: m.recBg, border: `1px solid ${m.labelBdr}`, color: m.recColor }}>
              {m.rec}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 12, marginTop: 8 }}>
        <div className={styles.sectionEyebrow}>FinOps Expert Workshop</div>
        <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 'var(--text-body-lg)', fontWeight: 400, color: 'var(--text-primary)', margin: '4px 0 16px' }}>What the Workshop Delivers</h3>
      </div>

      <div className={styles.workshopGrid} style={{ marginBottom: 32 }}>
        {WORKSHOP_ITEMS.map((w) => (
          <div key={w.n} className={styles.workshopItem}>
            <div className={styles.wiNum}>{String(w.n).padStart(2, '0')}</div>
            <div>
              <div className={styles.wiTitle}>{w.title}</div>
              <div className={styles.wiDesc}>{w.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 12 }}>
        <div className={styles.sectionEyebrow}>Active Listening Guide</div>
        <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 'var(--text-body-lg)', fontWeight: 400, color: 'var(--text-primary)', margin: '4px 0 16px' }}>What to Listen For</h3>
      </div>

      <div className={styles.listenList}>
        {LISTEN_ITEMS.map((l, i) => (
          <div key={i} className={styles.listenItem}>{l}</div>
        ))}
      </div>
    </div>
  )
}
