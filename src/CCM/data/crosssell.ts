export interface IcpCriterion {
  num: string
  title: string
  desc: string
  threshold: string
  threshColor: string // CSS variable name
}

export interface DiscoFlag {
  label: string
  action: string
  text: string
}

export interface DiscoQuestion {
  num: string
  topic: string
  q: string
  green: DiscoFlag
  yellow: DiscoFlag
  red: DiscoFlag
  why: string
  solves: string[]
}

export interface MotionExpand {
  leftLabel: string
  leftItems: string[]
  rightLabel: string
  rightItems: string[]
  starter: string
}

export interface Motion {
  id: string
  color: string // CSS variable
  colorSub: string // CSS variable for bg
  icon: string
  name: string
  tagline: string
  targets: string[]
  targetColors: string[] // CSS variables
  pitch: string
  expand: MotionExpand
}

export interface PathwayStep {
  name: string
  val: string
  desc: string
}

export interface Pathway {
  id: string
  label: string
  steps: PathwayStep[]
  total: string
  note: string
  rationale: string
}

export interface MaturitySku {
  icon: string
  name: string
  color: string // CSS variable
  tag: string
  tagColor: string // CSS variable
  why: string
}

export interface MaturityStage {
  num: string
  name: string
  label: string
  labelColor: string // CSS variable
  skus: MaturitySku[]
}

export interface ConversationStarter {
  filter: string
  q: string
  context: string
  ans: string
}

/* ── ICP Criteria ── */
export const ICP_CRITERIA: IcpCriterion[] = [
  {
    num: '01', title: 'Annual Cloud Spend',
    desc: 'Greater than $10M in annual cloud spend.',
    threshold: '$10M+ (consider $20M for tighter qualification)',
    threshColor: 'var(--warning-amber)',
  },
  {
    num: '02', title: 'Active CSP Footprint',
    desc: 'Meaningful spend on at least one major cloud provider.',
    threshold: 'AWS preferred — then Azure, GCP',
    threshColor: 'var(--accent)',
  },
  {
    num: '03', title: 'Customer Tenure',
    desc: 'At least 1 quarter post-implementation — long enough to establish baseline health metrics.',
    threshold: 'Min. 1 quarter post-impl.',
    threshColor: 'var(--color-quality)',
  },
  {
    num: '04', title: 'Account Health',
    desc: 'Green, or Yellow trending toward Green. Stable, productive relationship ready for expansion.',
    threshold: 'Green or Yellow → Green',
    threshColor: 'var(--state-success)',
  },
  {
    num: '05', title: 'FinOps Owner',
    desc: 'Has a FinOps owner (Finance or Engineering). Must have autonomy and/or authority to act.',
    threshold: 'Finance or Eng — needs authority',
    threshColor: 'var(--accent)',
  },
  {
    num: '06', title: 'Pain + Incumbent Awareness',
    desc: 'Articulated pain around cloud cost visibility or optimization. Incumbent tool is fine.',
    threshold: 'Incumbent tool OK',
    threshColor: 'var(--state-success)',
  },
]

