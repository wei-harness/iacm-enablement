export type CheckpointStatus = 'red' | 'yellow' | 'green'

export interface Checkpoint {
  date: string; status: CheckpointStatus; label: string; issue: string; fix: string
}

export interface CustomerStat { v: string; l: string }

export interface Customer {
  name: string; industry: string; sku: string; color: string; acv: string
  stats: CustomerStat[]
  checkpoints: Checkpoint[]
  challenge: string
  solution: string[]
  next: string
  summary: string
}

export interface Lesson {
  num: string; title: string; customers: string; problem: string
  changed: string; story: string; tag: string; tagColor: string; tagBg: string; tagBdr: string
}

export interface GwpItem { area: string; name: string; desc: string }

export const CUSTOMERS: Customer[] = [
  {
    name: 'Elevance Health', industry: 'Leading Healthcare Enterprise', sku: 'Commitment Orchestrator',
    color: 'var(--state-success)', acv: 'CCM ACV: $1,630,000 | Total Active ACV: $4,000,000',
    stats: [{ v: '20-30%', l: 'Target Cost Reduction' }, { v: '$12M+', l: 'Annualized RI Savings' }, { v: '$190K', l: 'Savings in First 30 Days' }],
    checkpoints: [
      { date: 'Nov 25', status: 'yellow', label: 'Nov/16', issue: 'On track but trending cautiously. 3-year renewal secured. Minor data issue acknowledged by customer as not Harness-caused.', fix: '3-year renewal secured. Dedicated specialist joined 11/17. Commitment Orchestrator delivering strong savings.' },
      { date: 'Dec 25', status: 'yellow', label: 'Dec/28', issue: 'On track with deliverables. Backfill process still needs tightening.', fix: 'Engineering tightening backfill process. Commitment Orchestrator RI savings continuing to compound.' },
      { date: 'Jan 26', status: 'green', label: 'Jan/2', issue: 'Dashboard regression caused a temporary downtrend.', fix: 'Good roadmap session. $5M savings target defined. Adoption path mapped.' },
      { date: 'Mar 26', status: 'green', label: 'Mar/30', issue: 'Recently trended down due to Dashboard regression.', fix: 'Spoke isolation for Dashboard stability in progress. Commitment Orchestrator savings strong.' },
    ],
    challenge: '$350M+ multi-cloud infrastructure required enterprise-scale cost visibility and optimization.',
    solution: ['Commitment Orchestrator — AWS RI optimization; $190K savings in first 30 days', 'Multi-Cloud Visibility — custom Looker dashboards', 'K8s Cluster Chargeback', 'Custom Tagging and Cost Categories'],
    next: 'AutoStopping, Asset Governance, and Recommendations are still upside levers.',
    summary: 'Elevance is anchored on Commitment Orchestrator delivering $12M+ annualized RI savings. The 3-year renewal is complete.',
  },
  {
    name: 'Coles', industry: 'Australian Retail', sku: 'Cost Insights + Azure',
    color: 'var(--warning-amber)', acv: 'CCM ACV: $274,230',
    stats: [{ v: '90%', l: 'Issue Backlog Reduction' }, { v: '$200k', l: 'Per Month Targeted in Automated Savings' }, { v: '12-Wk', l: 'Custom Adoption Plan Underway' }],
    checkpoints: [
      { date: 'Nov 25', status: 'red', label: 'Nov/16', issue: 'Substantial product issue backlog. Weekly CS meetings split between strategic planning and backlog firefighting.', fix: 'Get-well-plan initiated. Dedicated fortnightly support cadence introduced.' },
      { date: 'Dec 25', status: 'red', label: 'Dec/28', issue: "Azure compatibility gap — CCM not natively speaking the language of the Coles Azure environment.", fix: 'Engineering commitments made to close the Azure gap. Good QBR.' },
      { date: 'Jan 26', status: 'yellow', label: 'Jan/2', issue: 'Feature delivery and dashboard fixes in progress.', fix: 'Custom 12-week Adoption Plan scoped — bespoke governance automation using Harness pipelines, JIRA integration, and Terraform enforcement rules.' },
      { date: 'Mar 26', status: 'yellow', label: 'Mar/30', issue: 'Feature delivery and fixes still in progress.', fix: '90% reduction in issue backlog. Azure gap virtually closed.' },
    ],
    challenge: 'Substantial product issue backlog. Azure compatibility gap. FinOps Last Mile Challenge.',
    solution: ['Dedicated fortnightly support cadence to triage backlog', 'Engineering commitments to close the Azure gap', 'Custom 12-week Adoption Plan using Harness pipelines, JIRA, and Terraform'],
    next: '12-week adoption plan live — targeting $200K in monthly realized savings.',
    summary: 'Coles is a CCM turnaround story. From backlog-heavy and Azure-incompatible to strategic and forward-facing.',
  },
  {
    name: 'New York Life', industry: 'Insurance', sku: 'Cost Insights + AutoStopping + Commitment Orch',
    color: 'var(--color-quality)', acv: 'CCM ACV: $489,230 | Total Active ACV: $1,541,468',
    stats: [{ v: '$450-500k', l: 'Annualized Savings' }, { v: '$500k+', l: 'Projected Savings' }, { v: '$10-11M', l: 'Cost Avoidance' }],
    checkpoints: [
      { date: 'Nov 25', status: 'yellow', label: 'Nov/16', issue: 'Customer org challenges (not R&D related). Working on TF enhancements.', fix: 'Good alignment call on top 3 feature requests. No R&D risk.' },
      { date: 'Dec 25', status: 'green', label: 'Dec/28', issue: 'Customer org challenges continuing. Not R&D related.', fix: 'Top 3 FRs prioritized. Renewed and expanded.' },
      { date: 'Jan 26', status: 'green', label: 'Jan/2', issue: 'Customer org challenges ongoing.', fix: '100% cost allocation achieved via micro-account strategy.' },
      { date: 'Mar 26', status: 'green', label: 'Mar/30', issue: 'No product-related issues. Org challenges are customer-side.', fix: 'AutoStopping driving $500K+ projected savings.' },
    ],
    challenge: 'Migrating ~400 applications to AWS while cloud spend scaled from $4M to $40M. Cloudability lacked automation.',
    solution: ['Cost Visibility (Perspectives) — value-stream-aligned spend view', 'Intelligent AutoStopping — ~$500K projected savings', 'Workflow Integration (JIRA)', '100% Cost Allocation — micro-account strategy'],
    next: 'Architectural cost optimization beyond rightsizing. Unified Bill of IT visibility.',
    summary: 'NYL is a strong green account. AutoStopping just starting to generate savings. $10-11M cost avoidance story is powerful.',
  },
  {
    name: 'TransUnion', industry: 'Financial Data and Analytics', sku: 'Commitment Orch + AutoStopping',
    color: 'var(--danger)', acv: 'CCM ACV: $225,000 | Total Active ACV: $2,931,290',
    stats: [{ v: '5x ROI', l: 'With Commitments' }, { v: '$2M', l: 'Annualized Commitment Savings' }, { v: '6k', l: 'Asset Gov Daily Evals' }],
    checkpoints: [
      { date: 'Nov 25', status: 'yellow', label: 'Nov/16', issue: 'Cloudability cutoff likely moving to December. Migration risk present.', fix: 'Cloudability cutoff confirmed. Full CCM rollout on track.' },
      { date: 'Dec 25', status: 'yellow', label: 'Dec/28', issue: 'Cut off Cloudability access. Migration risk ongoing.', fix: 'Full cutover underway. Commitment Orchestrator savings projected at $800K.' },
      { date: 'Jan 26', status: 'green', label: 'Jan/2', issue: 'Sentiment dipped due to GCP Credits logic issue. Leadership change at TU.', fix: 'Savings from Commitment Orchestrator confirmed. GCP Credits logic addressed.' },
      { date: 'Mar 26', status: 'green', label: 'Mar/30', issue: 'GCP Credits logic and leadership change created minor sentiment dip.', fix: 'Commitment Orchestrator savings strong. AutoStopping initial rules live.' },
    ],
    challenge: 'Transitioning away from Cloudability while needing better cost allocation, governance, and commitment orchestration.',
    solution: ['Commitment Orchestrator — projected $800K savings', 'AutoStopping — initial rules live', 'Asset Governance — proactive automation pipelines', 'Core FinOps setup — Perspectives, Cost Categories, Dashboards, Budgets'],
    next: 'Scale AutoStopping and Asset Governance rules across more teams.',
    summary: 'TransUnion is a migration success story — fully cut off Cloudability. Commitment Orchestrator delivering 5x ROI.',
  },
  {
    name: 'Gartner', industry: 'Research and Advisory', sku: 'Commitment Orchestrator',
    color: 'var(--color-appsec)', acv: 'CCM ACV: $325,000',
    stats: [{ v: '$250k', l: 'RI Savings in 30 Days' }, { v: '91%', l: 'Reservation Coverage' }, { v: '$3.3M', l: '12 Month Savings' }],
    checkpoints: [
      { date: 'Nov 25', status: 'green', label: 'Nov/16', issue: 'Strong account from the start. $3.1M savings realized so far.', fix: 'Commitment Orchestrator delivering strong results.' },
      { date: 'Dec 25', status: 'green', label: 'Dec/28', issue: 'Needs timelines for additional AWS service support.', fix: 'Renewal completed in January with a small expansion.' },
      { date: 'Jan 26', status: 'green', label: 'Jan/2', issue: 'Renewal completed. No blockers.', fix: 'Cluster Orchestrator evaluation now underway.' },
      { date: 'Mar 26', status: 'green', label: 'Mar/30', issue: 'No issues. Steady account.', fix: '400 AWS accounts managed. Strong savings continuing.' },
    ],
    challenge: 'Overprovisioned AWS Reserved Instances creating avoidable spend leakage across 400+ AWS accounts.',
    solution: ['Commitment Orchestrator — automate AWS RI and Savings Plan optimization', 'Cloud Cost Visibility — multi-account budgeting, reporting, anomaly detection', 'Asset Governance — cloud resource policy enforcement'],
    next: 'Cluster Orchestrator evaluation underway across 400 AWS accounts.',
    summary: 'Gartner is a model Commitment Orchestrator success story. 91% reservation coverage, $3.3M in 12 months. Renewed with expansion.',
  },
  {
    name: 'Koch (KBS)', industry: 'Industrial Enterprise', sku: 'AutoStopping + Cost Insights',
    color: 'var(--warning-amber)', acv: 'Koch (KBS)',
    stats: [{ v: '3k+', l: 'VMs Being Onboarded to AutoStopping' }, { v: 'Hub and Spoke', l: 'Isolation Architecture Delivered' }, { v: '90%', l: 'Issue Backlog Progress' }],
    checkpoints: [
      { date: 'Nov 25', status: 'red', label: 'Nov/16', issue: 'Significant dashboard performance challenges. No incidents for 10 days but health still subject to improvements.', fix: 'Working on account isolation using new hub and spoke model.' },
      { date: 'Dec 25', status: 'red', label: 'Dec/28', issue: 'Hub and spoke isolation created but blocked on recommendations feature. Customer considering RFP.', fix: 'Hub and spoke isolation implemented. Onsite scheduled Feb 5.' },
      { date: 'Jan 26', status: 'red', label: 'Jan/2', issue: 'Data quality issues during migration. AutoStopping adoption causing friction. RFP risk still present.', fix: 'Onsite completed. AutoStopping adoption gaining momentum with GP division.' },
      { date: 'Mar 26', status: 'yellow', label: 'Mar/30', issue: 'AutoStopping adoption gaining momentum. OOB dashboards broken for spoke.', fix: 'AutoStopping accelerating — 3K more VMs in pipeline.' },
    ],
    challenge: 'Dashboard performance degradation in a decentralized multi-division environment. Data quality issues during migration.',
    solution: ['Hub and spoke isolation architecture', 'Dedicated engineering focus on dashboard performance', 'Onsite engagement to rebuild trust', 'AutoStopping adoption program now scaling to 3K more VMs'],
    next: 'Continue scaling AutoStopping across divisions. Convert momentum into RFP insurance.',
    summary: 'Koch was one of our hardest accounts. Hub and spoke isolation and dedicated engineering focus stabilized it. AutoStopping adoption is now accelerating.',
  },
  {
    name: 'United Airlines', industry: 'Major Transportation Enterprise', sku: 'AutoStopping',
    color: 'var(--color-quality)', acv: 'United Airlines',
    stats: [{ v: '$8.83M', l: 'Verified Annual Savings' }, { v: '$14M', l: 'Total Savings Identified' }, { v: '60-80%', l: 'Non-Prod Cost Reduction' }],
    checkpoints: [
      { date: 'Nov 25', status: 'red', label: 'Nov/16', issue: 'Actively evaluating other solutions. Central FinOps team struggling to get engineering teams to act.', fix: 'Leadership meeting scheduled at Re:Invent.' },
      { date: 'Dec 25', status: 'red', label: 'Dec/28', issue: '$14M in savings identified but execution blocked.', fix: 'January working sessions scheduled.' },
      { date: 'Jan 26', status: 'red', label: 'Jan/2', issue: 'Adoption challenges continuing.', fix: 'Working sessions underway to drive execution on identified savings.' },
      { date: 'Mar 26', status: 'red', label: 'Mar/30', issue: '$8.83M in verified savings proven but broader adoption blocked by organizational friction.', fix: 'Anomaly and recommendation features prioritized. Exec alignment engagement ongoing.' },
    ],
    challenge: '$16.9M annual waste in non-production compute. Central FinOps team identified savings but could not drive engineering teams to act.',
    solution: ['AutoStopping deployed with intelligent warm-up — $8.83M in verified annual savings', 'Automated start/stop scheduling across all dev/staging environments', 'Zero friction — resources restarted automatically when accessed'],
    next: 'The savings are proven. The blocker is organizational. Exec alignment is the path to unlocking the remaining $5M+.',
    summary: 'United represents an adoption challenge, not a product gap. $8.83M in verified savings are proven.',
  },
]

