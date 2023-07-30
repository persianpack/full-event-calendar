import type { DateInput } from './structs'

export interface CalendarApi {
  // Current Date
  // -----------------------------------------------------------------------------------------------------------------

  prevDay(): void
  nextDay(): void
  //  prevYear(): void
  // nextYear(): void

  today(): void
  render(): void
  // gotoDate(zonedDateInput: DateInput): void
  //  incrementDate(deltaInput: DurationInput): void
  getDate(): Date

  // formatDate(day: DateInput, calnedar: any, ): string
  // formatRange(d0: DateInput, d1: DateInput, settings: any): string // TODO: settings type
  //formatIso(d: DateInput, omitTime?: boolean): string

  // Public Events API
  // -----------------------------------------------------------------------------------------------------------------

  // addEvent(eventInput: EventInput, sourceInput?: EventSourceApi | string | boolean): EventApi | null
  // getEventById(id: string): EventApi | null
  //getEvents(): EventApi[]
  //removeAllEvents(): void
}
