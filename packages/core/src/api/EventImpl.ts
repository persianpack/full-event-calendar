import { EventClass, SourceEvent } from '@full-event-calendar/shared-ts'
import { convertTZ } from '../utils'

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

  isAllDay(): any {
    return ''
  }

  calculatePositionAndHeight() {
    return `${this.getEventColHeight()};${this.getEventHeigth()};`
  }

  checkOverLap(event: EventImpl) {
    const start1 = event.start
    const end1 = event.end
    const start2 = this.start
    const end2 = this.end
    return start1 < end2 && end1 > start2
  }

  convertDateByTimeZone(tz: string) {
    this.start = convertTZ(this.start, tz)
    this.end = convertTZ(this.end, tz)
  }

  private getEventHeigth() {
    const heightInPersentage = (this.duration / 60) * 100
    return `height:  ${heightInPersentage}%;`
  }

  private getEventColHeight() {
    const eventColHeightInPersentage = (this.start.getHours() + this.start.getMinutes() / 60) * 100
    return `top: ${eventColHeightInPersentage}%`
  }
}

export type CalendarEvent = typeof EventImpl
