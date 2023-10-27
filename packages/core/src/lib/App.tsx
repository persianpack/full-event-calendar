import { useCounter } from '../contex-injector/contex.jsx'
import { CalendarHeader } from './CalendarHeader/CalendarHeader.jsx'
import { Switch, Match } from 'solid-js'
import { DailyGrid } from '@full-event-calendar/daily-grid'
import { WeeklyGrid } from '@full-event-calendar/weekly-grid'
// import { DailyHeader } from './DailyHeader/DailyHeader.jsx'
import { SourceEvent } from '@full-event-calendar/shared-ts'
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
        <CalendarHeader onDateChange={onDateChange} />

        <Switch>
          <Match when={data.store.grid === 'daily'}>
            <DailyGrid
              onEventUpdate={onEventUpdate}
              initialDate={new Date(data.store.initialDate)}
              events={data.store.events}
              locale={data.store.locale}
              calendar={data.store.calendar}
              timeZone={data.store.timeZone}
            />
          </Match>
          <Match when={data.store.grid === 'weekly'}>
            <WeeklyGrid
              onEventUpdate={onEventUpdate}
              initialDate={new Date(data.store.initialDate)}
              events={data.store.events}
              locale={data.store.locale}
              calendar={data.store.calendar}
              timeZone={data.store.timeZone}
            />
          </Match>
        </Switch>
      </div>
    </>
  )
}
