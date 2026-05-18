export type RoadmapStatus = 'now' | 'soon' | 'later'

export interface RoadmapItem {
  q: string; name: string; tag: string; status: RoadmapStatus; desc: string
}

export const ROADMAP_DATA: RoadmapItem[] = [
  { q: 'Q1', name: 'Unit Costs', tag: 'Cost Insights', status: 'now', desc: 'Ingest any external cost metrics to track and visualize unit-level cost economics alongside cloud cost data.' },
  { q: 'Q1', name: 'Cost Category RBAC', tag: 'Cost Insights', status: 'now', desc: 'Expand Cost Category-based RBAC beyond dashboards and recommendations to other optimization features.' },
  { q: 'Q1', name: 'SCAD Support', tag: 'Cluster Orchestrator', status: 'now', desc: 'Support for AWS SCAD fields for more accurate granular Kubernetes trued-up costs.' },
  { q: 'Q2', name: 'IaCM Integration', tag: 'Shift Left', status: 'soon', desc: 'Shift left of FinOps with guardrails to prevent cost leaks at infrastructure provisioning time.' },
  { q: 'Q2', name: 'AutoStopping eBPF Discovery', tag: 'AutoStopping', status: 'soon', desc: 'Auto-discovery of K8s cluster services using eBPF technology. Eliminates manual AutoStopping configuration entirely.' },
  { q: 'Q2', name: 'First Class Connectors', tag: 'Cost Insights', status: 'soon', desc: 'Additional first-class connectors to cost data sources including Snowflake, Databricks, and MongoDB.' },
  { q: 'Q3', name: 'AI Cost Management', tag: 'AI / New', status: 'soon', desc: 'Extends FinOps to AI costs and consumption with visibility, attribution, optimization, and governance across LLM APIs and GPU infrastructure.' },
  { q: 'Q3', name: 'Commitment Orch for Azure', tag: 'Commitment Orchestrator', status: 'soon', desc: 'Automated purchasing and management of RI and Savings Plan commitments for Azure.' },
  { q: 'Q3', name: 'Rapid Scale Shadow Pools', tag: 'AutoStopping', status: 'soon', desc: 'Pre-warmed, hibernated EC2 instances outside Kubernetes scheduling until activated for rapid scaling.' },
  { q: 'Q4', name: 'Cost and Financial Planning', tag: 'Cost Insights', status: 'later', desc: 'Granular forecasting, budgeting, and financial planning with dynamic what-if analysis.' },
  { q: 'Q4', name: 'Cluster Orchestrator for AKS', tag: 'Cluster Orchestrator', status: 'later', desc: 'Workload-driven intelligent node autoscaling with distributed spot orchestration for Azure AKS.' },
  { q: 'Q4', name: 'Dashboards 3.0', tag: 'Cost Insights', status: 'later', desc: 'BI Dashboards supported by new internal, central data visualization platform.' },
]
