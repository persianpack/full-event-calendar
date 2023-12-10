import { EventClass, FComponent } from '@full-event-calendar/shared-ts'
import { createMemo, createSignal } from 'solid-js'
import './MonthEvent.scss'
import { getLeftPosition, getEndPosition } from '../../utils/EventPosition'
import { formatToShortTime, isEventRightOrLeftOrNoneRange } from '@full-event-calendar/utils/src/Date'
interface EventProps {
  item: EventClass
  endDate: Date
  startDate: Date
  ondragstart: (e: EventClass) => void
  onDragEnd: () => void
  isFirstRow: boolean
  locale: string
}

export const MonthEvent: FComponent<EventProps> = (props: EventProps) => {
  const leftP = createMemo(() => getLeftPosition(props.item, props.startDate))

  const eventWidth = getEndPosition(props.item, props.endDate, leftP())

  const [eventIsDragging, setEventIsDragging] = createSignal(false)

  function handelMouseUp() {
    setEventIsDragging(false)
    document.removeEventListener('mouseup', handelMouseUp)
    document.removeEventListener('mousemove', mouseMove)
    document.getElementById('month-wrapper-id')?.classList.remove('month-is-dragging')
    props.onDragEnd()
  }

  function onEventMouseDown(data: boolean) {
    setEventIsDragging(data)
    document.addEventListener('mouseup', handelMouseUp)
    //maybe remove this line it is not needed ?
    document.addEventListener('mousemove', mouseMove)
    document.getElementById('month-wrapper-id')?.classList.add('month-is-dragging')
  }

  function mouseMove() {
    props.ondragstart(props.item)
  }

  function eventStyles() {
    return `--ca-color:${props.item.color};${
      eventIsDragging() ? ';opacity:.7;' : ''
    };left:calc(${leftP()}00% + 7px);width:calc(${eventWidth}00% - 14px);background-color:${props.item.color}`
  }
  function isNotAllDay() {
    if (props?.item?.isAllDay) {
      return !props?.item?.isAllDay() ? 'month-item-no-all-day' : ''
    }
    return ''
  }

  return (
    <div
      onmousedown={[onEventMouseDown, true]}
      class={`month-item ${isNotAllDay()} ${isEventRightOrLeftOrNoneRange(props.item, props.startDate, props.endDate)}`}
      id={`month--item-${props.item.id}`}
      style={eventStyles()}
      data-test-id-month-item={props.item.id}
    >
      <div class="event-time-month">{`${isNotAllDay() ? formatToShortTime(props.item.start, props.locale) : ''} `}</div>

      <div class="event-name-month">{isNotAllDay() ? `(${props.item.name})` : props.item.name}</div>
    </div>
  )
}
