import { EventClass, FComponent, Group, SourceEvent } from '@full-event-calendar/shared-ts'

import { createMutable } from 'solid-js/store'
import { createEffect, mergeProps } from 'solid-js'
import { DailyGrid, DailyGridProps, dailyDefaultProps } from './DailyGrid'
import { GroupGrid } from '@full-event-calendar/group-grid'

import './GroupDaily.scss'
import { DailyTimeRanges } from '..'
import { GroupDailyHeader } from './GroupDailyHeader/GroupDailyHeader'
import { getEventsInDate } from '@full-event-calendar/utils'

export interface GroupDailyProps extends DailyGridProps {
  groups?: Group[]
}
const defaultProps = {
  ...dailyDefaultProps,
  groups: []
}

export interface columData {
  events: EventClass[]
  props: any
}

export const GroupDaily: FComponent<GroupDailyProps> = (props) => {

  const mergedProps = mergeProps(defaultProps, props)

  function onDateChange(d: Date) {
    mergedProps.onDateChange(d)
  }

  const columData2 = createMutable([
    { events: [], props: { initialDate: null, locale: null, timeZone: null, calendar: null, showAllDay: false } }
  ]) as unknown as columData[]

  function getCols() {
    for (let i = 0; i < mergedProps.groups.length; i++) {
      if (columData2[i]) {
      } else {
        let x = {
          events: [],
          props: { initialDate: null, locale: null, timeZone: null, calendar: null, showAllDay: false }
        }
        columData2.push(x)
      }
    }
  }
  function generageCols() {
    getCols()
    // use Factory here
  
    // const columData = [] as unknown as columData[]
    if (mergedProps.groups.length > 0) {
        for (let i = 0; i < mergedProps.groups.length; i++) {
        const groupId = mergedProps.groups[i].id
        
        //@ts-ignore
        const filterdEvents = mergedProps.events.filter(ev=>{
          if(ev.id===15){
          //  console.log(groupId,ev.groups.includes(groupId))
          }
          //@ts-ignore
         return ev.groups.includes(groupId)
        })
        columData2[i].events = getEventsInDate(filterdEvents, mergedProps.initialDate)
        // console.log(filterdEvents,columData2[i].events, mergedProps.initialDate)
 
        columData2[i].props.initialDate = new Date(mergedProps.initialDate)
        columData2[i].props.gridDate = new Date(mergedProps.initialDate)
        columData2[i].props.locale = mergedProps.locale
        columData2[i].props.timeZone = mergedProps.timeZone
        columData2[i].props.calendar = mergedProps.calendar
        columData2[i].props.gridHeight = mergedProps.gridHeight
        columData2[i].props.showAllDay = true
        columData2[i].props.onDateChange = onDateChange
        columData2[i].props.group = mergedProps.groups[i]
      }
    } else {
      columData2[0].events = getEventsInDate(mergedProps.events, mergedProps.initialDate)
      columData2[0].props.initialDate = new Date(mergedProps.initialDate)
      columData2[0].props.gridDate = new Date(mergedProps.initialDate)
      columData2[0].props.locale = mergedProps.locale
      columData2[0].props.timeZone = mergedProps.timeZone
      columData2[0].props.calendar = mergedProps.calendar
      columData2[0].props.gridHeight = mergedProps.gridHeight
      columData2[0].props.showAllDay = true
      columData2[0].props.onDateChange = onDateChange
    }


  }

  generageCols()

  function onEventUpdateProxy(updatedSourceEvent: SourceEvent) {
    // TargetCol and baseCol are indexes for which colum was event moved in .
    // const sourceCopy = { ...updatedSourceEvent }
    // console.log(sourceCopy)
    // if (isDragend) {
    //   sourceCopy.start.setDate(sourceCopy.start.getDate() - (baseCol - targetCol))
    //   sourceCopy.end.setDate(sourceCopy.end.getDate() - (baseCol - targetCol))
    // }
    mergedProps.onEventUpdate(updatedSourceEvent)
  }

  createEffect(generageCols)

  function addEventProxy(event:SourceEvent,groupId?:number){
    if(groupId){
        mergedProps.onAddEvent({...event,...{groups:[groupId]}})
    }else{
        mergedProps.onAddEvent(event)
    }
  }

  return (
    <>
      <GroupDailyHeader columData={columData2} locale={mergedProps.locale} initialDate={mergedProps.initialDate} />
      <div class="scroll-wrapper " id="scroll-wrapper">
        <div style="position: absolute;width:100%;display:flex;">
          <DailyTimeRanges locale={mergedProps.locale}></DailyTimeRanges>
          <GroupGrid
            gridComponent={DailyGrid}
            cols={columData2}
            onEventUpdate={mergedProps.onEventUpdate}
            onAddEvent={addEventProxy}
            initialDate={mergedProps.initialDate}
            hasCrossGridDrag={false}
          />
        </div>
      </div>
    </>
  )
}
