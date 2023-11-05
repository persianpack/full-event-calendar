import { EventClass } from '@full-event-calendar/shared-ts'
import { filterEventsByDateRange } from '@full-event-calendar/utils'

export function getMonthRows(res: any, filteredEvents3: any) {
  const finalRes = []
  const finsdis = []

  for (let i = 0; i < res.length; i++) {
    let renges = filterEventsByDateRange(filteredEvents3, res[i][0].date, res[i][6].date)

    finalRes.push(renges)
  }

  for (let i = 0; i < finalRes.length; i++) {
    const mRow = finalRes[i] as EventClass[]
    let rooo = {}
    for (let j = 0; j < mRow.length; j++) {
      const element = mRow[j]
      backRwppaer(rooo, element)
    }
    finsdis.push(rooo)
  }

  return finsdis
}

function backRwppaer(rows: any, event: EventClass) {
  let hasFount = false
  function backTrackRow(rows: any, startP: number, event: EventClass) {
    if (hasFount) return
    if (!rows[startP]) {
      rows[startP] = []
    }
    const arr = rows[startP]
    if (isAvalibleInRow(arr, event)) {
      hasFount = true
      rows[startP].push(event)
    } else {
      backTrackRow(rows, startP + 1, event)
    }
  }
  backTrackRow(rows, 0, event)
}

function isAvalibleInRow(Events: EventClass[], Event: EventClass) {
  let isAvalible = true
  for (let i = 0; i < Events.length; i++) {
    const element = Events[i]
    if (element.checkAllDayOverLap(Event)) {
      isAvalible = false
      break
    }
  }
  return isAvalible
}
