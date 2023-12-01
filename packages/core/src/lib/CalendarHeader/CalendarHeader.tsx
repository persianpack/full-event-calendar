import { For, Show, createMemo, createSignal } from 'solid-js'
import './CalendarHeader.scss'
import { FComponent } from '@full-event-calendar/shared-ts'
import { useGlobalState } from '../../context-injector/context'
import { GridModes } from '../../api/CalendarImpl'

interface CalendarHeader {
  onDateChange: (d: Date) => void
}

export const CalendarHeader: FComponent<CalendarHeader> = (props) => {
  const [showDropDown, SetDropDown] = createSignal(false)
  const data = useGlobalState()

  function resolveOptions() {
    const options: any = {
      month: 'long',
      year: 'numeric',
      day: 'numeric',
      calendar: data.store.calendar,
      timeZone: data.store.timeZone
    }
    if (data.store.grid === 'weekly' || data.store.grid === 'month') {
      delete options['day']
    }
    return options
  }

  const formatter = createMemo(() => {
    // the dates pass throw here are assumed that is not converted by timezone so we convert it here
    return new Intl.DateTimeFormat(data.store.locale, resolveOptions()).format(new Date(data.store.initialDate))
  })

  function changeGrid(grid: GridModes) {
    data.instance.changeGrid(grid)
  }

  function goBack() {
    const dCopy = new Date(data.store.initialDate)
    const grid = data.store.grid
    if (grid === 'daily') {
      dCopy.setDate(dCopy.getDate() - 1)
    } else if (grid === 'weekly') {
      dCopy.setDate(dCopy.getDate() - 7)
    } else if (grid === 'month') {
      dCopy.setMonth(dCopy.getMonth() - 1)
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
    } else if (grid === 'month') {
      dCopy.setMonth(dCopy.getMonth() + 1)
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
      {formatter()}
      <div style="flex:1"></div>

      <div class="go-some-d" data-test-id-dropdown="1" onclick={() => SetDropDown(!showDropDown())}>
        day
        <Show when={showDropDown()}>
          <div class="dropdown">
            <For each={data.instance.getOptions()}>
              {(item: any) => (
                <div
                  onclick={(e) => {
                    e.stopPropagation()
                    SetDropDown(false)
                    changeGrid(item)
                  }}
                  data-test-id-drop="0"
                >
                  {item}
                </div>
              )}
            </For>
            {/* <div
              data-test-id-drop="1"
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
              data-test-id-drop="2"
            >
              Month
            </div> */}
            {/* <div>week</div>
              <div>week</div>
              <div>week</div> */}
          </div>
        </Show>
      </div>
    </div>
  )
}
