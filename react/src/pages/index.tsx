import { Link } from 'react-router-dom'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="">
      <h1>1231321</h1>
      <ModeToggle />
      <div className="flex gap-4 m-4">
        <Button>12312</Button>
        <Button variant="destructive">12312</Button>
        <Button variant="ghost">12312</Button>
        <Button variant="link">12312</Button>
        <Button variant="outline">12312</Button>
        <Button variant="secondary">12312</Button>
      </div>

      <img src="https://so1.360tres.com/dr/270_500_/t01e2198cad53ecdf1b.jpg?size=268x201" />

      <Link to="/about" className="text-14px">About</Link>

      <h1 className="text-3xl underline text-rose-400">
        Hello world!
      </h1>
    </div>
  )
}
