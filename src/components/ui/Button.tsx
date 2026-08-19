/* eslint-disable react-refresh/only-export-components */
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

export type ButtonVariant = 'primary' | 'secondary'

export function buttonStyles(variant: ButtonVariant = 'primary', className = ''): string {
  const base =
    'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-slate-900 text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200',
    secondary:
      'border border-slate-300 text-slate-900 hover:bg-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800',
  }
  return `${base} ${variants[variant]} ${className}`
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

export function Button({ variant = 'primary', className = '', ...rest }: ButtonProps) {
  return <button className={buttonStyles(variant, className)} {...rest} />
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant
}

export function ButtonLink({ variant = 'primary', className = '', ...rest }: ButtonLinkProps) {
  return <a className={buttonStyles(variant, className)} {...rest} />
}
