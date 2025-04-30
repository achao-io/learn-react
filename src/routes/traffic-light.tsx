import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/traffic-light')({
  component: RouteComponent,
})

const RED = 'red'
const YELLOW = 'yellow'
const GREEN = 'green'

const RED_DELAY = 3000
const YELLOW_DELAY = 1000
const GREEN_DELAY = 3000

function RouteComponent() {
    return <div className="flex gap-4">
        <TrafficLight initialColor={RED} />
        <TrafficLight initialColor={YELLOW} />
        <TrafficLight initialColor={GREEN} />
    </div>
}

function TrafficLight({ initialColor }: { initialColor: string }) {
    const [enabled, setEnabled] = useState(initialColor)

    useEffect(() => {
        if (enabled === RED) {
            setTimeout(() => {
                setEnabled(GREEN)
            }, RED_DELAY)
        }
        else if (enabled === YELLOW) {
            setTimeout(() => {
                setEnabled(RED)
            }, YELLOW_DELAY)
        }
        else if (enabled === GREEN) {
            setTimeout(() => {
                setEnabled(YELLOW)
            }, GREEN_DELAY)
        }
    }, [enabled])

    function isActive(color: string) {
        return enabled === color;
    }

    return (
        <div className="flex flex-col gap-4">
            <div className={`bg-red-500 rounded-full size-24 ${isActive(RED) ? 'opacity-100' : 'opacity-50'}`}></div>
            <div className={`bg-yellow-500 rounded-full size-24 ${isActive(YELLOW) ? 'opacity-100' : 'opacity-50'}`}></div>
            <div className={`bg-green-500 rounded-full size-24 ${isActive(GREEN) ? 'opacity-100' : 'opacity-50'}`}></div>
        </div>
    )
}