import type { PropsWithChildren } from 'react'
import { Button } from './button'
import { useNavigate } from 'react-router'

interface LinkProps {
  href: string
}

export function Link({ href, children }: PropsWithChildren<LinkProps>) {
  const navigate = useNavigate()

  return (
    <Button variant="link" onClick={() => navigate(href, { viewTransition: true })}>
      {children}
    </Button>
  )
}
