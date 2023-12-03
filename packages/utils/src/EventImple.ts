import { EventClass, SourceEvent } from '@full-event-calendar/shared-ts'
import { convertTZ } from './TimeZone'
import { ceilDate, floorDate } from '.'

export class EventImpl implements EventClass {
  id: string | number
  start: Date
  end: Date
  name: string
  duration: number // duration is in minutes
  sourceEvent: SourceEvent
  color: string

  constructor(eventData: SourceEvent) {
    this.start = eventData.start
    this.end = eventData.end
    this.name = eventData.name
    this.id = eventData.id
    this.sourceEvent = eventData
    this.duration = Math.round((eventData.end.getTime() - eventData.start.getTime()) / 60000)
    this.color = eventData.color || '#ff5280'
  }

  getEventLength(): any {
    return ''
  }

  isAllDay(): boolean {
    return this.duration / 60 >= 24
  }

  countDays(): number {
    return this.duration / 60 / 24
  }

  doesEventStartOn(date: Date) {
    return (
      this.start.getFullYear() === date.getFullYear() &&
      this.start.getMonth() === date.getMonth() &&
      this.start.getDate() === date.getDate()
    )
  }

  doesEventEndOn(date: Date) {
    return (
      this.end.getFullYear() === date.getFullYear() &&
      this.end.getMonth() === date.getMonth() &&
      this.end.getDate() === date.getDate()
    )
  }

  calculateHeight(calcFromZero: boolean = false) {
    // this is actually event in hours times 100
    let heightInPercentage
    if (calcFromZero) {
      heightInPercentage = ((this.end.getHours() * 60 + this.end.getMinutes()) / 60) * 100
    } else {
      heightInPercentage = (this.duration / 60) * 100
    }
    return `;height:${heightInPercentage}%;`
  }

  calculatePositionTop() {
    return `${this.getEventTopPositionIng()}`
  }

  isIncludedInaRange(date1: Date, date2: Date) {
    return this.start < date2 && this.end > date1
  }

  checkOverLap(event: EventImpl) {
    const start1 = event.start
    const end1 = event.end
    const start2 = this.start
    const end2 = this.end
    return start1 < end2 && end1 > start2
  }

  checkAllDayOverLap(event: EventImpl) {
    // this is for monthly .. to check if events overlap in full width of container
    const FloorStart1 = floorDate(event.start)
    const FloorStart2 = floorDate(this.start)

    const FloorEnd1 = ceilDate(event.end)
    const FloorEnd2 = ceilDate(this.end)

    return FloorStart1 < FloorEnd2 && FloorEnd1 > FloorStart2
  }

  convertDateByTimeZone(tz: string) {
    this.start = convertTZ(this.sourceEvent.start, tz)
    this.end = convertTZ(this.sourceEvent.end, tz)
  }

  private getEventTopPositionIng() {
    const eventColHeightInPercentage = (this.start.getHours() + this.start.getMinutes() / 60) * 100
    return `;top:${eventColHeightInPercentage > 2358 ? 2358 : eventColHeightInPercentage}%`
  }
}

export type CalendarEvent = typeof EventImpl
