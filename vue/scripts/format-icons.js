/* eslint-disable no-console */
// 这个脚本做的工作为删除 svg 不保留它们也能正常展示的代码, 以减少图标大小, 并删除多余的属性(width/height)

import { cleanupSVG, SVG } from '@iconify/tools'
import glob from 'fast-glob'
import fs from 'node:fs'
import process from 'node:process'

/**
 * 读取参数, 如果没有参数则读取所有 svg 文件
 *  - node scripts/cleanup-icons.js
 *  - node scripts/cleanup-icons.js file-svg
 *  - node scripts/cleanup-icons.js file1 file2 file3 ... fileN
 */
const [, , ...files] = process.argv
let icons = files.map((f) => `src/icons/${f}.svg`)

if (!files.length) {
  icons = glob.sync('src/icons/**/*.svg')
}

let failed = 0

for (const iconPath of icons) {
  const raw = fs.readFileSync(iconPath, 'utf8')

  try {
    const svg = new SVG(raw)
    cleanupSVG(svg)

    const svgString = svg.toMinifiedString().replace(/(\s(width|height)=".*?")?/g, '')

    fs.writeFileSync(iconPath, svgString)
  } catch (err) {
    console.error(`Error parsing SVG file: ${iconPath}`, err)
    failed++
    continue
  }
}

console.log(`  \u001B[32;1m✓\u001B[0m ${icons.length - failed} files processed successfully.
  \u001B[31;1m✗\u001B[0m ${failed} files failed.

  \u001B[32;4mDone.\u001B[0m
 `)
