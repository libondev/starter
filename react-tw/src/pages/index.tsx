import { Link } from 'react-router-dom'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="">
      <h1>1231321</h1>
      <ModeToggle />
      <Button>12312</Button>
      1231312312

      <img src="https://so1.360tres.com/dr/270_500_/t01e2198cad53ecdf1b.jpg?size=268x201" />

      <Link to="/about" className="text-14px">About</Link>

      <h1 className="text-3xl underline text-rose-400">
        Hello world!
      </h1>
    </div>
  )
}
