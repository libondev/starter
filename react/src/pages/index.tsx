import { Button, Layout, Nav } from '@douyinfe/semi-ui-19'
import { useState } from 'react'
import { ThemeSwitcher } from '../components/theme-switcher'

function Header() {
  return (
    <header className="font-medium flex items-center text-2xl">
      <IGdsLogoReact className="mr-2" width="1em" height="1em" />
      React Counter
    </header>
  )
}

function Navbar() {
  return (
    <Nav
      mode="horizontal"
      selectedKeys={[]}
      header={{
        text: 'React Theme Demo',
      }}
      footer={(
        <div className="flex items-center">
          <ThemeSwitcher />
        </div>
      )}
    />
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <Layout className="h-full">
      <Navbar />
      <Layout.Content className="w-full h-full flex flex-col items-center justify-center">
        <Header />

        <div className="flex items-center mt-5 mb-4">{count}</div>

        <div className="flex items-center justify-center gap-2">
          <Button onClick={() => setCount(count + 1)}>+1</Button>
          <Button onClick={() => setCount(count - 1)}>-1</Button>
        </div>

        <Link to="/about" className="mt-5 underline mr-4">
          About Page
        </Link>
        <Link to="/theme-demo" className="mt-5 underline">
          Theme Demo
        </Link>
      </Layout.Content>
    </Layout>
  )
}

export default App
