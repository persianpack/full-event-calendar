import { useCounter } from '../context-injector/context.jsx'
import { CalendarHeader } from './CalendarHeader/CalendarHeader.jsx'
import { Switch, Match, createMemo, createEffect, createRenderEffect, onMount, on } from 'solid-js'
import { DailyGrid, DailyGridPlugin } from '@full-event-calendar/daily-grid'
import { WeeklyGrid } from '@full-event-calendar/weekly-grid'
import { SourceEvent } from '@full-event-calendar/shared-ts'
import { convertTZ } from '@full-event-calendar/utils'
import { MonthGrid } from '@full-event-calendar/month-grid'
import { GridModes } from '../api/CalendarImpl.js'
import { Dynamic } from 'solid-js/web'
import './App.scss'
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
  createEffect(() => {})

  let isGoing = false
  let clonedCalendar = document.getElementById('full-event-calendar-wrapper')?.cloneNode(true) as HTMLElement
  let cachedinitDate = data.store.initialDate
  function startAnimation() {
    isGoing = true
    console.log(cachedinitDate)
    clonedCalendar.classList.add('cloned-calendar')
    clonedCalendar.classList.remove('not-cloned')
    if (new Date(cachedinitDate) > new Date(data.store.initialDate)) {
      document.getElementById('full-event-calendar-wrapper')?.classList.add('grid-animate-backward')
    } else {
      document.getElementById('full-event-calendar-wrapper')?.classList.add('grid-animate-forward')
    }
    cachedinitDate = data.store.initialDate
    document.getElementById('insert-here')?.insertAdjacentElement('beforeend', clonedCalendar)
    setTimeout(() => {
      document.querySelector('.cloned-calendar')?.remove()
      document.getElementById('full-event-calendar-wrapper')?.classList.remove('grid-animate-forward')
      document.getElementById('full-event-calendar-wrapper')?.classList.remove('grid-animate-backward')
      clonedCalendar = document.getElementById('full-event-calendar-wrapper')?.cloneNode(true) as HTMLElement
      isGoing = false
    }, 250)
  }
  onMount(() => {
    clonedCalendar = document.getElementById('full-event-calendar-wrapper')?.cloneNode(true) as HTMLElement
  })
  createEffect(
    on(
      () => data.store.initialDate,
      () => {
        if (!clonedCalendar || isGoing) return
        startAnimation()
      }
    )
  )
  createEffect(
    on(
      () => data.store.grid,
      () => {
        clonedCalendar = document.getElementById('full-event-calendar-wrapper')?.cloneNode(true) as HTMLElement
      }
    )
  )

  return (
    <>
      <div style="margin-top:200px;margin-bottom:200px" class="full-event-calendar-core" id="full-event-calendar-core">
        <CalendarHeader onDateChange={onDateChange} />
        <div style="position:relative" id="insert-here">
          <div class="not-cloned grid-wrapper" id="full-event-calendar-wrapper">
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
            ></Dynamic>
          </div>
        </div>
      </div>
    </>
  )
}
