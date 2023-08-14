import { createEffect } from 'solid-js'
import { DailyGrid } from './components/dailyGrid'
import { useCounter } from './contex-injector/contex.js'

export function App() {
  const data = useCounter()
  // const data = useCounter()
  return (
    <>
      <DailyGrid events={data.events} />
    </>
  )
}
