import { DailyGrid } from '../components/dailyGrid.jsx'
import { useCounter } from '../contex-injector/contex.jsx'
import { SourceEvent } from '../api/EventImpl.js'
import { CalendarHeader } from './CalendarHeader/CalendarHeader.jsx'
import { createEffect, createMemo } from 'solid-js'
import { DailyHeader } from './DailyHeader/DailyHeader.jsx'
export function App() {
  const data = useCounter()

  function onEventUpdate(event: SourceEvent) {
    data.inctence.updateEvent(event.id, event)
  }

  function onDateChange(d: Date) {
    data.inctence.changeInitialDate(d.toISOString())
  }

  const filteredEvents = createMemo(() =>
    data.inctence.getEventForAdate(data.store.events, new Date(data.store.initialDate))
  )

  function onHeaderDateClick() {
    console.log('dayClick')
  }

  return (
    <>
      <div style="margin-top:200px;margin-bottom:200px">
        <CalendarHeader
          headerDate={new Date(data.store.initialDate)}
          timeZone={data.store.timeZone}
          calendar="persian"
          onDateChange={onDateChange}
        />
        <DailyHeader
          calendar="persian"
          headerDate={new Date(data.store.initialDate)}
          onDateChange={onHeaderDateClick}
        />
        <DailyGrid onEventUpdate={onEventUpdate} events={filteredEvents()} />
      </div>
    </>
  )
}
// maybe we need to change the dailygrid name to smy like single grid
