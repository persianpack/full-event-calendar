import { MonthEvent, addEventsToRows, useMonthEventDragging } from '@full-event-calendar/month-grid'
import { EventClass, FComponent, Group, SourceEvent } from '@full-event-calendar/shared-ts'
import { For, createEffect, createMemo, createUniqueId } from 'solid-js'
import { rowList } from '../WeeklyAllDayHeader'
import { EventImpl, useSlotModal } from '@full-event-calendar/utils'
import { DraggerTypes } from '@full-event-calendar/month-grid/src/utils/RowDragger'
import './DateCol.scss'
import { getEventSourceFromTz } from '@full-event-calendar/utils'

interface DateColProps {
  filteredEvents: EventClass[]
  onEventUpdate: (event: any) => void
  onAddEvent: (event: SourceEvent, groupId?: Group['id']) => void
  headerDates: Date[]
  locale: string
  timeZone: string
  setDraggingDate: any
  moseEvents: any
  stopAddEvent: boolean
}

export const DateCol: FComponent<DateColProps> = (props) => {
  const { onDragEnd, onDragStart, setDraggingEventData, onMouseEnter, draggingEventData, changeDraggerType } =
    useMonthEventDragging(dragEnd)

  const { modalElementNode, setSlotModalData, openSlotModalOnElement, isSlotModalOpen } = useSlotModal(
    'addModal',
    clearDataCb
  )
  function clearDataCb() {
    setDraggingEventData(null)
  }

  createEffect(() => {
    props.setDraggingDate(draggingEventData)
  })

  const getRowList = createMemo(() => {
    let rowList: rowList = {}
    addEventsToRows(props.filteredEvents, rowList)
    return rowList
  })

  function getRowListArr() {
    return Object.keys(getRowList())
  }

  function dataColMouseDown(dateNumber: number, e: MouseEvent) {
    if (isSlotModalOpen()) return
    e.stopPropagation()
    e.preventDefault()
    const basdate = new Date(props.headerDates[dateNumber])
    const endDate = new Date(props.headerDates[dateNumber])
    basdate.setHours(0, 0)
    endDate.setHours(23, 59, 59)

    const ev = new EventImpl({ start: basdate, end: endDate, name: '(no title)', id: createUniqueId() })
    changeDraggerType('addEventRow')
    onDragStart(ev, e)
    const handeler = () => {
      document.removeEventListener('mouseup', handeler)
      if (props.stopAddEvent && !isSlotModalOpen()) {
        setSlotModalData(ev)
        openSlotModalOnElement(document.querySelector('.week-all-day-wrapper .month-item'))
        onDragEnd(false)
      } else {
        onDragEnd()
      }

      changeDraggerType('editEventRow')
    }
    document.addEventListener('mouseup', handeler)
  }

  function dragEnd(event: EventClass, draggerMode: DraggerTypes) {
    const eventD = getEventSourceFromTz(new EventImpl(event), props.timeZone)

    if (draggerMode === 'editEventRow') {
      props.onEventUpdate(event)
    } else {
      if (props.stopAddEvent) {
        setSlotModalData(eventD)
      } else {
        props.onAddEvent(eventD.sourceEvent)
      }
    }
  }

  function onMouseEnterProxy(dayNumber: number) {
    if (!isSlotModalOpen()) {
      onMouseEnter(props.headerDates[dayNumber])
    }
  }

  props.moseEvents.enter = onMouseEnterProxy
  props.moseEvents.down = dataColMouseDown

  return (
    <>
      {modalElementNode}
      {/* each colum box has a mouse move for handling drag  */}
      <div
        class="week-all-day-container123"
        data-test-id-all-w-c="1"
        onmousedown={[dataColMouseDown, 0]}
        onmousemove={() => onMouseEnterProxy(0)}
        style={isSlotModalOpen() ? 'pointer-events:none' : ''}
      >
        {/* loop on each row list */}
        <For each={getRowListArr()}>
          {(item) => (
            <div class="week-all-day-container">
              {/* loop on each event in a row list and use monthly grid components for this */}
              <For each={getRowList()[item]}>
                {(item3) => (
                  <MonthEvent
                    locale={props.locale}
                    isFirstRow={true}
                    onDragEnd={onDragEnd}
                    ondragstart={onDragStart}
                    item={item3}
                    startDate={props.headerDates[0]}
                    endDate={props.headerDates[6]}
                  />
                )}
              </For>
            </div>
          )}
        </For>
      </div>
      <div
        class="week-all-day-container123"
        data-test-id-all-w-c="2"
        onmousemove={() => onMouseEnterProxy(1)}
        onmousedown={[dataColMouseDown, 1]}
      ></div>
      <div
        class="week-all-day-container123"
        data-test-id-all-w-c="3"
        onmousemove={() => onMouseEnterProxy(2)}
        onmousedown={[dataColMouseDown, 2]}
      ></div>
      <div
        class="week-all-day-container123"
        data-test-id-all-w-c="4"
        onmousemove={() => onMouseEnterProxy(3)}
        onmousedown={[dataColMouseDown, 3]}
      ></div>
      <div
        class="week-all-day-container123"
        data-test-id-all-w-c="5"
        onmousemove={() => onMouseEnterProxy(4)}
        onmousedown={[dataColMouseDown, 4]}
      ></div>
      <div
        class="week-all-day-container123"
        data-test-id-all-w-c="6"
        onmousemove={() => onMouseEnterProxy(5)}
        onmousedown={[dataColMouseDown, 5]}
      ></div>
      <div
        class="week-all-day-container123"
        data-test-id-all-w-c="7"
        onmousemove={() => onMouseEnterProxy(6)}
        onmousedown={[dataColMouseDown, 6]}
      ></div>
    </>
  )
}
