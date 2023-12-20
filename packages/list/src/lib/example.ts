import { EventClass } from '@full-event-calendar/shared-ts'
import { extractMonthsDays, filterEventsByDateRange, getEventsInDate, getWeekDates } from '@full-event-calendar/utils'

interface Handle {
  proccess: (eventList: EventClass[], initDate: Date, calendar?: string) => void
}

class Daily implements Handle {
  proccess(eventList: EventClass[], initDate: Date) {
    return getEventsInDate(eventList, initDate)
  }
}

class Weekly implements Handle {
  proccess(eventList: EventClass[], initDate: Date) {
    const weekDates = getWeekDates(initDate)
    const arr = filterEventsByDateRange(eventList, weekDates[0], weekDates[weekDates.length - 1])
    return arr
  }
}

class Month implements Handle {
  proccess(eventList: EventClass[], initDate: Date, calendar: string = 'gregory') {
    const weekDates = extractMonthsDays(initDate, calendar)
    const arr = filterEventsByDateRange(eventList, weekDates[0].date, weekDates[weekDates.length - 1].date)
    return arr
  }
}

type Modes = 'day' | 'week'
abstract class Filter {
  protected handle: Handle
  constructor(mode: Modes) {
    switch (mode) {
      case 'day':
        this.handle = new Daily()
        break

      case 'week':
        this.handle = new Weekly()
        break
    }
  }
}

export class EventModeFilter extends Filter {
  private calendar: string
  private initialDate: Date
  constructor(mode: Modes, initialDate: Date, calendar: string = 'gregory') {
    super(mode)
    this.calendar = calendar
    this.initialDate = initialDate
  }

  filter(eventList: EventClass[]): void {
    return this.handle.proccess(eventList, this.initialDate, this.calendar)
  }
}

// const listFilterByMode = new eventModeFilter('day')
// listFilterByMode.filter([],new Date())
