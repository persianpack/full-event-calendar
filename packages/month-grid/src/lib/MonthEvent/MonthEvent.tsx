import { EventClass, FComponent } from '@full-event-calendar/shared-ts'
import { createMemo, createSignal } from 'solid-js'

interface EventPropss {
  item: EventClass
  dateEnd: Date

  date: Date
  ondrag: (e: EventClass) => void
  onEnd: () => void
}

export const MonthEvent: FComponent<EventPropss> = (props: EventPropss) => {
  const leftP = createMemo(() => getLeftPosition(props.item, props.date))
  const widthh = getendPosition(props.item, props.dateEnd, leftP())
  const isRighted = rightArrowClass(props.item, props.dateEnd)
    ? 'border-top-right-radius:0px;border-bottom-right-radius:0px'
    : ''
  const [eventIsDragging, setEventIsDragging] = createSignal(false)

  function handelMouseUp() {
    setEventIsDragging(false)
    document.removeEventListener('mouseup', handelMouseUp)
    document.removeEventListener('mousemove', mouseMove)
    document.getElementById('month-wrapper-id')?.classList.remove('month-is-dragging')
    props.onEnd()
  }

  function onEventMouseDown(data: boolean, e: MouseEvent) {
    setEventIsDragging(data)
    document.addEventListener('mouseup', handelMouseUp)
    //maybe remove this line it is not needed ?
    document.addEventListener('mousemove', mouseMove)
    document.getElementById('month-wrapper-id')?.classList.add('month-is-dragging')
  }

  function mouseMove() {
    props.ondrag(props.item)
  }

  function eventStyles() {
    return `${eventIsDragging() ? ';opacity:.7;' : ''};left:calc(${leftP()}00% + 5px);width:calc(${widthh}00% ${
      rightArrowClass(props.item, props.dateEnd) ? '- 6px' : '- 16px'
    });${leftArrowClass(props.item as unknown as EventClass, props.date)};${isRighted}`
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

function getLeftPosition(event: EventClass, weekStartDate: Date) {
  const floorWeekStart = new Date(weekStartDate.setHours(0, 0, 0))
  if (event.start >= floorWeekStart) {
    return event.start.getDay()
  }
  return 0
}

function getendPosition(event: EventClass, weekendDate: Date, start: number) {
  const floorWeEend = new Date(weekendDate.setHours(23, 59, 59))
  if (event.end <= floorWeEend) {
    return event.end.getDay() - start + 1
  }
  return 6 - start + 1
}

function leftArrowClass(event: EventClass, weekStartDate: Date) {
  const floorWeekStart = new Date(weekStartDate.setHours(0, 0, 0))
  if (event.start < floorWeekStart) {
    return 'border-top-left-radius:0px;border-bottom-left-radius:0px;left:1px'
  } else {
    return ''
  }
}
function rightArrowClass(event: EventClass, weekendDate: Date) {
  const floorWeEend = new Date(weekendDate.setHours(23, 59, 59))
  return event.end > floorWeEend
  // if (event.end > floorWeEend) {
  // } else {
  //   return false
  // }
}

interface eventRows {
  [key: string]: EventClass[]
}

export function getExtraRows(eventRows: eventRows, weekStartDate: Date, weekendDate: Date, rowLimit: number) {
  console.log(eventRows)
  let rowMatrix = [0, 0, 0, 0, 0, 0, 0]
  const arr = Object.keys(eventRows).filter((item, i) => {
    return i + 1 > rowLimit
  })

  for (let index = 0; index < arr.length; index++) {
    const element = eventRows[arr[index]]
    // console.log(element)
    for (let j = 0; j < element.length; j++) {
      const event = element[j]
      const leftP = createMemo(() => getLeftPosition(event, weekStartDate))
      const widthh = getendPosition(event, weekendDate, leftP())
      // console.log( leftP(),widthh)
      for (let k = leftP(); k < widthh + leftP(); k++) {
        rowMatrix[k] = rowMatrix[k] + 1
      }
    }
  }

  // console.log(rowMatrix)

  return rowMatrix
}
