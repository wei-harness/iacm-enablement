export interface Persona {
  id: string; icon: string; name: string; roles: string
  color: string; bg: string; bdr: string
  cares: string[]; metrics: string[]; pains: string[]
  qs: string[]; benefits: string[]
}

export const PERSONAS: Persona[] = [
  {
    id: 'finops', icon: 'bar-chart-2', name: 'FinOps Practitioner',
    roles: 'Cloud Cost Analyst, FinOps Engineer, Cost Optimization Engineer',
    color: 'var(--persona-fo)', bg: 'var(--persona-fo-bg)', bdr: 'var(--persona-fo-bdr)',
    cares: ['Increased cloud cost awareness and value', 'Driving FinOps best practices across the org', 'Informing budget and forecast processes'],
    metrics: ['Forecast accuracy', 'Unit Economics', 'Discount coverage', 'Resource utilization', 'Savings realization'],
    pains: ['Often a team of 1', 'Lack of access to the right data', 'Lots of responsibility, no authority yet', 'Building adoption at scale'],
    qs: ['How centralized is your current FinOps practice today?', 'What does your tagging strategy look like, and how much coverage do you have?', 'How do you currently report savings to leadership?', 'What is your biggest blocker to driving optimization at scale?'],
    benefits: ['Centralization of cloud costs across all accounts', 'Clear accountability across the entire org', 'Increased effectiveness via automation'],
  },
  {
    id: 'finance', icon: 'dollar-sign', name: 'Finance (CFO / FP&A)',
    roles: 'CFO, FP&A, Controller, Accounting',
    color: 'var(--persona-fi)', bg: 'var(--persona-fi-bg)', bdr: 'var(--persona-fi-bdr)',
    cares: ['A balanced budget', 'Full spend allocation — no unallocated buckets', 'Predictable and accurate forecasting'],
    metrics: ['COGS', 'Forecast accuracy', 'Revenue growth', 'Budget variance'],
    pains: ['No context for budget overruns', 'Distributed accountability — no one owns it', 'No predictability in cloud spend', 'Cost spikes with no explanation'],
    qs: ['How accurately can you forecast cloud spend 90 days out?', 'What percentage of your cloud spend is currently unallocated?', 'How long does it take to compile a cloud cost report for leadership?', 'What happened the last time you had a cost spike — how long to identify it?'],
    benefits: ['Identify and eliminate unallocated spend', 'Drive accountability via showback and chargebacks', 'Drive budget and forecast accuracy to within 5%'],
  },
  {
    id: 'techexec', icon: 'trending-up', name: 'Tech Exec / CTO / CIO',
    roles: 'VP Infra/Cloud, CTO, CIO, CEO',
    color: 'var(--persona-te)', bg: 'var(--persona-te-bg)', bdr: 'var(--persona-te-bdr)',
    cares: ['Macro outlook on technology spend', 'Company growth and competitive advantage', 'Product innovation without cost blowout'],
    metrics: ['Revenue Growth', 'Gross Margins', 'COGS', 'Cloud as % of revenue'],
    pains: ['No link between tech initiatives and business objectives', 'Unsure of cloud ROI', 'K8s costs becoming next major budget overrun'],
    qs: ['What is your biggest challenge connecting cloud investment to business outcomes?', 'How much of your cloud spend do you consider waste today?', 'What would a 20% reduction in cloud costs mean for your product roadmap?', 'How are you preparing for AI infrastructure costs?'],
    benefits: ['Clarity and accountability of financial landscape', 'Guidance to make better cloud investment decisions'],
  },
  {
    id: 'cloudengineer', icon: 'terminal', name: 'Cloud Engineer',
    roles: 'DevOps, App Engineering, Infra Engineering, Architects',
    color: 'var(--persona-en)', bg: 'var(--persona-en-bg)', bdr: 'var(--persona-en-bdr)',
    cares: ['Building valuable features aligned to company goals', 'Reducing technical debt', 'Increasing deployment velocity'],
    metrics: ['Deployment velocity', 'Story points delivered', 'Reliability metrics'],
    pains: ['Told to cut costs with no context or guidance', 'Unexpected financial accountability thrust on them', 'Environment startup toil'],
    qs: ['Do your engineers know how much their services cost to run?', 'How do you notify engineers when their code creates a cost spike?', 'What is the process today when a team exceeds their cloud budget?', 'Are engineers blocked by waiting for environments to spin up?'],
    benefits: ['Improved visibility of cloud infrastructure utilization', 'Clearer cost accountability — no more surprises', 'Incentive toward cloud-efficient architecture decisions'],
  },
  {
    id: 'product', icon: 'layout-grid', name: 'Product Manager',
    roles: 'Product Manager, Business Operations, Program Manager',
    color: 'var(--persona-pr)', bg: 'var(--persona-pr-bg)', bdr: 'var(--persona-pr-bdr)',
    cares: ['Product growth and time-to-market', 'Balance of innovation and cost efficiency', 'Connecting product decisions to outcomes'],
    metrics: ['Revenue growth', 'COGS', 'Unit economics'],
    pains: ['Unpredictable cloud spend impacts product budgets', 'Innovation budget overruns', 'Difficulty tying cloud costs to specific initiatives'],
    qs: ['Do you know your cost-per-customer or cost-per-transaction today?', 'How do cloud costs factor into your product pricing model?', 'Has a product launch ever been delayed due to infrastructure cost concerns?'],
    benefits: ['Manage financial risk in product decisions', 'Tie product decisions to business outcomes via unit economics', 'Plan cost of cloud into product price with confidence'],
  },
]
