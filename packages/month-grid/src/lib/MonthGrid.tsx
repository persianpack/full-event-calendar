import { EventClass, FComponent, SourceEvent } from '@full-event-calendar/shared-ts'
import { createMutable } from 'solid-js/store'
import { For, Show, batch, createEffect, createMemo, createSignal, mergeProps, onCleanup } from 'solid-js'
import { GroupGrid } from '@full-event-calendar/group-grid'
import {
  ArraysplitIntoChunks,
  filterEventsByDateRange,
  formatWeekDays,
  getCalendarMonthDays,
  getEventForAdate
} from '@full-event-calendar/utils'
import {MonthEvent, getExtraRows} from './MonthEvent/MonthEvent'
import { getMonthRows } from '../utils/EventRows'

import './MonthGrid.scss'
import {  daysDiffInRange, isDateIncludedInaRange } from '@full-event-calendar/utils/src/filterEvents'
 
const defaultProps = {
  events: [],
  initialDate: new Date(),
  onEventUpdate: () => {},
  locale: 'en-US',
  calendar: 'gregory',
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
}

interface WeeklyGridProps {
  events?: EventClass[]
  initialDate?: Date
  onEventUpdate?: (event: any) => void
  locale?: string
  calendar?: string
  timeZone?: string
}
export interface MonthDateObject {
  date: Date
  year: string | undefined
  month: string | undefined
  day: string | undefined
}
interface monthGridData {
  [key: string]: EventClass[]
}

interface DraggingEventsDate {
  start: Date
  end: Date
  id:any
  source : EventClass
}

const rowLimit = 2

