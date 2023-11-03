import { Show, createMemo, createSignal } from 'solid-js'
import './CalendarHeader.scss'
import { FComponent } from '@full-event-calendar/shared-ts'
import { useCounter } from '../../contex-injector/contex'
import { GridModes } from '../../api/CalendarImpl'

interface CalendarHeader {
  onDateChange: (d: Date) => void
}

export const CalendarHeader: FComponent<CalendarHeader> = (props) => {
  const [showDropDown, SetDropDown] = createSignal(false)
  const data = useCounter()

  const options: any = {
    dateStyle: 'full',
    calendar: data.store.calendar,
    timeZone: data.store.timeZone
  }

  const formater = createMemo(() => {
    // the dates pass throw here are assumed that is not converted by timezone so we convert it here
    return new Intl.DateTimeFormat(data.store.locale, options).format(new Date(data.store.initialDate))
  })

  function changeGrid(grid: GridModes) {
    data.inctence.changeGrid(grid)
  }

  function goBack() {
    const dCopy = new Date(data.store.initialDate)
    const grid = data.store.grid
    if (grid === 'daily') {
      dCopy.setDate(dCopy.getDate() - 1)
    } else if (grid === 'weekly') {
      dCopy.setDate(dCopy.getDate() - 7)
    }
    props.onDateChange(dCopy)
  }
  function goToday() {
    props.onDateChange(new Date())
  }
  function goForward() {
    const dCopy = new Date(data.store.initialDate)
    const grid = data.store.grid
    if (grid === 'daily') {
      dCopy.setDate(dCopy.getDate() + 1)
    } else if (grid === 'weekly') {
      dCopy.setDate(dCopy.getDate() + 7)
    }
    props.onDateChange(dCopy)
  }

  return (
    <div class="calendar-header">
      <div class="go-to-today" onclick={goToday}>
        {' '}
        Today{' '}
      </div>

      <div class="go-some-d" onclick={goBack}>
        go back
      </div>
      <div class="go-some-d" onclick={goForward}>
        go Forward
      </div>
      {formater()}
      <div style="flex:1"></div>

      <div class="go-some-d" onclick={() => SetDropDown(!showDropDown())}>
        day
        <Show when={showDropDown()}>
          <div class="dropdown">
            <div
              onclick={(e) => {
                e.stopPropagation()
                SetDropDown(false)
                changeGrid('daily')
              }}
            >
              day
            </div>
            <div
              onclick={(e) => {
                e.stopPropagation()
                SetDropDown(false)
                changeGrid('weekly')
              }}
            >
              week
            </div>
            <div
              onclick={(e) => {
                e.stopPropagation()
                SetDropDown(false)
                changeGrid('month')
              }}
            >
              Month
            </div>
            {/* <div>week</div>
              <div>week</div>
              <div>week</div> */}
          </div>
        </Show>
      </div>
    </div>
  )
}
