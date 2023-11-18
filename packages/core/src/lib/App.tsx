import { useCounter } from '../context-injector/context.jsx'
import { CalendarHeader } from './CalendarHeader/CalendarHeader.jsx'
import { Switch, Match, createMemo } from 'solid-js'
import { DailyGrid } from '@full-event-calendar/daily-grid'
import { WeeklyGrid } from '@full-event-calendar/weekly-grid'
import { SourceEvent } from '@full-event-calendar/shared-ts'
import { convertTZ } from '@full-event-calendar/utils'
import { MonthGrid } from '@full-event-calendar/month-grid'
import { GridModes } from '../api/CalendarImpl.js'
export function App() {
  const data = useCounter()

  function onEventUpdate(event: SourceEvent) {
    data.instance.updateEvent(event.id, event)
  }

  function onDateChange(d: Date) {
    data.instance.changeInitialDate(d.toISOString())
  }

  function onGridChange(grid: GridModes) {
    data.instance.changeGrid(grid)
  }

  // We need to unwrapp and cache events for better sorting and performace
  const unwrappedEvents = createMemo(() => [...data.store.events])

  return (
    <>
      <div style="margin-top:200px;margin-bottom:200px" id="full-event-calendar-core">
        <CalendarHeader onDateChange={onDateChange} />

        <Switch>
          <Match when={data.store.grid === 'daily'}>
            <DailyGrid
              onEventUpdate={onEventUpdate}
              initialDate={new Date(data.store.initialDate)}
              events={unwrappedEvents()}
              locale={data.store.locale}
              calendar={data.store.calendar}
              gridHeight={data.store.gridHeight}
            />
          </Match>

          <Match when={data.store.grid === 'weekly'}>
            <WeeklyGrid
              onEventUpdate={onEventUpdate}
              initialDate={new Date(data.store.initialDate)}
              events={unwrappedEvents()}
              locale={data.store.locale}
              calendar={data.store.calendar}
              gridHeight={data.store.gridHeight}
              onDateChange={onDateChange}
              onGridChange={onGridChange}
            />
          </Match>
          <Match when={data.store.grid === 'month'}>
            <MonthGrid
              initialDate={new Date(data.store.initialDate)}
              events={unwrappedEvents()}
              onEventUpdate={onEventUpdate}
              locale={data.store.locale}
              calendar={data.store.calendar}
              onDateChange={onDateChange}
              onGridChange={onGridChange}
            ></MonthGrid>
          </Match>
        </Switch>
      </div>
    </>
  )
}