export const MonthGrid: FComponent<WeeklyGridProps> = (props) => {
  const mergedPorps = mergeProps(defaultProps, props)
  const [draggingEvent,setDraggingEvent] = createSignal<null | DraggingEventsDate>(null)  

  const filteredEvents3 = createMemo(() => mergedPorps.events.filter((item) => item.isAllDay()).sort(function (a, b) { return new Date(a.start).valueOf() - new Date(b.start).valueOf()  }) as EventClass[])

  const data = getCalendarMonthDays(mergedPorps.initialDate, mergedPorps.calendar)

  const res = ArraysplitIntoChunks(data, 7) as MonthDateObject[][]

  const Mrows = getMonthRows(res, filteredEvents3()) as monthGridData[]
 
  //move this to utils
  


  let draggingOnStartDate:Date | null = null
  let curretnDayre:number|null = null
  // move this to hooks
  function mousenedter(date:Date){
    if(!draggingEvent())return
    if(draggingOnStartDate){
    
      // let dayssDiff =(absX /x) * Math.floor(absX) || 0
      let dayssDiff =daysDiffInRange(draggingOnStartDate,date)
      let dragCopy = {...draggingEvent()} as DraggingEventsDate
      if((curretnDayre !=dayssDiff) ){
            curretnDayre = dayssDiff
            const startCopy = new Date(dragCopy.source.start)
            const endCopy = new Date(dragCopy.source.end)
            startCopy.setDate(dragCopy.source.start.getDate() + dayssDiff) 
            endCopy.setDate(dragCopy.source.end.getDate() + dayssDiff) 
            const copp = new MonthDraggingObject(dragCopy.source.id,startCopy,endCopy, dragCopy.source)
            //new MonthDraggingObject(dragCopy.source.id,startCopy,endCopy, dragCopy.source)
            //make obj null first because solid cannot detect Date change !
            setDraggingEvent(null)
            setDraggingEvent(copp)
      }
     
    }else{
      draggingOnStartDate = date
    }
  }

  function onEventDrag(event:EventClass){
    if(!draggingEvent()){
      const draggingEventObject = new MonthDraggingObject(event.id,new Date(event.start), new Date(event.end), event)
      setDraggingEvent(draggingEventObject)
    }
  }

  function dragEnd(){ 
    draggingOnStartDate = null
    setDraggingEvent(null)
  }

  const [modalData,setModalData] = createSignal({
    bottom:'0px',
    left:'0px',
    evets:[] as any as EventClass[],
    show:false,
    somDate : new Date()
  })
  // move this to hook or util smt
  function openModal(data:MonthDateObject,e:MouseEvent){
    const eventsModal =  getEventForAdate(filteredEvents3(),data.date)
    const target = e.target as HTMLElement
    const rectt = target.getBoundingClientRect()
    const coppy ={...modalData()}
    coppy.left = rectt.left + 'px'
    coppy.bottom = rectt.bottom + rectt.height + 'px'
    coppy.show = true
    coppy.evets = eventsModal
    coppy.somDate = data.date
    setModalData(coppy)
   }
  // console.log(Mrows)
  //move this to utils
  function clickout(el:any, accessor:any) {
    const onClick = (e:any) => !el.contains(e.target) && accessor()?.();
    document.body.addEventListener("click", onClick);
  
    onCleanup(() => document.body.removeEventListener("click", onClick));
  }

  function modalClickOutSide(){
    const coppy ={...modalData()}
    // coppy.left = rectt.left + 'px'
    // coppy.bottom = rectt.bottom + rectt.height + 'px'
    coppy.show = false
    setModalData(coppy)
  }
 
  function handelMouseUp(){
   
    document.removeEventListener('mouseup',handelMouseUp)

    document.getElementById('month-wrapper-id')?.classList.remove('month-is-dragging')
    console.log('mouseUp')
    dragEnd()
  }
  function modalDragStart(event:EventClass){
    document.addEventListener('mouseup', handelMouseUp)
    draggingOnStartDate = modalData().somDate
    document.getElementById('month-wrapper-id')?.classList.add('month-is-dragging')
    onEventDrag(event)
   
  }

  function formateWeekDate(date:Date){
    return formatWeekDays(date,mergedPorps.calendar,mergedPorps.timeZone,mergedPorps.locale)
  }
  return (
    <>
      <div class="month-header">
        <div>{formateWeekDate(data[0].date)}</div>
        <div>{formateWeekDate(data[1].date)}</div>
        <div>{formateWeekDate(data[2].date)}</div>
        <div>{formateWeekDate(data[3].date)}</div>
        <div>{formateWeekDate(data[4].date)}</div>
        <div>{formateWeekDate(data[5].date)}</div>
        <div>{formateWeekDate(data[6].date)}</div>
      </div>
      <div class="month-wrapper" id="month-wrapper-id">
        <Show when={modalData().show}>
          {/*
          //@ts-ignore */}
           <div use:clickout={modalClickOutSide} class='modal-event-list' style={`left:${modalData().left};bottom:${modalData().bottom}`}>
             <For each={modalData().evets}>
              {(item)=>(
                <div class='modal-event' onmousedown={[modalDragStart,item]}>{item.id}</div>
              )}
             </For>
           </div>
        </Show>
        <For each={res}>
          {(item1, i) => {
            return (
              <div class="month-row">
                <div class='dragging-wrapper'>
                  <Show when={!!draggingEvent() && isDateIncludedInaRange(draggingEvent() as unknown as EventClass,item1[0].date,item1[6].date) }>
                    <MonthEvent onEnd={()=>{}} ondrag={()=>{}} item={draggingEvent() as unknown as EventClass} dateEnd={item1[6].date} date={item1[0].date} />
                  </Show>
                </div>
                <div class="month-row-container">
                  <For each={Object.keys(Mrows[i()])}>
                    {(item,i3) => (
                      <div class="month-row-wrapper">
                        <For each={Mrows[i()][item]}>
                          {(item) => (
                           i3() + 1 <= rowLimit ? <MonthEvent onEnd={dragEnd} ondrag={onEventDrag} item={item} dateEnd={item1[6].date} date={item1[0].date} /> : <></>
                          )}
                        </For>
                      </div>
                    )}
                  </For>
                   
                </div>
                  <div class='month-more-wrapper'>
                   <For each={getExtraRows(Mrows[i()],item1[0].date,item1[6].date)}>
                      {(item,j)=>(
                          <div class='month-more-item'>
                            <Show when={item > 0}>
                              <div class='month-more-btn' onclick={[openModal,item1[j()]]}> 
                                 {item}  + 
                              </div>
                            </Show>
                          </div>
                      )}
                   </For>

                  </div>
                <For each={item1}>{(date) => <div class="month-container" onmousemove={(e)=>mousenedter(date.date)}> {date.day}</div>}</For>
              </div>
            )
          }}
        </For>
      </div>
    </>
  )
}

class MonthDraggingObject{
  id : string
start:  Date
end : Date
source:  EventClass
  constructor( id : string, start:  Date, end : Date,source:  EventClass){
    this.id = id
    this.start = start
    this.end = end
    this.source = source
  }
}

 