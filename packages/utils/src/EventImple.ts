import { EventClass, SourceEvent } from '@full-event-calendar/shared-ts'
import { convertTZ } from './TimeZone'
import { ceilDate, floorDate } from '.'

let uniqId = 10

export class EventImpl implements EventClass {
  id: string | number
  start: Date
  end: Date
  name: string
  duration: number // duration is in minutes
  sourceEvent: SourceEvent
  color: string
  groups:number[]|string[]
  calendarId:string
  constructor(eventData: SourceEvent) {
    this.start = eventData.start
    this.end = eventData.end
    this.name = eventData.name
    this.id = eventData.id
    this.sourceEvent = eventData
    this.duration = Math.round((eventData.end.getTime() - eventData.start.getTime()) / 60000)
    this.color = eventData.color || 'var(--primary)'
    this.groups = eventData.groups || []
    this.calendarId = 'fec-id-' + uniqId
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
    return `;height:${this.calculateHeightPersentage(calcFromZero)}%;`
  }
  calculateHeightPersentage(calcFromZero: boolean = false){
    let heightInPercentage
    if (calcFromZero) {
      heightInPercentage = ((this.end.getHours() * 60 + this.end.getMinutes()) / 60) * 100
    } else {
      heightInPercentage = (this.duration / 60) * 100
    }
    return heightInPercentage
  }
  calculatePositionTop() {
    return `;top:${this.getEventTopPositionIng()}%`
    // return `;top:${eventColHeightInPercentage > 2358 ? 2358 : eventColHeightInPercentage}%`
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
  updateEventDetails(event: SourceEvent): void {
    if(event.start){
      this.start = event.start
      this.duration = Math.round((event.end.getTime() - event.start.getTime()) / 60000)
    }
    if(event.end){
      this.end = event.end
      this.duration = Math.round((event.end.getTime() - event.start.getTime()) / 60000)
    }
    if(event.name){
      this.name = event.name
    }
    if(event.groups){
      this.groups = event.groups
    }
    if(event.color){
      this.color = event.color 
    }
    // this.id = eventData.id
    // this.sourceEvent = eventData
    
  }
  checkAllDayOverLap(event: EventImpl) {
    // this is for monthly .. to check if events overlap in full width of container
    let FloorStart1 = floorDate(event.start)
    let FloorStart2 = floorDate(this.start)


    let FloorEnd1 = ceilDate(event.end)
    let FloorEnd2 = ceilDate(this.end)

    if(!this.isAllDay()&& !this.doesEventEndOn(this.start)){
      FloorEnd2 = ceilDate(this.start)
    } 
    if(!event.isAllDay()&& !event.doesEventEndOn(event.start)){
       FloorEnd1 = ceilDate(event.start)
     } 

    return FloorStart1 < FloorEnd2 && FloorEnd1 > FloorStart2
  }

  convertDateByTimeZone(tz: string) {
    this.start = convertTZ(this.sourceEvent.start, tz)
    this.end = convertTZ(this.sourceEvent.end, tz)
  }

  getEventTopPositionIng() {
    const eventColHeightInPercentage = (this.start.getHours() + this.start.getMinutes() / 60) * 100
    return eventColHeightInPercentage > 2358 ? 2358 : eventColHeightInPercentage
  }

  getIncludedDays() {
    let dates = new Date(this.start)
    let x: any = [new Date(dates)]
    while (!this.doesEventEndOn(dates)) {
      dates.setDate(dates.getDate() + 1)
      x.push(new Date(dates))
    }
    return x
  }
}

export type CalendarEvent = typeof EventImpl
