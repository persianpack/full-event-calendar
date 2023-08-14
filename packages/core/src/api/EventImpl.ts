import { EventApi } from './EventApi'

export class Event implements EventApi {
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
}
