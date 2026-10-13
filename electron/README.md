# electron-vite-vue

🥳 Really simple `Electron` + `Vue` + `Vite` template, tooled with [Vite+](https://viteplus.dev) and locked down by default.

Originally based on [electron-vite/electron-vite-vue](https://github.com/electron-vite/electron-vite-vue) (MIT) — see the LICENSE file for attribution.

## Features

📦 Out of the box — one `vp` command surface for dev, check, build and staged files
🛠 [Vite+](https://viteplus.dev) toolchain: Vite, Rolldown, Vitest, Oxlint, Oxfmt and a lint-staged replacement, configured from a single `vite.config.ts`
🎯 Based on the official [template-vue-ts](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-vue-ts), less invasive
🌱 Extensible, really simple directory structure
🔒 Secure defaults: sandboxed renderer, allowlisted preload API, CSP and a navigation policy (see [Security Note](#security-note))
🖥 Frameless window with a self-implemented header (window controls over IPC)
🔩 Support C/C++ native addons

## Quick Setup

Requires Node `^22.18.0 || ^24.11.0 || >=26.0.0` (what Vite+ supports) and pnpm.

```sh
# clone the project
git clone <your-repo-url> your-app
cd your-app

# install dependencies
pnpm install

# develop
pnpm dev          # = vp dev
```

Other commands:

| command | what it does |
| --- | --- |
| `pnpm dev` | dev server + Electron (`vp dev`) |
| `pnpm run build` | `vue-tsc --noEmit` + `vp build` + `electron-builder` |
| `pnpm exec vp check` | format + lint + typecheck (add `--fix` to write, add `--no-fmt` / `--no-lint` to skip a step) |
| `pnpm exec vp fmt` / `pnpm exec vp lint` | just formatting / just linting |
| `pnpm exec vp staged` | what the pre-commit hook runs |

## Debug

![electron-vite-react-debug.gif](https://github.com/electron-vite/electron-vite-react/blob/main/electron-vite-react-debug.gif?raw=true)

`.vscode/launch.json` is wired for `vp dev`:

- **Debug Main Process** launches `node_modules/.bin/vp dev` with `REMOTE_DEBUGGING_PORT=9222`. `vite-plugin-electron` turns that env var into Electron's `--remote-debugging-port`, which is why the renderer can be attached.
- **Debug Renderer Process** attaches to port `9222` with `webRoot` set to `${workspaceFolder}/src`.
- **Debug All** runs both, in that order.

## Directory

```diff
+ ├─┬ electron
+ │ ├─┬ main
+ │ │ └── index.ts    entry of Electron-Main
+ │ └─┬ preload
+ │   └── index.ts    entry of Preload-Scripts
  ├─┬ src
+ │ ├─┬ components
+ │ │ └── AppHeader.vue   self-implemented header + window controls
+ │ ├─┬ pages
+ │ │ └── index.vue   file based routes (vue-router auto-routes)
+ │ ├─┬ router
+ │ │ └── index.ts    router instance (hash history) + pxd view transitions
  │ └── main.ts       entry of Electron-Renderer
  ├── index.html
  ├── package.json
+ ├── pnpm-workspace.yaml   catalog + overrides (vite is aliased to vite-plus-core)
+ ├── .vite-hooks/pre-commit   runs `vp staged`
  └── vite.config.ts
```

## App Icon

No icon is configured yet, so dev windows and installers use the default Electron icon. Three separate places to cover:

### 1. Dev window / taskbar (Windows, Linux)

`electron/main/index.ts` keeps the line commented out:

```ts
// icon: path.join(process.env.VITE_PUBLIC, 'favicon.ico'),
```

Put `favicon.ico` in `public/` and uncomment the line. `VITE_PUBLIC` points at `public/` in dev and at `dist/` when packaged, and Vite copies `public/*` into `dist/`, so a single file covers both. macOS ignores this option — its Dock icon comes from the `.app` bundle (see below).

### 2. Installer and packaged app (electron-builder)

`electron-builder.json` sets no `icon`, and `directories` only overrides `output`, so `buildResources` is still the default `build/`. Drop the source there and electron-builder converts it per platform — no manual `.ico` / `.icns` export needed:

```
build/icon.png    # 1024x1024 PNG (build/icon.svg is auto-converted as well)
```

Explicit paths work too: `"win": { "icon": "build/icon.png" }`, likewise for `mac` and `linux`. Minimum 512x512 for macOS, 256x256 for Windows and Linux; 1024x1024 (or SVG) is recommended.

For the NSIS installer (assisted wizard here, `oneClick: false`) individual assets can be overridden:

```jsonc
"nsis": {
  "installerIcon": "build/installerIcon.ico",
  "uninstallerIcon": "build/uninstallerIcon.ico",
  "installerHeaderIcon": "build/installerHeaderIcon.ico",
  "installerHeader": "build/installerHeader.bmp", // 150x57, 24-bit BMP, no alpha
  "installerSidebar": "build/installerSidebar.bmp" // 164x314
}
```

Without these the installer reuses the app icon.

### 3. UI logo (optional)

`src/components/AppHeader.vue` has no logo at the moment. To add one: put the file in `public/`, insert `<img class="app-header__logo" src="/logo.svg" alt="" />` in the `<header>`, and restore the favicon link in `index.html` (`<link rel="icon" type="image/svg+xml" href="/logo.svg" />`).

### Verify

- `pnpm dev` — window and taskbar icon
- `pnpm run build` — inspect `release/<version>/`: the `.exe` and `*-Setup.exe` icons. Windows caches Explorer icons, so check the file properties if it looks stale.

Also worth doing while you are here: `appId` and `productName` in `electron-builder.json` are still `YourAppID` / `YourAppName`, and both show up in the installer and the app name.

## Security Note

The renderer is deliberately locked down: `webPreferences` in `electron/main/index.ts` is shared by every window and sets `sandbox: true`, `contextIsolation: true`, `nodeIntegration: false`. Page scripts therefore have no `require`, no Node APIs and no filesystem access.

- **The preload exposes an allowlist, not `ipcRenderer`.** `electron/preload/index.ts` publishes a single `window.electronAPI` object; the renderer can only call the methods listed there.
- **To add a channel:** register the handler in the main process (`ipcMain.handle('my:channel', ...)`), add one method in the preload (`myAction: () => ipcRenderer.invoke('my:channel')`), and declare it on `Window` in `src/vite-env.d.ts` so the renderer is typed. Never expose `ipcRenderer`, its `send` / `invoke` passthroughs, or a channel name that comes from the renderer as-is.
- **CSP** is the meta tag in `index.html`: `script-src 'self'`, `object-src 'none'`, `base-uri 'none'`, `form-action 'none'`. `style-src` keeps `'unsafe-inline'` on purpose, because Vite injects SFC styles that way in dev and the preload draws the loading spinner inline; `connect-src` allows `ws:` for the HMR socket.
- **Navigation** is pinned to the app's own URL: the `app.on('web-contents-created')` handler blocks `will-navigate` to anything else (https links are handed to the system browser) and denies every `window.open`.
- **Node in the renderer is off.** If you really need it, enable `nodeIntegration`, set `sandbox: false` in the shared `webPreferences`, and add `"node"` to `types` in `tsconfig.json` — and review the trade-off. Prefer a whitelisted IPC method instead.

Earlier versions of this template also shipped a `renderer: {}` preset in `vite.config.ts` (a Vite adapter polyfilling Electron and Node for the renderer) and an example second window with `nodeIntegration: true`; both were removed together with the lockdown.

## Before you publish

Placeholders still waiting for your values:

- `package.json` — `name`, `description`, `author`, `repository`, `homepage`, and optionally `packageManager` + `engines`
- `electron-builder.json` — `appId` (`YourAppID`) and `productName` (`YourAppName`)
- `index.html` — the `<title>`, and the `title` prop passed to `<AppHeader>` in `src/App.vue`
- `LICENSE` — the `Your Name` line (keep the upstream MIT notice above it)
- `README.md` — this title, and the "Originally based on" line if you fork it elsewhere
- App icon — see [App Icon](#app-icon)

```sh
grep -rn "YourAppName\|YourAppID\|Your Name" --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=dist-electron --exclude-dir=release .
```

## FAQ

- [C/C++ addons, Node.js modules - Pre-Bundling](https://github.com/electron-vite/vite-plugin-electron-renderer#dependency-pre-bundling)
- [dependencies vs devDependencies](https://github.com/electron-vite/vite-plugin-electron-renderer#dependencies-vs-devdependencies)