/* ── Discovery Questions ── */
export const DISCO_QUESTIONS: DiscoQuestion[] = [
  {
    num: 'Q1', topic: 'Cost Visibility',
    q: 'Are your teams able to see the cost impact of what they deploy — or is cloud cost mostly discovered after the fact?',
    green: { label: 'Green Flag', action: 'Go Deeper', text: '"We find out at month-end" / "Finance sends the bill and we try to reverse-engineer it" / "Developers don\'t think about cost until something gets flagged"' },
    yellow: { label: 'Yellow Flag', action: 'Probe Further', text: '"We have dashboards but they\'re not in the deployment workflow" — ask who looks at them and how often' },
    red: { label: 'Red Flag', action: 'Deprioritize', text: 'Cost policies are embedded in pipelines with real-time engineer feedback' },
    why: 'If cost is discovered post-bill, there\'s no feedback loop for engineers. Spend grows unchecked and accountability sits with finance, not the teams creating it.',
    solves: ['Perspectives', 'Anomaly Detection'],
  },
  {
    num: 'Q2', topic: 'Non-Prod Waste',
    q: 'Do you have non-prod environments — dev, test, staging — running 24/7 that could be shut down when engineers aren\'t using them?',
    green: { label: 'Green Flag', action: 'Go Deeper', text: '"We\'ve talked about it but haven\'t done anything" / "It\'s manual and nobody\'s enforced it"' },
    yellow: { label: 'Yellow Flag', action: 'Probe Further', text: '"We have some scheduling in place" — ask who owns it and whether it covers all environments' },
    red: { label: 'Red Flag', action: 'Deprioritize', text: 'Yes, fully automated — resources stop and start without manual effort' },
    why: 'Idle non-prod is near-universal waste. CI/CD champions own these directly and often know it\'s a problem — they just lack an automated, policy-driven way to act.',
    solves: ['AutoStopping'],
  },
  {
    num: 'Q3', topic: 'Waste Detection',
    q: 'How does your team currently catch cloud waste before it hits the bill?',
    green: { label: 'Green Flag', action: 'Go Deeper', text: '"We don\'t, really" / "We get surprised monthly" / "AWS alerts are noisy" / "Someone checks the console periodically"' },
    yellow: { label: 'Yellow Flag', action: 'Probe Further', text: '"We use AWS Cost Explorer" — ask whether alerts are automated and who acts on them' },
    red: { label: 'Red Flag', action: 'Deprioritize', text: 'Proactive anomaly detection fires to the right owner before it escalates' },
    why: 'Without proactive waste detection, the default is reactive — savings opportunities are found weeks after the waste was already incurred.',
    solves: ['Anomaly Detection', 'Asset Governance'],
  },
  {
    num: 'Q4', topic: 'Chargeback',
    q: 'When finance asks "how much does [product / team / app] cost to run in the cloud" — how do you answer that today?',
    green: { label: 'Green Flag', action: 'Go Deeper', text: '"We can\'t really answer that" / "We export from AWS and build it in Excel" / "Finance asks and it takes days"' },
    yellow: { label: 'Yellow Flag', action: 'Probe Further', text: '"We have dashboards" — ask if they\'re trusted by leadership and map to actual business units' },
    red: { label: 'Red Flag', action: 'Deprioritize', text: 'Dedicated FinOps platform handles chargeback with full business context already' },
    why: 'Chargeback is the primary CCM business case. If they can\'t answer this confidently, there\'s usually a VP or CFO asking — and someone\'s career depends on fixing it.',
    solves: ['Cost Categories', 'Perspectives'],
  },
  {
    num: 'Q5', topic: 'Eng Workflows',
    q: 'Is cost visibility built into your engineering workflows — or handled later as a finance exercise?',
    green: { label: 'Green Flag', action: 'Go Deeper', text: '"Mostly finance" / "Engineers don\'t look at cost day-to-day" / "It\'s a separate reporting cycle"' },
    yellow: { label: 'Yellow Flag', action: 'Probe Further', text: '"We\'re trying to shift it left but it\'s a work in progress" — ask what\'s blocking adoption' },
    red: { label: 'Red Flag', action: 'Deprioritize', text: 'Cost is a first-class metric in engineering reviews and sprint planning' },
    why: 'The gap between when cost is created (engineering) and when it\'s reviewed (finance) is where waste compounds. Closing that gap requires cost to be a native engineering metric.',
    solves: ['Budgets', 'Recommendations'],
  },
  {
    num: 'Q6', topic: 'RI / Savings Plans',
    q: 'Are you managing Reserved Instances or Savings Plans today — and do you feel like you\'re getting the most out of them?',
    green: { label: 'Green Flag', action: 'Go Deeper', text: '"Someone owns a spreadsheet" / "Our coverage is low" / "We\'re not sure if we\'re over- or under-committed"' },
    yellow: { label: 'Yellow Flag', action: 'Probe Further', text: '"We have some automation" — ask what tool, how proactive it is, and whether it covers all account types' },
    red: { label: 'Red Flag', action: 'Deprioritize', text: 'Dedicated commitment management tool, satisfied with coverage and savings rate' },
    why: 'Manual RI/SP management is common at scale and leaves 20–30% of eligible savings on the table. Commitment waste is often invisible until someone runs the math.',
    solves: ['Commitment Orchestrator'],
  },
  {
    num: 'Q7', topic: 'Ownership',
    q: 'Who owns cloud efficiency across engineering, finance, and platform today?',
    green: { label: 'Green Flag', action: 'Go Deeper (A)', text: '"We have a FinOps / CloudOps function" — ask to meet them; this is your real economic buyer' },
    yellow: { label: 'Yellow Flag', action: 'Probe Further', text: '"It\'s shared but nobody fully owns it" / "Finance owns the budget but engineering controls the spend" — this tension is a direct CCM entry point' },
    red: { label: 'Red Flag', action: 'Deprioritize', text: 'Well-resourced FinOps team with a mature, satisfying toolset' },
    why: 'Ownership fragmentation is one of the most reliable signals of FinOps immaturity. If nobody has a defined OKR around cloud efficiency, savings opportunities go unactioned.',
    solves: ['Asset Governance', 'Cost Categories'],
  },
  {
    num: 'Q8', topic: 'FinOps Role',
    q: 'Is there someone whose job it is to own cloud cost optimization as a defined role or OKR — or does it fall to engineering leads to figure out on their own?',
    green: { label: 'Green Flag', action: 'Go Deeper (A)', text: '"We have a FinOps team / CloudOps function" — ask for an intro immediately; this is your economic buyer' },
    yellow: { label: 'Yellow Flag', action: 'Go Deeper (B)', text: '"It falls to us but nobody really owns it" — latent pain, likely a budget conversation waiting to happen' },
    red: { label: 'Red Flag', action: 'Deprioritize', text: 'Well-funded FinOps team using CloudHealth / Cloudability and they\'re satisfied' },
    why: 'Either answer is actionable: no owner = latent pain and a budget conversation waiting; dedicated owner = active buyer ready to sponsor a CCM initiative.',
    solves: ['Full CCM Platform'],
  },
]

