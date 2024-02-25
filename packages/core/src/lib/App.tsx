import { useGlobalState } from '../context-injector/context.jsx'
import { CalendarHeader } from './CalendarHeader/CalendarHeader.jsx'
import { createMemo } from 'solid-js'
import { EventClass, SourceEvent } from '@full-event-calendar/shared-ts'
import { GridModes } from '../api/CalendarImpl.js'
import { Dynamic } from 'solid-js/web'
import './App.scss'
import { SliderWrapper } from './SliderWrapper/SliderWrapper.jsx'
import { EventImpl } from '@full-event-calendar/utils'
export function App() {
  const data = useGlobalState()

  function onEventUpdate(event: SourceEvent) {
    const prev = data.instance.getEventById(event.id) as EventClass

    const next = new EventImpl(event)
    next.convertDateByTimeZone(data.store.timeZone)
    if (data.store.autoUpdateEventOnChange) {
      data.instance.updateEvent(event.id, event)
    }

    data.instance.emitEvent('eventUpdate', {
      prev: prev,
      next: next,
      id: event.id
    })
  }

  function onAddEvent(event: SourceEvent) {
    if (data.store.autoUpdateEventOnChange && !data.store.stopAddEvent) {
      // const prev = data.instance.getEventById(event.id) as EventClass
      data.instance.addEvent(event as any)
      // const next = data.instance.getEventById(event.id) as EventClass
    }
    // console.log('eventAdd', event)
    data.instance.emitEvent('eventAdd', {
      event
    })
  }

  function onDateChange(d: Date) {
    data.instance.emitEvent('dateUpdate', {
      date: d
    })
    data.instance.changeInitialDate(d.toISOString())
  }
  function onGridChange(grid: GridModes) {
    data.instance.emitEvent('gridUpdate', {
      grid
    })
    data.instance.changeGrid(grid)
  }

  function onEventClick(event: EventClass) {
    data.instance.emitEvent('eventClicked', {
      event
    })
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
        <CalendarHeader onDateChange={onDateChange} changeGrid={onGridChange} />
        <SliderWrapper>
          {/* Grid plugin goes here */}
          <Dynamic
            component={data.instance.getcurrentGridCode()}
            onEventUpdate={onEventUpdate}
            onAddEvent={onAddEvent}
            onEventClick={onEventClick}
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
