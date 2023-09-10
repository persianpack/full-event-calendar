import { createEffect } from 'solid-js'
import { DailyGrid } from '../components/dailyGrid.jsx'
import { useCounter } from '../contex-injector/contex.jsx'
import { EventImpl } from '../api/EventImpl.js'

export function App() {
  const data = useCounter()
  function onEventUpdate(event: SourceEvent) {
    console.log(event)
    data.inctence.updateEvent(event.id, event)
  }

  return (
    <>
      <DailyGrid onEventUpdate={onEventUpdate} events={data.store.events} />
    </>
  )
}
