import { EventClass } from '@full-event-calendar/shared-ts'

interface ColList {
  [key: number]: EventClass[]
}
export function createLinesOfColum(eventList: EventClass[]) {
  const eventListCopy = [...eventList]

  eventListCopy.sort(function (a, b) {
    return new Date(a.start).valueOf() - new Date(b.start).valueOf()
  })
  let currentCol = 0
  let colList: ColList[] = [
    {
      1: []
    }
  ]

  function isRowEmptyForEvent(baseEvent: EventClass) {
    let hasFound = false
    for (const [key, value] of Object.entries(colList[currentCol])) {
      if (key === String(1)) continue
      for (let index = 0; index < value.length; index++) {
        const event = value[index] as EventClass
        if (event.checkOverLap(baseEvent)) {
          hasFound = true
          break
        }
      }
      if (hasFound) break
    }
    return !hasFound
  }
  function findAvalibaleCol(colNumber: number, event: EventClass): number {
    if (!colList[currentCol][colNumber]) {
      colList[currentCol][colNumber] = []
    }

    const colEvents = colList[currentCol][colNumber]
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
    if (num === 1) {
      // console.log(isRowEmptyForEvent(eventListCopy[i]),eventListCopy[i])
      const isNewGroup = isRowEmptyForEvent(eventListCopy[i])
      if (isNewGroup) {
        currentCol++
      }
    }
    if (!colList[currentCol]) {
      colList.push({
        1: []
      })
    }
    colList[currentCol][num].push(eventListCopy[i])
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

export function lookForAvailableWith(colList: ColList, event: EventClass, colStart: number) {
  const arr = Object.values(colList)
  let finalWith = 1
  for (let index = colStart; index < arr.length; index++) {
    const colume = arr[index]
    const isoK = isEventAvalibelInCol(colume, event)
    if (isoK) {
      finalWith++
      // console.log(`for id : ${event.id}`, index, isoK)
    } else {
      break
    }
  }
  return ` ;width : ${finalWith}00%`
}
