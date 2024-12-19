import { useState, useDeferredValue, useMemo } from 'react';

function SearchList({ items }: { items: string[] }) {
  const [search, setSearch] = useState('');

  // 创建延迟的 search 值
  const deferredSearch = useDeferredValue(search);

  // 基于延迟值进行过滤
  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item.toLowerCase().includes(deferredSearch.toLowerCase())
    );
  }, [deferredSearch, items]);

  return (
    <div>
      <input
        type="text"
        value={ search }
        onChange={ (e) => setSearch(e.target.value) }
        placeholder="搜索..."
      />
      <ul>
        { filteredItems.map((item, index) => (
          <li key={ index }>{ item }</li>
        )) }
      </ul>
    </div>
  );
}

export default function App() {
  const items = ['apple', 'banana', 'cherry', 'date', 'elderberry'];

  return <SearchList items={ items } />;
};
