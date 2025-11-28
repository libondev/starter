import { LoaderCircleIcon } from '@gdsicon/react'

export function PageLoading() {
  return (
    <div className="flex items-center justify-center h-full gap-2">
      <LoaderCircleIcon className="animate-spin" />

      <p>Loading...!!!</p>
    </div>
  )
}
