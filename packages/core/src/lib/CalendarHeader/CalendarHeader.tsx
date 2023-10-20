import { Show, createEffect, createMemo, createSignal } from 'solid-js'
import './CalendarHeader.scss'

interface CalendarHeader {
  headerDate: Date
  onDateChange: (d: Date) => void
  timeZone: string
  calendar: string
}

export const CalendarHeader: Component<CalendarHeader> = (props) => {
  const [showDropDown, SetDropDown] = createSignal(false)

  const options: any = {
    dateStyle: 'full',
    calendar: props.calendar,
    timeZone: props.timeZone
  }

  const formater = createMemo(() => {
    return new Intl.DateTimeFormat('en-US', options).format(new Date(props.headerDate))
  })

  function goBack() {
    const dCopy = props.headerDate
    dCopy.setDate(dCopy.getDate() - 1)
    props.onDateChange(dCopy)
  }
  function goToday() {
    props.onDateChange(new Date())
  }
  function goForward() {
    const dCopy = props.headerDate
    dCopy.setDate(dCopy.getDate() + 1)
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
              }}
            >
              week
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
