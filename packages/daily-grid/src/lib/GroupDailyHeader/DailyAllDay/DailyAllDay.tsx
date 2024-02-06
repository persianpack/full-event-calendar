import { EventClass, FComponent } from '@full-event-calendar/shared-ts'
import { For, Show, createEffect, createMemo, on, onMount } from 'solid-js'
import './DailyAllDay.scss'

import { formatNumber, rightOrLeftInDate, sortEventByStart, useSlotModal } from '@full-event-calendar/utils'

interface DailyAllDayProps {
  events: EventClass[]
  initialDate: Date
  locale: string
  isAllDOpen: boolean
  setIsAllDOpen: any
}

export const DailyAllDay: FComponent<DailyAllDayProps> = (props) => {
  const filteredEvents = createMemo(() => sortEventByStart(props.events.filter((item) => item.isAllDay())))
  const { modalElementNode, setSlotModalData, openSlotModalOnElement, isSlotModalOpen } = useSlotModal('eventClick')

  let allDRef: any
  let cachecH = 0

  function openAllD() {
    props.setIsAllDOpen(!props.isAllDOpen)
  }

  let hasMounted = false
  const setHeader = () => {
    const el = allDRef as HTMLElement
    if (!el) return
    if (props.isAllDOpen) {
      cachecH = el.clientHeight
      el.style.height = el.clientHeight + 'px'
      el.style.maxHeight = 'initial'

      if (!hasMounted) return
      setTimeout(() => {
        el.style.height = el.scrollHeight + 'px'
        el.style.maxHeight = '220px'
      }, 0)
      setTimeout(() => {
        el.style.overflow = 'auto'
        el.style.height = 'fit-content'
      }, 500)
      // props.setIsAllDOpen(true)
    } else {
      el.style.height = el.clientHeight + 'px'
      el.style.maxHeight = 'initial'

      if (!hasMounted) return
      setTimeout(() => {
        el.style.height = cachecH + 'px'
        el.style.overflow = 'hidden'
      }, 0)
      setTimeout(() => {
        el.style.height = 'fit-content'
        el.style.maxHeight = '81px'
      }, 500)
      // props.setIsAllDOpen(false)
    }
  }
  createEffect(on(() => props.isAllDOpen, setHeader))
  createEffect(
    on(
      () => props.events,
      () => {
        if (filteredEvents().length > 0) {
        } else {
          const el = allDRef as HTMLElement
          if (!el) return
          el.style.height = 'fit-content'
        }
      }
    )
  )

  onMount(() => {
    hasMounted = true
  })

  function headerClick(event: EventClass, e: MouseEvent) {
    setSlotModalData(event)
    openSlotModalOnElement(e.target)
  }

  return (
    <>
      {modalElementNode}
      <Show when={filteredEvents().length > 0}>
        <div class={`all-d-wrapeer-header daosidj ${props.isAllDOpen ? 'alld-open' : 'alld-not-open'}`}>
          <div class="more-btn-container" style="width:52px">
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

          <div class="all-day-container" ref={allDRef} style='height: fit-content; max-height: 81px; overflow: hidden;'>
            <For each={filteredEvents()}>
              {(item) => {
                return (
                  <div
                    onClick={[headerClick, item]}
                    data-testid={item.id}
                    style={`background-color:${item.color}`}
                    class={`all-day-wrapper ${rightOrLeftInDate(item, props.initialDate)}`}
                  >
                    {`${item.name} `}
                  </div>
                )
              }}
            </For>
            <Show when={filteredEvents().length > 2}>
              <div class="more-btn" onclick={openAllD}>
                <div class="more-wrapper">{formatNumber(props.locale, filteredEvents().length - 2)} +</div>
              </div>
            </Show>
          </div>
        </div>
      </Show>
    </>
  )
}
