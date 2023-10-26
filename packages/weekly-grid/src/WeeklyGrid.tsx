import { EventClass, FComponent, SourceEvent } from '@full-event-calendar/shared-ts'
import { createMutable } from 'solid-js/store'
import { batch, createEffect, createMemo, mergeProps } from 'solid-js'
import { GroupGrid } from '@full-event-calendar/group-grid'
import { getEventForAdate } from '@full-event-calendar/utils'

const defaultProps = {
  events: [],
  initialDate: new Date(),
  onEventUpdate: () => {}
}

interface WeeklyGridProps {
  events?: EventClass[]
  initialDate?: Date
  onEventUpdate?: (event: any) => void
}

export const WeeklyGrid: FComponent<WeeklyGridProps> = (props) => {
  const mergedPorps = mergeProps(defaultProps, props)

  const columeData: any = createMutable([
    { events: [], props: {} },
    { events: [], props: {} },
    { events: [], props: {} },
    { events: [], props: {} },
    { events: [], props: {} },
    { events: [], props: {} },
    { events: [], props: {} }
  ])

  const generateCols = createMemo(() => {
    console.log('generate week Cols')
    let iniDay = mergedPorps.initialDate
    iniDay.setDate(iniDay.getDate() - iniDay.getDay())
    batch(() => {
      for (let i = 0; i < 7; i++) {
        const dayNumber = iniDay.getDay()
        const evntsInThatDay = () => getEventForAdate(mergedPorps.events, iniDay)
        columeData[dayNumber].events = evntsInThatDay()
        columeData[dayNumber].props.initialDate = new Date(iniDay)
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
      <GroupGrid columes={columeData} onEventUpdate={onEventUpdatePorxy} initialDate={mergedPorps.initialDate} />
    </>
  )
}
