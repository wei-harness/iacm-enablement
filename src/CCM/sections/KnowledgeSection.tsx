import { useReducer } from 'react'
import { CCMIcon } from '../CCMIcon'
import { MASTER_EXTRAS, QUIZ_BANKS, SKU_META, shuffle } from '../data/quiz'
import type { QuizQuestion } from '../data/quiz'
import styles from '../ccm.module.scss'

interface QuizState {
  sku: string
  questions: QuizQuestion[]
  current: number
  score: number
  answers: (number | undefined)[]
}

type QuizAction =
  | { type: 'START'; sku: string }
  | { type: 'ANSWER'; idx: number }
  | { type: 'NEXT' }
  | { type: 'RESTART' }
  | { type: 'EXIT' }

function buildQuestions(sku: string): QuizQuestion[] {
  if (sku === 'master') {
    const all: QuizQuestion[] = []
    Object.keys(QUIZ_BANKS).forEach((k) => {
      QUIZ_BANKS[k].forEach((q) => all.push({ ...q, sku: k }))
    })
    MASTER_EXTRAS.forEach((q) => all.push(q))
    return shuffle(all).slice(0, 50)
  }
  return shuffle(QUIZ_BANKS[sku]).slice(0, 10).map((q) => ({ ...q, sku }))
}

function quizReducer(state: QuizState | null, action: QuizAction): QuizState | null {
  switch (action.type) {
    case 'START': {
      const questions = buildQuestions(action.sku)
      return { sku: action.sku, questions, current: 0, score: 0, answers: Array(questions.length).fill(undefined) }
    }
    case 'ANSWER': {
      if (!state) return null
      if (state.answers[state.current] !== undefined) return state
      const correct = action.idx === state.questions[state.current].a
      const newAnswers = [...state.answers]
      newAnswers[state.current] = action.idx
      return { ...state, answers: newAnswers, score: state.score + (correct ? 1 : 0) }
    }
    case 'NEXT': {
      if (!state) return null
      return { ...state, current: state.current + 1 }
    }
    case 'RESTART': {
      if (!state) return null
      return quizReducer(null, { type: 'START', sku: state.sku })
    }
    case 'EXIT':
      return null
    default:
      return state
  }
}

