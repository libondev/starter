import { Outlet } from 'react-router'
import Header from './components/header'

export default function DefaultsLayout() {
  return (
    <div className="defaults-layout h-full">
      <Header />

      <Outlet />
    </div>
  )
}
