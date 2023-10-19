import { DailyGrid } from '../components/dailyGrid.jsx'
import { useCounter } from '../contex-injector/contex.jsx'
import { SourceEvent } from '../api/EventImpl.js'

export function App() {
  const data = useCounter()

  function onEventUpdate(event: SourceEvent) {
    data.inctence.updateEvent(event.id, event)
  }

  function getEventForIniTialdate() {
    return data.inctence.getEventForAdate(data.store.events, data.store.initialDate)
  }
  return (
    <>
      <DailyGrid onEventUpdate={onEventUpdate} events={getEventForIniTialdate()} />
    </>
  )
}
