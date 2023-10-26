import { DraggeddData, EventClass, FComponent, SourceEvent } from '@full-event-calendar/shared-ts'
import { Dynamic } from 'solid-js/web'

import { createMemo, createUniqueId, mapArray, mergeProps } from 'solid-js'
import { DailyGrid } from '@full-event-calendar/daily-grid'

const defaultProps = {
  events: [],
  initialDate: new Date(),
  columes: [],
  onEventUpdate: () => {}
}

interface GroupGridpProps {
  initialDate?: Date
  columes?: columeItem[]
  onEventUpdate?: (a: SourceEvent, colNumber: number, currCol: number, isDraged: boolean) => void
}

interface columeItem {
  events: EventClass[]
  props?: any
}
function rex(containersP: string[], poinyX: number): number {
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

export const GroupGrid: FComponent<GroupGridpProps> = (props) => {
  let groupConatainerRef
  const mergedPorps = mergeProps(defaultProps, props)
  //@ts-ignore
  let colIds = mergedPorps.columes.map(() => createUniqueId())

  function asjdoiasd(a: SourceEvent, b: DraggeddData, curCol: number) {
    if (b?.itemRect) {
      let xxx = (b.itemRect?.left + b.itemRect?.right) / 2
      const colNumber = rex(colIds, xxx)
      mergedPorps.onEventUpdate(a, colNumber, curCol, true)
    } else {
      mergedPorps.onEventUpdate(a, curCol, curCol, false)
    }
  }

  const maopoed = createMemo(
    mapArray(
      () => mergedPorps.columes,
      (item, i) => {
        return (
          <Dynamic
            component={DailyGrid}
            onEventUpdate={(a: any, b: any) => {
              asjdoiasd(a, b, i())
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
        {maopoed()}
      </div>
    </>
  )
}
