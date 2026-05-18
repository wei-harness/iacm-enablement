export interface MaturityStage {
  stage: number; name: string; label: string
  labelColor: string; labelBg: string; labelBdr: string
  desc: string; actions: string[]
  rec: string; recColor: string; recBg: string
}

export interface WorkshopItem { n: number; title: string; desc: string }

export const MATURITY_STAGES: MaturityStage[] = [
  {
    stage: 1, name: 'Crawl', label: 'Inform',
    labelColor: 'var(--danger)', labelBg: 'var(--danger-bg)', labelBdr: 'color-mix(in srgb, var(--danger) 30%, transparent)',
    desc: 'Basic cost visibility. Spend is visible but mostly unallocated. No governance in place. Teams react to bills after they arrive.',
    actions: ['Connect cloud accounts to Harness CCM', 'Enable Cost Perspectives for visibility baseline', 'Set up basic anomaly detection', 'Establish tagging strategy (start with Core Five)'],
    rec: 'Start with Cost Insights — get visibility before you can optimize. Asset Governance can run in audit mode while you build the tagging foundation.',
    recColor: 'var(--danger)', recBg: 'var(--danger-bg)',
  },
  {
    stage: 2, name: 'Walk', label: 'Optimize',
    labelColor: 'var(--warn)', labelBg: 'var(--warn-bg)', labelBdr: 'color-mix(in srgb, var(--warn) 30%, transparent)',
    desc: 'Cost allocation exists and some teams are accountable. Governance is being defined. Optimization happens but is ad-hoc.',
    actions: ['Implement tagging strategy with enforcement', 'Enable Asset Governance with auto-remediation', 'Set up chargeback/showback reporting', 'Deploy AutoStopping for non-production environments'],
    rec: 'Add Asset Governance and AutoStopping. These two SKUs together typically generate enough savings to fund the entire platform.',
    recColor: 'var(--warn)', recBg: 'var(--warn-bg)',
  },
  {
    stage: 3, name: 'Run', label: 'Operate',
    labelColor: 'var(--success)', labelBg: 'var(--success-bg)', labelBdr: 'color-mix(in srgb, var(--success) 30%, transparent)',
    desc: 'Full cost allocation with automated governance. Optimization is continuous and automated. Commitments are managed.',
    actions: ['Automate RI/SP with Commitment Orchestrator', 'Deploy Cluster Orchestrator for K8s workloads', 'Enable unit cost economics and business metrics', 'Implement FinOps-as-code via IaCM integration'],
    rec: 'Full platform deployment. Commitment Orchestrator and Cluster Orchestrator drive material savings.',
    recColor: 'var(--success)', recBg: 'var(--success-bg)',
  },
]

export const WORKSHOP_ITEMS: WorkshopItem[] = [
  { n: 1, title: 'Cloud Environment Assessment', desc: 'Review current account structure, tagging strategy, and visibility gaps.' },
  { n: 2, title: 'Maturity Benchmarking', desc: 'Score the customer against Crawl/Walk/Run across Inform, Optimize, and Operate pillars.' },
  { n: 3, title: 'Waste Estimation', desc: 'Estimate addressable waste by category: non-prod, orphaned resources, over-committed RIs.' },
  { n: 4, title: 'SKU Deployment Roadmap', desc: 'Recommended sequence of CCM SKU deployment with expected ROI at each phase.' },
  { n: 5, title: 'FinOps Culture Assessment', desc: 'Identify persona gaps — who needs to be in the room for FinOps to succeed.' },
  { n: 6, title: '90-Day Quick Win Plan', desc: 'Concrete actions for immediate savings with specific Harness CCM features mapped to each.' },
]

export const LISTEN_ITEMS: string[] = [
  'We need better showback or chargeback to hold teams accountable. → Cost allocation and accountability opportunity',
  'Our biggest challenge is getting engineers to actually implement optimization recommendations. → Automation and enforcement story',
  'We are trying to define unit economics — what should our cloud cost per customer be? → Mature FinOps, full platform sell',
  'Our goal is to shift from reactive to proactive with our cloud spend. → Planning and governance story',
  'We are interested in governance policies that automatically prevent overspend. → Asset Governance plus shift left IaCM story',
]
