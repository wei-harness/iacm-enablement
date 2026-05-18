export interface SkuFeature { n: string; d: string }
export interface SkuDiscovery { q: string; why: string; ans: string }
export interface RoiSlider { label: string; min: number; max: number; step: number; defaultVal: number; format: (v: number) => string }
export interface RoiResult { compute: (s1: number, s2: number) => [string, string, string, string, string, string] }
export interface Sku {
  id: string; name: string; icon: string; color: string; bg: string; bdr: string
  /** icon: Lucide icon name (e.g. 'bar-chart-2') */
  tagline: string; pitch: string; value: string; valueLabel: string
  useCases: string[]
  features: SkuFeature[]
  stats: string[]
  discovery: SkuDiscovery[]
  roi: { sliders: [RoiSlider, RoiSlider]; compute: (s1: number, s2: number) => [string, string, string, string, string, string] }
}

function fmtM(n: number): string {
  if (n >= 1) return '$' + n.toFixed(1).replace(/\.0$/, '') + 'M'
  return '$' + Math.round(n * 1000) + 'K'
}

export const SKU_DATA: Sku[] = [
  {
    id: 'cost-insights', name: 'Cost Insights', icon: 'bar-chart-2',
    color: 'var(--sku-ci)', bg: 'var(--sku-ci-bg)', bdr: 'var(--sku-ci-bdr)',
    tagline: 'See, allocate, and control cloud spend across the business.',
    pitch: 'Turn your cloud bill into actionable intelligence. Real-time visibility, AI-powered anomaly detection, and executive reporting across all your cloud accounts.',
    value: '$1-3M+', valueLabel: 'immediate savings',
    useCases: [
      'Multi-cloud cost visibility across AWS, Azure, GCP',
      'Chargeback/showback for business accountability',
      'Kubernetes cost breakdown to workload level',
      'Third-party SaaS ingestion (Snowflake, Databricks)',
      'Executive dashboards and forecasting',
      'Anomaly detection and budget alerts',
    ],
    features: [
      { n: 'Cost Allocation', d: 'Chargeback/Showback, Business Mapping, Cost Perspectives' },
      { n: 'Dynamic Cost Categorization', d: 'Cost Categories, Dynamic Bucketing — no re-tagging required' },
      { n: 'Multi-Cloud Visibility', d: 'AWS, Azure, GCP unified single view' },
      { n: 'Kubernetes Cost Visibility', d: 'Cluster, Node, Workload-level breakdown' },
      { n: 'Dashboards and Reporting', d: 'OOB + custom dashboards, scheduled reports' },
      { n: 'Forecasting and Budgets', d: 'Predictive spend planning, budget alerts' },
      { n: 'Anomaly Detection', d: 'ML-powered, flags spikes within hours' },
      { n: 'Cloud Inventory', d: 'Real-time resource inventory across all accounts' },
    ],
    stats: [
      '40% faster time-to-insights vs traditional FinOps tools',
      '95% of cost spikes caught within hours',
      '$1-3M+ immediate savings on $100M cloud spend',
      '90% reduction in cost allocation time',
    ],
    discovery: [
      { q: 'What percentage of your cloud spend can you attribute to a known team or product right now?', why: 'Direct allocation test — most customers are shocked by their actual number', ans: 'This is the single most powerful discovery question for Cost Insights. When customers hesitate, you have found the pain.' },
      { q: 'How long does it take to compile a cloud cost report for leadership?', why: 'Manual reporting pain equals dashboard and automation value', ans: 'If the answer is days or a week, you have a dashboards and reporting opportunity.' },
      { q: 'When was the last time you had an unexpected bill or cost spike?', why: 'Creates urgency around anomaly detection', ans: 'Almost every customer has a horror story. Let them tell it. Then ask: How long did it take to figure out what caused it?' },
      { q: 'How many cloud accounts do you manage, and how do you get a unified view today?', why: 'Target: 5+ accounts — complexity that justifies CCM', ans: 'The sweet spot is 5+ accounts. Above 5, fragmentation becomes unmanageable.' },
      { q: 'Are engineering teams held accountable for their cloud costs?', why: 'Opens chargeback/showback conversation', ans: 'If no, explore why — usually lack of data. If yes, explore how — usually clunky and manual. Both are opportunities.' },
    ],
    roi: {
      sliders: [
        { label: 'Annual cloud spend ($M)', min: 5, max: 500, step: 5, defaultVal: 100, format: (v) => `$${v}M` },
        { label: 'Unallocated spend (%)', min: 10, max: 80, step: 5, defaultVal: 40, format: (v) => `${v}%` },
      ],
      compute: (s1, s2) => [fmtM(s1 * 0.015), 'waste eliminated', fmtM(s1 * (s2 / 100) * 0.3), 'from allocation efficiency', fmtM(s1 * 0.015 + s1 * (s2 / 100) * 0.3), 'estimated annual impact'],
    },
  },
  {
    id: 'asset-governance', name: 'Asset Governance', icon: 'shield',
    color: 'var(--sku-ag)', bg: 'var(--sku-ag-bg)', bdr: 'var(--sku-ag-bdr)',
    tagline: 'Enforce cost and usage policies automatically at scale.',
    pitch: 'Stop cloud waste before it happens. Prevention beats detection — Asset Governance automatically enforces cost and security policies across all AWS resources.',
    value: '$500K-$2M', valueLabel: 'annual governance savings',
    useCases: [
      'Enforce cost policies across 10+ AWS accounts',
      'Auto-remediate unused EBS volumes, oversized EC2',
      'Prevent orphaned resources before they accumulate',
      'Compliance automation with full audit trails',
      'AI-assisted custom policy creation',
    ],
    features: [
      { n: 'Governance Policy Library', d: '150+ out-of-the-box rules for cost, security, compliance' },
      { n: 'Automated Policy Enforcement', d: 'Actively prevents violations without manual oversight' },
      { n: 'AI-Assisted Policy Creation', d: 'Quickly create governance rules tailored to your environment' },
      { n: 'Custom Governance Rules', d: 'Supports org-specific policies beyond standard best practices' },
      { n: 'Continuous Governance Reporting', d: 'Tracks violations and improvements over time' },
    ],
    stats: [
      '25-40% reduction in cloud waste through proactive governance',
      '90% reduction in manual policy enforcement overhead',
      'Prevents 95% of orphaned resources before costs accumulate',
      'Enterprise customers save $500K-$2M annually on governance alone',
    ],
    discovery: [
      { q: 'How many AWS accounts do you manage?', why: 'Target: 10+ accounts — complexity that needs governance', ans: '10+ accounts is where governance complexity becomes unmanageable manually.' },
      { q: 'What is your biggest cloud waste category?', why: 'Any answer here indicates Asset Governance fit', ans: 'Any answer — unused volumes, oversized instances, orphaned resources — is an Asset Governance win.' },
      { q: 'How do you currently enforce cost policies across your AWS environment?', why: 'Look for manual processes — that is the opportunity', ans: 'Manual scripts signal a clear Asset Governance opportunity.' },
      { q: 'What happens when a developer spins up a resource that violates policy?', why: 'Uncovers prevention vs detection gap', ans: "If the answer is nothing or we find out later, that's the prevention vs detection gap Asset Governance closes." },
    ],
    roi: {
      sliders: [
        { label: 'Annual cloud spend ($M)', min: 5, max: 500, step: 5, defaultVal: 100, format: (v) => `$${v}M` },
        { label: 'Estimated waste (%)', min: 5, max: 40, step: 1, defaultVal: 15, format: (v) => `${v}%` },
      ],
      compute: (s1, s2) => { const waste = s1 * (s2 / 100); return [fmtM(waste), 'estimated annual waste', '25-40%', 'prevented by governance', fmtM(waste * 0.325), 'estimated annual savings'] },
    },
  },
  {
    id: 'autostopping', name: 'AutoStopping', icon: 'pause',
    color: 'var(--sku-as)', bg: 'var(--sku-as-bg)', bdr: 'var(--sku-as-bdr)',
    tagline: 'Eliminate waste automatically by turning off what you are not using.',
    pitch: 'Cut non-production costs by 70% without changing a single line of code. Intelligent hibernation for VMs, containers, and databases — resources restart automatically when needed.',
    value: '60-80%', valueLabel: 'non-prod cost reduction',
    useCases: [
      'Dev/test environments running 24/7',
      'Traffic-aware hibernation (resources auto-wake on access)',
      'Automatic schedule-based start/stop',
      'Spot instance orchestration for safe savings',
      'Approval workflow integration',
    ],
    features: [
      { n: 'Automated Idle Resource Mgmt', d: 'Detects unused resources and stops them automatically' },
      { n: 'AutoStopping for VMs and K8s', d: 'Schedule or traffic-based on/off automation' },
      { n: 'Spot Orchestration', d: 'Intelligent spot usage balanced with reliability' },
      { n: 'Workflow Ticket Integration', d: 'Aligns start/stop actions with governance processes' },
      { n: 'eBPF Service Discovery Q2 2026', d: 'Auto-discover K8s services, map application dependencies' },
    ],
    stats: [
      'Average 70% reduction in non-production costs',
      'Zero developer friction — resources auto-wake when accessed',
      'Tyler Tech saved $2M+ annually with AutoStopping (patented)',
      'United Airlines: $8.83M verified annual savings',
    ],
    discovery: [
      { q: 'What percentage of your AWS spend is non-production?', why: 'Target: 30%+ non-prod — directly sizes the AutoStopping opportunity', ans: 'If 30%+ of spend is non-prod, AutoStopping can typically save 60-80% of that bucket.' },
      { q: 'How many development and staging environments run 24/7?', why: 'Always-on waste equals immediate savings target', ans: 'A dev environment used 40 hours/week is idle 128 hours/week — 76% of the time.' },
      { q: 'Do developers ever complain about slow environment startup?', why: 'Surfaces the friction concern you will need to address', ans: 'Get ahead of the objection: intelligent wake-up restarts resources automatically when accessed.' },
      { q: 'Who is responsible for shutting down non-prod environments today?', why: 'Manual process equals automation opportunity', ans: 'If the answer is nobody or honor system, you have a waste elimination story.' },
      { q: 'Have you tried scheduling before? What happened?', why: 'Addresses past failures — intelligent wake-up solves problems older tools created', ans: 'AutoStopping is traffic-aware — it knows if someone is actually using the environment.' },
    ],
    roi: {
      sliders: [
        { label: 'Monthly cloud spend ($M)', min: 1, max: 50, step: 1, defaultVal: 5, format: (v) => `$${v}M/mo` },
        { label: 'Non-prod spend (%)', min: 10, max: 70, step: 5, defaultVal: 35, format: (v) => `${v}%` },
      ],
      compute: (s1, s2) => { const npAnnual = s1 * 12 * (s2 / 100); return [fmtM(npAnnual), 'non-prod annual spend', '70%', 'avg cost reduction', fmtM(npAnnual * 0.70), 'estimated annual savings'] },
    },
  },
  {
    id: 'commitment-orchestrator', name: 'Commitment Orchestrator', icon: 'target',
    color: 'var(--sku-co)', bg: 'var(--sku-co-bg)', bdr: 'var(--sku-co-bdr)',
    tagline: 'Maximize savings from cloud commitments with minimal risk.',
    pitch: 'Let AI manage your RIs and Savings Plans. Maximize savings while eliminating over-commitment risk through intelligent automation. Set it and forget it.',
    value: '$2-5M', valueLabel: 'annual savings',
    useCases: [
      'Automated RI and Savings Plan purchasing',
      'Multi-cloud commitment management',
      'Expiration and renewal automation',
      'Cross-AZ and instance family optimization',
      'Risk-free over/under commitment balancing',
    ],
    features: [
      { n: 'Cloud Provider Compute Recommendations', d: 'Analyzes usage patterns to recommend optimal commitments' },
      { n: 'RI and Savings Plan Planning', d: 'Identifies where RIs/SPs will deliver the most value' },
      { n: 'Automated Commitment Execution', d: 'Buys, renews, and rebalances commitments automatically' },
      { n: 'Azure Commitment Orch Q3 2026', d: 'Automated purchasing and management for Azure RIs and SPs' },
    ],
    stats: [
      '15-25% additional savings on top of standard RI discounts',
      'Gartner: 91% reservation coverage, $3.3M in 12 months',
      'Elevance Health: $12M+ annualized RI savings',
      '$190K savings in the first 30 days at Elevance',
    ],
    discovery: [
      { q: 'What is your current RI or Savings Plan coverage percentage?', why: 'Below 60% or above 90% both indicate opportunity', ans: 'Below 60%: large on-demand waste. Above 90%: likely over-committed with expiring RIs. Both are Commitment Orchestrator opportunities.' },
      { q: 'Who makes the decision to purchase Reserved Instances today?', why: 'Identifies decision maker and process complexity', ans: 'If the answer is a person or team, there is automation opportunity.' },
      { q: 'Have you ever had unused RIs expire or go to waste?', why: 'Creates immediate ROI conversation', ans: 'Almost always answered yes. Ask: Do you know roughly how much that cost you?' },
      { q: 'How often do you review and adjust your commitment portfolio?', why: 'Monthly or less means they need automation', ans: 'Monthly or less review frequency means the portfolio drifts constantly.' },
      { q: 'Are you managing commitments across multiple cloud providers?', why: 'Multi-cloud commitment complexity is a strong differentiator', ans: 'Multi-cloud is a genuine differentiator. AWS ready today; Azure Commitment Orchestrator arrives Q3 2026.' },
    ],
    roi: {
      sliders: [
        { label: 'Annual cloud spend ($M)', min: 10, max: 500, step: 10, defaultVal: 100, format: (v) => `$${v}M` },
        { label: 'Current RI coverage (%)', min: 0, max: 95, step: 5, defaultVal: 45, format: (v) => `${v}%` },
      ],
      compute: (s1, s2) => { const gap = Math.max(0, 75 - s2); const est = Math.max(s1 * (gap / 100) * 0.20, s1 * 0.02); return [s2 + '%', 'current RI coverage', Math.min(s2 + gap, 91) + '%', 'target coverage', fmtM(est), 'estimated annual savings'] },
    },
  },
  {
    id: 'cluster-orchestrator', name: 'Cluster Orchestrator', icon: 'settings',
    color: 'var(--sku-cl)', bg: 'var(--sku-cl-bg)', bdr: 'var(--sku-cl-bdr)',
    tagline: 'Optimize Kubernetes infrastructure continuously and safely.',
    pitch: 'Kubernetes cost optimization that actually works. Intelligent spot orchestration, right-sizing, and bin-packing for 60%+ container savings. Built specifically for Amazon EKS.',
    value: '25-40%', valueLabel: 'K8s cost reduction',
    useCases: [
      'EKS cost optimization with enhanced Karpenter',
      'Intelligent spot vs on-demand balancing',
      'Node pool and workload right-sizing',
      'Automated cluster scaling on actual demand',
      'Container-level cost attribution and chargeback',
    ],
    features: [
      { n: 'Spot vs On-Demand Optimization', d: 'Auto-balances nodes to minimize cost while maintaining reliability' },
      { n: 'Node Pool and Workload Recommendations', d: 'Recommends optimal node sizes, prevents over-provisioning' },
      { n: 'Custom Recommendation Rules', d: 'Apply business-specific risk tolerance to optimization decisions' },
      { n: 'EKS Native plus Karpenter+', d: 'Enhanced AWS Karpenter with cost intelligence and enterprise controls' },
      { n: 'Cluster Orchestrator for AKS Q4 2026', d: 'Workload-driven intelligent node autoscaling for Azure AKS' },
    ],
    stats: [
      '60% average reduction in Kubernetes costs',
      'Zero impact to application performance or availability',
      'United Airlines: 30-40% target K8s compute cost reduction',
      'Spot instances 60-90% cheaper than on-demand',
    ],
    discovery: [
      { q: 'What percentage of your workload runs on Kubernetes?', why: 'Target: 40%+ containerized workloads to justify the investment', ans: 'Below 20%: may be premature. 20-40%: start with visibility. Above 40%: Cluster Orchestrator is a priority play.' },
      { q: 'Are you using Karpenter for EKS autoscaling?', why: 'Yes = easy integration story; No = opportunity to modernize', ans: 'Existing Karpenter users get cost intelligence on top. Non-Karpenter users get autoscaling modernization and cost optimization in one move.' },
      { q: 'What is your current spot instance adoption rate on EKS?', why: 'Low adoption = large savings opportunity', ans: 'Spot instances are 60-90% cheaper than on-demand. The barrier is reliability risk — Cluster Orchestrator addresses this directly.' },
      { q: 'Do you have visibility into cost by namespace or workload today?', why: 'No visibility = sell Cost Insights + Cluster Orchestrator together', ans: "You cannot optimize what you cannot see." },
      { q: 'How do you handle node pool scaling today?', why: 'Manual scaling = clear automation value prop', ans: 'Manual scaling is a clear Cluster Orchestrator opportunity.' },
    ],
    roi: {
      sliders: [
        { label: 'Annual cloud spend ($M)', min: 5, max: 200, step: 5, defaultVal: 50, format: (v) => `$${v}M` },
        { label: 'K8s workload (%)', min: 10, max: 90, step: 5, defaultVal: 50, format: (v) => `${v}%` },
      ],
      compute: (s1, s2) => { const k8s = s1 * (s2 / 100); return [fmtM(k8s), 'K8s annual spend', '60%', 'avg K8s reduction', fmtM(k8s * 0.60), 'estimated annual savings'] },
    },
  },
]
