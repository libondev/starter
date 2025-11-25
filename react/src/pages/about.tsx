import { useDeferredValue, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const SearchList = memo(({ items }: { items: string[] }) => {
  const [search, setSearch] = useState('')

  // 创建延迟的 search 值
  const deferredSearch = useDeferredValue(search)

  // 基于延迟值进行过滤
  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item.toLowerCase().includes(deferredSearch.toLowerCase()),
    )
  }, [deferredSearch, items])

  const isDeferred = search !== deferredSearch

  return (
    <div>
      <input
        type="text"
        value={search}
        className="px-2 py-1 border rounded-md mb-1"
        onChange={e => setSearch(e.target.value)}
        placeholder="搜索..."
      />

      <ul className={`px-2${isDeferred ? ' opacity-50' : ''}`}>
        {
          filteredItems.map(item => (
            <li key={item}>{ item }</li>
          ))
        }
      </ul>
    </div>
  )
})

export default function App() {
  const items = ['apple', 'banana', 'cherry', 'date', 'elderberry']

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <SearchList items={items} />

      <Link to="/" className="mt-5 underline">Back to Home</Link>
    </div>
  )
}
