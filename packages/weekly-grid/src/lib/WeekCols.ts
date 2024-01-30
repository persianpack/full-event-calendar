import { createMutable } from "solid-js/store"
import { columData } from "./WeeklyGrid"
import { batch, createEffect, createMemo } from "solid-js"
import { getEventsInDate } from "@full-event-calendar/utils"



export function useWeekCols(mergedProps:any,onDateChange:any){
 

    // Group Grid component takes a data for each grid colum
    const columData = createMutable([
      { props: { events: [], initialDate: null, locale: null, timeZone: null, calendar: null } },// day 0
      { props: { events: [], initialDate: null, locale: null, timeZone: null, calendar: null } },// day 1
      { props: { events: [], initialDate: null, locale: null, timeZone: null, calendar: null } },// day 2
      { props: { events: [], initialDate: null, locale: null, timeZone: null, calendar: null } },// day 3
      { props: { events: [], initialDate: null, locale: null, timeZone: null, calendar: null } },// day 4
      { props: { events: [], initialDate: null, locale: null, timeZone: null, calendar: null } },// day 5
      { props: { events: [], initialDate: null, locale: null, timeZone: null, calendar: null } }// day 6
    ]) as unknown as columData[]
  
    const generateCols = createMemo(() => {
      let iniDay = new Date(mergedProps.initialDate)
      iniDay.setDate(iniDay.getDate() - iniDay.getDay())
      // Holds executing downstream computations within the block until the end to prevent unnecessary recalculation
      batch(() => {
        for (let i = 0; i < 7; i++) {
          const dayNumber = iniDay.getDay()
          // Instead of filtering list for each event we pass down the entire event list
          // because the Daily grid component will filter out the event for the given they
          // so we do Not need the filter out here to ... it will be overdo
          const extractedEvents = getEventsInDate(mergedProps.events, new Date(iniDay))
          columData[dayNumber].props.events = extractedEvents.filter((item) => !item.isAllDay())
          // set props for each colum that wil be passed to dailyGird package by GroupGrid Package
          columData[dayNumber].props.initialDate = new Date(iniDay)
          columData[dayNumber].props.gridDate = new Date(iniDay)
          columData[dayNumber].props.locale = mergedProps.locale
          columData[dayNumber].props.timeZone = mergedProps.timeZone
          columData[dayNumber].props.calendar = mergedProps.calendar
          columData[dayNumber].props.gridHeight = mergedProps.gridHeight
          columData[dayNumber].props.stopAddEvent = mergedProps.stopAddEvent
          columData[dayNumber].props.onDateChange = onDateChange
          // Increment day for the next colum
          iniDay.setDate(iniDay.getDate() + 1)
        }
      })
    })
  
    createEffect(generateCols)

    return {columData}
}