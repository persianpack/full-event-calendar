import { EventClass, FComponent, SourceEvent } from '@full-event-calendar/shared-ts'

import { createMutable } from 'solid-js/store'
import { createEffect, mergeProps } from 'solid-js'
import { DailyGrid, DailyGridProps, dailyDefaultProps } from './DailyGrid'
import { GroupGrid } from '@full-event-calendar/group-grid'

import './GroupDaily.scss'
import { DailyHeader, DailyTimeRanges } from '..'
import { GroupDailyHeader } from './GroupDailyHeader/GroupDailyHeader'
import { getEventsInDate } from '@full-event-calendar/utils'

export interface GroupDailyProps extends DailyGridProps {
  groups?: number[]
}
const defaultProps = {
  ...dailyDefaultProps,
  groups: [1, 2]
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
  getCols()
  function generageCols() {
    // use Factory here
    // const columData = [] as unknown as columData[]
    if (mergedProps.groups.length > 0) {
      for (let i = 0; i < mergedProps.groups.length; i++) {
        columData2[i].events = getEventsInDate(mergedProps.events, mergedProps.initialDate)
        columData2[i].props.initialDate = new Date(mergedProps.initialDate)
        columData2[i].props.gridDate = new Date(mergedProps.initialDate)
        columData2[i].props.locale = mergedProps.locale
        columData2[i].props.timeZone = mergedProps.timeZone
        columData2[i].props.calendar = mergedProps.calendar
        columData2[i].props.gridHeight = mergedProps.gridHeight
        columData2[i].props.showAllDay = true
        columData2[i].props.onDateChange = onDateChange
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

    // return columData
  }

  generageCols()

  function onEventUpdateProxy(updatedSourceEvent: SourceEvent, targetCol: number, baseCol: number, isDragend: boolean) {
    // TargetCol and baseCol are indexes for which colum was event moved in .
    const sourceCopy = { ...updatedSourceEvent }
    if (isDragend) {
      sourceCopy.start.setDate(sourceCopy.start.getDate() - (baseCol - targetCol))
      sourceCopy.end.setDate(sourceCopy.end.getDate() - (baseCol - targetCol))
    }
    mergedProps.onEventUpdate(sourceCopy)
  }

  createEffect(generageCols)

  return (
    <>
      {/* <DailyHeader
        headerDate={mergedProps.initialDate}
        timeZone={mergedProps.timeZone}
        calendar={mergedProps.calendar}
        onDateChange={mergedProps.onDateChange}
        locale={mergedProps.locale}
      ></DailyHeader> */}
      <GroupDailyHeader columData={columData2}    locale={mergedProps.locale} initialDate={mergedProps.initialDate}>

      </GroupDailyHeader>
      <div class="scroll-wrapper " id="scroll-wrapper">
        <div style="position: absolute;width:100%;display:flex;">
          <DailyTimeRanges locale={mergedProps.locale}></DailyTimeRanges>
          <GroupGrid
            gridComponent={DailyGrid}
            cols={columData2}
            onEventUpdate={onEventUpdateProxy}
            onAddEvent={mergedProps.onAddEvent}
            initialDate={mergedProps.initialDate}
            hasCrossGridDrag={false}
          />
        </div>
      </div>
    </>
  )
}
