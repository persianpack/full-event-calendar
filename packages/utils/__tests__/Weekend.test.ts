import { expect, test } from 'vitest'
import { formatDayNumber, formatWeekDays } from '../src'

test('formatDayNumber ', () => {
  const date10 = new Date(' Aug 09 2001 01:00:00')

  expect(formatDayNumber('en-US', 'persian', 'asia/Tehran', date10)).toBe('18')
  expect(formatDayNumber('fa-IR', 'persian', 'asia/Tehran', date10)).toBe('۱۸')
  expect(formatDayNumber('fa-IR', 'gregory', 'asia/Tehran', date10)).toBe('۹')
  expect(formatDayNumber('en-US', 'gregory', 'asia/Tehran', date10)).toBe('9')
})

test('formatWeekDays ', () => {
  const date10 = new Date(' Aug 09 2001 01:00:00')

  expect(formatWeekDays(date10, 'persian', 'asia/Tehran', 'fa-IR')).toBe('پنجشنبه')
  expect(formatWeekDays(date10, 'persian', 'asia/Tehran', 'en-US')).toBe('Thu')
  expect(formatWeekDays(date10, 'gregory', 'asia/Tehran', 'en-US')).toBe('Thu')
  expect(formatWeekDays(date10, 'gregory', 'asia/Tehran', 'fa-IR')).toBe('پنجشنبه')
})
