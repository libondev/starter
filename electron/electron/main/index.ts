import { app, BrowserWindow, Menu, shell, ipcMain, type WebContents } from 'electron'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '../..')

export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST

// Disable GPU Acceleration for Windows 7
if (process.platform === 'win32' && os.release().startsWith('6.1')) {
  app.disableHardwareAcceleration()
}

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') {
  app.setAppUserModelId(app.getName())
}

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

Menu.setApplicationMenu(null)

let win: BrowserWindow | null = null
const preload = path.join(__dirname, '../preload/index.mjs')
const indexHtml = path.join(RENDERER_DIST, 'index.html')

const webPreferences = {
  preload,
  // The preload is bundled to CJS, and ESM preloads are unsupported in sandboxed renderers
  sandbox: true,
  contextIsolation: true,
  nodeIntegration: false,
}

const isInternalUrl = (url: string) =>
  url.startsWith(VITE_DEV_SERVER_URL ?? pathToFileURL(indexHtml).href)

// One policy for every webContents, including windows created later
app.on('web-contents-created', (_event, contents) => {
  // The app never leaves its own origin; external links go to the system browser
  contents.on('will-navigate', (event, url) => {
    if (isInternalUrl(url)) {
      return
    }
    event.preventDefault()
    if (url.startsWith('https:')) {
      void shell.openExternal(url)
    }
  })

  contents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) {
      void shell.openExternal(url)
    }
    return { action: 'deny' }
  })
})

async function createWindow() {
  const mainWindow = new BrowserWindow({
    title: 'Main window',
    frame: false,
    minWidth: 375,
    minHeight: 667,
    // icon: path.join(process.env.VITE_PUBLIC, 'favicon.ico'),
    webPreferences,
  })
  win = mainWindow

  mainWindow.on('maximize', () => mainWindow.webContents.send('window:maximized', true))
  mainWindow.on('unmaximize', () => mainWindow.webContents.send('window:maximized', false))
  mainWindow.on('closed', () => {
    if (win === mainWindow) {
      win = null
    }
  })

  if (VITE_DEV_SERVER_URL) {
    void mainWindow.loadURL(VITE_DEV_SERVER_URL)
    mainWindow.webContents.openDevTools()
  } else {
    void mainWindow.loadFile(indexHtml)
  }

  // Test actively push message to the Electron-Renderer
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('main-process-message', new Date().toLocaleString())
  })
}

// Window controls for the renderer's own header
const senderWindow = (sender: WebContents) => BrowserWindow.fromWebContents(sender)

ipcMain.on('window:minimize', ({ sender }) => senderWindow(sender)?.minimize())
ipcMain.on('window:toggle-maximize', ({ sender }) => {
  const target = senderWindow(sender)
  if (target?.isMaximized()) {
    target.unmaximize()
  } else {
    target?.maximize()
  }
})
ipcMain.on('window:close', ({ sender }) => senderWindow(sender)?.close())
ipcMain.handle('window:is-maximized', ({ sender }) => senderWindow(sender)?.isMaximized() ?? false)

void app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) {
      win.restore()
    }
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    void createWindow()
  }
})
