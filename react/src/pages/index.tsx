import { useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Link } from '@/components/ui/link'
import { useTodoStore } from '@/stores/use-todo-store'

export default function App() {
  const [count, setCount] = useState(0)

  const { todos, fetchTodos } = useTodoStore()

  useEffect(() => {
    void fetchTodos()
  }, [fetchTodos])

  return (
    <>
      <div className="flex size-full flex-col items-center justify-center">
        <div className="mt-5 mb-4 flex items-center">{count}</div>

        <div className="flex items-center justify-center gap-2">
          <Button onClick={() => setCount(count + 1)}>+1</Button>
          <Button onClick={() => setCount(count - 1)}>-1</Button>
        </div>

        <ul className="my-2">
          {todos.map((item) => (
            <li key={item.id}>{item.todo}</li>
          ))}
        </ul>

        <Link href="/about">About Page</Link>
      </div>
    </>
  )
}
