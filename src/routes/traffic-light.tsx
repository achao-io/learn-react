import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/traffic-light')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/traffic-light"!</div>
}
