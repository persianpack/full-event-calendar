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
        next: next,
        id: event.id
      })
    }
  }

  function onAddEvent(event: SourceEvent) {
    if (data.store.autoUpdateEventOnChange) {
      // const prev = data.instance.getEventById(event.id) as EventClass
      data.instance.addEvent(event as any)
      // const next = data.instance.getEventById(event.id) as EventClass
      data.instance.emitEvent('eventAdd', {
        event
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
        class={`full-event-calendar-core calendar-theme-${data.store.theme}`}
        id="full-event-calendar-core"
        style={`height:${data.store.containerHeight}px`}
      >
        <CalendarHeader onDateChange={onDateChange} />
        <SliderWrapper>
          {/* Grid plugin goes here */}
          <Dynamic
            component={data.instance.getcurrentGridCode()}
            onEventUpdate={onEventUpdate}
            onAddEvent={onAddEvent}
            initialDate={new Date(data.store.initialDate)}
            events={unwrappedEvents()}
            locale={data.store.locale}
            calendar={data.store.calendar}
            gridHeight={data.store.gridHeight}
            onDateChange={onDateChange}
            onGridChange={onGridChange}
            listMode={data.store.listMode}
            timeZone={data.store.timeZone}
            groups={data.store.groups}
            editable={data.store.editable}
            slotRenderStore={data.instance.renderStore}
            avalibalSots={data.store.avalibalSots}
            stopAddEvent={data.store.stopAddEvent}
            containerHeight={data.store.containerHeight}
          ></Dynamic>
        </SliderWrapper>
      </div>
    </>
  )
}
