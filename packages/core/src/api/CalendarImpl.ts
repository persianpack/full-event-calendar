import useRedux from '../store/useRedux'
import { CalendarApi } from './CalendarApi'
import chatStore from '../store/store'
import { EventApi } from './EventApi'

export class CalendarImpl implements CalendarApi {
  storeManager
  storeDispatch

  // private dailyGridOptions : PickType<EventCalendarOptions,'dailyGridOptions'>;
  constructor(eventCalendarOptions: EventCalendarOptions) {
    const { store, dispatch } = useRedux(chatStore)
    this.storeManager = store
    this.storeDispatch = dispatch
  }

  prevDay() {}
  nextDay() {}
  getDate() {
    return new Date()
  }

  today() {}
}
