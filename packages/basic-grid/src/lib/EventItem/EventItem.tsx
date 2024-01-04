import { EventClass, FComponent } from '@full-event-calendar/shared-ts'
import { formatRange, getDateTimeRange, getEventTimeRange } from '@full-event-calendar/utils'
import './EventItem.scss'
import { createMemo } from 'solid-js'
interface EventItem {
  onDragStart: (event: EventClass, e: MouseEvent, D: boolean) => void
  onMouseDown: any
  event: EventClass
  gridDate: Date
  width: string
  locale: string
  top0?:boolean
}

export const EventItem: FComponent<EventItem> = (props) => {
  function getPosition() {
    return props.event.doesEventStartOn(props.gridDate) && !props.top0 ? props.event.calculatePositionTop() : 'top:0'
  }
  const getHeight = createMemo(()=>{
    return props.event.doesEventEndOn(props.gridDate)
    ? props.event.calculateHeight(!props.event.doesEventStartOn(props.gridDate))
    : `height:${2400 - props.event.getEventTopPositionIng()}%`
  })
  // function getHeight() {
  //   return props.event.doesEventEndOn(props.gridDate)
  //     ? props.event.calculateHeight(!props.event.doesEventStartOn(props.gridDate))
  //     : `height:${2400 - props.event.getEventTopPositionIng()}%`
  // }

  function getBackGroundColor() {
    return `;background-color:${props.event.color}`
  }
 
  function isLowHeight(){
   return (props.event.calculateHeightPersentage() <45 )
  }

  return (
    <div
      onMouseDown={(e: MouseEvent) => {
        props.onDragStart(props.event, e, !props.event.doesEventStartOn(props.gridDate))
      }}
      id={'event-' + props.event.id}
      class={`ec-event ${isLowHeight() ? 'one-line-event ':''} `  }
      data-test-event-id={props.event.id}
      style={`${getPosition()} ;${getHeight()} ;${props.width} ;${getBackGroundColor()}`}
      >
       <div  
        style="position:sticky;top:0px;bottom:30px"
        class="tooltip-multiline event-info"
        data-tooltip={`${props.event.name} ${formatRange(props.event.start, props.event.end, props.locale)}`}
      >
        <div class="item-trunctae">{props.event.name}</div>
        <div>
          <span id={'event-end-' + props.event.id}>{getDateTimeRange(props.event.start, props.event.end)}</span>
        </div>
      </div>
      <div onmousedown={[props.onMouseDown, props.event]} class="resizer"></div>
    </div>
  )
}