export const LESSONS_DATA: Lesson[] = [
  {
    num: '01', title: 'Dashboards Were Painfully Slow to Load',
    customers: 'Ancestry.com, Morningstar',
    problem: 'Dashboards took minutes to load — sometimes timing out entirely. Finance and engineering stakeholders couldn\'t access cost data, eroding trust in the platform.',
    changed: 'Delivered major performance improvements to the dashboard rendering layer. Launched OOTB Dashboards to replace manual Excel workflows. Dashboard 2.0 with NLP-powered Conversational Analytics is launching Q1-Q2 FY27.',
    story: 'Customers were spending more time waiting for data than acting on it. We rebuilt the data layer so dashboards load in seconds.',
    tag: 'Platform', tagColor: 'var(--color-appsec)', tagBg: 'color-mix(in srgb, var(--color-appsec) 10%, transparent)', tagBdr: 'color-mix(in srgb, var(--color-appsec) 25%, transparent)',
  },
  {
    num: '02', title: "Cost Figures Didn't Match the Cloud Provider's Bill",
    customers: 'Morningstar, ABSA, Coles',
    problem: "CCM cost figures didn't match what AWS or Azure actually charged. This 'Reporting Truth Gap' was especially acute for Azure Negotiated and Amortized Pricing.",
    changed: 'Fixed schema validation issues, resolved Perspective vs. Dashboard discrepancy, fixed Azure tag inheritance, and corrected discount currency conversion issues.',
    story: 'If your FinOps team can\'t reconcile Harness numbers to their cloud bill, adoption dies. We fixed the billing parity issues across Azure and GCP.',
    tag: 'Data Accuracy', tagColor: 'var(--danger)', tagBg: 'var(--danger-bg)', tagBdr: 'color-mix(in srgb, var(--danger) 25%, transparent)',
  },
  {
    num: '03', title: 'Cost Data Would Disappear or Show as Null',
    customers: 'CBP, Ahead, United Airlines',
    problem: "Customers would open their CCM dashboards to find missing cost data — null values where they expected to see spend figures.",
    changed: 'The V2 cloud spend ingestion pipeline, delivered Q4 FY26, provides a reliable and transactional data layer that eliminates mid-run data loss.',
    story: 'When cost data disappears, the whole FinOps program breaks down. We overhauled the data pipeline to make cost reporting reliable and continuous.',
    tag: 'Data Pipeline', tagColor: 'var(--danger)', tagBg: 'var(--danger-bg)', tagBdr: 'color-mix(in srgb, var(--danger) 25%, transparent)',
  },
  {
    num: '04', title: 'Costs Disconnected from Business Outcomes',
    customers: 'Multiple accounts',
    problem: "Cloud cost data was purely technical and disconnected from business impact. FinOps teams couldn't answer questions like 'What is my cost per transaction?'",
    changed: 'Launched Unit Cost Economics, allowing customers to correlate cloud spend with business metrics like revenue, headcount, transactions, or specific workloads.',
    story: 'A cloud bill full of EC2 and S3 line items means nothing to a CFO. Unit Cost Economics lets FinOps teams answer the questions that actually matter.',
    tag: 'Unit Economics', tagColor: 'var(--state-success)', tagBg: 'var(--success-bg)', tagBdr: 'color-mix(in srgb, var(--state-success) 25%, transparent)',
  },
  {
    num: '05', title: 'Recommendations Were There But Nobody Could Track Implementation or Prove ROI',
    customers: 'Multiple accounts',
    problem: "Customers received rightsizing and commitment recommendations but had no automated way to confirm whether they were actually applied or demonstrate ROI to leadership.",
    changed: 'Launched Auto Inferences in January 2026 — automatically detecting when recommendations have been implemented and tracking actual savings realized within 24-48 hours.',
    story: 'FinOps teams were implementing recommendations but couldn\'t prove it to finance. Auto Inferences closes the ROI loop automatically.',
    tag: 'Recommendations', tagColor: 'var(--state-success)', tagBg: 'var(--success-bg)', tagBdr: 'color-mix(in srgb, var(--state-success) 25%, transparent)',
  },
  {
    num: '06', title: "Budget Alerts Weren't Firing",
    customers: 'United Airlines',
    problem: "Budget alerts were not being sent, making CCM's budget management feature unreliable.",
    changed: 'Delivered critical P1 bug fix CCM-31373 which resolved budget and anomaly alerts crashing in production.',
    story: 'Budget alerts that don\'t fire are worse than no alerts at all — they create false confidence. We fixed the reliability issues.',
    tag: 'Budgets', tagColor: 'var(--warning-amber)', tagBg: 'var(--warn-bg)', tagBdr: 'color-mix(in srgb, var(--warning-amber) 25%, transparent)',
  },
  {
    num: '07', title: 'AutoStopping Rules Were Unreliable and Savings Were Missing',
    customers: 'Koch, Elevance, Marriott',
    problem: 'AutoStopping savings data was missing or showing incorrect figures due to a concurrency problem with ingestion.',
    changed: 'Shipped multiple high-priority fixes: the concurrency issue causing missing savings data was resolved, traffic-based restart failure was fixed, Terraform support delivered.',
    story: "AutoStopping's value proposition is simple — shut down idle resources, save 60-70% on non-production costs. We fixed the reliability issues.",
    tag: 'AutoStopping', tagColor: 'var(--color-quality)', tagBg: 'color-mix(in srgb, var(--color-quality) 10%, transparent)', tagBdr: 'color-mix(in srgb, var(--color-quality) 25%, transparent)',
  },
  {
    num: '08', title: 'High Onboarding Friction for Kubernetes',
    customers: 'Multiple accounts',
    problem: "Manually configuring visibility for complex Kubernetes environments was time-consuming and prone to errors.",
    changed: "Implemented eBPF-based service discovery, which simplifies and automates the discovery and onboarding of Kubernetes clusters.",
    story: "K8s onboarding shouldn't require a week of manual configuration. eBPF-based discovery automates the entire setup.",
    tag: 'Kubernetes', tagColor: 'var(--color-quality)', tagBg: 'color-mix(in srgb, var(--color-quality) 10%, transparent)', tagBdr: 'color-mix(in srgb, var(--color-quality) 25%, transparent)',
  },
  {
    num: '09', title: 'Anomaly Detection and Recommendations Created Too Much Noise',
    customers: 'Morningstar, New York Life, Multiple accounts',
    problem: "Customers received anomaly alerts flagged only by a statistical model — alerts that didn't represent real cost spikes.",
    changed: "Shipped a fix to filter out anomalies flagged only by the statistical model, reducing false positive noise.",
    story: "Alerts that cry wolf get ignored, and recommendations you can't act on erode trust. We tuned both detection models to surface only what's real and actionable.",
    tag: 'Anomaly Detection', tagColor: 'var(--warning-amber)', tagBg: 'var(--warn-bg)', tagBdr: 'color-mix(in srgb, var(--warning-amber) 25%, transparent)',
  },
  {
    num: '10', title: 'Manual Workload Rightsizing and Complex Cost Categorization',
    customers: 'Coles, Multiple accounts',
    problem: "Rightsizing Kubernetes workloads was a reactive, manual process. Customers struggled to make sense of complex hierarchy rules when defining Cost Categories.",
    changed: "Delivered Cluster Orchestrator VPA support for EKS — autoscaling the size of workloads without user intervention.",
    story: "Manual rightsizing and broken cost attribution are both forms of toil. VPA support automates the K8s optimization layer.",
    tag: 'Optimization', tagColor: 'var(--state-success)', tagBg: 'var(--success-bg)', tagBdr: 'color-mix(in srgb, var(--state-success) 25%, transparent)',
  },
]

