import { EventClass } from '@full-event-calendar/shared-ts'

interface ColList {
  [key: number]: EventClass[]
}
export function createLinesOfColome(eventList: EventClass[]) {
  const eventListCopy = [...eventList]

  eventListCopy.sort(function (a, b) {
    return new Date(a.start).valueOf() - new Date(b.start).valueOf()
  })

  const colList: ColList = {
    1: []
  }

  function findAvalibaleCol(colNumber: number, event: EventClass): number {
    if (!colList[colNumber]) {
      colList[colNumber] = []
    }

    const colEvents = colList[colNumber]
    let isColAvalibale = true

    for (let i = 0; i < colEvents.length; i++) {
      if (event.checkOverLap(colEvents[i])) {
        isColAvalibale = false
        break
      }
    }

    if (!isColAvalibale) {
      return findAvalibaleCol(colNumber + 1, event)
    }

    return colNumber
  }

  for (let i = 0; i < eventListCopy.length; i++) {
    const num = findAvalibaleCol(1, eventListCopy[i])
    colList[num].push(eventListCopy[i])
  }

  return colList
}
