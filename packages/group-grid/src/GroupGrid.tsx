// Types
import { DraggedData, EventClass, FComponent, SourceEvent } from '@full-event-calendar/shared-ts'
// Solid.js
import { Dynamic } from 'solid-js/web'
import { createMemo, mapArray, mergeProps } from 'solid-js'
// Utils
import { whichColumWasDropped } from './utils/col'

interface GroupGridProps {
  initialDate?: Date
  cols?: columItem[]
  onEventUpdate?: (a: SourceEvent, colNumber: number, currCol: number, isDragend: boolean) => void
  gridComponent: any
}

interface columItem {
  events: EventClass[]
  props?: any
}

const defaultProps = {
  events: [],
  initialDate: new Date(),
  cols: [],
  onEventUpdate: () => {}
}

export const GroupGrid: FComponent<GroupGridProps> = (props) => {
  let groupContainerRef
  const mergedProps = mergeProps(defaultProps, props)
  //@ts-ignore
  let colIds = mergedProps.cols.map((_, i) => `cl-${i}`) as string[]

  function eventUpdateProxy(eventSource: SourceEvent, draggedData: any, startingColId: number) {
    // calculate  which colum the event was dropped in
    if (draggedData?.isDragg) {
      const colNumber = whichColumWasDropped(colIds, draggedData.mouseX)
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
            events={item.events}
            id={colIds[i()]}
            container="group-grid-container"
            {...item.props}
          ></Dynamic>
        )
      }
    )
  )

  return (
    <>
      <div style="display:flex;" id="group-grid-container" ref={groupContainerRef}>
        {mappedCols()}
      </div>
    </>
  )
}
