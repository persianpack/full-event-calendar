import { EventClass, SourceEvent } from '@full-event-calendar/shared-ts'
import { convertTZ } from './TimeZone'

export class EventImpl implements EventClass {
  start: Date
  end: Date
  name: string
  id: any
  duration: number // duration is in minuts
  sourceEvent: SourceEvent

  constructor(eventData: SourceEvent) {
    this.start = eventData.start
    this.end = eventData.end
    this.name = eventData.name
    this.id = eventData.id
    this.sourceEvent = eventData
    this.duration = Math.round((eventData.end.getTime() - eventData.start.getTime()) / 60000)
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

  isIncludedInAday(date: Date) {
    const condition = this.doesEventStartOn(date)
    const condition2 = this.doesEventEndOn(date)
    const condition3 = this.start < date && this.end > date
    return condition3 || condition2 || condition
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
    let heightInPersentage
    if (calcFromZero) {
      heightInPersentage = ((this.end.getHours() * 60 + this.end.getMinutes()) / 60) * 100
    } else {
      heightInPersentage = (this.duration / 60) * 100
    }
    return `;height:  ${heightInPersentage}%;`
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
    const FloorStart1 = new Date(event.start)
    const FloorStart2 = new Date(this.start)
    FloorStart1.setHours(0, 0, 0)
    FloorStart2.setHours(0, 0, 0)

    const FloorEnd1 = new Date(event.end)
    const FloorEnd2 = new Date(this.end)
    FloorEnd1.setHours(23, 59, 59)
    FloorEnd2.setHours(23, 59, 59)

    return FloorStart1 < FloorEnd2 && FloorEnd1 > FloorStart2
  }

  convertDateByTimeZone(tz: string) {
    this.start = convertTZ(this.start, tz)
    this.end = convertTZ(this.end, tz)
  }

  private getEventTopPositionIng() {
    const eventColHeightInPersentage = (this.start.getHours() + this.start.getMinutes() / 60) * 100
    return `top: ${eventColHeightInPersentage}%`
  }
}

export type CalendarEvent = typeof EventImpl
