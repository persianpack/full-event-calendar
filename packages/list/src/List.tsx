//types
import { EventClass, FComponent } from '@full-event-calendar/shared-ts'
//solid.js
import { For, Show, createMemo, mergeProps } from 'solid-js'
//utils
import { formatDD, formatDM, formatRange, useSlotModal } from '@full-event-calendar/utils'

import { calendarLocale } from '@full-event-calendar/locale'
import { GroupEventMap } from './lib/EventListCollection'
// Styles
import './List.scss'
export interface ListGridProps {
  events?: EventClass[]
  initialDate?: Date
  onEventUpdate?: (event: any) => void
  onDateChange?: (d: Date) => void
  onGridChange?: (d: any) => void
  onEventClick: (event: EventClass) => void
  locale: string
  calendar?: string
  timeZone?: string
  gridHeight?: number
  listMode: 'day' | 'week' | 'month'
}

const defaultProps = {
  events: [],
  initialDate: new Date(),
  onEventUpdate: () => {},
  onDateChange: () => {},
  onGridChange: () => {},
  onEventClick: () => {},
  locale: 'en-US',
  calendar: 'gregory',
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  gridHeight: 65 * 24,
  listMode: 'week'
}

export const List: FComponent<ListGridProps> = (props) => {
  const mergedProps = mergeProps(defaultProps, props)
  const generateGroup = createMemo(() => {
    let groupEventMap = new GroupEventMap(mergedProps.listMode, mergedProps.initialDate, mergedProps.calendar)
    return groupEventMap.group(mergedProps.events)
  })

  const {
    modalElementNode: addModalElement,
    setSlotModalData: setEvModalElement,
    openSlotModalOnElement: openEvSlotModalOnElement
  } = useSlotModal('eventClick')

  function isMlistEmpty() {
    let len = 0
    Object.keys(generateGroup()).forEach((key) => {
      len += generateGroup()[key].length
    })
    return len === 0
  }

  function itemClick(event: EventClass, e: MouseEvent) {
    setEvModalElement(event)
    props.onEventClick(event)
    openEvSlotModalOnElement(e.target)
  }

  return (
    <>
      {addModalElement}
      <div class="fec-event-list">
        <div class="fec-scroll-wrapper-list fec-custome-scroll-bar">
          <Show when={isMlistEmpty()}>
            <div class="fec-no-events-text">{calendarLocale(props.locale, 'no_events')}</div>
          </Show>

          <For each={Object.keys(generateGroup())}>
            {(item) => {
              return generateGroup()[item].length === 0 ? (
                <></>
              ) : (
                <div class="fec-event-list-item">
                  <div class="fec-event-list-item-time">
                    <div class="fec-schedule-date">
                      {formatDD(new Date(item), mergedProps.calendar, mergedProps.locale)}
                    </div>
                    <div class="fec-schedule-dates">
                      {formatDM(new Date(item), mergedProps.calendar, mergedProps.locale)}
                    </div>
                  </div>
                  <div class="fec-schedule-event-wrapper">
                    <For each={generateGroup()[item]}>
                      {(item) => (
                        <div onclick={[itemClick, item]} class="fec-fec-event-list-item-des">
                          <div class="fec-event-date-list">
                            <div class="fec-event-dot" style={`background-color:${item.color}`}></div>
                            {item.isAllDay() ? 'all day' : formatRange(item.start, item.end, mergedProps.locale)}
                          </div>
                          <div>{item.name}</div>
                        </div>
                      )}
                    </For>
                  </div>
                </div>
              )
            }}
          </For>
        </div>
      </div>
    </>
  )
}
