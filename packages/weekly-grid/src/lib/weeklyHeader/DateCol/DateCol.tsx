import { MonthEvent, addEventsToRows, useMonthEventDragging } from '@full-event-calendar/month-grid'
import { EventClass, FComponent, Group, SourceEvent } from '@full-event-calendar/shared-ts'
import { For, createEffect, createMemo, createUniqueId } from 'solid-js'
import { rowList } from '../WeeklyAllDayHeader'
import { EventImpl, useCalenderContainerState, useSlotModal } from '@full-event-calendar/utils'
import { DraggerTypes } from '@full-event-calendar/month-grid/src/utils/RowDragger'
import './DateCol.scss'
import { getEventSourceFromTz } from '@full-event-calendar/utils'
import { calendarLocale } from '@full-event-calendar/locale'

interface DateColProps {
  filteredEvents: EventClass[]
  onEventUpdate: (event: any) => void
  onEventClick: (event: EventClass) => void
  onAddEvent: (event: EventClass, groupId?: Group['id']) => void
  headerDates: Date[]
  locale: string
  timeZone: string
  setDraggingDate: any
  moseEvents: any
  stopAddEvent: boolean
  editable: boolean
}

export const DateCol: FComponent<DateColProps> = (props) => {
  const { onDragEnd, onDragStart, setDraggingEventData, onMouseEnter, draggingEventData, changeDraggerType } =
    useMonthEventDragging(dragEnd, props.editable)

  const { modalElementNode, setSlotModalData, openSlotModalOnElement, isSlotModalOpen } = useSlotModal(
    'addModal',
    clearDataCb
  )
  const {
    modalElementNode: addModalElement,
    setSlotModalData: setEvModalElement,
    openSlotModalOnElement: openEvSlotModalOnElement,
    isSlotModalOpen: isEvOPen
  } = useSlotModal('eventClick')

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
  const container = useCalenderContainerState()
  function dataColMouseDown(dateNumber: number, e: MouseEvent) {
    if (isSlotModalOpen()) return
    e.stopPropagation()
    e.preventDefault()
    const basdate = new Date(props.headerDates[dateNumber])
    const endDate = new Date(props.headerDates[dateNumber])
    basdate.setHours(0, 0)
    endDate.setHours(23, 59, 59)

    const ev = new EventImpl({
      start: basdate,
      end: endDate,
      name: calendarLocale(props.locale, 'no_title'),
      id: createUniqueId()
    })
    changeDraggerType('addEventRow')
    onDragStart(ev, e)
    const handeler = () => {
      document.removeEventListener('mouseup', handeler)
      if (props.stopAddEvent && !isSlotModalOpen()) {
        setSlotModalData(ev)
        openSlotModalOnElement(container?.querySelector('.fec-week-all-day-wrapper .fec-month-item'))
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
        props.onAddEvent(eventD)
      }
    }
  }

  function onMouseEnterProxy(dayNumber: number) {
    if (!isSlotModalOpen()) {
      onMouseEnter(props.headerDates[dayNumber])
    }
  }

  function onEventClick(event: EventClass, e: MouseEvent) {
    props.onEventClick(event)
    setEvModalElement(event)
    openEvSlotModalOnElement(e.target)
  }
  let hasMouseMoved = false

  function mouseDownSome(n: any, e: any) {
    if (!props.editable) return
    function handelMouseMove() {
      if (!hasMouseMoved) {
        dataColMouseDown(n, e)
        hasMouseMoved = true
      }
      document.removeEventListener('mousemove', handelMouseMove)
    }
    function handelMouseUp() {
      document.removeEventListener('mouseup', handelMouseUp)
      document.removeEventListener('mousemove', handelMouseMove)
      hasMouseMoved = false
      // onDragEnd()
    }
    document.addEventListener('mousemove', handelMouseMove)
    document.addEventListener('mouseup', handelMouseUp)
  }
  function mouseEnterSome(n: any) {
    if (!props.editable) return
    if (hasMouseMoved || draggingEventData()) {
      onMouseEnterProxy(n)
    }
  }

  props.moseEvents.enter = mouseEnterSome
  props.moseEvents.down = mouseDownSome

  return (
    <>
      {addModalElement}
      {modalElementNode}
      {/* each colum box has a mouse move for handling drag  */}
      <div
        class="fec-week-all-day-container123"
        data-test-id-all-w-c="1"
        onmousedown={[mouseDownSome, 0]}
        onmousemove={() => mouseEnterSome(0)}
        style={isSlotModalOpen() ? 'pointer-events:none' : ''}
      >
        {/* loop on each row list */}
        <For each={getRowListArr()}>
          {(item) => (
            <div class="fec-week-all-day-container">
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
                    onClick={onEventClick}
                  />
                )}
              </For>
            </div>
          )}
        </For>
      </div>
      <div
        class="fec-week-all-day-container123"
        data-test-id-all-w-c="2"
        onmousemove={() => mouseEnterSome(1)}
        onmousedown={[mouseDownSome, 1]}
      ></div>
      <div
        class="fec-week-all-day-container123"
        data-test-id-all-w-c="3"
        onmousemove={() => mouseEnterSome(2)}
        onmousedown={[mouseDownSome, 2]}
      ></div>
      <div
        class="fec-week-all-day-container123"
        data-test-id-all-w-c="4"
        onmousemove={() => mouseEnterSome(3)}
        onmousedown={[mouseDownSome, 3]}
      ></div>
      <div
        class="fec-week-all-day-container123"
        data-test-id-all-w-c="5"
        onmousemove={() => mouseEnterSome(4)}
        onmousedown={[mouseDownSome, 4]}
      ></div>
      <div
        class="fec-week-all-day-container123"
        data-test-id-all-w-c="6"
        onmousemove={() => mouseEnterSome(5)}
        onmousedown={[mouseDownSome, 5]}
      ></div>
      <div
        class="fec-week-all-day-container123"
        data-test-id-all-w-c="7"
        onmousemove={() => mouseEnterSome(6)}
        onmousedown={[mouseDownSome, 6]}
      ></div>
    </>
  )
}
