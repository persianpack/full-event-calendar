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

function isEventAvalibelInCol(colume: EventClass[], event: EventClass) {
  let isFree = true
  for (let i = 0; i < colume.length; i++) {
    if (event.checkOverLap(colume[i])) {
      isFree = false
      break
    }
  }
  return isFree
}

export function lookworAvalibaleWith(colList: ColList, event: EventClass, colStart: number) {
  const arr = Object.values(colList)
  let finalWith = 1
  for (let index = colStart; index < arr.length; index++) {
    const colume = arr[index]
    const isoK = isEventAvalibelInCol(colume, event)
    if (isoK) {
      finalWith++
      console.log(`for id : ${event.id}`, index, isoK)
    } else {
      break
    }
  }
  return ` ;width : ${finalWith}00%`
}
