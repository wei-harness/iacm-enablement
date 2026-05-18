export interface CompCard {
  label: string; title: string; comp: string
  color: string; bg: string; bdr: string
  gap: string; oldState: string; fix: string; counter: string
}

export interface CiComp {
  id: string; name: string; short: string; grp: string; url: string | null
}

export interface CiRow {
  cat: 'visibility' | 'optimization' | 'governance' | 'platform'
  grp?: string
  feat: string
  h: string
  [key: string]: string | undefined
}

export const COMP_CARDS: CompCard[] = [
  {
    label: 'IBM Portfolio', title: 'IBM Cloudability / Turbonomic / Kubecost', comp: 'IBM Apptio',
    color: 'var(--danger)', bg: 'color-mix(in srgb, var(--danger) 10%, transparent)', bdr: 'color-mix(in srgb, var(--danger) 25%, transparent)',
    gap: 'Losing to established IBM/Red Hat ecosystem buyers in large enterprises',
    oldState: 'IBM wins when existing enterprise relationships and IBM/Red Hat partnerships are in play.',
    fix: 'Lead with unified platform vs. fragmented tool portfolio. Cloudability tells you what you spent (past tense). Harness prevents waste from happening.',
    counter: 'Cloudability tells you what you spent. Harness prevents waste from happening.',
  },
  {
    label: 'VMware CloudHealth', title: 'VMware Tanzu CloudHealth (Broadcom)', comp: 'CloudHealth',
    color: 'var(--warning-amber)', bg: 'color-mix(in srgb, var(--warning-amber) 10%, transparent)', bdr: 'color-mix(in srgb, var(--warning-amber) 25%, transparent)',
    gap: 'Losing in legacy enterprise procurement where VMware is deeply embedded',
    oldState: 'CloudHealth wins in VMware-heavy environments. The Broadcom acquisition is creating uncertainty and price increases.',
    fix: 'CloudHealth is built for yesterday infrastructure. Harness is built for cloud-native. Position around modern workloads — containers, microservices, multi-cloud.',
    counter: 'CloudHealth is built for yesterday infra. Harness is built for cloud-native.',
  },
  {
    label: 'CAST AI / Spot', title: 'Kubernetes-Native Solutions (CAST AI, Spot.io)', comp: 'CAST AI / Spot',
    color: 'var(--color-quality)', bg: 'color-mix(in srgb, var(--color-quality) 10%, transparent)', bdr: 'color-mix(in srgb, var(--color-quality) 25%, transparent)',
    gap: 'Being positioned as too broad vs Kubernetes specialists in K8s-heavy evaluations',
    oldState: 'CAST AI and Spot win when positioned as Kubernetes specialists. They claim deeper K8s expertise and narrower focus.',
    fix: 'Broader platform capabilities beyond just K8s optimization. Connect K8s cost to business outcomes — cost-per-deployment, cost-per-feature — which K8s specialists cannot do.',
    counter: 'CAST optimizes containers. Harness connects container cost to business outcomes.',
  },
  {
    label: 'Build vs. Buy', title: 'Internal Build Scenarios', comp: 'Custom Solutions',
    color: 'var(--state-success)', bg: 'color-mix(in srgb, var(--state-success) 10%, transparent)', bdr: 'color-mix(in srgb, var(--state-success) 25%, transparent)',
    gap: 'Losing to technical customers who prefer building custom FinOps solutions',
    oldState: 'Technical customers often prefer building custom solutions. They underestimate the ongoing maintenance burden.',
    fix: 'Lead with time-to-value, maintenance overhead, and enterprise support. Building costs 6+ months of engineering time, then someone has to maintain it forever.',
    counter: 'Building costs more than you think — and someone has to maintain it forever.',
  },
  {
    label: 'Azure Commitment Gap', title: 'ProsperOps / CloudBolt for Azure RI', comp: 'ProsperOps',
    color: 'var(--color-appsec)', bg: 'color-mix(in srgb, var(--color-appsec) 10%, transparent)', bdr: 'color-mix(in srgb, var(--color-appsec) 25%, transparent)',
    gap: 'Losing Azure RI management deals because Commitment Orchestrator is AWS-only today',
    oldState: 'ProsperOps has strong autonomous RI management. CloudBolt offers multi-cloud commitment management.',
    fix: 'Azure Commitment Orchestrator is on the Q3 2026 roadmap. Lead with the AWS production-ready story and total platform value.',
    counter: 'AWS ready today. Azure in Q3 2026. One platform for all commitments and all cloud spend.',
  },
]

