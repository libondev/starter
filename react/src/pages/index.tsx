import { Button, Layout } from 'antd'
import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { useTodoStore } from '@/stores/use-todo-store'

export default function App() {
  const [count, setCount] = useState(0)

  const { todos, fetchTodos } = useTodoStore()

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  return (
    <>
      <Layout.Content className="flex size-full flex-col items-center justify-center">
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

        <Link to="/about" className="mt-5 underline" viewTransition>
          About Page
        </Link>
      </Layout.Content>
    </>
  )
}
