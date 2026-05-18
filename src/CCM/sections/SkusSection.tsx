import { useMemo, useState } from 'react'
import { CCMIcon } from '../CCMIcon'
import { SKU_DATA } from '../data/skus'
import styles from '../ccm.module.scss'

type Tab = 'pitch' | 'features' | 'usecases' | 'discovery' | 'roi'

const TAB_LABELS: { id: Tab; label: string }[] = [
  { id: 'pitch', label: 'Pitch' },
  { id: 'features', label: 'Features' },
  { id: 'usecases', label: 'Use Cases' },
  { id: 'discovery', label: 'Discovery Qs' },
  { id: 'roi', label: 'ROI Calculator' },
]

export function SkusSection() {
  const [activeSkuId, setActiveSkuId] = useState('cost-insights')
  const [activeTab, setActiveTab] = useState<Tab>('pitch')
  const [openDiscovery, setOpenDiscovery] = useState<number | null>(null)

  const sku = SKU_DATA.find((s) => s.id === activeSkuId)!

  const [slider1, setSlider1] = useState(sku.roi.sliders[0].defaultVal)
  const [slider2, setSlider2] = useState(sku.roi.sliders[1].defaultVal)

  const roiVals = useMemo(
    () => sku.roi.compute(slider1, slider2),
    [sku, slider1, slider2]
  )

  // Reset sliders when sku changes
  function selectSku(id: string) {
    setActiveSkuId(id)
    setActiveTab('pitch')
    setOpenDiscovery(null)
    const s = SKU_DATA.find((x) => x.id === id)!
    setSlider1(s.roi.sliders[0].defaultVal)
    setSlider2(s.roi.sliders[1].defaultVal)
  }

  return (
    <div>
      <div className={styles.sectionHdr}>
        <div className={styles.sectionEyebrow}>SKU Deep Dive</div>
        <h2 className={styles.sectionTitle}>CCM SKUs</h2>
        <p className={styles.sectionSub}>Select a SKU to explore positioning, features, discovery questions, and ROI calculator.</p>
      </div>

      {/* SKU Picker */}
      <div className={styles.skuGrid} style={{ marginBottom: 24 }}>
        {SKU_DATA.map((s) => (
          <button
            key={s.id}
            onClick={() => selectSku(s.id)}
            className={`${styles.skuCard} ${activeSkuId === s.id ? styles.skuCardActive : ''}`}
            style={{ '--active-color': s.color, '--active-bg': s.bg, cursor: 'pointer', border: 'none', textAlign: 'left' } as React.CSSProperties}
          >
            <div className={styles.skuCardHdr}>
              <div className={styles.skuIcon} style={{ background: s.bg, border: `1px solid ${s.bdr}`, color: s.color }}><CCMIcon name={s.icon} size={18} /></div>
              <div>
                <div className={styles.skuName}>{s.name}</div>
              </div>
            </div>
            <div className={styles.skuTagline}>{s.tagline}</div>
            <div className={styles.skuValue} style={{ color: s.color }}>{s.value}</div>
            <div className={styles.skuValueLabel}>{s.valueLabel}</div>
          </button>
        ))}
      </div>

      {/* Tab row */}
      <div className={styles.tabRow}>
        {TAB_LABELS.map((t) => (
          <button
            key={t.id}
            className={`${styles.tabBtn} ${activeTab === t.id ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'pitch' && (
        <div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: 'var(--text-body-serif)', fontWeight: 400, color: sku.color, marginBottom: 6 }}>{sku.name}</div>
            <div style={{ fontSize: 'var(--text-body-sm)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 10 }}>{sku.tagline}</div>
            <div style={{ fontSize: 'var(--text-body-sm)', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{sku.pitch}</div>
          </div>
          <div className={styles.statGrid}>
            {sku.stats.map((s) => (
              <div key={s} className={styles.statsItem}>{s}</div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'features' && (
        <div className={styles.featureList}>
          {sku.features.map((f) => (
            <div key={f.n} className={styles.featureItem}>
              <div className={styles.featureCheck}>✓</div>
              <div>
                <div className={styles.featureName}>{f.n}</div>
                <div className={styles.featureDesc}>{f.d}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'usecases' && (
        <div className={styles.featureList}>
          {sku.useCases.map((uc) => (
            <div key={uc} className={styles.featureItem}>
              <div className={styles.featureCheck}>→</div>
              <div><div className={styles.featureName}>{uc}</div></div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'discovery' && (
        <div className={styles.discoveryList}>
          {sku.discovery.map((d, i) => (
            <button
              key={i}
              className={`${styles.discoveryCard} ${openDiscovery === i ? styles.discoveryCardOpen : ''}`}
              aria-expanded={openDiscovery === i}
              onClick={() => setOpenDiscovery(openDiscovery === i ? null : i)}
            >
              <div className={styles.discoveryQ}>{d.q}</div>
              <div className={styles.discoveryWhy}>Why ask: {d.why}</div>
              <div className={`${styles.discoveryAns} ${openDiscovery === i ? styles.discoveryAnsOpen : ''}`}>
                {d.ans}
              </div>
            </button>
          ))}
        </div>
      )}

      {activeTab === 'roi' && (
        <div className={styles.roiCalc}>
          <div className={styles.roiCalcTitle}>{sku.name} — ROI Estimator</div>
          {sku.roi.sliders.map((sl, i) => {
            const val = i === 0 ? slider1 : slider2
            const setVal = i === 0 ? setSlider1 : setSlider2
            return (
              <div key={sl.label} className={styles.sliderRow}>
                <div className={styles.sliderLabel}>
                  <span>{sl.label}</span>
                  <span className={styles.sliderVal}>{sl.format(val)}</span>
                </div>
                <input
                  type="range"
                  className={styles.slider}
                  min={sl.min}
                  max={sl.max}
                  step={sl.step}
                  value={val}
                  onChange={(e) => setVal(Number(e.target.value))}
                  style={{ accentColor: sku.color }}
                />
              </div>
            )
          })}
          <div className={styles.roiResults}>
            {[0, 1, 2].map((i) => (
              <div key={i} className={styles.roiResult}>
                <div className={styles.roiResultVal} style={{ color: sku.color }}>{roiVals[i * 2]}</div>
                <div className={styles.roiResultLabel}>{roiVals[i * 2 + 1]}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
