import { resolve } from 'node:path'
import { readFileSync, writeFileSync } from 'node:fs'

function resolvePagesJSON() {
  return readFileSync(resolve(process.cwd(), 'src', 'pages.json'), 'utf-8')
}

const pages = JSON.parse(resolvePagesJSON())

const args = process.argv.slice(2)
