import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { className?: string; children?: ReactNode }

export default function Button({ children, className='', ...rest }: Props) {
  return <button className={`btn ${className}`} {...rest}>{children}</button>
}
