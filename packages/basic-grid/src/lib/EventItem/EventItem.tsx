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
  oneHoureInPixel:number
  onEventClick:(event:EventClass)=>void
}

export const EventItem: FComponent<EventItem> = (props) => {
  const doesEventStartOnGridDate =()=> props.event.doesEventStartOn(props.gridDate)
  function getPosition() {
    return doesEventStartOnGridDate() && !props.top0 ? props.event.calculatePositionTop() : 'top:0'
  }
  const getHeight = createMemo(()=>{
    return props.event.doesEventEndOn(props.gridDate)
    ? props.event.calculateHeight(!doesEventStartOnGridDate())
    : `height:${2400 - props.event.getEventTopPositionIng()}%`
  })

  function getBackGroundColor() {
    return `;background-color:${props.event.color}`
  }
  function getBorders(){

   const endCon = props.event.doesEventEndOn(props.gridDate)
   const startCon = doesEventStartOnGridDate()

   if(!startCon){
    return 'border-top-left-radius: 0px;border-top-right-radius:0px'
   }else if(!endCon){
    return 'border-bottom-left-radius: 0px;border-bottom-right-radius:0px'
   }
   return ''
  }
 
  function isLowHeight(){
   const heightInPercentage = props.event.calculateHeightPersentage(!doesEventStartOnGridDate())
   const heightInPixel =  (props.oneHoureInPixel * heightInPercentage)/ 100

   return heightInPixel < 40
  }

  return (
    <div
      onMouseDown={(e: MouseEvent) => {
        props.onDragStart(props.event, e, !doesEventStartOnGridDate())
        
      }}
      onclick={() => {
        props.onEventClick(props.event)
        
      }}
      id={'event-' + props.event.id}
      class={`ec-event ${isLowHeight() ? 'one-line-event ':''} `  }
      data-test-event-id={props.event.id}
      style={`${getPosition()} ;${getHeight()} ;${props.width} ;${getBackGroundColor()};${getBorders()}`}
      >
       <div  
        style="position:sticky;top:0px;bottom:30px"
        class="tooltip-multiline event-info"
        data-tooltip={`${props.event.name} ${formatRange(props.event.start, props.event.end, props.locale)}`}
      >
        <div class="item-trunctae event-name">{props.event.name}</div>
        <div>
          <span id={'event-end-' + props.event.id}>{getDateTimeRange(props.event.start, props.event.end)}</span>
        </div>
      </div>
      <div onmousedown={[props.onMouseDown, props.event]} class="resizer"></div>
    </div>
  )
}