export const CI_COMPS: CiComp[] = [
  { id: 'apptio', name: 'IBM Apptio Cloudability', short: 'IBM Apptio', grp: 'Enterprise', url: 'https://docs.google.com/document/d/1En1qhHVRdRNfR8jhMSODD8A5iDGanW1AjCd8pZh_faM/edit?tab=t.0' },
  { id: 'cloudhealth', name: 'VMware CloudHealth (Broadcom)', short: 'CloudHealth', grp: 'Enterprise', url: 'https://docs.google.com/document/d/1a7ZLhzzQ1gajwxT9BW3qsiDbkScDhh2g3wNBCkwH70A/edit?tab=t.0' },
  { id: 'flexera', name: 'FlexeraOne', short: 'FlexeraOne', grp: 'Enterprise', url: 'https://docs.google.com/document/d/1GzApGNyX4ibNRsx-pzwkDfctj9C1-M-Eyj3C9jVmXQc/edit?tab=t.0' },
  { id: 'servicenow', name: 'ServiceNow', short: 'ServiceNow', grp: 'Enterprise', url: 'https://docs.google.com/document/d/1fxjBo5yRXTjd6OZ-OuVze7xRP4VRuKfQNfnBt40J_6w/edit?tab=t.0' },
  { id: 'aws', name: 'AWS Cost Management', short: 'AWS Cost Mgmt', grp: 'Cloud Native', url: 'https://docs.google.com/document/d/1R4bQMFi6mlIfSUlvVwfZkz_gEra6UBMU8w1mgiPcqEo/edit?tab=t.0' },
  { id: 'azure', name: 'Azure Cost Management', short: 'Azure Cost', grp: 'Cloud Native', url: 'https://docs.google.com/document/d/1wpFEfx5_m-mlwNbdMr-yze114QPdLVCd1FBHXFrZ0-c/edit?tab=t.0' },
  { id: 'gcp', name: 'Google Cost Management', short: 'GCP Cost', grp: 'Cloud Native', url: 'https://docs.google.com/document/d/1ZtCZ5rS7S9o6StgBi0iVfL--kREX0TSfpNNJ20khCyw/edit?tab=t.0' },
  { id: 'datadog', name: 'Datadog', short: 'Datadog', grp: 'Observability', url: 'https://docs.google.com/document/d/1_bFFnCr6vK4kfCi0p3iWk3tkBz5N9m69qxW2WfsOJNo/edit?tab=t.0' },
  { id: 'cloudzero', name: 'CloudZero', short: 'CloudZero', grp: 'FinOps', url: 'https://docs.google.com/document/d/1XYz8bARB0MrOd3vxmxweyd9rmCmqZRTf3kj8kTPUtxo/edit?tab=t.0' },
  { id: 'vantage', name: 'Vantage', short: 'Vantage', grp: 'FinOps', url: 'https://docs.google.com/document/d/13KUO_38RtbYv7MVPJ6j6xv4MpKyceQ-3u08sg2zqkjE/edit?tab=t.0' },
  { id: 'doit', name: 'DoiT International', short: 'DoiT', grp: 'FinOps', url: 'https://docs.google.com/document/d/1zoLUPwJq-ulhdmRCzD5Gp_L07-s3xiaZZfEgAU6YvvA/edit?tab=t.0' },
  { id: 'anodot', name: 'Anodot', short: 'Anodot', grp: 'FinOps', url: 'https://docs.google.com/document/d/1Zplb9rFGGyGD_DZpSeTZC3rHkXUtsbaGEKATLcPRqME/edit?tab=t.0' },
  { id: 'finout', name: 'Finout', short: 'Finout', grp: 'FinOps', url: 'https://docs.google.com/document/d/1JzEQI2PYixmlQPwpdtICjBxDvI1opwuAekgrDAWABQU/edit?tab=t.0' },
  { id: 'cloudbolt', name: 'CloudBolt', short: 'CloudBolt', grp: 'FinOps', url: 'https://docs.google.com/document/d/1kk1wv8O_LQGqhib1P1P3IbOrLDqp0kg4KuufVIUCuxk/edit?tab=t.0' },
  { id: 'yotascale', name: 'Yotascale', short: 'Yotascale', grp: 'FinOps', url: 'https://docs.google.com/document/d/1FoZ6yUGwMPycie_Gs2F057AJD1rt-hlyjMpfoZeroUY/edit?tab=t.0' },
  { id: 'corestack', name: 'CoreStack', short: 'CoreStack', grp: 'Governance', url: 'https://docs.google.com/document/d/1jxwDk8lkISdt8xZ0rxZ0D_eTGfK2nupOP5GBR-MA-NA/edit?tab=t.0' },
  { id: 'kion', name: 'Kion', short: 'Kion', grp: 'Governance', url: 'https://docs.google.com/document/d/18_hMQqk597dYHaVDU-m7x2bgJxku5sMgGYnyV9Xk-VE/edit?tab=t.0' },
  { id: 'stacklet', name: 'Stacklet', short: 'Stacklet', grp: 'Governance', url: 'https://docs.google.com/document/d/1yk8rKI0UOJXk94rUWMv0bzcuIsVB3A6O_U3dIRt-rAA/edit?tab=t.0' },
  { id: 'cloudfix', name: 'CloudFix', short: 'CloudFix', grp: 'Governance', url: 'https://docs.google.com/document/d/1MqFNextAJH5jejZ-vjA_7gLku9vOHYVTEis0fvS2z14/edit?tab=t.0' },
  { id: 'castai', name: 'Cast.ai', short: 'Cast.ai', grp: 'K8s Specialist', url: 'https://docs.google.com/document/d/1OCzsIpyK44FzKe6BaMFsgc0dPI3XRcUYOpi45aGzB9A/edit?tab=t.0' },
  { id: 'scaleops', name: 'ScaleOps', short: 'ScaleOps', grp: 'K8s Specialist', url: 'https://docs.google.com/document/d/1hIHqP1gXFLfDF-LuRycZqet9LeyxduDNf8iNMIlZCSs/edit?tab=t.0' },
  { id: 'zesty', name: 'Zesty', short: 'Zesty', grp: 'K8s Specialist', url: 'https://docs.google.com/document/d/1a3veF2370B1ZPaPnWcmrJo0q__St2b3K0uxrX4TZ_xk/edit?tab=t.0' },
  { id: 'infracost', name: 'Infracost', short: 'Infracost', grp: 'IaC / Dev FinOps', url: 'https://docs.google.com/document/d/1j74UrYCoQIFzZP6cZ3HXupEyjpoaMzUhHmXEB3833VI/edit?tab=t.0' },
]

