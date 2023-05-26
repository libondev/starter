import type { Router } from 'vue-router'

export function useViewTransition (router: Router) {
  if (!document.startViewTransition) { return }

  let finishTransition: undefined | (() => void)
  let abortTransition: undefined | (() => void)

  router.beforeResolve(async () => {
    const promise = new Promise<void>((resolve, reject) => {
      finishTransition = resolve
      abortTransition = reject
    })

    let changeRoute: () => void
    const ready = new Promise<void>(resolve => (changeRoute = resolve))

    const transition = document.startViewTransition!(async () => {
      changeRoute()

      return await promise
    })

    transition.finished.then(() => {
      abortTransition = undefined
      finishTransition = undefined
    })

    return await ready
  })

  router.afterEach(() => {
    finishTransition?.()
    finishTransition = undefined
  })

  router.onError((error) => {
    console.log({ error })
    abortTransition?.()
    abortTransition = undefined
  })
}
