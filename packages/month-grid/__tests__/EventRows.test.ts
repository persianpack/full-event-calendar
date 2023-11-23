import { expect, test } from 'vitest'
import { getMonthRows } from '../src'
import { events } from '@full-event-calendar/test-events'
import { ArraySplitIntoChunks, sortEventByStart, EventImpl, getCalendarMonthDays } from '@full-event-calendar/utils'

test('getMonthRows', () => {
  const arrList = events.map((ev) => new EventImpl(ev))
  const filteredEvents = sortEventByStart(arrList)
  const monthCalendarObject = getCalendarMonthDays(new Date('Thu Aug 10 2023 15:00:0'), 'persian')

  const monthDateRows = ArraySplitIntoChunks(monthCalendarObject, 7)
  const monthRowGridData = getMonthRows(monthDateRows, filteredEvents)
  expect(monthRowGridData).toMatchSnapshot()
})
