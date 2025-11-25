import { Button, Layout } from 'antd'
import { useState } from 'react'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { LogoReactIcon } from '@gdsicon/react'
import { Link } from 'react-router-dom'
import { useTodoStore } from '@/stores/use-todo-store'

function Header() {
  return (
    <header className="font-medium flex items-center text-2xl">
      <LogoReactIcon className="mr-2" width="1em" height="1em" />
      React Counter
    </header>
  )
}

function App() {
  const [count, setCount] = useState(0)

  const { todos, fetchTodos } = useTodoStore()

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  return (
    <>

      <div className="flex items-center justify-between">
        <ThemeSwitcher />
      </div>

      <Layout.Content className="w-full h-full flex flex-col items-center justify-center">
        <Header />

        <div className="flex items-center mt-5 mb-4">{count}</div>

        <div className="flex items-center justify-center gap-2">
          <Button onClick={() => setCount(count + 1)}>+1</Button>
          <Button onClick={() => setCount(count - 1)}>-1</Button>
        </div>

        <ul className="my-2">
          {
            todos.map(item => (
              <li key={ item.id }>{ item.todo }</li>
            ))
          }
        </ul>

        <Link to="/about" className="mt-5 underline">
          About Page
        </Link>
      </Layout.Content>
    </>
  )
}

export default App
