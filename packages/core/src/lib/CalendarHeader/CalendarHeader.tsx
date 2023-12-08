import { For, Show, createMemo, createSignal, onCleanup } from 'solid-js'
import './CalendarHeader.scss'
import { FComponent } from '@full-event-calendar/shared-ts'
import { useGlobalState } from '../../context-injector/context'
import { GridModes } from '../../api/CalendarImpl'
import { Transition } from 'solid-transition-group'
interface CalendarHeader {
  onDateChange: (d: Date) => void
}

export const CalendarHeader: FComponent<CalendarHeader> = (props) => {
  const [showDropDown, SetDropDown] = createSignal(false)
  const data = useGlobalState()
  function ClickOutSide(el: any, accessor: any) {
    const onClick = (e: any) => !el.contains(e.target) && accessor()?.()
    document.body.addEventListener('click', onClick)
    onCleanup(() => document.body.removeEventListener('click', onClick))
  }
  function amodalClickOut() {
    SetDropDown(false)
  }
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

      <div class="go-back-icon" onclick={goBack}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M13.28 10.0333L8.93333 5.68667C8.42 5.17333 7.58 5.17333 7.06667 5.68667L2.72 10.0333"
            stroke="#7E7E7F"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </div>
      <div class="header-date">{formatter()}</div>
      <div class="go-forward-icon" onclick={goForward}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M13.28 10.0333L8.93333 5.68667C8.42 5.17333 7.58 5.17333 7.06667 5.68667L2.72 10.0333"
            stroke="#7E7E7F"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </div>

      <div style="flex:1"></div>

      <div class="go-some-d" data-test-id-dropdown="1" onclick={() => SetDropDown(!showDropDown())}>
        day
        <Transition name="slide-fade">
          <Show when={showDropDown()}>
            {/* //@ts-ignore */}
            <div use:ClickOutSide={amodalClickOut} class="dropdown-calendar">
              <For each={data.instance.getOptions()}>
                {(item: any) => (
                  <div
                    class="dropdown-calendar-item"
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
            </div>
          </Show>
        </Transition>
      </div>
    </div>
  )
}
