import { describe, expect, test } from 'vitest'
import { daysDiffInRange, isDateIncludedInaRange, filterEventsByDateRange, EventImpl } from '../src'

test('test date diff', () => {
  const date1 = new Date(' Aug 01 2001 01:00:00')
  const date2 = new Date(' Aug 03 2001 01:00:00')

  const date10 = new Date(' Aug 01 2001 01:00:00')
  const date20 = new Date(' Aug 01 2001 23:00:00')

  const date100 = new Date(' Aug 01 2001 01:00:00')
  const date200 = new Date(' Aug 02 2001 23:55:55')

  expect(daysDiffInRange(date1, date2)).toBe(2)
  expect(daysDiffInRange(date10, date20)).toBe(0)
  expect(daysDiffInRange(date100, date200)).toBe(1)
})

const date = {
  start: new Date(' Aug 05 2001 01:00:20'),
  end: new Date(' Aug 07 2001 03:00:00'),
  id: 1,
  name: 'this is amir kian adl'
}

const date2 = {
  start: new Date(' Aug 08 2001 01:00:00'),
  end: new Date(' Aug 12 2001 01:00:00'),
  id: 2,
  name: 'this is amir kian adl'
}

const date3 = {
  start: new Date(' Aug 08 2001 00:00:00'),
  end: new Date(' Aug 10 2001 23:59:59'),
  id: 3,
  name: 'this is amir kian adl'
}
const date4 = {
  start: new Date(' Aug 01 2001 04:00:00'),
  end: new Date(' Aug 02 2001 01:59:59'),
  id: 4,
  name: 'this is amir kian adl'
}

const date8 = {
  start: new Date(' Aug 25 2001 19:00:00'),
  end: new Date(' Aug 30 2001 00:00:00'),
  id: 7,
  name: 'this is amir kian adl'
}

const eventC1 = new EventImpl(date)
const eventC2 = new EventImpl(date2)
const eventC3 = new EventImpl(date3)
const eventC4 = new EventImpl(date4)

const eventC8 = new EventImpl(date8)
const eventList = [eventC1, eventC2, eventC3, eventC4, eventC8]
test('test filterEventsByDateRange ', () => {
  const eventIds = filterEventsByDateRange(
    eventList,
    new Date(' Aug 05 2001 23:59:59'),
    new Date(' Aug 11 2001 23:59:59')
  ).map((item) => item.id)
  expect(eventIds).toStrictEqual([1, 2, 3])
})

test('isDateIncludedInaRange', () => {
  // start: new Date(' Aug 05 2001 01:00:20'),
  // end: new Date(' Aug 07 2001 03:00:00'),
  expect(isDateIncludedInaRange(eventC1, new Date(' Aug 01 2001 23:59:59'), new Date(' Aug 06 2001 23:59:59'))).toBe(
    true
  )
  expect(isDateIncludedInaRange(eventC1, new Date(' Aug 06 2001 11:59:59'), new Date(' Aug 06 2001 23:59:59'))).toBe(
    true
  )
  expect(isDateIncludedInaRange(eventC1, new Date(' Aug 06 2001 23:59:59'), new Date(' Aug 14 2001 23:59:59'))).toBe(
    true
  )

  expect(isDateIncludedInaRange(eventC1, new Date(' Aug 13 2001 23:59:59'), new Date(' Aug 14 2001 23:59:59'))).toBe(
    false
  )
})
