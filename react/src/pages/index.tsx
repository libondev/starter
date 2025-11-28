import { Button, Layout } from 'antd'
import { useState, useEffect } from 'react'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { LogoReactIcon } from '@gdsicon/react'
import { Link } from 'react-router'
import { useTodoStore } from '@/stores/use-todo-store'

function Header() {
  return (
    <header className="font-medium flex items-center justify-between w-full text-2xl py-2 px-2">
      <h1 className="flex items-center text-xl">
        <LogoReactIcon className="mr-2 text-lg" />

        <span>React Counter!</span>
      </h1>

      <ThemeSwitcher />
    </header>
  )
}

export default function App() {
  const [count, setCount] = useState(0)

  const { todos, fetchTodos } = useTodoStore()

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  return (
    <>
      <Header />

      <Layout.Content className="w-full h-full flex flex-col items-center justify-center">
        <div className="flex items-center mt-5 mb-4">{count}</div>

        <div className="flex items-center justify-center gap-2">
          <Button onClick={() => setCount(count + 1)}>+1</Button>
          <Button onClick={() => setCount(count - 1)}>-1</Button>
        </div>

        <ul className="my-2">
          {todos.map((item) => (
            <li key={item.id}>{item.todo}</li>
          ))}
        </ul>

        <Link to="/about" className="mt-5 underline">
          About Page
        </Link>
      </Layout.Content>
    </>
  )
}
