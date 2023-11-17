import { EventClass, FComponent } from '@full-event-calendar/shared-ts'
import { createMemo, createSignal } from 'solid-js'
import './MonthEvent.scss'
import { getLeftPosition, getendPosition, leftArrowClass, rightArrowClass } from '../../utils/EventPosition'
import { isEventRightOrLeftOrNoneRange } from '@full-event-calendar/utils/src/Date'
interface EventPropss {
  item: EventClass
  endDate: Date
  startDate: Date
  ondragstart: (e: EventClass) => void
  onDragEnd: () => void
  isFirstRow: boolean
  isLastRow: boolean
}

export const MonthEvent: FComponent<EventPropss> = (props: EventPropss) => {
  const leftP = createMemo(() => getLeftPosition(props.item, props.startDate))
  const eventWidth = getendPosition(props.item, props.endDate, leftP())
  // const isRighted = rightArrowClass(props.item, props.endDate)
  //   ? props.isLastRow
  //     ? 'clip-path: polygon(0 0, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 0 100%);'
  //     : 'border-top-right-radius:0px;border-bottom-right-radius:0px'
  //   : ''
  const [eventIsDragging, setEventIsDragging] = createSignal(false)

  function handelMouseUp() {
    setEventIsDragging(false)
    document.removeEventListener('mouseup', handelMouseUp)
    document.removeEventListener('mousemove', mouseMove)
    document.getElementById('month-wrapper-id')?.classList.remove('month-is-dragging')
    props.onDragEnd()
  }

  function onEventMouseDown(data: boolean, e: MouseEvent) {
    setEventIsDragging(data)
    document.addEventListener('mouseup', handelMouseUp)
    //maybe remove this line it is not needed ?
    document.addEventListener('mousemove', mouseMove)
    document.getElementById('month-wrapper-id')?.classList.add('month-is-dragging')
    // props.ondragstart(props.item)
  }

  function mouseMove() {
    props.ondragstart(props.item)
  }

  function eventStyles() {
    return `${
      eventIsDragging() ? ';opacity:.7;' : ''
    };left:calc(${leftP()}00% + 7px);width:calc(${eventWidth}00% - 14px)`
  }
  function isNotAllDay() {
    if (props?.item?.isAllDay) {
      return !props?.item?.isAllDay() ? 'month-item-no-allday' : ''
    }
    return ''
  }

  return (
    <div
      onmousedown={[onEventMouseDown, true]}
      class={`month-item ${isNotAllDay()} ${isEventRightOrLeftOrNoneRange(props.item, props.startDate, props.endDate)}`}
      id={`month--item-${props.item.id}`}
      style={eventStyles()}
    >
      {props.item.id}
    </div>
  )
}
