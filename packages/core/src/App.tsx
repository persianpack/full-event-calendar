import { createEffect } from 'solid-js'
import { DailyGrid } from './components/dailyGrid'
import { useCounter } from './contex-injector/contex.js'

export function App() {
  const data = useCounter() as any
  // const data = useCounter()

  return (
    <>
      <DailyGrid events={data[0].todos} />
    </>
  )
}
