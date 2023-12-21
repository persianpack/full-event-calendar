import { EventClass } from '@full-event-calendar/shared-ts'
import { extractMonthDates, filterEventsByDateRange, getEventsInDate, getWeekDates, sortEventByStart } from '@full-event-calendar/utils'


interface Handle {
  proccess: (eventList: EventClass[], initDate: Date, calendar?: string) => EventClass []
}

class Daily implements Handle {
  proccess(eventList: EventClass[], initDate: Date) {
    return getEventsInDate(eventList, initDate)
  }
}

class Weekly implements Handle {
  proccess(eventList: EventClass[], initDate: Date) {
    const weekDates = getWeekDates(initDate)
    return filterEventsByDateRange(eventList, weekDates[0], weekDates[weekDates.length - 1]) as EventClass []
  }
}

class Month implements Handle {
  proccess(eventList: EventClass[], initDate: Date, calendar: string = 'gregory') {
    const monthDates = extractMonthDates(initDate, calendar)
    return filterEventsByDateRange(eventList, monthDates[0].date, monthDates[monthDates.length - 1].date) as EventClass []
  }
}

type Modes = 'day' | 'week' | 'month'
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
      case 'month':
        this.handle = new Month()
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

  filter(eventList: EventClass[]) :EventClass[]{
    return sortEventByStart(this.handle.proccess(eventList, this.initialDate, this.calendar))
  }
}