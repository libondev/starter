import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="text-3xl m-1 m">
      <h1>1231321</h1>
      <img src="https://so1.360tres.com/dr/270_500_/t01e2198cad53ecdf1b.jpg?size=268x201" />

      <Link to="/about" className="text-14px">About</Link>
    </div>
  )
}