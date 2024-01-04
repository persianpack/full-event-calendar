import { EventClass, FComponent, SourceEvent } from '@full-event-calendar/shared-ts'
import { Show, createSignal, createUniqueId } from 'solid-js'
import { useResize } from '../../hooks/eventResize'
import { EventImpl } from '@full-event-calendar/utils'
import { EventItem } from '../EventItem/EventItem'
import './TimeRange.scss'

interface TimeRangeProps {
  onAddEvent: (event: SourceEvent) => void
  gridDate: Date
  houre: number
  locale: string
  timeZone:string
  editable:boolean
  oneHoureInPixel:number

}

export const TimeRange: FComponent<TimeRangeProps> = (props) => {
  const [resiserGr, setResizer] = createSignal<EventClass | null>(null)

  function timeRangeMouseDown(hour: number, min: number, mouseEvent: MouseEvent) {
    const { onmousedownH } = useResize('addEventWithResize', resizeCb,props.editable)
    function resizeCb(event: SourceEvent) {
      if(!props.editable)return
      event.id = createUniqueId()
      props.onAddEvent(event)
      setResizer(null)
    }
    const basdate = new Date(props.gridDate)
    const endDate = new Date(props.gridDate)
    basdate.setHours(hour, min)
    endDate.setHours(hour, min + 15)

    const x = new EventImpl({ start: basdate, end: endDate, name: '(no title)', id: 85 })
    setResizer(x)
    onmousedownH(x, mouseEvent)
  }
  function getTop(date:Date){
    return `top:${date.getMinutes() + 'px'}`
  }

  function reAdjust(event:SourceEvent){
    let eve = new EventImpl(event)
    eve.convertDateByTimeZone(props.timeZone)
    const diff = eve.start.getTime() - event.start.getTime()
    const newStart = new Date(event.start.getTime() - diff)
    const endStart = new Date(event.end.getTime() - diff)
    const retrs = {...event,...{start :newStart,end:endStart}}
    return retrs
  }

  return (
    <>
      <div data-test-time-range-id={props.houre + 1} class="time-range">
      
          <Show when={resiserGr()}>
        <div class="add-event-preview" style={getTop(resiserGr()?.start!)}>
            <EventItem
              locale={props.locale}
              event={resiserGr()!}
              gridDate={props.gridDate}
              width="width:calc(100% - 20px)"
              onMouseDown={() => {}}
              onDragStart={() => {}}
              onEventClick={() => {}}
              top0={true}
              oneHoureInPixel={props.oneHoureInPixel}
            ></EventItem>
        </div>
          </Show>

        <div class="some-container">
          <div class="time-rage-up-container">
            <div onmousedown={(e) => timeRangeMouseDown(props.houre, 0, e)}></div>
            <div onmousedown={(e) => timeRangeMouseDown(props.houre, 15, e)}></div>
          </div>
          <div class="time-rage-down-container">
            <div onmousedown={(e) => timeRangeMouseDown(props.houre, 30, e)}></div>
            <div onmousedown={(e) => timeRangeMouseDown(props.houre, 45, e)}></div>
          </div>
        </div>
      </div>
    </>
  )
}
