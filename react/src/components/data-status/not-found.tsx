import { Link } from 'react-router'

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-4 text-center">
      <p className="text-lg font-medium">页面不存在或已被移除</p>

      <Link className="underline" to="/">
        返回首页
      </Link>
    </main>
  )
}
