import type { MaybeRef } from 'vue'

export function useTransitionsEnded(node: MaybeRef<HTMLElement>) {
  return Promise.allSettled(
    unref(node).getAnimations().map(animation => animation.finished),
  )
}
