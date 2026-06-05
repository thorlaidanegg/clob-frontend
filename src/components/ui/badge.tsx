import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'default' | 'accent' | 'muted' | 'danger'

const variants: Record<Variant, string> = {
  default: 'border border-edge bg-panel-2 text-zinc-200',
  accent: 'bg-accent/15 text-accent',
  muted: 'bg-neutral-800 text-muted',
  danger: 'bg-down/15 text-down',
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant
}

/** Badge — small status/label chip. */
export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-[11px] font-medium',
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}
