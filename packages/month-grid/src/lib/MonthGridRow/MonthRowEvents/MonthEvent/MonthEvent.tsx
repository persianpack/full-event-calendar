import { EventClass, FComponent } from '@full-event-calendar/shared-ts'
import { createMemo, createSignal } from 'solid-js'
import './MonthEvent.scss'
import { getLeftPosition, getEndPosition } from '../../../../utils/EventPosition'
import { formatToShortTime, rightOrLeftInDateInRange, useCalenderContainerState } from '@full-event-calendar/utils'
import { detectLeftButton } from '@full-event-calendar/utils'
interface EventProps {
  item: EventClass
  endDate: Date
  startDate: Date
  ondragstart: (event: EventClass,e:MouseEvent) => void
  onDragEnd: () => void
  isFirstRow: boolean
  locale: string
  onClick?: (event:EventClass,e:MouseEvent)=>void
}

export const MonthEvent: FComponent<EventProps> = (props: EventProps) => {
  const leftP = createMemo(() => getLeftPosition(props.item, props.startDate))

  const eventWidth = getEndPosition(props.item, props.endDate, leftP())

  const [eventIsDragging, setEventIsDragging] = createSignal(false)
  const container = useCalenderContainerState()

  function onEventMouseDown(data: boolean,event:MouseEvent) {

    if(!detectLeftButton(event)) return
    event.stopPropagation()
    event.preventDefault()
    let hasBenMoved= false
    document.addEventListener('mouseup', handelMouseUp)
    //maybe remove this line it is not needed ?
    document.addEventListener('mousemove', mouseMove)
    function mouseMove(e:MouseEvent) {
      if(!hasBenMoved){
        setEventIsDragging(data)
        container?.querySelector('#fec-month-wrapper-id')?.classList.add('fec-month-is-dragging')
      }else{
        hasBenMoved = true
      }
      props.ondragstart(props.item,e)
    }
    function handelMouseUp() {
      setEventIsDragging(false)
      document.removeEventListener('mouseup', handelMouseUp)
      document.removeEventListener('mousemove', mouseMove)
      container?.querySelector('#fec-month-wrapper-id')?.classList.remove('fec-month-is-dragging')
      props.onDragEnd()
    }
  }


  function eventStyles() {
    return `--ca-color:${props.item.color};${
      eventIsDragging() ? ';opacity:.7;' : ''
    };left:calc(${leftP()}00% + 7px);width:calc(${eventWidth}00% - 14px);background-color:${props.item.color}`
  }
  function isNotAllDay() {
    if (props?.item?.isAllDay) {
      return !props?.item?.isAllDay() ? 'fec-month-item-no-all-day' : ''
      //@ts-ignore
    }else if(props?.item.source){
      //@ts-ignore
      return !props?.item?.source.isAllDay() ? 'fec-month-item-no-all-day' : ''
    }
    return ''
  }
  function onClickHandel(e:MouseEvent){
    if(props.onClick){
      props.onClick(props.item,e)
    }
  }

  return (
    <div
      onmousedown={[onEventMouseDown, true]}
      onclick={onClickHandel}
      class={`fec-month-item ${isNotAllDay()} ${rightOrLeftInDateInRange(props.item, props.startDate, props.endDate)}`}
      id={`month--item-${props.item.id}`}
      style={eventStyles()}
      data-test-id-month-item={props.item.id}
    >
      <div class="fec-event-time-month">{`${isNotAllDay() ? formatToShortTime(props.item.start, props.locale) : ''} `}</div>
      <div class="fec-event-name-month">{isNotAllDay() ? `(${props.item.name})` : props.item.name}</div>
    </div>
  )
}
