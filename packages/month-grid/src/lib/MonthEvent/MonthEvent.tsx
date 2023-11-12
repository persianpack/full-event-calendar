import { EventClass, FComponent } from '@full-event-calendar/shared-ts'
import { createMemo, createSignal } from 'solid-js'
import './MonthEvent.scss'
import { getLeftPosition, getendPosition, leftArrowClass, rightArrowClass } from '../../utils/EventPosition'
interface EventPropss {
  item: EventClass
  endDate: Date
  startDate: Date
  ondragstart: (e: EventClass) => void
  onDragEnd: () => void
}

export const MonthEvent: FComponent<EventPropss> = (props: EventPropss) => {
  const leftP = createMemo(() => getLeftPosition(props.item, props.startDate))
  const eventWidth = getendPosition(props.item, props.endDate, leftP())
  const isRighted = rightArrowClass(props.item, props.endDate)
    ? 'border-top-right-radius:0px;border-bottom-right-radius:0px'
    : ''
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
    return `${eventIsDragging() ? ';opacity:.7;' : ''};left:calc(${leftP()}00% + 5px);width:calc(${eventWidth}00% ${
      rightArrowClass(props.item, props.endDate) ? '- 6px' : '- 16px'
    });${leftArrowClass(props.item as unknown as EventClass, props.startDate)};${isRighted}`
  }

  return (
    <div
      onmousedown={[onEventMouseDown, true]}
      class="month-item"
      id={`month--item-${props.item.id}`}
      style={eventStyles()}
    >
      {props.item.id}
    </div>
  )
}
