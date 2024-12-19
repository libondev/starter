import { ModeToggle } from '@/components/layout/mode-toggle'
import { Button } from 'antd'
import { useState } from 'react'

function Header() {
  return (
    <header className="font-medium flex items-center text-2xl">
      <IGdsLogoReact className="mr-2" width="1em" height="1em" />
      React Counter
    </header>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Header />

      <div className="flex items-center mt-5 mb-4">
        { count }
      </div>

      <div className="flex items-center justify-center gap-2">
        <ModeToggle />

        <Button onClick={() => setCount(count + 1)}>+1</Button>
        <Button onClick={() => setCount(count - 1)}>-1</Button>
      </div>

      <Link to="/about" className="mt-5 underline">About Page</Link>
    </div>
  )
}

export default App
