import { Event } from '../api/EventImpl'

interface ColList {
  [key: number]: Event[]
}

function createLinesOfColome(eventList: Event[]) {
  const eventListCopy = [...eventList]

  eventListCopy.sort(function (a, b) {
    return new Date(a.start).valueOf() - new Date(b.start).valueOf()
  })

  const colList: ColList = {
    1: []
  }

  function findAvalibaleCol(colNumber: number, event: Event): number {
    if (!colList[colNumber]) {
      colList[colNumber] = []
    }

    const colEvents = colList[colNumber]
    let isColAvalibale = true

    for (let i = 0; i < colEvents.length; i++) {
      if (doEventsOverlap(event, colEvents[i])) {
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

function doEventsOverlap(event1: Event, event2: Event) {
  const start1 = event1.start
  const end1 = event1.end
  const start2 = event2.start
  const end2 = event2.end

  return start1 < end2 && end1 > start2
}

function getEventHeigth(start: Date, end: Date) {
  const minuteCount = end.getHours() * 60 + end.getMinutes() - (start.getHours() * 60 + start.getMinutes())
  const heightInPersentage = (minuteCount / 60) * 100
  return `height:  ${heightInPersentage}%;`
}

function getEventColHeight(top: Event) {
  const eventColHeightInPersentage = (top.start.getHours() + top.start.getMinutes() / 60) * 100
  return `top: ${eventColHeightInPersentage}%;${getEventHeigth(top.start, top.end)}`
}
