import { useGlobalState } from '../context-injector/context.jsx'
import { CalendarHeader } from './CalendarHeader/CalendarHeader.jsx'
import { createMemo, onMount } from 'solid-js'
import { EventClass, SourceEvent } from '@full-event-calendar/shared-ts'
import { GridModes } from '../api/CalendarImpl.js'
import { Dynamic } from 'solid-js/web'
import './App.scss'
import { SliderWrapper } from './SliderWrapper/SliderWrapper.jsx'
export function App() {
  const data = useGlobalState()

  function onEventUpdate(event: SourceEvent) {
    if (data.store.autoUpdateEventOnChange) {
      const prev = data.instance.getEventById(event.id) as EventClass
      data.instance.updateEvent(event.id, event)
      const next = data.instance.getEventById(event.id) as EventClass
      data.instance.emitEvent('eventUpdate', {
        prev: prev,
        next: next
      })
    }
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
      <div
        class="full-event-calendar-core"
        id="full-event-calendar-core"
      >
        <CalendarHeader onDateChange={onDateChange} />
        <SliderWrapper>
          {/* Grid plugin goes here */}
          <Dynamic
            component={data.instance.getcurrentGridCode()}
            onEventUpdate={onEventUpdate}
            initialDate={new Date(data.store.initialDate)}
            events={unwrappedEvents()}
            locale={data.store.locale}
            calendar={data.store.calendar}
            gridHeight={data.store.gridHeight}
            onDateChange={onDateChange}
            onGridChange={onGridChange}
            listMode={data.store.listMode}
          ></Dynamic>
        </SliderWrapper>
      </div>
    </>
  )
}
