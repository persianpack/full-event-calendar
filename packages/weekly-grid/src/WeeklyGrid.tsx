//types
import { EventClass, FComponent, Group, SourceEvent } from '@full-event-calendar/shared-ts'
//solid.js
import { createMutable } from 'solid-js/store'
import { For, batch, createEffect, createMemo, mergeProps } from 'solid-js'
//components
import { GroupGrid } from '@full-event-calendar/group-grid'
import { DailyHeader, DailyTimeRanges } from '@full-event-calendar/daily-grid'
import { BasicGrid } from '@full-event-calendar/basic-grid'
//utils
import { WeeklyAllDayHeader } from './lib/weeklyHeader/WeeklyAllDayHeader'
import { getEventsInDate } from '@full-event-calendar/utils'
// Styles
import './WeekGrid.scss'

export interface WeeklyGridProps {
  events?: EventClass[]
  initialDate?: Date
  onEventUpdate?: (event: any) => void
  onAddEvent?:(event: SourceEvent,groupId?:Group['id']) =>void

  onDateChange?: (d: Date) => void
  onGridChange?: (d: any) => void
  locale?: string
  calendar?: string
  timeZone?: string
  gridHeight?: number
}

const defaultProps = {
  events: [],
  initialDate: new Date(),
  onEventUpdate: () => {},
  onDateChange: () => {},
  onGridChange: () => {},
  onAddEvent: () => {},
  locale: 'en-US',
  calendar: 'gregory',
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  gridHeight: 65 * 24
}

interface columData {
  events: EventClass[]
  props: any
}

export const WeeklyGrid: FComponent<WeeklyGridProps> = (props) => {
  const mergedProps = mergeProps(defaultProps, props)

  // Group Grid component takes a data for each grid colum
  const columData = createMutable([
    { events: [], props: { initialDate: null, locale: null, timeZone: null, calendar: null, showAllDay: false } },
    { events: [], props: { initialDate: null, locale: null, timeZone: null, calendar: null, showAllDay: false } },
    { events: [], props: { initialDate: null, locale: null, timeZone: null, calendar: null, showAllDay: false } },
    { events: [], props: { initialDate: null, locale: null, timeZone: null, calendar: null, showAllDay: false } },
    { events: [], props: { initialDate: null, locale: null, timeZone: null, calendar: null, showAllDay: false } },
    { events: [], props: { initialDate: null, locale: null, timeZone: null, calendar: null, showAllDay: false } },
    { events: [], props: { initialDate: null, locale: null, timeZone: null, calendar: null, showAllDay: false } }
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

        columData[dayNumber].events = extractedEvents.filter((item) => !item.isAllDay())
        // set props for each colum that wil be passed to dailyGird package by GroupGrid Package

        columData[dayNumber].props.initialDate = new Date(iniDay)

        columData[dayNumber].props.gridDate = new Date(iniDay)
        columData[dayNumber].props.locale = mergedProps.locale
        columData[dayNumber].props.timeZone = mergedProps.timeZone
        columData[dayNumber].props.calendar = mergedProps.calendar
        columData[dayNumber].props.gridHeight = mergedProps.gridHeight
        columData[dayNumber].props.showAllDay = false
        columData[dayNumber].props.onDateChange = onDateChange
        // Increment day for the next colum
        iniDay.setDate(iniDay.getDate() + 1)
      }
    })
  })

  createEffect(generateCols)

  function onEventUpdateProxy(updatedSourceEvent: SourceEvent, targetCol: number, baseCol: number, isDragend: boolean) {
    // TargetCol and baseCol are indexes for which colum was event moved in .
    const sourceCopy = { ...updatedSourceEvent }
    if (isDragend) {
      sourceCopy.start.setDate(sourceCopy.start.getDate() - (baseCol - targetCol))
      sourceCopy.end.setDate(sourceCopy.end.getDate() - (baseCol - targetCol))
    }

    mergedProps.onEventUpdate(sourceCopy)
  }

  function onDateChange(d: Date) {
    mergedProps.onDateChange(d)
    mergedProps.onGridChange('daily')
  }

  const headerDates = () => {
    let iniDay = mergedProps.initialDate
    iniDay.setDate(iniDay.getDate() - iniDay.getDay())
    return [0, 1, 2, 3, 4, 5, 6].map((i) => {
      const y = new Date(iniDay)
      y.setDate(y.getDate() + i)
      return y
    })
  }

  function addEventProxy(event:SourceEvent,groupId?:number){
    if(groupId){
      mergedProps.onAddEvent({...event,...{groups:[groupId]}})
    }else{
      mergedProps.onAddEvent(event)
    }
  }

  return (
    <>
      <div class="header-dates">
        <For each={headerDates()}>
          {(item) => (
            <DailyHeader
              headerDate={item}
              timeZone={mergedProps.timeZone}
              calendar={mergedProps.calendar}
              onDateChange={onDateChange}
              locale={mergedProps.locale}
            ></DailyHeader>
          )}
        </For>
      </div>

      <WeeklyAllDayHeader
        onEventUpdate={mergedProps.onEventUpdate}
        events={mergedProps.events}
        cols={getEachColDate(columData)}
        locale={mergedProps.locale}
      />

      <div style=" position: relative; flex: 1;">
        <div style=" position: absolute;height: 100%;width: 100%;"
        id="scroll-wrapper"
        class="custome-scroll-bar scroll-wrapper">
          <div style="display: flex;" class="week-wrapper">
            <DailyTimeRanges locale={mergedProps.locale} />
            <GroupGrid
              gridComponent={BasicGrid}
              cols={columData}
              onAddEvent={addEventProxy}
              onEventUpdate={onEventUpdateProxy}
              initialDate={mergedProps.initialDate}
            />
          </div>
        </div>
      </div>
    </>
  )
}
// get colum list ant return the Dates in Arr
function getEachColDate(cols: columData[]) {
  return cols.map((item) => {
    return item.props.initialDate
  }) as Date[]
}
