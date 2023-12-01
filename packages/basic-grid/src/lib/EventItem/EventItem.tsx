import { EventClass, FComponent } from '@full-event-calendar/shared-ts'
import { lookForAvailableWith } from '../../utils/coleLine'

interface EventItem {
  onDragStart: (event: EventClass, e: MouseEvent, D: boolean) => void
  onMouseDown: any
  event: EventClass
  gridDate: Date
  width: string
}

export const EventItem: FComponent<EventItem> = (props) => {
  function getPosition() {
    return props.event.doesEventStartOn(props.gridDate) ? props.event.calculatePositionTop() : 'top:0'
  }
  function getHeight() {
    return props.event.calculateHeight(!props.event.doesEventStartOn(props.gridDate))
  }

  return (
    <div
      onMouseDown={(e: MouseEvent) => {
        props.onDragStart(props.event, e, !props.event.doesEventStartOn(props.gridDate))
      }}
      id={'event-' + props.event.id}
      class="ec-event"
      data-test-event-id={props.event.id}
      style={`${getPosition()} ${getHeight()} ${props.width}`}
    >
      <div> id : {props.event.id}</div>
      <div class="tooltip-multiline " data-tooltip={props.event.start.toString()}>
        start :{props.event.start.toString()}
      </div>
      <div>
        end :<span id={'event-end-' + props.event.id}>{props.event.end.toString()}</span>
      </div>
      <div onmousedown={[props.onMouseDown, props.event]} class="resizer"></div>
    </div>
  )
}
