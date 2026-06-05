import type { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

/** Input — shadcn-compatible text field primitive. */
export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'h-10 w-full rounded-md border border-edge bg-bg px-3 text-sm text-zinc-50 outline-none transition-colors placeholder:text-muted/70 focus:border-edge-strong disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}
