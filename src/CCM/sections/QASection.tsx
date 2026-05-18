import { useState } from 'react'
import styles from '../ccm.module.scss'
import { LISTEN_ITEMS } from '../data/maturity'
import { QA_DATA, QA_SKU_NAMES } from '../data/qa'

export function QASection() {
  const [activeSku, setActiveSku] = useState('cost-insights')
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const cards = QA_DATA[activeSku] || []

  return (
    <div>
      <div className={styles.sectionHdr}>
        <div className={styles.sectionEyebrow}>Discovery Questions</div>
        <h2 className={styles.sectionTitle}>Questions & Answers</h2>
        <p className={styles.sectionSub}>Top discovery questions per SKU with why-to-ask context and suggested responses.</p>
      </div>

      <div className={styles.qaSkuTabs}>
        {Object.keys(QA_SKU_NAMES).map((k) => (
          <button
            key={k}
            className={`${styles.qaSkuTab} ${activeSku === k ? styles.qaSkuTabActive : ''}`}
            onClick={() => { setActiveSku(k); setOpenIdx(null) }}
          >
            {QA_SKU_NAMES[k]}
          </button>
        ))}
      </div>

      <div className={styles.qaCards}>
        {cards.map((q, i) => (
          <button
            key={i}
            className={`${styles.qaCard} ${openIdx === i ? styles.qaCardOpen : ''}`}
            aria-expanded={openIdx === i}
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
          >
            <div className={styles.qaCardHdr}>
              <div className={styles.qaQ}>{q.q}</div>
              <span className={styles.qaTag} style={{ background: q.tagBg, color: q.tagColor, border: `1px solid ${q.tagBdr}` }}>{q.tag}</span>
              <span className={`${styles.qaArrow} ${openIdx === i ? styles.qaArrowOpen : ''}`}>▼</span>
            </div>
            <div className={styles.qaWhy}>Why ask: {q.why}</div>
            <div className={`${styles.qaAnswer} ${openIdx === i ? styles.qaAnswerOpen : ''}`}>
              {q.ans}
            </div>
          </button>
        ))}
      </div>

      {/* Listen items */}
      <div style={{ marginTop: 36, marginBottom: 12 }}>
        <div className={styles.sectionEyebrow}>Active Listening</div>
        <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 'var(--text-body-lg)', fontWeight: 400, color: 'var(--text-primary)', margin: '4px 0 16px' }}>What to Listen For</h3>
      </div>
      <div className={styles.listenList}>
        {LISTEN_ITEMS.map((l, i) => <div key={i} className={styles.listenItem}>{l}</div>)}
      </div>
    </div>
  )
}
