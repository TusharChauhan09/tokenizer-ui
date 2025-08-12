'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface ArrowProps {
  direction?: 'right' | 'down'
  className?: string
}

export const Arrow: React.FC<ArrowProps> = ({
  direction = 'right',
  className
}) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "text-red-400 transition-transform duration-200",
          direction === 'down' && "rotate-90"
        )}
      >
        <path
          d="M5 12H19M19 12L12 5M19 12L12 19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
