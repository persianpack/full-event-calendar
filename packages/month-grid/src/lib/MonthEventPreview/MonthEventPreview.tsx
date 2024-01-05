import { EventClass, FComponent } from '@full-event-calendar/shared-ts'
import { Show} from 'solid-js'

import { MonthEvent } from '../..'
import { NewDraggingController, isDateIncludedInaRange } from '@full-event-calendar/utils'
interface MonthEventPreview {
  item: NewDraggingController
  endDate: Date
  startDate: Date
  ondragstart: (event: EventClass,e:MouseEvent) => void
  onDragEnd: () => void
  isFirstRow: boolean
  locale: string
  dontCheackRange?: boolean
}

export const MonthEventPreview: FComponent<MonthEventPreview> = (props) => {
 
function ItemAdaptor(){
  const yy = new MonthDraggingItem(props.item.event.id,props.item.dragedStartDate,props.item.dragedEndDate,
    props.item.eventSourceEnd,props.item.eventSourceStart,props.item.event
    )
  return yy
}
function isEventInRange(){
 return !props.dontCheackRange ? isDateIncludedInaRange(
    ItemAdaptor() as unknown as EventClass,
    props.startDate,
    props.endDate
  ) : true
}


  return (
    <Show when={props.item && isEventInRange()}>

     <MonthEvent
     locale={props.locale}
     isFirstRow={props.isFirstRow}
     onDragEnd={() => {}}
     ondragstart={() => {}}
     item={ItemAdaptor() as any as EventClass}
     endDate={props.endDate}
     startDate={props.startDate}
     
     >

     </MonthEvent>
    </Show>
  )
}
class MonthDraggingItem{
  id: string
  start: Date
  end: Date
  source: EventClass
  color: string
  sourceStart: Date
  name: string
  sourceEnd: Date
  constructor(id: string, start: Date, end: Date, sourceEnd: Date, sourceStart: Date, source: EventClass) {
    this.id = id
    this.start = start
    this.end = end
    this.source = source
    this.color = source.color
    this.sourceStart = sourceStart
    this.sourceEnd = sourceEnd
    this.name = source.name
  }
}