/* ── Motions ── */
export const CCM_MOTIONS: Motion[] = [
  {
    id: 'insights-cluster',
    color: 'var(--danger)',
    colorSub: 'var(--danger-bg)',
    icon: '⎈',
    name: 'Cost Insights → Cluster Orch',
    tagline: 'You can see K8s cost. Now optimize it.',
    targets: ['Platform Eng', 'DevOps', 'FinOps'],
    targetColors: ['var(--danger)', 'var(--color-quality)', 'var(--accent)'],
    pitch: 'You have K8s visibility — Cluster Orchestrator takes it to continuous, automated optimization with zero application impact.',
    expand: {
      leftLabel: 'When to pitch this',
      leftItems: [
        'Customer has K8s visibility from Cost Insights',
        '40%+ of workload is containerized on EKS',
        'Spot adoption is low — untapped savings',
        'Manual node scaling or no Karpenter yet',
      ],
      rightLabel: 'The add-on story',
      rightItems: [
        '60% avg K8s cost reduction on top of existing visibility',
        'EKS + Karpenter+ — no new tooling to learn',
        'Spot orchestration without reliability risk',
        'AKS support Q4 2026 — plan now',
      ],
      starter: 'You can see the cost by namespace. Do you know why some workloads are costing 3x what they should? Cluster Orchestrator right-sizes and spot-optimizes automatically.',
    },
  },
  {
    id: 'insights-commitments',
    color: 'var(--warning-amber)',
    colorSub: 'var(--warn-bg)',
    icon: '🤖',
    name: 'Cost Insights → Commitment Orch',
    tagline: 'Visibility is step one. Now automate savings.',
    targets: ['FinOps', 'Finance', 'CTO'],
    targetColors: ['var(--accent)', 'var(--state-success)', 'var(--color-quality)'],
    pitch: 'You know what you\'re spending. Commitment Orchestrator automates the decisions that turn that spending into savings — RIs, Savings Plans, renewals, rebalancing.',
    expand: {
      leftLabel: 'Qualification signals',
      leftItems: [
        'Current RI coverage below 60% — large on-demand waste',
        'Coverage above 90% — likely over-committed',
        'Monthly or quarterly manual RI review process',
        'Unused RIs have expired in the past',
      ],
      rightLabel: 'Value delivered',
      rightItems: [
        '15–25% additional savings beyond standard RI discounts',
        'Gartner: 91% coverage, $3.3M in 12 months',
        'Elevance Health: $12M+ annualized, $190K in first 30 days',
        'Set-and-forget: AI manages purchases and rebalancing automatically',
      ],
      starter: 'What is your current RI coverage percentage? If I told you we could get you to 91% coverage and save $3M+ in the next 12 months — with zero manual effort — would that be worth 30 minutes?',
    },
  },
  {
    id: 'any-autostopping',
    color: 'var(--color-quality)',
    colorSub: 'var(--sku-as-bg)',
    icon: '⏸',
    name: 'Any SKU → AutoStopping',
    tagline: 'Fastest path to ROI in any CCM install.',
    targets: ['FinOps', 'DevOps', 'CFO'],
    targetColors: ['var(--accent)', 'var(--warning-amber)', 'var(--state-success)'],
    pitch: 'No matter where a customer is in their CCM journey, AutoStopping often pays for the entire platform within the first billing cycle.',
    expand: {
      leftLabel: 'When to add it',
      leftItems: [
        'Any customer with 30%+ non-prod cloud spend',
        'Dev/staging environments running 24/7',
        'Engineering teams not accountable for environment costs',
        'Customer frustrated with slow environment startup',
      ],
      rightLabel: 'The proof points',
      rightItems: [
        'United Airlines: $8.83M verified annual savings',
        'Tyler Tech: $2M+ annually (patented technology)',
        'Average 70% non-production cost reduction',
        'Zero code changes, zero developer friction',
      ],
      starter: 'What percentage of your cloud spend is non-production? A typical dev environment is idle 76% of the week. AutoStopping turns that idle time into savings — automatically.',
    },
  },
  {
    id: 'ccm-ai',
    color: 'var(--color-appsec)',
    colorSub: 'var(--sku-co-bg)',
    icon: '✦',
    name: 'CCM → AI Cost Mgmt',
    tagline: 'The next frontier: FinOps for LLM and GPU spend.',
    targets: ['CTO', 'FinOps', 'CFO'],
    targetColors: ['var(--color-quality)', 'var(--accent)', 'var(--state-success)'],
    pitch: '98% of FinOps teams are now managing AI spend — but only 23% can accurately measure AI ROI. AI Cost Management is the platform built for that gap.',
    expand: {
      leftLabel: 'Why it matters now',
      leftItems: [
        'AI infrastructure is the fastest-growing cost bucket',
        'GPU and LLM spend has no FinOps tooling today',
        'Executive pressure to measure AI ROI is intense',
        'First platform purpose-built for AI FinOps (Q3 2026)',
      ],
      rightLabel: 'What it delivers',
      rightItems: [
        'Visibility and attribution across LLM APIs and GPU infra',
        'Optimization recommendations for model selection and batch sizing',
        'Anomaly detection for runaway AI workloads',
        'Governance policies for AI budget enforcement',
      ],
      starter: 'How are you currently tracking the ROI of your AI and LLM infrastructure investments? 98% of FinOps teams manage AI spend — but only 23% can measure it. We are building that platform.',
    },
  },
]

