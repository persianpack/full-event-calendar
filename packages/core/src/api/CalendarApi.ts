import type { Dispatch } from 'redux'
export interface CalendarApi {
  // Current Date
  // -----------------------------------------------------------------------------------------------------------------
  storeManager: CalendarState
  storeDispatch: Dispatch<StoreActions>
  prevDay(): any
  nextDay(): any
  getDate(): any
  today(): any
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
