import { useDeferredValue, useMemo, useState } from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router'

const SearchList = ({ items }: { items: string[] }) => {
  const [search, setSearch] = useState('')

  // 创建延迟的 search 值
  const deferredSearch = useDeferredValue(search)

  // 基于延迟值进行过滤
  const filteredItems = useMemo(() => {
    return items.filter((item) => item.toLowerCase().includes(deferredSearch.toLowerCase()))
  }, [deferredSearch, items])

  const isDeferred = search !== deferredSearch

  return (
    <div>
      <input
        type="text"
        value={search}
        className="px-2 py-1 border rounded-md mb-1"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="搜索..."
      />

      <ul className={`px-2${isDeferred ? ' opacity-50' : ''}`}>
        {filteredItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default function App() {
  const items = ['apple', 'banana', 'cherry', 'date', 'elderberry']

  const navigate = useNavigate()

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8 p-8">
      <div className="w-full max-w-md">
        <SearchList items={ items } />
      </div>

      <Button className="mt-5" onClick={ () => navigate('/', { viewTransition: true }) }>
        Back to Home
      </Button>
    </div>
  )
}