export const OTHER_MOTIONS: Motion[] = [
  {
    id: 'cd-ccm',
    color: 'var(--accent)',
    colorSub: 'var(--accent-sub)',
    icon: '🚀',
    name: 'CD → CCM',
    tagline: 'Already deploying with Harness? See the cost impact.',
    targets: ['DevOps Lead', 'VP Engineering', 'FinOps'],
    targetColors: ['var(--accent)', 'var(--color-quality)', 'var(--state-success)'],
    pitch: 'You are already deploying with Harness — why not see the cost impact of every deployment in the same platform?',
    expand: {
      leftLabel: 'Why they buy',
      leftItems: [
        'CD customers already trust Harness reliability',
        'Deployment pipeline is already instrumented',
        'Cost spikes after a deploy are a real pain point',
        'One platform for ship + cost = executive story',
      ],
      rightLabel: 'What to add first',
      rightItems: [
        'Cost Insights — connect every pipeline stage to spend',
        'AutoStopping — eliminate non-prod waste from same UI',
        'Asset Governance — enforce cost policies across all AWS accounts',
        'IaCM Integration — prevent costly infra before it\'s provisioned (Q2 2026)',
      ],
      starter: 'You can see deployments in Harness. Do you know which deployment caused your last cost spike? CCM connects your pipeline to your bill.',
    },
  },
  {
    id: 'ff-ccm',
    color: 'var(--color-devops)',
    colorSub: 'var(--sku-ag-bg)',
    icon: '🚩',
    name: 'Feature Flags → CCM',
    tagline: 'Know which feature rollout is driving your cloud bill.',
    targets: ['Product Mgr', 'FinOps', 'VP Engineering'],
    targetColors: ['var(--color-devops)', 'var(--accent)', 'var(--color-quality)'],
    pitch: 'You can toggle a feature — do you know what it costs when you turn it on? CCM correlates feature flag rollouts to cost anomalies in real-time.',
    expand: {
      leftLabel: 'Why it resonates',
      leftItems: [
        'Feature launches frequently cause unexpected cost spikes',
        'No visibility today into cost-per-feature or cost-per-rollout',
        'FinOps and product teams are siloed — this bridges them',
        'Cost anomalies from a bad flag are caught before the CFO sees them',
      ],
      rightLabel: 'The combined story',
      rightItems: [
        'Real-time cost correlation on every feature flag change',
        'Catch runaway cost from a feature before it scales to 100%',
        'Establish unit economics: cost-per-feature, cost-per-user-segment',
        'Kill expensive features before they become budget line items',
      ],
      starter: 'When you rolled out your last major feature, did you see a cost spike? Do you know exactly which flag caused it? CCM gives you that correlation in real-time — before it hits your bill.',
    },
  },
  {
    id: 'sei-ccm',
    color: 'var(--warning-amber)',
    colorSub: 'var(--warn-bg)',
    icon: '📈',
    name: 'SEI → CCM',
    tagline: 'Engineering ROI — output AND cost-per-outcome.',
    targets: ['VP Engineering', 'CTO', 'FinOps'],
    targetColors: ['var(--warning-amber)', 'var(--color-quality)', 'var(--accent)'],
    pitch: 'SEI tells you how fast engineering ships. CCM tells you what it costs. Together they give you the full ROI picture: engineering output per dollar of cloud spend.',
    expand: {
      leftLabel: 'Why this matters',
      leftItems: [
        'DORA metrics alone don\'t tell you if fast delivery is efficient delivery',
        'Boards and CFOs want cloud cost tied to engineering output',
        'Cost-per-deployment is becoming a standard engineering KPI',
        'SEI customers already trust Harness for engineering intelligence',
      ],
      rightLabel: 'The combined value',
      rightItems: [
        'Connect deployment velocity (DORA) to cloud cost trends',
        'Surface cost-per-story-point or cost-per-deployment automatically',
        'Identify high-cost, low-velocity teams to prioritize optimization',
        'Build the ROI case for engineering investment with hard numbers',
      ],
      starter: 'You can measure deployment frequency and change failure rate. Do you know what each deployment costs to run in production? CCM adds the financial dimension to your engineering intelligence.',
    },
  },
  {
    id: 'ci-ccm',
    color: 'var(--color-appsec)',
    colorSub: 'var(--sku-co-bg)',
    icon: '⚙',
    name: 'CI/CD → CCM',
    tagline: 'Connect your build pipeline to the bill it generates.',
    targets: ['Platform Eng', 'DevOps', 'FinOps'],
    targetColors: ['var(--color-appsec)', 'var(--warning-amber)', 'var(--accent)'],
    pitch: 'Every CI/CD run consumes cloud resources. CCM makes that cost visible in the same platform — so engineers see the cost impact of their pipelines, not just their deployments.',
    expand: {
      leftLabel: 'The problem it solves',
      leftItems: [
        'CI pipelines consume significant compute — mostly invisible today',
        'Build environments are rarely part of FinOps optimization scope',
        'Engineers don\'t know if their pipeline is cost-efficient',
        'Flaky tests and long build times translate directly to cloud waste',
      ],
      rightLabel: 'What CCM adds',
      rightItems: [
        'Attribute cloud costs to specific pipelines and build stages',
        'AutoStopping eliminates idle build environment waste (70% reduction)',
        'Asset Governance flags over-provisioned build agents automatically',
        'Cost visibility per PR, per branch, per team — accountability at the source',
      ],
      starter: 'What does your average CI pipeline run cost per execution? Most teams have no idea — and it adds up. CCM connects your build activity to the exact line on your cloud bill.',
    },
  },
]

