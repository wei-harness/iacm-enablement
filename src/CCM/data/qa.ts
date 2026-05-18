export interface QaCard {
  q: string; tag: string; tagColor: string; tagBg: string; tagBdr: string; why: string; ans: string
}

export const QA_DATA: Record<string, QaCard[]> = {
  'cost-insights': [
    { q: 'What percentage of your cloud spend can you attribute to a known team or product right now?', tag: 'Visibility', tagColor: 'var(--color-finops)', tagBg: 'var(--sku-ci-bg)', tagBdr: 'var(--sku-ci-bdr)', why: 'The allocation test question. Most customers pause here — that pause is your deal.', ans: 'This is the single most powerful discovery question for Cost Insights. When customers hesitate, you have found the pain.' },
    { q: 'How long does it take to compile a cloud cost report for leadership?', tag: 'Reporting', tagColor: 'var(--state-success)', tagBg: 'var(--success-bg)', tagBdr: 'color-mix(in srgb, var(--state-success) 25%, transparent)', why: 'Manual reporting pain equals automation value.', ans: 'If the answer is days or a week, you have a dashboards and reporting opportunity.' },
    { q: 'When was the last time you had an unexpected bill or cost spike?', tag: 'Anomaly', tagColor: 'var(--color-quality)', tagBg: 'var(--sku-as-bg)', tagBdr: 'var(--sku-as-bdr)', why: 'Creates urgency around anomaly detection.', ans: 'Almost every customer has a horror story. Let them tell it. Then ask: How long did it take to figure out what caused it?' },
    { q: 'How many cloud accounts do you manage, and how do you get a unified view today?', tag: 'Scale', tagColor: 'var(--warning-amber)', tagBg: 'var(--warn-bg)', tagBdr: 'color-mix(in srgb, var(--warning-amber) 25%, transparent)', why: 'Target: 5+ accounts — complexity that justifies CCM.', ans: 'Above 5 accounts, fragmentation becomes unmanageable. The answer is usually manually in Excel. That is the opening.' },
    { q: 'Are engineering teams held accountable for their cloud costs today?', tag: 'Chargeback', tagColor: 'var(--danger)', tagBg: 'var(--danger-bg)', tagBdr: 'color-mix(in srgb, var(--danger) 25%, transparent)', why: 'Opens the chargeback/showback conversation.', ans: 'If no, explore why — usually lack of data. If yes, explore how — usually clunky and manual. Both are opportunities.' },
  ],
  'autostopping': [
    { q: 'What percentage of your AWS spend is non-production?', tag: 'Qualification', tagColor: 'var(--color-quality)', tagBg: 'var(--sku-as-bg)', tagBdr: 'var(--sku-as-bdr)', why: 'Target: 30%+ non-prod — directly sizes the savings opportunity.', ans: 'If 30%+ is non-prod, AutoStopping can save 60-80% of that bucket. Do the math live with the prospect.' },
    { q: 'How many dev, staging, and test environments run 24/7?', tag: 'Waste', tagColor: 'var(--state-success)', tagBg: 'var(--success-bg)', tagBdr: 'color-mix(in srgb, var(--state-success) 25%, transparent)', why: 'Directly sizes the AutoStopping opportunity.', ans: 'A typical dev environment is used about 40 hours per week — idle 128 hours per week (76% of the time).' },
    { q: 'Do developers ever complain about slow environment startup?', tag: 'Friction', tagColor: 'var(--warning-amber)', tagBg: 'var(--warn-bg)', tagBdr: 'color-mix(in srgb, var(--warning-amber) 25%, transparent)', why: 'Surfaces the objection you will need to overcome proactively.', ans: 'Get ahead of this: intelligent wake-up restarts resources automatically when accessed — developers never wait.' },
    { q: 'Who is responsible for shutting down non-prod environments today?', tag: 'Process', tagColor: 'var(--danger)', tagBg: 'var(--danger-bg)', tagBdr: 'color-mix(in srgb, var(--danger) 25%, transparent)', why: 'Manual process equals clear automation opportunity.', ans: 'If the answer is nobody or honor system, you have a waste elimination story.' },
    { q: 'Have you tried scheduling or auto-stop before? What happened?', tag: 'History', tagColor: 'var(--color-finops)', tagBg: 'var(--sku-ci-bg)', tagBdr: 'var(--sku-ci-bdr)', why: 'Addresses past failures that may create skepticism.', ans: 'Many customers tried basic scheduling and had bad experiences. AutoStopping is traffic-aware.' },
  ],
  'commitment-orchestrator': [
    { q: 'What is your current RI or Savings Plan coverage percentage?', tag: 'Coverage', tagColor: 'var(--warning-amber)', tagBg: 'var(--warn-bg)', tagBdr: 'color-mix(in srgb, var(--warning-amber) 25%, transparent)', why: 'Below 60% or above 90% both indicate opportunity.', ans: 'Below 60%: on-demand waste. Above 90%: likely over-committed. Both are Commitment Orchestrator opportunities.' },
    { q: 'Who makes the decision to purchase Reserved Instances today?', tag: 'Process', tagColor: 'var(--state-success)', tagBg: 'var(--success-bg)', tagBdr: 'color-mix(in srgb, var(--state-success) 25%, transparent)', why: 'Identifies the decision maker and process complexity.', ans: 'If a person or team makes this decision, there is automation opportunity.' },
    { q: 'Have you ever had unused RIs expire or go to waste?', tag: 'Waste', tagColor: 'var(--color-quality)', tagBg: 'var(--sku-as-bg)', tagBdr: 'var(--sku-as-bdr)', why: 'Creates immediate and concrete ROI conversation.', ans: 'Almost always answered yes. Ask: Do you know roughly how much that cost you?' },
    { q: 'Are you managing commitments across multiple cloud providers?', tag: 'Multi-cloud', tagColor: 'var(--danger)', tagBg: 'var(--danger-bg)', tagBdr: 'color-mix(in srgb, var(--danger) 25%, transparent)', why: 'Multi-cloud complexity is a strong differentiator.', ans: 'Multi-cloud commitment management from a single platform is a genuine differentiator.' },
  ],
  'cluster-orchestrator': [
    { q: 'What percentage of your workload runs on Kubernetes?', tag: 'Qualification', tagColor: 'var(--danger)', tagBg: 'var(--danger-bg)', tagBdr: 'color-mix(in srgb, var(--danger) 25%, transparent)', why: 'Target: 40%+ containerized to justify the investment.', ans: 'Below 20%: may be premature. 20-40%: start with visibility. Above 40%: Cluster Orchestrator is a priority play.' },
    { q: 'Are you using Karpenter for EKS autoscaling?', tag: 'Technical', tagColor: 'var(--color-finops)', tagBg: 'var(--sku-ci-bg)', tagBdr: 'var(--sku-ci-bdr)', why: 'Yes = easy integration story; No = opportunity to modernize.', ans: 'Existing Karpenter users get an easy on-ramp. Non-Karpenter users get autoscaling modernization and cost optimization in one move.' },
    { q: 'Do you have visibility into cost by namespace or workload today?', tag: 'Visibility', tagColor: 'var(--state-success)', tagBg: 'var(--success-bg)', tagBdr: 'color-mix(in srgb, var(--state-success) 25%, transparent)', why: 'No visibility = sell Cost Insights + Cluster Orchestrator together.', ans: 'You cannot optimize what you cannot see — the combined story is very strong.' },
    { q: 'What is your current spot instance adoption rate on EKS?', tag: 'Savings', tagColor: 'var(--color-quality)', tagBg: 'var(--sku-as-bg)', tagBdr: 'var(--sku-as-bdr)', why: 'Low adoption = large untapped savings.', ans: 'Spot instances are 60-90% cheaper than on-demand. The barrier is reliability risk — Cluster Orchestrator addresses this directly.' },
  ],
}

export const QA_SKU_NAMES: Record<string, string> = {
  'cost-insights': 'Cost Insights',
  'autostopping': 'AutoStopping',
  'commitment-orchestrator': 'Commitment Orchestrator',
  'cluster-orchestrator': 'Cluster Orchestrator',
}
