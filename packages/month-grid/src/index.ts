export { getExtraRows } from './utils/EventPosition'
export { MonthGrid } from './lib/MonthGrid'
import { MonthGrid } from './lib/MonthGrid'
export { addEventsToRows, getMonthRows } from './utils/EventRows'
export { MonthEvent } from './lib/MonthEvent/MonthEvent'
export { useMonthEventDragging } from './utils/EventDragging'

export const MonthGridPlugin = {
  code: MonthGrid,
  name: 'month',
  type: 'grid'
}
