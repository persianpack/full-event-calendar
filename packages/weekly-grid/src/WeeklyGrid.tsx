//types
import { EventClass, FComponent, SourceEvent } from '@full-event-calendar/shared-ts'
//solid.js
import { createMutable } from 'solid-js/store'
import { batch, createEffect, createMemo, mergeProps } from 'solid-js'
//components
import { GroupGrid } from '@full-event-calendar/group-grid'
import { DailyGrid } from '@full-event-calendar/daily-grid'
//utils
import { WeeklyAllDayHeader } from './lib/weeklyHeader/WeeklyAllDayHeader'

interface WeeklyGridProps {
  events?: EventClass[]
  initialDate?: Date
  onEventUpdate?: (event: any) => void
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
    let iniDay = mergedProps.initialDate
    iniDay.setDate(iniDay.getDate() - iniDay.getDay())
    // Holds executing downstream computations within the block until the end to prevent unnecessary recalculation
    batch(() => {
      for (let i = 0; i < 7; i++) {
        const dayNumber = iniDay.getDay()
        // Instead of filtering list for each event we pass down the entire event list
        // because the Daily grid component will filter out the event for the given they
        // so we do Not need the filter out here to ... it will be overdo
        columData[dayNumber].events = mergedProps.events
        // set props for each colum that wil be passed to dailyGird package by GroupGrid Package
        columData[dayNumber].props.initialDate = new Date(iniDay)
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

  return (
    <>
      <WeeklyAllDayHeader
        onEventUpdate={mergedProps.onEventUpdate}
        events={mergedProps.events}
        cols={getEachColDate(columData)}
      />
      <GroupGrid
        gridComponent={DailyGrid}
        cols={columData}
        onEventUpdate={onEventUpdateProxy}
        initialDate={mergedProps.initialDate}
      />
    </>
  )
}
// get colum list ant return the Dates in Arr
function getEachColDate(cols: columData[]) {
  return cols.map((item) => {
    return item.props.initialDate
  }) as Date[]
}
