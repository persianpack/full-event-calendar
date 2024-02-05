import { getEventsInDate } from "@full-event-calendar/utils"
import { createMutable } from "solid-js/store"
import { columData } from "./GroupDaily"
import { createEffect } from "solid-js"


export function DailyCols(mergedProps:any,onDateChange:any){

const columData = createMutable([
    { props: { events: [], initialDate: mergedProps.initialDate, locale: mergedProps.locale, timeZone: mergedProps.timeZone, calendar: mergedProps.calendar, showAllDay: true } }
  ]) as unknown as columData[]

  function getCols() {
    for (let i = 0; i < mergedProps.groups.length;  i++) {
      if (!columData[i]) {
        let x = {
          props: { events: [], initialDate: null, locale: null, timeZone: null, calendar: null, showAllDay: false }
        }
        columData.push(x)
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
        const filterdEvents = mergedProps.events.filter((ev) => {
          if (ev.id === 15) {
            //  console.log(groupId,ev.groups.includes(groupId))
          }
          //@ts-ignore
          return ev.groups.includes(groupId)
        })
        columData[i].props.events = getEventsInDate(filterdEvents, mergedProps.initialDate)
        // console.log(filterdEvents,columData[i].events, mergedProps.initialDate)
        columData[i].props.initialDate = new Date(mergedProps.initialDate)
        columData[i].props.gridDate = new Date(mergedProps.initialDate)
        columData[i].props.locale = mergedProps.locale
        columData[i].props.timeZone = mergedProps.timeZone
        columData[i].props.calendar = mergedProps.calendar
        columData[i].props.gridHeight = mergedProps.gridHeight
        columData[i].props.showAllDay = true
        columData[i].props.editable = mergedProps.editable
        columData[i].props.avalibalSots = mergedProps.avalibalSots
        columData[i].props.onDateChange = onDateChange
        columData[i].props.group = mergedProps.groups[i]
        columData[i].props.slotRenderStore = mergedProps.slotRenderStore
        columData[i].props.stopAddEvent = mergedProps.stopAddEvent
      }
    } else {
      columData[0].props.events = getEventsInDate(mergedProps.events, mergedProps.initialDate)
      columData[0].props.initialDate = new Date(mergedProps.initialDate)
      columData[0].props.gridDate = new Date(mergedProps.initialDate)
      columData[0].props.locale = mergedProps.locale
      columData[0].props.timeZone = mergedProps.timeZone
      columData[0].props.calendar = mergedProps.calendar
      columData[0].props.gridHeight = mergedProps.gridHeight
      columData[0].props.showAllDay = true
      columData[0].props.avalibalSots = mergedProps.avalibalSots
      columData[0].props.editable = mergedProps.editable
      columData[0].props.onDateChange = onDateChange
      columData[0].props.slotRenderStore = mergedProps.slotRenderStore
      columData[0].props.stopAddEvent = mergedProps.stopAddEvent
    }
  }

  createEffect(generageCols)
  
  return {
    columData,
    generageCols
  }

}