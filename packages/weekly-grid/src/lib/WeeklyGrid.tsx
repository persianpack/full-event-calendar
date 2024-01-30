//types
import { EventClass, FComponent, Group, SourceEvent } from '@full-event-calendar/shared-ts'
//solid.js
import {  mergeProps } from 'solid-js'
//components
import { GroupGrid } from '@full-event-calendar/group-grid'
import {  DailyTimeRanges } from '@full-event-calendar/daily-grid'
import { BasicGrid } from '@full-event-calendar/basic-grid'
//utils
import { WeeklyAllDayHeader } from './WeeklyHeader/WeeklyAllDayHeader'
// Styles
import './WeekGrid.scss'
import { useWeekCols } from './WeekCols'

export interface WeeklyGridProps {
  events?: EventClass[]
  initialDate?: Date
  onEventUpdate?: (event: any) => void
  onAddEvent?: (event: SourceEvent, groupId?: Group['id']) => void
  onDateChange?: (d: Date) => void
  onGridChange?: (d: any) => void
  locale?: string
  calendar?: string
  timeZone?: string
  gridHeight?: number
  stopAddEvent?: boolean
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
  gridHeight: 65 * 24,
  stopAddEvent:false
}

export interface columData {
  events: EventClass[]
  props: any
}

export const WeeklyGrid: FComponent<WeeklyGridProps> = (props) => {
  const mergedProps = mergeProps(defaultProps, props)

  // Group Grid component takes a data for each grid colum
  const {columData} = useWeekCols(mergedProps,onDateChange)

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

  function addEventProxy(event: SourceEvent, groupId?: number) {
    if (groupId) {
      mergedProps.onAddEvent({ ...event, ...{ groups: [groupId] } })
    } else {
      mergedProps.onAddEvent(event)
    }
  }

  return (
    <>

      <WeeklyAllDayHeader
        onEventUpdate={mergedProps.onEventUpdate}
        events={mergedProps.events}
        headerDates={headerDates()}
        onAddEvent={mergedProps.onAddEvent}
        locale={mergedProps.locale}
        timeZone={mergedProps.timeZone}
        calendar={mergedProps.calendar}
        stopAddEvent={mergedProps.stopAddEvent}
      />
      <ScrollBarWrapper>
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
      </ScrollBarWrapper>
    </>
  )
}

 function ScrollBarWrapper (props:any) {
  return (
    <div style="position: relative; flex: 1;">
      <div
        style=" position: absolute;height: 100%;width: 100%;"
        id="scroll-wrapper"
        class="custome-scroll-bar scroll-wrapper"
      >
        {props.children}
      </div>
    </div>
  )
}
