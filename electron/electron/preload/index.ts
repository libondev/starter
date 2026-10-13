import { ipcRenderer, contextBridge, type IpcRendererEvent } from 'electron'

// --------- Expose a narrow API to the Renderer process ---------
// Add one method per channel you actually need. Exposing `ipcRenderer` itself would hand the
// renderer every ipcMain channel, so the surface here is the allowlist.
const subscribe = <T>(channel: string, callback: (payload: T) => void) => {
  const listener = (_event: IpcRendererEvent, payload: T) => callback(payload)
  ipcRenderer.on(channel, listener)
  return () => ipcRenderer.off(channel, listener)
}

contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('window:minimize'),
  toggleMaximize: () => ipcRenderer.send('window:toggle-maximize'),
  close: () => ipcRenderer.send('window:close'),
  isMaximized: () => ipcRenderer.invoke('window:is-maximized') as Promise<boolean>,
  onMaximizedChange: (callback: (maximized: boolean) => void) =>
    subscribe('window:maximized', callback),
  onMainProcessMessage: (callback: (message: string) => void) =>
    subscribe('main-process-message', callback),
})

// --------- Preload scripts loading ---------
function domReady(condition: DocumentReadyState[] = ['complete', 'interactive']) {
  if (condition.includes(document.readyState)) {
    return Promise.resolve()
  }
  return new Promise<void>((resolve) => {
    const onReadyStateChange = () => {
      if (condition.includes(document.readyState)) {
        document.removeEventListener('readystatechange', onReadyStateChange)
        resolve()
      }
    }
    document.addEventListener('readystatechange', onReadyStateChange)
  })
}

const safeDOM = {
  append(parent: HTMLElement, child: HTMLElement) {
    if (!parent.contains(child)) {
      return parent.appendChild(child)
    }
  },
  remove(parent: HTMLElement, child: HTMLElement) {
    if (parent.contains(child)) {
      return parent.removeChild(child)
    }
  },
}

function installLoadingOverlay() {
  const duration = 200
  const className = `__app-loading__dots2`
  const styleContent = `
@keyframes dots2 {
  0% { content: '⣾'; }
  12.5% { content: '⣽'; }
  25% { content: '⣻'; }
  37.5% { content: '⢿'; }
  50% { content: '⡿'; }
  62.5% { content: '⣟'; }
  75% { content: '⣯'; }
  87.5% { content: '⣷'; }
  100% { content: '⣾'; }
}
.${className}::before {
  content: '⣾';
  animation: dots2 640ms step-end infinite;
}
.__loading-dots {
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  transition: opacity ${duration}ms ease;
}
    `
  const styles = document.createElement('style')
  const overlay = document.createElement('div')

  styles.id = 'loading_dots'
  styles.innerHTML = styleContent
  overlay.className = '__loading-dots'
  overlay.innerHTML = `<div aria-hidden="true" class="${className}"></div>`

  let removing = false
  let detachTimer: ReturnType<typeof setTimeout> | undefined
  let fallbackTimer: ReturnType<typeof setTimeout> | undefined

  const detach = () => {
    clearTimeout(detachTimer)
    safeDOM.remove(document.head, styles)
    safeDOM.remove(document.body, overlay)
  }

  const removeLoading = () => {
    if (removing) {
      return
    }

    removing = true
    clearTimeout(fallbackTimer)
    window.removeEventListener('message', onLoadingMessage)
    overlay.style.opacity = '0'
    overlay.addEventListener('transitionend', detach, { once: true })
    detachTimer = setTimeout(detach, duration + 50)
  }

  const onLoadingMessage = (event: MessageEvent<{ payload?: string } | null>) => {
    if (event.data?.payload === 'removeLoading') {
      removeLoading()
    }
  }

  void domReady().then(() => {
    if (!removing) {
      safeDOM.append(document.head, styles)
      safeDOM.append(document.body, overlay)
    }
  })

  window.addEventListener('message', onLoadingMessage)
  fallbackTimer = setTimeout(removeLoading, 4999)
}

installLoadingOverlay()