/* ── Savings Pathways ── */
export const PATHWAYS: Pathway[] = [
  {
    id: 'only-cd',
    label: 'Has CD only',
    steps: [
      { name: 'Cost Insights', val: '$1–3M+', desc: 'Visibility foundation — required first' },
      { name: 'AutoStopping', val: '60–80%', desc: 'Fastest ROI — often pays for platform' },
      { name: 'Commit Orch', val: '$2–5M', desc: 'Automate RI/SP savings at scale' },
      { name: 'Cluster Orch', val: '25–40%', desc: 'K8s cost reduction if EKS heavy' },
    ],
    total: '$11–21M+',
    note: 'On $100M cloud spend',
    rationale: 'CD customers already trust Harness for deployments — the CCM conversation starts there. Lead with Cost Insights to establish visibility, then AutoStopping to deliver the first realized savings quickly. Commitment Orchestrator is the next unlock once spend data is trusted.',
  },
  {
    id: 'has-ff',
    label: 'Has Feature Flags',
    steps: [
      { name: 'Cost Insights', val: '$1–3M+', desc: 'Connect flag rollouts to spend data' },
      { name: 'AutoStopping', val: '60–80%', desc: 'Eliminate idle non-prod environments' },
      { name: 'AI Cost Mgmt', val: 'Q3 2026', desc: 'LLM cost attribution per feature' },
      { name: 'Commit Orch', val: '$2–5M', desc: 'Automate RI/SP portfolio' },
    ],
    total: '$8–16M+',
    note: 'On $100M cloud spend',
    rationale: 'Feature Flags customers care about the cost impact of individual rollouts. Cost Insights makes that correlation visible — which flag caused which spike. AutoStopping tackles the dev/staging waste that feature testing environments create. AI Cost Management is a natural next step as ML features drive GPU spend.',
  },
  {
    id: 'has-sei',
    label: 'Has SEI or CI/CD',
    steps: [
      { name: 'Cost Insights', val: '$1–3M+', desc: 'Add cost dimension to DORA metrics' },
      { name: 'AutoStopping', val: '60–80%', desc: 'Eliminate idle CI build environment waste' },
      { name: 'Commit Orch', val: '$2–5M', desc: 'Automate the commitment portfolio' },
      { name: 'Cluster Orch', val: '25–40%', desc: 'Optimize K8s build infrastructure' },
    ],
    total: '$10–18M+',
    note: 'On $100M cloud spend',
    rationale: 'SEI and CI/CD customers are engineering-intelligence buyers. The pitch is cost-per-deployment as the missing KPI — CCM adds the financial dimension. AutoStopping directly addresses CI build environment waste, which is often invisible. The combined story: engineering ROI, not just engineering output.',
  },
  {
    id: 'has-insights',
    label: 'Has Cost Insights',
    steps: [
      { name: 'AutoStopping', val: '60–80%', desc: 'Fastest path to realized savings' },
      { name: 'Asset Governance', val: '$500K–$2M', desc: 'Move from audit mode to enforcement' },
      { name: 'Commit Orch', val: '$2–5M', desc: 'Automate the RI/SP portfolio' },
      { name: 'Cluster Orch', val: '25–40%', desc: 'K8s optimization on top of visibility' },
    ],
    total: '$9–18M+',
    note: 'Additional on top of Cost Insights',
    rationale: 'Cost Insights customers have the data foundation. The next move is waste elimination — AutoStopping for non-prod, Asset Governance moving from audit mode to enforcement. Both typically generate enough savings to fund the entire platform.',
  },
  {
    id: 'has-autostop',
    label: 'Has AutoStopping',
    steps: [
      { name: 'Commit Orch', val: '$2–5M', desc: 'Largest untapped savings lever' },
      { name: 'Cluster Orch', val: '25–40%', desc: 'K8s optimization if EKS heavy' },
      { name: 'IaCM', val: 'Prevention', desc: 'Shift left — stop waste at source' },
      { name: 'AI Cost Mgmt', val: 'Q3 2026', desc: 'Next frontier for AI/GPU spend' },
    ],
    total: '$5–10M+',
    note: 'Estimated additional annual savings',
    rationale: 'AutoStopping customers have eliminated non-prod waste. The next largest bucket is commitment savings — Commitment Orchestrator is the natural move. If K8s spend is significant, Cluster Orchestrator is a parallel track.',
  },
  {
    id: 'full-platform',
    label: 'Full CCM Platform',
    steps: [
      { name: 'CD / CI / FF / SEI', val: 'Cross-sell', desc: 'Connect CCM to every Harness module' },
      { name: 'IaCM Integration', val: 'Q2 2026', desc: 'Pre-deploy cost simulation' },
      { name: 'AI Cost Mgmt', val: 'Q3 2026', desc: 'LLM and GPU FinOps' },
      { name: 'Azure Roadmap', val: 'Q3–Q4', desc: 'Commitment Orch + Cluster Orch for AKS' },
    ],
    total: 'Platform',
    note: 'Future-proof the full FinOps stack',
    rationale: 'Full CCM platform customers are ready for two conversations: the module cross-sell story and the roadmap urgency story. IaCM shift left, AI Cost Management, and Azure expansion all create urgency and expansion ACV.',
  },
]

