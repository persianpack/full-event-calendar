import { EventClass } from '@full-event-calendar/shared-ts'
import { getEventsInDate } from '@full-event-calendar/utils'
import { createMutable } from 'solid-js/store'

interface ColumData {
  props: any
}

abstract class Group {
  group: ColumData[] = createMutable([])

  addRow(row: ColumData) {
    this.group.push(row)
  }
  editRow(row: any, index: number) {
    for (let key in row) {
      this.group[index].props[key] = row[key]
    }
  }
}

class WeeklyGroup extends Group {
  createGroup(mergedProps: any, onDateChange: any) {
    let iniDay = new Date(mergedProps.initialDate)
    iniDay.setDate(iniDay.getDate() - iniDay.getDay())

    for (let index = 0; index < 7; index++) {
      const y = { props: { events: [], initialDate: null, locale: null, timeZone: null, calendar: null } }
      this.addRow(y)
    }
  }
  updateGroups(mergedProps: any) {
    let iniDay = new Date(mergedProps.initialDate)
    iniDay.setDate(iniDay.getDate() - iniDay.getDay())

    for (let index = 0; index < 7; index++) {
      const y = { props: { events: [], initialDate: null, locale: null, timeZone: null, calendar: null } }
      this.addRow(y)

      const dayNumber = iniDay.getDay()
      const extractedEvents = getEventsInDate(mergedProps.events, new Date(iniDay))
      this.editRow(
        {
          initialDate: new Date(iniDay),
          gridDate: new Date(iniDay),
          locale: mergedProps.locale,
          timeZone: mergedProps.timeZone,
          calendar: mergedProps.calendar,
          gridHeight: mergedProps.gridHeight,
          onDateChange: mergedProps.onDateChange
        },
        index
      )
      iniDay.setDate(iniDay.getDate() + 1)
    }
  }
}
