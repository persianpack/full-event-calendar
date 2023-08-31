import { EventApi } from './EventApi'

export class EventImpl implements EventApi {
  start: Date
  end: Date
  name: string
  id: any

  constructor(eventData: any) {
    this.start = eventData.start
    this.end = eventData.end
    this.name = eventData.name
    this.id = eventData.id
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

  private getEventHeigth() {
    const minuteCount =
      this.end.getHours() * 60 + this.end.getMinutes() - (this.start.getHours() * 60 + this.start.getMinutes())
    const heightInPersentage = (minuteCount / 60) * 100
    return `height:  ${heightInPersentage}%;`
  }

  private getEventColHeight() {
    const eventColHeightInPersentage = (this.start.getHours() + this.start.getMinutes() / 60) * 100
    return `top: ${eventColHeightInPersentage}%`
  }
}
