import { EventClass } from "@full-event-calendar/shared-ts"
import { EventImpl } from "."

export function convertTZ(date: Date, tzString: string) {
  // throw an error in Etc/Unknown
  if (tzString === 'Etc/Unknown') return date
  return new Date((typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', { timeZone: tzString }))
}

export function getEventSourceFromTz(event: EventClass, timeZone: string) {
  const start1 = new Date(event.start)
  event.convertDateByTimeZone(timeZone)
  const start2 = new Date(event.start)
  const diff = start2.getTime() - start1.getTime()

  const newEvent = new EventImpl({
    ...event.sourceEvent,
    ...{
      start: new Date(event.sourceEvent.start.getTime() - diff),
      end: new Date(event.sourceEvent.end.getTime() - diff)
    }
  })
  newEvent.convertDateByTimeZone(timeZone)

  return newEvent
}