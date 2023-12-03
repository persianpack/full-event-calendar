import { EventClass, FComponent } from '@full-event-calendar/shared-ts'
import { lookForAvailableWith } from '../../utils/coleLine'
import { getEventTimeRange } from '@full-event-calendar/utils'

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
      <div style="position:sticky;top:0px;bottom:0">
        <div class="tooltip-multiline " data-tooltip={props.event.start.toString()}>
          {props.event.name}
        </div>
        <div>
          <span id={'event-end-' + props.event.id}>{getEventTimeRange(props.event)}</span>
        </div>
      </div>
      <div onmousedown={[props.onMouseDown, props.event]} class="resizer"></div>
    </div>
  )
}