export const GWP_SHIPPED: GwpItem[] = [
  { area: 'Automation', name: 'Commitment Orchestrator — RDS GA', desc: 'Net new SP purchases now GA. Database SP enhancements shipped.' },
  { area: 'Automation', name: 'Cluster Orchestrator — VPA', desc: 'Vertical Pod Autoscaler support shipped for EKS competitive parity.' },
  { area: 'Automation', name: 'AutoStopping — Terraform Support', desc: 'Complete Terraform support shipped.' },
  { area: 'Visibility', name: 'Anomaly Algorithm Improvements', desc: 'EC2 pass-through recommendations shipped. Anomaly algorithm significantly improved.' },
  { area: 'AI', name: 'AI for FinOps — Commitment Insights', desc: 'AI-powered commitment insights now live.' },
  { area: 'Platform', name: 'Data Pipeline V2 — AWS and GCP', desc: 'Data lag reduced from 29hrs to 3hrs. Cost Categories processing time: 0 hrs (was 3 hrs).' },
]

export const GWP_IN_PROGRESS: GwpItem[] = [
  { area: 'Platform', name: 'Azure Multi-Daily Ingestion', desc: 'V2 re-arch handling AWS and GCP. Azure multi-day ingestion in progress.' },
  { area: 'Visibility', name: 'Unit Costs, CUR 2.0, Data Quality Alerts', desc: 'Unit cost economics in Dashboards, shared costs, CUR 2.0, data rollups — in progress.' },
  { area: 'Automation', name: 'Commitment Orch V2 + Database SP', desc: 'V2 enhancements and expanded Database Savings Plan support in progress.' },
  { area: 'Automation', name: 'Cluster Orchestrator — Logging, Schedules, Savings Report', desc: 'Logging and alerting, schedule support, and savings report in progress.' },
]
