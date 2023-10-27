import { Show, createMemo, createSignal } from 'solid-js'
import './CalendarHeader.scss'
import { FComponent } from '@full-event-calendar/shared-ts'
import { useCounter } from '../../contex-injector/contex'

interface CalendarHeader {
  headerDate: Date
  onDateChange: (d: Date) => void
  timeZone: string
  calendar: string
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
    return new Intl.DateTimeFormat(data.store.locale, options).format(new Date(props.headerDate))
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
