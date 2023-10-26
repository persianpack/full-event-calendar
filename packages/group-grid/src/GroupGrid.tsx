import { DraggeddData, EventClass, FComponent, SourceEvent } from '@full-event-calendar/shared-ts'
import { Dynamic } from 'solid-js/web'
import { createMemo, createUniqueId, mapArray, mergeProps } from 'solid-js'
import { DailyGrid } from '@full-event-calendar/daily-grid'

interface GroupGridpProps {
  initialDate?: Date
  columes?: columeItem[]
  onEventUpdate?: (a: SourceEvent, colNumber: number, currCol: number, isDraged: boolean) => void
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
  let colIds = mergedPorps.columes.map(() => createUniqueId())

  function eventUpdateProxy(a: SourceEvent, b: DraggeddData, curCol: number) {
    if (b?.itemRect) {
      let dropX = (b.itemRect?.left + b.itemRect?.right) / 2
      const colNumber = whichColumeWasDropped(colIds, dropX)
      mergedPorps.onEventUpdate(a, colNumber, curCol, true)
    } else {
      mergedPorps.onEventUpdate(a, curCol, curCol, false)
    }
  }

  const mappedColumes = createMemo(
    mapArray(
      () => mergedPorps.columes,
      (item, i) => {
        return (
          <Dynamic
            component={DailyGrid}
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

function whichColumeWasDropped(containersP: string[], poinyX: number): number {
  let result = 0

  for (let i = 0; i < containersP.length; i++) {
    const containerNode = document.getElementById(containersP[i])
    if (!containerNode) return result
    const containerRect = containerNode.getBoundingClientRect()
    const isIwith = containerRect.left < poinyX && containerRect.right > poinyX
    if (isIwith) {
      result = i
      break
    }
  }

  return result
}
