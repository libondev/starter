import { LoaderCircleIcon } from '@gdsicon/react'

import { cn } from '@/utils/cn'

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <LoaderCircleIcon
      aria-label="Loading"
      className={cn('animate-spin', className)}
      role="status"
      {...props}
    />
  )
}

export { Spinner }
