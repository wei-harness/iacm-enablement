import {
  LuChartBar,
  LuShield,
  LuPause,
  LuTarget,
  LuSettings,
  LuDollarSign,
  LuTrendingUp,
  LuTerminal,
  LuLayoutGrid,
  LuCode,
  LuGitBranch,
  LuFlag,
  LuCloud,
} from 'react-icons/lu'

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>> = {
  'bar-chart-2': LuChartBar,
  'shield': LuShield,
  'pause': LuPause,
  'target': LuTarget,
  'settings': LuSettings,
  'dollar-sign': LuDollarSign,
  'trending-up': LuTrendingUp,
  'terminal': LuTerminal,
  'layout-grid': LuLayoutGrid,
  'code-2': LuCode,
  'git-branch': LuGitBranch,
  'flag': LuFlag,
  'cloud': LuCloud,
}

interface CCMIconProps {
  name: string
  size?: number
  strokeWidth?: number
  style?: React.CSSProperties
  className?: string
}

export function CCMIcon({ name, size = 16, strokeWidth = 1.5, style, className }: CCMIconProps) {
  const Comp = ICON_MAP[name]
  if (!Comp) return null
  return (
    <span className={className} style={{ display: 'inline-flex', alignItems: 'center', ...style }}>
      <Comp size={size} strokeWidth={strokeWidth} />
    </span>
  )
}
