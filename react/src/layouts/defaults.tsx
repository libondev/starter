import { Outlet } from 'react-router'

export default function DefaultsLayout() {
  return (
    <div className="defaults-layout h-full">
      <Outlet />
    </div>
  )
}
