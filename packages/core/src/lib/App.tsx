import { useCounter } from '../contex-injector/contex.jsx'
import { CalendarHeader } from './CalendarHeader/CalendarHeader.jsx'
import { GroupGrid } from '@full-event-calendar/group-grid'
import { For, createMemo } from 'solid-js'
import { BasicGrid } from '@full-event-calendar/basid-grid'
import { DailyGrid } from '@full-event-calendar/daily-grid'
import { WeeklyGrid } from '@full-event-calendar/weekly-grid'
// import { DailyHeader } from './DailyHeader/DailyHeader.jsx'
import { FComponent, SourceEvent } from '@full-event-calendar/shared-ts'
import { Dynamic } from 'solid-js/web'
export function App() {
  const data = useCounter()

  function onEventUpdate(event: SourceEvent) {
    data.inctence.updateEvent(event.id, event)

    // console.log('easujdoiai');
  }

  function onDateChange(d: Date) {
    data.inctence.changeInitialDate(d.toISOString())
  }

  return (
    <>
      <div style="margin-top:200px;margin-bottom:200px" id="full-event-calendar-core">
        <CalendarHeader
          headerDate={new Date(data.store.initialDate)}
          timeZone={data.store.timeZone}
          calendar="persian"
          onDateChange={onDateChange}
        />
        <WeeklyGrid
          onEventUpdate={onEventUpdate}
          initialDate={new Date(data.store.initialDate)}
          events={data.store.events}
        />

        {/*          
        <DailyGrid
          onEventUpdate={onEventUpdate}
          initialDate={new Date(data.store.initialDate)}
          events={data.store.events}
        /> */}
      </div>
    </>
  )
}