function Hub({ dispatch }: { dispatch: React.Dispatch<QuizAction> }) {
  return (
    <div>
      <button
        className={styles.quizMasterCard}
        onClick={() => dispatch({ type: 'START', sku: 'master' })}
      >
        <div className={styles.masterCardInner}>
          <div className={styles.masterCardText}>
            <div className={styles.masterEyebrow}>Ultimate Challenge</div>
            <div className={styles.masterTitle}>CCM Master Knowledge Test</div>
            <div className={styles.masterDesc}>50 randomized questions drawn from all 5 SKU banks plus cross-SKU knowledge. Prove you know the full platform.</div>
          </div>
          <div className={styles.masterStats}>
            <div className={styles.masterStat}>
              <div className={styles.masterStatNum}>50</div>
              <div className={styles.masterStatLabel}>Questions</div>
            </div>
            <div className={styles.masterStat}>
              <div className={styles.masterStatNum}>140+</div>
              <div className={styles.masterStatLabel}>Question Bank</div>
            </div>
          </div>
        </div>
      </button>

      <div style={{ fontSize: 'var(--text-label)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.09em', color: 'var(--text-muted)', marginBottom: 16 }}>SKU Quizzes — 10 Questions Each</div>

      <div className={styles.quizHubGrid}>
        {Object.entries(SKU_META).map(([k, m]) => (
          <button
            key={k}
            className={styles.quizHubCard}
            style={{ borderTopColor: m.color }}
            onClick={() => dispatch({ type: 'START', sku: k })}
          >
            <div className={styles.qhcIcon}><CCMIcon name={m.icon} size={20} /></div>
            <div className={styles.qhcTitle}>{m.name}</div>
            <div className={styles.qhcDesc}>Test your knowledge on qualifying, positioning, and winning with {m.name}.</div>
            <div className={styles.qhcMeta}>
              <span className={styles.qhcBadge} style={{ background: m.bg, color: m.color, border: `1px solid ${m.bdr}` }}>10 Questions</span>
              <span className={styles.qhcBadge} style={{ background: 'var(--bg-panel)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>25-Q Bank</span>
              <span className={styles.qhcBadge} style={{ background: 'var(--bg-panel)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>Randomized</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function ActiveQuiz({ state, dispatch }: { state: QuizState; dispatch: React.Dispatch<QuizAction> }) {
  const q = state.questions[state.current]
  const total = state.questions.length
  const pct = Math.round((state.current / total) * 100)
  const answered = state.answers[state.current] !== undefined
  const isMaster = state.sku === 'master'
  const skuColor = isMaster ? 'var(--accent)' : (SKU_META[q.sku!]?.color || 'var(--accent)')
  const skuLabel = isMaster ? 'CCM Master Test' : (SKU_META[q.sku!]?.name || '')

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
        <button className={`${styles.quizBtn} ${styles.quizBtnGhost}`} style={{ fontSize: 12 }} onClick={() => dispatch({ type: 'EXIT' })}>
          Back to Hub
        </button>
      </div>
      <div className={styles.quizContainer}>
        <div className={styles.quizTopbar}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em', color: skuColor, marginBottom: 3 }}>{skuLabel}</div>
            <div className={styles.quizTitleBar}>{isMaster ? 'CCM Master Knowledge Test' : 'SKU Quiz'}</div>
          </div>
          <div className={styles.quizProgressWrap}>
            <div className={styles.quizScoreLive}>{state.score} correct</div>
            <div className={styles.quizProgBar}><div className={styles.quizProgFill} style={{ transform: `scaleX(${pct / 100})` }} /></div>
            <div className={styles.quizProgTxt}>Q{state.current + 1} of {total}</div>
          </div>
        </div>

        <div className={styles.quizQBody}>
          <div className={styles.quizQNum}>Question {state.current + 1}</div>
          <div className={styles.quizQText}>{q.q}</div>
          <div className={styles.quizOptions}>
            {q.opts.map((opt, i) => {
              const userAns = state.answers[state.current]
              let cls = styles.quizOpt
              if (answered) {
                if (i === q.a && userAns === i) cls = `${styles.quizOpt} ${styles.quizOptCorrect}`
                else if (i === q.a) cls = `${styles.quizOpt} ${styles.quizOptRevealCorrect}`
                else if (i === userAns) cls = `${styles.quizOpt} ${styles.quizOptWrong}`
              }
              return (
                <button
                  key={i}
                  className={cls}
                  disabled={answered}
                  onClick={() => dispatch({ type: 'ANSWER', idx: i })}
                >
                  <span style={{ fontWeight: 700, color: 'var(--text-muted)', marginRight: 6 }}>{'ABCD'[i]}.</span>
                  {opt}
                </button>
              )
            })}
          </div>
          <div className={`${styles.quizExplain} ${answered ? styles.quizExplainShow : ''}`}>
            <div className={styles.quizExplainLbl}>Explanation</div>
            {q.exp}
          </div>
        </div>

        <div className={styles.quizNav}>
          {answered && (
            <button className={`${styles.quizBtn} ${styles.quizBtnPrimary}`} onClick={() => dispatch({ type: 'NEXT' })}>
              {state.current + 1 >= total ? 'See Results' : 'Next Question'} →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function Results({ state, dispatch }: { state: QuizState; dispatch: React.Dispatch<QuizAction> }) {
  const total = state.questions.length
  const pct = Math.round((state.score / total) * 100)
  let grade = 'Keep Studying'
  let gradeColor = 'var(--danger)'
  let gradeBg = 'var(--danger-bg)'
  if (pct >= 90) { grade = 'Expert'; gradeColor = 'var(--success)'; gradeBg = 'var(--success-bg)' }
  else if (pct >= 75) { grade = 'Proficient'; gradeColor = 'var(--warn)'; gradeBg = 'var(--warn-bg)' }
  else if (pct >= 60) { grade = 'Learning'; gradeColor = 'var(--accent)'; gradeBg = 'var(--accent-sub)' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
        <button className={`${styles.quizBtn} ${styles.quizBtnGhost}`} style={{ fontSize: 12 }} onClick={() => dispatch({ type: 'EXIT' })}>
          Back to Hub
        </button>
      </div>
      <div className={styles.quizContainer}>
        <div className={styles.quizResults}>
          <div className={styles.quizScoreBig}>{state.score}/{total}</div>
          <div className={styles.quizScoreLabel}>You answered {state.score} out of {total} questions correctly ({pct}%)</div>
          <div className={styles.quizGradeBadge} style={{ background: gradeBg, color: gradeColor, border: `1px solid color-mix(in srgb, ${gradeColor} 25%, transparent)` }}>{grade}</div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className={`${styles.quizBtn} ${styles.quizBtnPrimary}`} onClick={() => dispatch({ type: 'RESTART' })}>Retake Quiz</button>
            <button className={`${styles.quizBtn} ${styles.quizBtnGhost}`} onClick={() => dispatch({ type: 'EXIT' })}>All Quizzes</button>
          </div>
          <div className={styles.quizResultsList}>
            <div style={{ fontSize: 'var(--text-label)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--text-muted)', marginBottom: 12, marginTop: 24 }}>Question Review</div>
            {state.questions.map((q, i) => {
              const pass = state.answers[i] === q.a
              return (
                <div key={i} className={`${styles.qrlItem} ${pass ? styles.qrlItemPass : styles.qrlItemFail}`}>
                  <div className={styles.qrlIcon}>{pass ? '✓' : '✗'}</div>
                  <div className={styles.qrlQ}>{q.q}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export function KnowledgeSection() {
  const [quizState, dispatch] = useReducer(quizReducer, null)

  if (!quizState) return (
    <div>
      <div className={styles.sectionHdr}>
        <div className={styles.sectionEyebrow}>Sales Readiness</div>
        <h2 className={styles.sectionTitle}>Knowledge Hub</h2>
        <p className={styles.sectionSub}>Test your CCM knowledge across all SKUs. 140+ questions, randomized each time.</p>
      </div>
      <Hub dispatch={dispatch} />
    </div>
  )

  const isDone = quizState.current >= quizState.questions.length

  return (
    <div>
      <div className={styles.sectionHdr}>
        <div className={styles.sectionEyebrow}>Sales Readiness</div>
        <h2 className={styles.sectionTitle}>Knowledge Hub</h2>
      </div>
      {isDone
        ? <Results state={quizState} dispatch={dispatch} />
        : <ActiveQuiz state={quizState} dispatch={dispatch} />
      }
    </div>
  )
}
