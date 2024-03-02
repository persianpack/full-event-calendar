import { EventClass, FComponent, Group, SourceEvent } from '@full-event-calendar/shared-ts'
import { Show, createUniqueId } from 'solid-js'
import { useResize } from '../../../hooks/eventResize'
import { EventImpl, getEventSourceFromTz } from '@full-event-calendar/utils'
import { EventItem } from '../../EventItem/EventItem'
import './TimeRange.scss'

interface TimeRangeProps {
  onAddEvent: (event: EventClass) => void
  gridDate: Date
  houre: number
  locale: string
  timeZone: string
  editable: boolean
  oneHoureInPixel: number
  eventPreviewData: EventClass | null
  setEventPreview: any
  setContainerRef: any
  showModal: any
  group: Group
  stopAddEvent: boolean
}

export const TimeRange: FComponent<TimeRangeProps> = (props) => {
  // const [resiserGr, setResizer] = createSignal<EventClass | null>(null)
  let refr: any = null
  const { onmousedownH, draggedData } = useResize('addEventWithResize', resizeCb, props.editable)

  function resizeCb(sourceEv: SourceEvent) {
    if (!props.editable) return
    const event = getEventSourceFromTz(new EventImpl(sourceEv), props.timeZone)
    event.id = createUniqueId()
    if (props.stopAddEvent) {
      props.setContainerRef(refr)
      props.setEventPreview(event, props.houre)
    } else {
      props.setEventPreview(null, null)
    }
    props.onAddEvent(event)
  }

  function timeRangeMouseDown(hour: number, min: number, mouseEvent: MouseEvent) {
    if (props.showModal) return

    const basdate = new Date(props.gridDate)
    const endDate = new Date(props.gridDate)

    basdate.setHours(hour, min)
    endDate.setHours(hour, min + 15)
    let evData = { start: basdate, end: endDate, name: '(no title)', id: createUniqueId() }
    if (props.group) {
      //@ts-ignore
      evData['groups'] = [props.group.id]
    }
    const x = new EventImpl(evData)

    props.setEventPreview(x, props.houre)
    onmousedownH(x, mouseEvent)
  }

  function getTop(date: Date) {
    return `top:${date.getMinutes() + 'px'}`
  }

  return (
    <>
      <div data-test-time-range-id={props.houre + 1} class="fec-time-range ">
        <Show when={props.eventPreviewData}>
          <div ref={refr} class="fec-add-event-preview" style={getTop(props.eventPreviewData?.start!)}>
            <EventItem
              locale={props.locale}
              event={props.eventPreviewData!}
              gridDate={props.gridDate}
              width="width:calc(100% - 20px)"
              onMouseDown={() => {}}
              onDragStart={() => {}}
              top0={true}
              oneHoureInPixel={props.oneHoureInPixel}
            ></EventItem>
          </div>
        </Show>

        <div class="fec-some-container">
          <div class="fec-time-rage-up-container">
            <div onmousedown={(e) => timeRangeMouseDown(props.houre, 0, e)}></div>
            <div onmousedown={(e) => timeRangeMouseDown(props.houre, 15, e)}></div>
          </div>
          <div class="fec-time-rage-down-container">
            <div onmousedown={(e) => timeRangeMouseDown(props.houre, 30, e)}></div>
            <div onmousedown={(e) => timeRangeMouseDown(props.houre, 45, e)}></div>
          </div>
        </div>
      </div>
    </>
  )
}
