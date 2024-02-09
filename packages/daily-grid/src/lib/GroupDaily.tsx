import { FComponent, Group, SourceEvent } from '@full-event-calendar/shared-ts'
import { DailyGrid, DailyGridProps, dailyDefaultProps } from './DailyGrid'
import { GroupGrid } from '@full-event-calendar/group-grid'
import './GroupDaily.scss'
import { DailyTimeRanges } from '..'
import { GroupDailyHeader } from './GroupDailyHeader/GroupDailyHeader'
import { DailyCols } from './DailyCols'
import { mergeProps } from 'solid-js'
import { useCalenderContainerState } from '@full-event-calendar/utils'

export interface GroupDailyProps extends DailyGridProps {
  groups?: Group[]
}
const defaultProps = {
  ...dailyDefaultProps,
  groups: []
}

export interface columData {
  props: any
}

export const GroupDaily: FComponent<GroupDailyProps> = (props) => {

  const mergedProps = mergeProps(defaultProps, props)
  const container = useCalenderContainerState()
  function onDateChange(d: Date) {
    mergedProps.onDateChange(d)
  }

  const { columData } = DailyCols(mergedProps,onDateChange)

  function addEventProxy(event: SourceEvent, groupId?: number) {
    if (groupId) {
      mergedProps.onAddEvent({ ...event, ...{ groups: [groupId] } })
    } else {
      mergedProps.onAddEvent(event)
    }
  }
  
  return (
    <>
      <GroupDailyHeader
       slotRenderStore={mergedProps.slotRenderStore} 
       columData={columData}
       onDateChange={mergedProps.onDateChange}
       locale={mergedProps.locale} 
       initialDate={mergedProps.initialDate} />
      <div class="scroll-wrapper " id="scroll-wrapper">
        <div style="position: absolute;width:100%;display:flex;">
          <DailyTimeRanges locale={mergedProps.locale}></DailyTimeRanges>
          <GroupGrid
            gridComponent={DailyGrid}
            cols={columData}
            onEventUpdate={mergedProps.onEventUpdate}
            onAddEvent={addEventProxy}
            initialDate={mergedProps.initialDate}
            hasCrossGridDrag={false}
            container={container}
          />
      </div>
      </div>
    </>
  )
}