/* ── Maturity Stages ── */
export const MATURITY_UPSELL: MaturityStage[] = [
  {
    num: '01',
    name: 'Crawl',
    label: 'Inform Phase',
    labelColor: 'var(--danger)',
    skus: [
      { icon: '📊', name: 'Cost Insights', color: 'var(--accent)', tag: 'Required', tagColor: 'var(--accent)', why: 'Visibility foundation. No other SKU is viable without it. Start here, always.' },
      { icon: '🛡', name: 'Asset Governance', color: 'var(--state-success)', tag: 'Included', tagColor: 'var(--state-success)', why: 'Ships with Cost Insights. Run in audit mode while building tagging strategy — zero risk.' },
      { icon: '🚀', name: 'CD → CCM', color: 'var(--accent)', tag: 'Cross-sell', tagColor: 'var(--text-muted)', why: 'If they have CD, the CCM conversation starts with their existing deployments. Lowest friction entry point.' },
    ],
  },
  {
    num: '02',
    name: 'Walk',
    label: 'Optimize Phase',
    labelColor: 'var(--warning-amber)',
    skus: [
      { icon: '⏸', name: 'AutoStopping', color: 'var(--color-quality)', tag: 'Fastest ROI', tagColor: 'var(--color-quality)', why: 'Activate auto-remediation in Asset Governance. Add AutoStopping. Together these fund the platform.' },
      { icon: '🛡', name: 'Asset Governance', color: 'var(--state-success)', tag: 'Enforce Now', tagColor: 'var(--state-success)', why: 'Move from audit mode to active enforcement. Auto-remediate unused volumes, oversized EC2.' },
      { icon: '🏗', name: 'IaCM Integration', color: 'var(--state-success)', tag: 'Q2 2026', tagColor: 'var(--warning-amber)', why: 'Shift left begins here — simulate cost before Terraform completes.' },
      { icon: '🚩', name: 'Feature Flags → CCM', color: 'var(--color-devops)', tag: 'Cross-sell', tagColor: 'var(--text-muted)', why: 'Feature Flags customers start correlating rollout cost impact here — cost-per-feature visibility.' },
      { icon: '⚙', name: 'CI/CD → CCM', color: 'var(--color-appsec)', tag: 'Cross-sell', tagColor: 'var(--text-muted)', why: 'CI/CD customers get build pipeline cost attribution — AutoStopping on idle build envs is immediate ROI.' },
    ],
  },
  {
    num: '03',
    name: 'Run',
    label: 'Operate Phase',
    labelColor: 'var(--state-success)',
    skus: [
      { icon: '🤖', name: 'Commitment Orch', color: 'var(--warning-amber)', tag: 'Largest Lever', tagColor: 'var(--warning-amber)', why: 'Automate the full RI/SP portfolio. 15–25% additional savings. Set and forget.' },
      { icon: '⎈', name: 'Cluster Orch', color: 'var(--danger)', tag: 'K8s Heavy', tagColor: 'var(--danger)', why: '60% avg K8s cost reduction. EKS Karpenter+ with intelligence. AKS Q4 2026.' },
      { icon: '✦', name: 'AI Cost Mgmt', color: 'var(--color-appsec)', tag: 'Q3 2026', tagColor: 'var(--color-appsec)', why: '98% of FinOps teams manage AI spend. Only 23% can measure ROI. This is the next frontier.' },
      { icon: '📈', name: 'SEI → CCM', color: 'var(--warning-amber)', tag: 'Cross-sell', tagColor: 'var(--text-muted)', why: 'At Run stage, SEI customers add cost-per-deployment to their DORA metrics — full engineering ROI picture.' },
    ],
  },
]

