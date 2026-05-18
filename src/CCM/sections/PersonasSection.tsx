import { useState } from 'react'
import { CCMIcon } from '../CCMIcon'
import { PERSONAS } from '../data/personas'
import styles from '../ccm.module.scss'

export function PersonasSection() {
  const [activeId, setActiveId] = useState('finops')
  const persona = PERSONAS.find((p) => p.id === activeId)!

  return (
    <div>
      <div className={styles.sectionHdr}>
        <div className={styles.sectionEyebrow}>Buying Personas</div>
        <h2 className={styles.sectionTitle}>Who You're Selling To</h2>
        <p className={styles.sectionSub}>Understand the pain, metrics, and benefits that resonate with each buying persona.</p>
      </div>

      <div className={styles.personaLayout}>
        <nav className={styles.personaNav}>
          {PERSONAS.map((p) => (
            <button
              key={p.id}
              className={`${styles.personaNavBtn} ${activeId === p.id ? styles.personaNavBtnActive : ''}`}
              style={{ '--active-color': p.color } as React.CSSProperties}
              onClick={() => setActiveId(p.id)}
            >
              <span className={styles.personaEmoji}><CCMIcon name={p.icon} size={16} /></span>
              <span className={styles.personaNavName}>{p.name}</span>
            </button>
          ))}
        </nav>

        <div className={styles.personaPanel}>
          <div className={styles.personaHdr}>
            <div className={styles.personaTitle} style={{ color: persona.color }}>{persona.name}</div>
            <div className={styles.personaRoles}>{persona.roles}</div>
          </div>

          <div className={styles.personaCols}>
            <div className={styles.personaSection}>
              <div className={styles.personaSectionTitle}>What They Care About</div>
              {persona.cares.map((c) => <div key={c} className={styles.personaBullet}>{c}</div>)}
            </div>
            <div className={styles.personaSection}>
              <div className={styles.personaSectionTitle}>Key Metrics</div>
              {persona.metrics.map((m) => <div key={m} className={styles.personaBullet}>{m}</div>)}
            </div>
            <div className={styles.personaSection}>
              <div className={styles.personaSectionTitle}>Pain Points</div>
              {persona.pains.map((p) => <div key={p} className={styles.personaBullet}>{p}</div>)}
            </div>
            <div className={styles.personaSection}>
              <div className={styles.personaSectionTitle}>Discovery Questions</div>
              {persona.qs.map((q) => <div key={q} className={styles.personaBullet}>{q}</div>)}
            </div>
            <div className={styles.personaSection}>
              <div className={styles.personaSectionTitle}>Harness Benefits</div>
              {persona.benefits.map((b) => <div key={b} className={styles.personaBullet}>{b}</div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
