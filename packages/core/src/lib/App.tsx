import { createEffect } from 'solid-js'
import { DailyGrid } from '../components/dailyGrid.jsx'
import { useCounter } from '../contex-injector/contex.jsx'

export function App() {
  const data = useCounter()
  return (
    <>
      <DailyGrid events={data.events} />
    </>
  )
}