/* ── Conversation Starters ── */
export const STARTER_FILTERS = [
  'All', 'CD → CCM', 'Feature Flags', 'SEI', 'CI/CD',
  'AutoStopping', 'Cluster Orch', 'Commit Orch', 'AI Cost Mgmt',
]

export const CONVERSATION_STARTERS: ConversationStarter[] = [
  {
    filter: 'CD → CCM',
    q: 'You are already deploying with Harness — do you know which deployment caused your last cost spike?',
    context: 'Opens the CCM conversation with existing CD customers. Trust is already established.',
    ans: 'This is the lowest-friction CCM entry point for CD customers. They already trust Harness for reliability — connect that trust to cost accountability. Follow up: What if I showed you every deployment\'s cost impact in the same dashboard you already use?',
  },
  {
    filter: 'CD → CCM',
    q: 'If a deployment doubles your Lambda cost overnight, how quickly do you find out — and who tells you?',
    context: 'Surfaces the alerting and anomaly detection gap that Cost Insights closes.',
    ans: 'Most teams find out from a finance email or a monthly bill review. CCM catches anomalies within hours. The follow-up: Do you want to be the one who finds it, or the one who gets found?',
  },
  {
    filter: 'Feature Flags',
    q: 'When you rolled out your last major feature, did you see a cost spike — and do you know which flag caused it?',
    context: 'Feature Flags to CCM — real-time cost correlation on rollouts.',
    ans: 'Feature launches are a primary cause of unexpected cost spikes. CCM gives you real-time correlation between flag state and cloud cost — before the bad rollout scales to 100% of traffic.',
  },
  {
    filter: 'Feature Flags',
    q: 'Do you know what it costs to run your most expensive feature flag at 100% rollout vs 10%?',
    context: 'Unit economics angle — cost-per-feature as a product decision input.',
    ans: 'This reframes CCM as a product tool, not just a FinOps tool. Product managers start caring about cloud cost when it becomes part of the launch decision. That is the conversation CCM opens.',
  },
  {
    filter: 'SEI',
    q: 'You can measure deployment frequency — do you know what each deployment costs to run in production?',
    context: 'SEI to CCM — adds the cost dimension to DORA metrics.',
    ans: 'SEI tells you how fast engineering ships. CCM tells you what it costs. The CFO increasingly wants both numbers together. Cost-per-deployment is the KPI that bridges engineering and finance.',
  },
  {
    filter: 'SEI',
    q: 'If you had to rank your engineering teams by cost-efficiency — not just velocity — could you?',
    context: 'Executive-level SEI + CCM conversation for VP Engineering or CTO.',
    ans: 'This question reframes the engineering ROI conversation. Velocity without cost context is incomplete. CCM adds the financial dimension to SEI\'s engineering intelligence — and gives executives a complete picture.',
  },
  {
    filter: 'CI/CD',
    q: 'What does your average CI pipeline run cost per execution — and does your team know?',
    context: 'CI/CD to CCM — pipeline cost visibility angle.',
    ans: 'Most teams have no idea — and it adds up fast. This opens the door to attributing cloud costs to specific pipelines, build stages, and teams. CCM connects your build activity to the exact line on your cloud bill.',
  },
  {
    filter: 'CI/CD',
    q: 'How much of your cloud spend goes to build and test infrastructure that nobody is actively using right now?',
    context: 'AutoStopping for CI build environments — idle waste angle.',
    ans: 'CI build environments are often the most consistently idle workloads in a cloud estate. AutoStopping targets exactly this — and the savings usually surprise teams because they\'ve never measured it before.',
  },
  {
    filter: 'AutoStopping',
    q: 'What percentage of your cloud spend is non-production — and is it running right now?',
    context: 'AutoStopping qualification — sizes the opportunity immediately.',
    ans: 'Calculate live: $Xm monthly × 35% non-prod × 70% reduction = $Y annual savings. AutoStopping recovers that cost without changing a single line of code.',
  },
  {
    filter: 'AutoStopping',
    q: 'Who is responsible for shutting down your dev environments at the end of the day?',
    context: 'Manual process = automation opportunity.',
    ans: 'If the answer is nobody, you have a waste story. If the answer is honor system, you have an automation story. Either way, AutoStopping is the answer.',
  },
  {
    filter: 'Cluster Orch',
    q: 'Do you have visibility into cost by Kubernetes namespace or workload today?',
    context: 'Cost Insights + Cluster Orchestrator combined play.',
    ans: 'No visibility = sell Cost Insights first, then layer in Cluster Orchestrator. You cannot optimize what you cannot see — and we give you both in one platform.',
  },
  {
    filter: 'Cluster Orch',
    q: 'What is your current spot instance adoption rate on EKS — and what is holding it back?',
    context: 'Surfaces the reliability concern Cluster Orch solves.',
    ans: 'Low adoption = large untapped savings. The barrier is always reliability risk. Cluster Orchestrator\'s intelligent orchestration manages reliability automatically — spot instances without the fear.',
  },
  {
    filter: 'Commit Orch',
    q: 'What is your current RI or Savings Plan coverage percentage — and when did you last review it?',
    context: 'Both ends of the spectrum are Commitment Orchestrator opportunities.',
    ans: 'Below 60%: large on-demand waste. Above 90%: likely over-committed. Monthly or less review: automation opportunity. Any of these opens the Commitment Orchestrator conversation.',
  },
  {
    filter: 'Commit Orch',
    q: 'Have you ever had unused Reserved Instances expire without being used?',
    context: 'Creates concrete ROI urgency from a real pain memory.',
    ans: 'Almost always answered yes. Follow up: Do you know roughly how much that cost you? Elevance Health had $190K in savings in the first 30 days.',
  },
  {
    filter: 'AI Cost Mgmt',
    q: 'How are you currently tracking the ROI of your AI and LLM infrastructure investments?',
    context: 'AI Cost Management (Q3 2026) — brand-new category urgency.',
    ans: '98% of FinOps teams manage AI spend but only 23% can measure ROI. Position AI Cost Management as the platform built specifically to close that gap.',
  },
  {
    filter: 'AI Cost Mgmt',
    q: 'When your engineers spin up a GPU cluster for model training, who approves the cost — and how?',
    context: 'Governance angle for AI Cost Management.',
    ans: 'The governance gap for AI infrastructure is enormous. Most teams have no policy enforcement for GPU or LLM spend. That is the AI Cost Management conversation.',
  },
]
