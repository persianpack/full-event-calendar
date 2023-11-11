import { EventClass } from '@full-event-calendar/shared-ts'
import { filterEventsByDateRange } from '@full-event-calendar/utils'

interface dateObjects {
  date: Date
  year: string | undefined
  month: string | undefined
  day: string | undefined
}

export function getMonthRows(res: dateObjects[][], filteredEvents3: EventClass[]) {
  const rowEvents = []
  const monthRows = []

  for (let i = 0; i < res.length; i++) {
    const events = filterEventsByDateRange(filteredEvents3, res[i][0].date, res[i][6].date)
    rowEvents.push(events)
  }

  for (let i = 0; i < rowEvents.length; i++) {
    const mRow = rowEvents[i] as EventClass[]
    let rowData = {}
    addEventsToRows(mRow, rowData)

    monthRows.push(rowData)
  }

  return monthRows
}

export function addEventsToRows(events: EventClass[], rowData: any) {
  for (let j = 0; j < events.length; j++) {
    const element = events[j]
    backTrackRows(rowData, element)
  }
}

function backTrackRows(rows: any, event: EventClass) {
  let hasFount = false
  function backTrackRow(rows: any, startP: number, event: EventClass) {
    if (hasFount) return
    if (!rows[startP]) {
      rows[startP] = []
    }
    const arr = rows[startP]
    if (isAvailableInRow(arr, event)) {
      hasFount = true
      rows[startP].push(event)
    } else {
      backTrackRow(rows, startP + 1, event)
    }
  }
  backTrackRow(rows, 0, event)
}

function isAvailableInRow(Events: EventClass[], Event: EventClass) {
  let isRowAvailable = true
  for (let i = 0; i < Events.length; i++) {
    const element = Events[i]
    if (element.checkAllDayOverLap(Event)) {
      isRowAvailable = false
      break
    }
  }
  return isRowAvailable
}