export const CI_GROUPS: { label: string; ids: string[] }[] = [
  { label: 'Enterprise FinOps Platforms', ids: ['apptio', 'cloudhealth', 'flexera', 'servicenow'] },
  { label: 'Cloud Provider Native', ids: ['aws', 'azure', 'gcp'] },
  { label: 'Observability', ids: ['datadog'] },
  { label: 'FinOps Specialists', ids: ['cloudzero', 'vantage', 'doit', 'anodot', 'finout', 'cloudbolt', 'yotascale'] },
  { label: 'Governance & Policy', ids: ['corestack', 'kion', 'stacklet', 'cloudfix'] },
  { label: 'Kubernetes Specialists', ids: ['castai', 'scaleops', 'zesty'] },
  { label: 'IaC & Developer FinOps', ids: ['infracost'] },
]

export const CI_ROWS: CiRow[] = [
  { cat: 'visibility', grp: 'Visibility & Allocation', feat: 'Multi-cloud visibility (AWS, Azure, GCP)', h: 'Y|AWS, Azure, GCP + Kubernetes', apptio: 'Y', cloudhealth: 'Y', flexera: 'Y', datadog: 'Y|AWS & Azure only', servicenow: 'Y', aws: 'N|AWS only', azure: 'N|Azure & AWS', gcp: 'N|GCP only', cloudzero: 'Y', castai: 'N|K8s only', vantage: 'Y', doit: 'Y', anodot: 'Y', cloudbolt: 'Y', finout: 'Y', zesty: 'N|AWS only', yotascale: 'Y|AWS, Azure, GCP', corestack: 'Y|AWS, Azure, GCP, OCI', kion: 'Y|AWS, Azure, GCP, OCI', stacklet: 'Y|AWS, Azure, GCP via Cloud Custodian', cloudfix: 'N|AWS only', scaleops: 'Y|K8s on AWS, Azure, GCP', infracost: 'Y|AWS, Azure, GCP via Terraform' },
  { cat: 'visibility', feat: 'Kubernetes cost allocation', h: 'Y|Pod & namespace level', apptio: 'Y', cloudhealth: 'P', flexera: 'Y', datadog: 'Y', servicenow: 'N', aws: 'P', azure: 'N', gcp: 'N', cloudzero: 'Y', castai: 'Y|Core strength', vantage: 'P', doit: 'Y', anodot: 'P', cloudbolt: 'N', finout: 'Y', zesty: 'N', yotascale: 'Y|Container-level tracking', corestack: 'P|Policy-based container governance', kion: 'P|Policy-based, limited optimization', stacklet: 'P|Policy-based via Cloud Custodian', cloudfix: 'N', scaleops: 'Y|Core strength — pod-level', infracost: 'P|IaC-defined resources only' },
  { cat: 'visibility', feat: 'Chargeback / Showback reporting', h: 'Y', apptio: 'Y', cloudhealth: 'Y', flexera: 'Y', datadog: 'Y', servicenow: 'Y', aws: 'N', azure: 'N', gcp: 'N', cloudzero: 'Y', castai: 'P', vantage: 'Y', doit: 'Y', anodot: 'P', cloudbolt: 'Y', finout: 'Y', zesty: 'P', yotascale: 'Y|Core strength', corestack: 'Y', kion: 'Y', stacklet: 'P', cloudfix: 'N', scaleops: 'N', infracost: 'N' },
  { cat: 'visibility', feat: 'FOCUS specification support', h: 'Y', apptio: 'Y|FOCUS export in Cloudability', cloudhealth: 'N|No public FOCUS support found', flexera: 'P|Working toward FOCUS adoption', datadog: 'P|Listed as FOCUS SaaS provider', servicenow: 'P|FinOps/ITFM integration noted', aws: 'Y|FOCUS data export GA', azure: 'Y|Full FOCUS 1.x export support', gcp: 'Y|FOCUS BigQuery view + template', cloudzero: 'P|Ingests FOCUS; no export noted', castai: 'N|No public FOCUS support found', vantage: 'P|Terraform provider; FOCUS ingestion', doit: 'Y|FOCUS support listed on FinOps.org', anodot: 'N|No public FOCUS support found', cloudbolt: 'N|No public FOCUS support found', finout: 'P|MegaBill ingestion; FOCUS adoption unclear', zesty: 'N|No public FOCUS support found', yotascale: 'P|Analytics-focused; FOCUS adoption evolving', corestack: 'Y|FOCUS-compliant dashboards and reporting', kion: 'P|Daily granularity; FOCUS alignment in progress', stacklet: 'P|Policy reporting; FOCUS adoption unclear', cloudfix: 'N|No public FOCUS support found', scaleops: 'N|K8s-only scope; no FOCUS support', infracost: 'N|Pre-deployment estimation; no FOCUS output' },
  { cat: 'optimization', grp: 'Optimization & Automation', feat: 'AI-powered recommendations', h: 'Y|Conversational AI + auto-action', apptio: 'P|Rule-based', cloudhealth: 'P|Rule-based', flexera: 'Y', datadog: 'P', servicenow: 'P', aws: 'P|Basic', azure: 'P|Basic', gcp: 'P|Basic', cloudzero: 'P', castai: 'P', vantage: 'P', doit: 'Y', anodot: 'P', cloudbolt: 'P', finout: 'P', zesty: 'P', yotascale: 'P|ML-driven insights; no autonomous action', corestack: 'Y|Agentic AI (Dec 2025); governance-focused', kion: 'P|Rule-based; limited AI', stacklet: 'P|Rule-based Cloud Custodian policies', cloudfix: 'P|Rule-based AWS optimization', scaleops: 'Y|Real-time K8s application-context-aware AI', infracost: 'N|Static cost estimation only' },
  { cat: 'optimization', feat: 'Automated idle resource stopping', h: 'Y|VMs and Kubernetes', apptio: 'N', cloudhealth: 'N', flexera: 'Y', datadog: 'N', servicenow: 'N', aws: 'N', azure: 'N', gcp: 'N', cloudzero: 'P', castai: 'Y', vantage: 'P', doit: 'Y', anodot: 'N', cloudbolt: 'P', finout: 'P', zesty: 'Y', yotascale: 'P|Guided recommendations; manual action required', corestack: 'P|Policy-driven idle detection', kion: 'P|Policy-driven; manual intervention required', stacklet: 'P|Policy-driven resource cleanup', cloudfix: 'Y|Automated waste elimination (EC2, EBS)', scaleops: 'Y|K8s resource rightsizing automated', infracost: 'N|Pre-deployment only' },
  { cat: 'optimization', feat: 'RI / SP automated contract execution', h: 'Y|Full automated lifecycle', apptio: 'N', cloudhealth: 'N', flexera: 'Y', datadog: 'N', servicenow: 'N', aws: 'N|Recommendations only', azure: 'N', gcp: 'N', cloudzero: 'N', castai: 'N', vantage: 'N', doit: 'N', anodot: 'N', cloudbolt: 'N', finout: 'P', zesty: 'Y', yotascale: 'P|Tracking and recommendations; manual purchase', corestack: 'P|Governance-focused; manual oversight', kion: 'P|Financial governance; manual decisions', stacklet: 'P|Policy tracking only', cloudfix: 'P|Basic RI recommendations', scaleops: 'N|Not applicable (K8s focus)', infracost: 'P|RI cost modeling in plans only' },
  { cat: 'optimization', feat: 'Spot instance orchestration', h: 'Y|Cluster Orchestrator', apptio: 'N', cloudhealth: 'N', flexera: 'Y', datadog: 'N', servicenow: 'N', aws: 'P|Manual', azure: 'P|Manual', gcp: 'P|Manual', cloudzero: 'N', castai: 'Y|Core focus', vantage: 'N', doit: 'Y', anodot: 'N', cloudbolt: 'N', finout: 'N', zesty: 'Y', yotascale: 'P|Visibility and recommendations only', corestack: 'P|Policy-based governance', kion: 'P|Policy-based recommendations', stacklet: 'P|Basic policy management', cloudfix: 'N|No spot management', scaleops: 'Y|K8s-specific spot optimization', infracost: 'P|Cost modeling in plans only' },
  { cat: 'optimization', feat: 'Kubernetes node-pool right-sizing', h: 'Y', apptio: 'Y', cloudhealth: 'P', flexera: 'Y', datadog: 'P', servicenow: 'N', aws: 'N', azure: 'N', gcp: 'N', cloudzero: 'P', castai: 'Y', vantage: 'P', doit: 'Y', anodot: 'P', cloudbolt: 'N', finout: 'Y', zesty: 'N', yotascale: 'P|Recommendations; lacks automated optimization', corestack: 'P|Policy-based container governance', kion: 'P|Limited optimization capabilities', stacklet: 'P|Cloud Custodian rules', cloudfix: 'N', scaleops: 'Y|Core strength — real-time pod-level', infracost: 'N|IaC estimates only' },
  { cat: 'governance', grp: 'Governance & Compliance', feat: 'Governance-as-Code (YAML / OPA)', h: 'Y|AI-generated policies', apptio: 'Y', cloudhealth: 'Y', flexera: 'Y', datadog: 'P', servicenow: 'Y', aws: 'P', azure: 'P', gcp: 'P', cloudzero: 'P', castai: 'P', vantage: 'P', doit: 'P', anodot: 'P', cloudbolt: 'Y', finout: 'P', zesty: 'P', yotascale: 'P|Policy-driven governance; manual workflows', corestack: 'Y|Comprehensive governance automation', kion: 'Y|Policy-based governance framework', stacklet: 'Y|Cloud Custodian Governance-as-Code', cloudfix: 'N|Basic policy alerts only', scaleops: 'P|K8s-specific policy automation', infracost: 'Y|Policy-as-Code for cost thresholds' },
  { cat: 'governance', feat: 'Auto-remediation', h: 'Y|Policy-triggered enforcement', apptio: 'Y', cloudhealth: 'Y', flexera: 'Y', datadog: 'P', servicenow: 'Y', aws: 'P', azure: 'P', gcp: 'P', cloudzero: 'P', castai: 'Y', vantage: 'P', doit: 'P', anodot: 'P', cloudbolt: 'Y', finout: 'P', zesty: 'P', yotascale: 'P|Guided recommendations; manual action', corestack: 'Y|Agentic AI-powered automated assessment', kion: 'P|Policy enforcement; manual workflows required', stacklet: 'Y|Cloud Custodian rule-based remediation', cloudfix: 'Y|Automated AWS resource fixes', scaleops: 'Y|Real-time K8s resource adjustments', infracost: 'P|Approval gates; no runtime remediation' },
  { cat: 'governance', feat: 'AI-assisted policy creation', h: 'Y', apptio: 'P', cloudhealth: 'P', flexera: 'Y', datadog: 'N', servicenow: 'P', aws: 'N', azure: 'N', gcp: 'P', cloudzero: 'N', castai: 'Y', vantage: 'P', doit: 'P', anodot: 'Y', cloudbolt: 'P', finout: 'P', zesty: 'P', yotascale: 'N|No AI policy creation', corestack: 'Y|Agentic AI governance assessments (Dec 2025)', kion: 'N|Rule-based only', stacklet: 'N|Cloud Custodian rule authoring', cloudfix: 'N', scaleops: 'P|K8s-specific policy suggestions', infracost: 'P|Policy-as-Code templates' },
  { cat: 'governance', feat: 'Anomaly detection', h: 'Y|ML-based + AI root cause', apptio: 'Y', cloudhealth: 'Y', flexera: 'P', datadog: 'Y', servicenow: 'P', aws: 'Y', azure: 'Y', gcp: 'P', cloudzero: 'Y', castai: 'P', vantage: 'Y', doit: 'Y', anodot: 'N', cloudbolt: 'P', finout: 'Y', zesty: 'P', yotascale: 'Y|ML-driven anomaly detection', corestack: 'Y|FOCUS-compliant anomaly reporting', kion: 'P|Basic threshold alerting', stacklet: 'P|Policy-based threshold detection', cloudfix: 'N', scaleops: 'P|K8s resource anomaly detection', infracost: 'P|Cost threshold alerts in CI/CD' },
  { cat: 'platform', grp: 'Platform Integration', feat: 'IaC cost estimation at plan time', h: 'Y|IaCM + CCM integration', apptio: 'N', cloudhealth: 'N', flexera: 'N', datadog: 'N', servicenow: 'N', aws: 'N', azure: 'N', gcp: 'N', cloudzero: 'N', castai: 'N', vantage: 'N', doit: 'N', anodot: 'N', cloudbolt: 'N', finout: 'N', zesty: 'N', yotascale: 'N', corestack: 'N', kion: 'N', stacklet: 'N', cloudfix: 'N', scaleops: 'N', infracost: 'Y|Core strength — Terraform + CloudFormation' },
  { cat: 'platform', feat: 'Native CI/CD pipeline integration', h: 'Y|Built into Harness platform', apptio: 'N', cloudhealth: 'N', flexera: 'N', datadog: 'N', servicenow: 'N', aws: 'N', azure: 'N', gcp: 'N', cloudzero: 'N', castai: 'N', vantage: 'N', doit: 'N', anodot: 'N', cloudbolt: 'N', finout: 'N', zesty: 'N', yotascale: 'N', corestack: 'N', kion: 'N', stacklet: 'N', cloudfix: 'N', scaleops: 'N', infracost: 'Y|Pull request cost estimates in CI/CD' },
  { cat: 'platform', feat: 'Conversational AI assistant', h: 'Y', apptio: 'N', cloudhealth: 'N', flexera: 'N', datadog: 'N', servicenow: 'N', aws: 'N', azure: 'N', gcp: 'N', cloudzero: 'N', castai: 'N', vantage: 'N', doit: 'N', anodot: 'N', cloudbolt: 'N', finout: 'N', zesty: 'N', yotascale: 'N', corestack: 'N', kion: 'N', stacklet: 'N', cloudfix: 'N', scaleops: 'N', infracost: 'N' },
  { cat: 'platform', feat: 'FinOps Foundation Certified', h: 'Y', apptio: 'Y', cloudhealth: 'Y', flexera: 'Y', datadog: 'N', servicenow: 'Y', aws: 'N', azure: 'N', gcp: 'N', cloudzero: 'Y', castai: 'N', vantage: 'N', doit: 'Y', anodot: 'N', cloudbolt: 'N', finout: 'N', zesty: 'N', yotascale: 'N', corestack: 'N', kion: 'N', stacklet: 'N', cloudfix: 'N', scaleops: 'N', infracost: 'N' },
]
