import { LoaderCircleIcon } from '@gdsicon/react'
import { useRef } from 'react'

export default function PageLoading() {
  const renderTimer = useRef(0)

  useEffect(() => {
    let timer = setTimeout(() => {
      renderTimer.current++
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!renderTimer.current) {
    return null
  }

  return (
    <div className="flex h-full items-center justify-center gap-2">
      <LoaderCircleIcon className="animate-spin" />

      <p>Loading...!!!</p>
    </div>
  )
}
