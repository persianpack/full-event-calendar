import { EventClass, FComponent } from '@full-event-calendar/shared-ts'
import { For, Show, createEffect, createMemo, createSignal, on } from 'solid-js'
import './DailyAllDay.scss'
import { isEventRightOrLeftOrNone } from '@full-event-calendar/utils/src/Date'
import { sortEventByStart } from '@full-event-calendar/utils'

interface DailyAllDayProps {
  events: EventClass[]
  initialDate: Date
}

export const DailyAllDay: FComponent<DailyAllDayProps> = (props) => {
  const filteredEvents = createMemo(() => sortEventByStart(props.events.filter((item) => item.isAllDay())))

  let allDRef: any
  const [isOpen, setIsOpen] = createSignal(false)
  function openAllD() {
    const el = allDRef as HTMLElement
    if (!isOpen()) {
      el.style.height = el.clientHeight + 'px'
      el.style.maxHeight = 'initial'
      setTimeout(() => {
        el.style.height = el.scrollHeight + 'px'
      }, 0)
      setTimeout(() => {
        el.style.height = 'fit-content'
      }, 500)
      setIsOpen(true)
    } else {
      el.style.height = el.clientHeight + 'px'
      setTimeout(() => {
        el.style.height = 55.6 * (filteredEvents().length > 2 ? 2 : filteredEvents().length) + 'px'
      }, 0)
      setTimeout(() => {
        el.style.maxHeight = '111px'
      }, 500)
      setIsOpen(false)
    }
  }
  createEffect(
    on(
      () => props.initialDate,
      () => {
        const el = allDRef as HTMLElement

        // el.style.height = el.clientHeight + 'px'
        setTimeout(() => {
          el.style.height = 'fit-content'
        }, 0)
        setTimeout(() => {
          el.style.maxHeight = '111px'
        }, 500)
        setIsOpen(false)
      }
    )
  )

  return (
    <>
      <div class={`all-d-wrapeer-header daosidj ${isOpen() ? 'alld-open' : 'alld-not-open'}`}>
        <div class="mor-btn-container">
          <Show when={filteredEvents().length > 2}>
            <div class="all-collapser" onclick={openAllD}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M13.28 10.0333L8.93333 5.68667C8.42 5.17333 7.58 5.17333 7.06667 5.68667L2.72 10.0333"
                  stroke="#7E7E7F"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </Show>
        </div>

        <div class="all-day-container" ref={allDRef}>
          <For each={filteredEvents()}>
            {(item) => {
              return (
                <div
                  data-testid={item.id}
                  style={`background-color:${item.color}`}
                  class={`all-day-wrapper ${isEventRightOrLeftOrNone(item, props.initialDate)}`}
                >
                  {`${item.name} `}
                </div>
              )
            }}
          </For>
          <Show when={filteredEvents().length > 2}>
            <div class="more-btn" onclick={openAllD}>
              <div class="more-wrapper">{filteredEvents().length - 2} more</div>
            </div>
          </Show>
        </div>
      </div>
    </>
  )
}
