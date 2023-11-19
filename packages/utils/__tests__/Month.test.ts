import { describe, expect, test } from 'vitest'
import { getCalendarMonthDays } from '../src'

test('test month object', () => {
  const date1 = new Date(' Aug 01 2001 01:00:00')

  expect(getCalendarMonthDays(date1, 'persian')).toMatchSnapshot()
  expect(getCalendarMonthDays(date1)).toMatchSnapshot()
})
