import { ModeToggle } from '@/components/layout/mode-toggle'
import { useState } from 'react'

function Header() {
  return (
    <header className="font-medium flex items-center text-lg">
      <ModeToggle className="mr-1.5" />

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
        <button type="button" className="rounded-md bg-zinc-800 hover:bg-zinc-800/80 active:bg-zinc-900 text-white px-4 py-1" onClick={() => setCount(count + 1)}>Increment</button>
        <button type="button" className="rounded-md bg-zinc-800 hover:bg-zinc-800/80 active:bg-zinc-900 text-white px-4 py-1" onClick={() => setCount(count - 1)}>Decrement</button>
      </div>

      <Link to="/about" className="mt-5 underline">About Page</Link>
    </div>
  )
}

export default App
