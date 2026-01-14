import type { PropsWithChildren } from 'react'

import { useNavigate } from 'react-router'

import { Button } from './button'

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
