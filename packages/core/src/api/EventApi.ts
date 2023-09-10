import { EventImpl } from './EventImpl'

export interface EventApi extends SourceEvent {
  // Current Date
  // -----------------------------------------------------------------------------------------------------------------

  duration: number
  sourceEvent: SourceEvent
  getEventLength(): any
  isAllDay(): any
  calculatePositionAndHeight(): string
  checkOverLap(event: EventImpl): Boolean
  // checkOverLap(event: Event): booleanc
  // getEventHeigth(): string
  // getEventColHeight(): string
}
//   constructor(start: Date, end: Date, name: string,id:any) {
//     this.startDate = start
//     this.endDate = end
//     this.eventName = name
//     this.id = id
//   }
