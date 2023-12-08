export { DailyGrid } from './lib/DailyGrid.tsx'
export { DailyHeader } from './lib/DailyHeader/DailyHeader.tsx'
import { DailyGrid } from './lib/DailyGrid.tsx'
export { DailyTimeRanges } from './lib/DailyTimeRanges/DailyTimeRanges.tsx'
export type { DailyGridProps } from './lib/DailyGrid.tsx'
export const DailyGridPlugin = {
  code: DailyGrid,
  name: 'daily',
  type: 'grid'
}
