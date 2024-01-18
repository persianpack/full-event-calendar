export { DailyGrid } from './lib/DailyGrid.tsx'
export { DailyHeader } from './lib/GroupDailyHeader/GroupItemHeader/DailyHeader/DailyHeader.tsx'
// import { DailyGrid } from './lib/DailyGrid.tsx'
import { GroupDaily } from './lib/GroupDaily.tsx'

export { DailyTimeRanges } from './lib/DailyTimeRanges/DailyTimeRanges.tsx'
export type { DailyGridProps } from './lib/DailyGrid.tsx'
export const DailyGridPlugin = {
  code: GroupDaily,
  name: 'daily',
  type: 'grid'
}
