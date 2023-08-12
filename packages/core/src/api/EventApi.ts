export interface EventApi {
  // Current Date
  // -----------------------------------------------------------------------------------------------------------------
  start: Date
  end: Date
  name: string
  id: any

  getEventLength(): any
  isAllDay(): any
}
//   constructor(start: Date, end: Date, name: string,id:any) {
//     this.startDate = start
//     this.endDate = end
//     this.eventName = name
//     this.id = id
//   }
