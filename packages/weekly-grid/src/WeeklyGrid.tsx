import { EventClass, FComponent, SourceEvent } from '@full-event-calendar/shared-ts'
import { createMutable } from 'solid-js/store'
import { batch, createEffect, createMemo, mergeProps } from 'solid-js'
import { GroupGrid } from '@full-event-calendar/group-grid'
import { getEventForAdate } from '@full-event-calendar/utils'
import { WeeklyAllDayHeader } from './lib/weeklyHeader/WeeklyAllDayHeader'
import type { DailyGridpProps } from '@full-event-calendar/daily-grid'
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

interface columeData {
  events: EventClass[]
  props: DailyGridpProps
}

export const WeeklyGrid: FComponent<WeeklyGridProps> = (props) => {
  const mergedPorps = mergeProps(defaultProps, props)

  const columeData = createMutable([
    { events: [], props: { initialDate: null, locale: null, timeZone: null, calendar: null, showAllDay: false } },
    { events: [], props: { initialDate: null, locale: null, timeZone: null, calendar: null, showAllDay: false } },
    { events: [], props: { initialDate: null, locale: null, timeZone: null, calendar: null, showAllDay: false } },
    { events: [], props: { initialDate: null, locale: null, timeZone: null, calendar: null, showAllDay: false } },
    { events: [], props: { initialDate: null, locale: null, timeZone: null, calendar: null, showAllDay: false } },
    { events: [], props: { initialDate: null, locale: null, timeZone: null, calendar: null, showAllDay: false } },
    { events: [], props: { initialDate: null, locale: null, timeZone: null, calendar: null, showAllDay: false } }
  ]) as any as columeData[]

  console.log('generate week Cols', mergedPorps)

  const generateCols = createMemo(() => {
    let iniDay = mergedPorps.initialDate
    iniDay.setDate(iniDay.getDate() - iniDay.getDay())
    batch(() => {
      for (let i = 0; i < 7; i++) {
        const dayNumber = iniDay.getDay()
        // const evntsInThatDay = () => getEventForAdate(mergedPorps.events, iniDay)
        columeData[dayNumber].events = mergedPorps.events
        columeData[dayNumber].props.initialDate = new Date(iniDay)
        columeData[dayNumber].props.locale = mergedPorps.locale
        columeData[dayNumber].props.timeZone = mergedPorps.timeZone
        columeData[dayNumber].props.calendar = mergedPorps.calendar
        columeData[dayNumber].props.showAllDay = false
        iniDay.setDate(iniDay.getDate() + 1)
      }
    })
  })

  createEffect(generateCols)

  function onEventUpdatePorxy(updatedSourceEvent: SourceEvent, targetCol: number, baseCol: number, isDraged: boolean) {
    // targetCol and baseCol are indexed for which colume was moved in columeData
    const conpt = { ...updatedSourceEvent }
    if (isDraged) {
      conpt.start.setDate(conpt.start.getDate() - (baseCol - targetCol))
      conpt.end.setDate(conpt.end.getDate() - (baseCol - targetCol))
    }

    mergedPorps.onEventUpdate(conpt)
  }

  return (
    <>
      <WeeklyAllDayHeader events={mergedPorps.events} columes={getEachColDate(columeData)} />
      <GroupGrid columes={columeData} onEventUpdate={onEventUpdatePorxy} initialDate={mergedPorps.initialDate} />
    </>
  )
}

function getEachColDate(cols: columeData[]) {
  return cols.map((item) => {
    return item.props.initialDate
  }) as Date[]
}
