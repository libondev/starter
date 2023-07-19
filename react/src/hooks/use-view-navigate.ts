import { type NavigateOptions, type To, useNavigate } from 'react-router-dom'

interface DocumentPlus extends Document {
  startViewTransition?: (callback: () => Promise<void> | void) => {
    updateCallbackDone: Promise<void>
    finished: Promise<void>
    ready: Promise<void>
  }
}

const viewNavigator = (callback: ReturnType<typeof useNavigate>) => {
  if (typeof (document as DocumentPlus).startViewTransition === 'function') {
    return (to: To, opts?: NavigateOptions) => {
      (document as DocumentPlus).startViewTransition!(() => { callback(to, opts) })
    }
  }

  return callback
}

export default function useViewNavigate() {
  return viewNavigator(useNavigate())
}
