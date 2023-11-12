import { DraggeddData, EventClass, FComponent, SourceEvent } from '@full-event-calendar/shared-ts'
import { Dynamic } from 'solid-js/web'
import { createMemo, createUniqueId, mapArray, mergeProps } from 'solid-js'
import { whichColumeWasDropped } from './utils/col'

interface GroupGridpProps {
  initialDate?: Date
  columes?: columeItem[]
  onEventUpdate?: (a: SourceEvent, colNumber: number, currCol: number, isDraged: boolean) => void
  gridComponent: any
}

interface columeItem {
  events: EventClass[]
  props?: any
}

const defaultProps = {
  events: [],
  initialDate: new Date(),
  columes: [],
  onEventUpdate: () => {}
}

export const GroupGrid: FComponent<GroupGridpProps> = (props) => {
  let groupConatainerRef
  const mergedPorps = mergeProps(defaultProps, props)
  //@ts-ignore
  let colIds = mergedPorps.columes.map(() => createUniqueId()) as string[]

  function eventUpdateProxy(eventSource: SourceEvent, draggeData: DraggeddData, startingColId: number) {
    // calculate  which colume the event was dropeed in
    if (draggeData?.itemRect) {
      const colNumber = whichColumeWasDropped(colIds, draggeData.mouseX)
      mergedPorps.onEventUpdate(eventSource, colNumber, startingColId, true)
    } else {
      mergedPorps.onEventUpdate(eventSource, startingColId, startingColId, false)
    }
  }

  const mappedColumes = createMemo(
    mapArray(
      () => mergedPorps.columes,
      (item, i) => {
        return (
          <Dynamic
            component={mergedPorps.gridComponent}
            onEventUpdate={(a: any, b: any) => {
              eventUpdateProxy(a, b, i())
            }}
            events={item.events}
            id={colIds[i()]}
            {...item.props}
          ></Dynamic>
        )
      }
    )
  )

  return (
    <>
      <div style="display:flex;" ref={groupConatainerRef}>
        {mappedColumes()}
      </div>
    </>
  )
}
