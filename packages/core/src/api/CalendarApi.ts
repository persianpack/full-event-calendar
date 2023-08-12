import type { DateInput } from './structs'
import useRedux from '../store/useRedux'
import reduxStore from '../store/store'
import actions from '../store/actions'
import { CalendarApi } from './CalendarImpl'
interface EventCalendarOptions {
  events: any[]
  // timeZone ?: string;
  // dailyGridOptions : dailyGridOptions;
  // calnedarMode : CalnedarMode
}
export class EventCalendar implements CalendarApi {
  protected storeManager: any = null
  //   private dailyGridOptions : PickType<EventCalendarOptions,'dailyGridOptions'>;
  private storeActions: any
  constructor(eventCalendarOptions: EventCalendarOptions) {
    // super()
    // this.targetElement = targetElement
    // this.dailyGridOptions = eventCalendarOptions.dailyGridOptions
    // this.timeZone = eventCalendarOptions.timeZone

    this.storeManager = useRedux(reduxStore, actions)
    const self = this
    // setTimeout(() => {
    //   self.storeManager[1].setLists(eventCalendarOptions.events)
    // }, 1233);
    this.setLists(eventCalendarOptions.events)
  }
  prevDay(): void {
    // dispatch to store manager
  }
  nextDay(): void {
    // dispatch to store manager
  }
  getDate(): Date {
    return new Date()
  }
  private dispatch(actionData: any) {
    this.storeManager[1].directDispatch(actionData)
  }
  setLists(lists: any) {
    this.dispatch({ type: 'SET_ALL_EVENTS', list: lists })
  }

  today(): void {}
}
