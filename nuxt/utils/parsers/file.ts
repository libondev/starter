/**
 * 下载 blob 文件
 * @param blob 需要下载的文件
 * @param filename 文件名
 */
export function downloadBlobFile(blob: Blob, filename = 'download-file') {
  const url = window.URL.createObjectURL(blob)
  const a = Object.assign(document.createElement('a'), {
    style: { display: 'none' },
    href: url,
    download: filename,
  })

  document.body.appendChild(a)
  a.click()

  window.URL.revokeObjectURL(url)
  document.body.removeChild(a)
}
