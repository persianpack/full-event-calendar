//types
import { EventClass, FComponent, SourceEvent } from '@full-event-calendar/shared-ts'
import type { DailyGridpProps } from '@full-event-calendar/daily-grid'
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

interface columeData {
  events: EventClass[]
  props: DailyGridpProps
}

export const WeeklyGrid: FComponent<WeeklyGridProps> = (props) => {
  const mergedPorps = mergeProps(defaultProps, props)

  // Group Grid component takes a data for each grid colume
  const columeData = createMutable([
    { events: [], props: { initialDate: null, locale: null, timeZone: null, calendar: null, showAllDay: false } },
    { events: [], props: { initialDate: null, locale: null, timeZone: null, calendar: null, showAllDay: false } },
    { events: [], props: { initialDate: null, locale: null, timeZone: null, calendar: null, showAllDay: false } },
    { events: [], props: { initialDate: null, locale: null, timeZone: null, calendar: null, showAllDay: false } },
    { events: [], props: { initialDate: null, locale: null, timeZone: null, calendar: null, showAllDay: false } },
    { events: [], props: { initialDate: null, locale: null, timeZone: null, calendar: null, showAllDay: false } },
    { events: [], props: { initialDate: null, locale: null, timeZone: null, calendar: null, showAllDay: false } }
  ]) as unknown as columeData[]

  const generateCols = createMemo(() => {
    let iniDay = mergedPorps.initialDate
    iniDay.setDate(iniDay.getDate() - iniDay.getDay())
    // Holds executing downstream computations within the block until the end to prevent unnecessary recalculation
    batch(() => {
      for (let i = 0; i < 7; i++) {
        const dayNumber = iniDay.getDay()
        // const evntsInThatDay = () => getEventForAdate(mergedPorps.events, iniDay)
        // Insted of filtering list for each event we pass down the entire event list
        // because the Daily grid componnet will filter out the event for the given they
        // so we do Not need the filter out here to ... it will be overdo
        columeData[dayNumber].events = mergedPorps.events
        // set props for each colume that wil be passed to dailyGird package by GroupGrid Package
        columeData[dayNumber].props.initialDate = new Date(iniDay)
        columeData[dayNumber].props.locale = mergedPorps.locale
        columeData[dayNumber].props.timeZone = mergedPorps.timeZone
        columeData[dayNumber].props.calendar = mergedPorps.calendar
        columeData[dayNumber].props.gridHeight = mergedPorps.gridHeight
        columeData[dayNumber].props.showAllDay = false
        columeData[dayNumber].props.onDateChange = onDateChange
        // INcremint day for the next colume
        iniDay.setDate(iniDay.getDate() + 1)
      }
    })
  })

  createEffect(generateCols)

  function onEventUpdatePorxy(updatedSourceEvent: SourceEvent, targetCol: number, baseCol: number, isDraged: boolean) {
    // TargetCol and baseCol are indexeses for which colume was event moved in .
    const sourceCopy = { ...updatedSourceEvent }
    if (isDraged) {
      sourceCopy.start.setDate(sourceCopy.start.getDate() - (baseCol - targetCol))
      sourceCopy.end.setDate(sourceCopy.end.getDate() - (baseCol - targetCol))
    }

    mergedPorps.onEventUpdate(sourceCopy)
  }
  function onDateChange(d: Date) {
    mergedPorps.onDateChange(d)
    mergedPorps.onGridChange('daily')
  }

  return (
    <>
      <WeeklyAllDayHeader
        onEventUpdate={mergedPorps.onEventUpdate}
        events={mergedPorps.events}
        columes={getEachColDate(columeData)}
      />
      <GroupGrid
        gridComponent={DailyGrid}
        columes={columeData}
        onEventUpdate={onEventUpdatePorxy}
        initialDate={mergedPorps.initialDate}
      />
    </>
  )
}
// get colume list ant reutrn the Dates in Arr
function getEachColDate(cols: columeData[]) {
  return cols.map((item) => {
    return item.props.initialDate
  }) as Date[]
}
