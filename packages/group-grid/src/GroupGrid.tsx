// Types
import { EventClass, FComponent } from '@full-event-calendar/shared-ts'
// Solid.js
import { Dynamic } from 'solid-js/web'
import { createMemo, mapArray, mergeProps } from 'solid-js'
// Utils
import { whichColumWasDropped } from './utils/col'
import { useCalenderContainerState } from '@full-event-calendar/utils'

interface GroupGridProps {
  initialDate?: Date
  cols?: columItem[]
  onEventUpdate?: (a: EventClass, colNumber: number, currCol: number, isDragend: boolean) => void
  onAddEvent?: (event: EventClass) => void
  gridComponent: any
  hasCrossGridDrag?: boolean
  container?: any
}

interface columItem {
  props?: any
}

const defaultProps = {
  events: [],
  initialDate: new Date(),
  cols: [],
  hasCrossGridDrag: true,
  onEventUpdate: () => {},
  onAddEvent: () => {}
}

export const GroupGrid: FComponent<GroupGridProps> = (props) => {
  let groupContainerRef
  const mergedProps = mergeProps(defaultProps, props)
  //@ts-ignore
  let colIds = mergedProps.cols.map((_, i) => `cl-${i}`) as string[]
  const container = props.container ?? useCalenderContainerState()
  function eventUpdateProxy(eventSource: EventClass, draggedData: any, startingColId: number) {
    // calculate  which colum the event was dropped in
    if (draggedData?.isDragg) {
      const colNumber = whichColumWasDropped(colIds, draggedData.mouseX, container!)
      // mergedProps.onEventUpdate(eventSource, startingColId, startingColId, false)
      mergedProps.onEventUpdate(eventSource, colNumber, startingColId, true)
    } else {
      mergedProps.onEventUpdate(eventSource, startingColId, startingColId, false)
    }
  }
  const mappedCols = createMemo(
    mapArray(
      () => mergedProps.cols,
      (item, i) => {
        return (
          <Dynamic
            component={mergedProps.gridComponent}
            onEventUpdate={(a: any, b: any) => {
              eventUpdateProxy(a, b, i())
            }}
            onAddEvent={mergedProps.onAddEvent}
            id={colIds[i()]}
            container={mergedProps.hasCrossGridDrag ? 'fec-group-grid-container' : ''}
            {...item.props}
          ></Dynamic>
        )
      }
    )
  )
  return (
    <>
      <div style="display:flex;width:100%;flex: 1;" id="fec-group-grid-container" ref={groupContainerRef}>
        {mappedCols()}
      </div>
    </>
  )
}
