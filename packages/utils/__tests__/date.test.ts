import { expect, test } from 'vitest'
import {
  floorDate,
  ceilDate,
  isDateToday,
  isEventRightOrLeftOrNone,
  EventImpl,
  isEventRightOrLeftOrNoneRange
} from '../src'

test('floor a date to 0 am', () => {
  const test1 = new Date(' Aug 09 2001 10:00:00')
  const target = new Date(' Aug 09 2001 00:00:00')
  expect(floorDate(test1).getTime()).toBe(target.getTime())
})

test('ceil a date to 24 px', () => {
  const test1 = new Date(' Aug 09 2001 10:00:00')
  const target = new Date(' Aug 09 2001 23:59:59')
  expect(ceilDate(test1).getTime()).toBe(target.getTime())
})

test('is today function', () => {
  expect(isDateToday(new Date())).toBeTruthy()
})

test('all day arrowing in  a Date function utils', () => {
  const initDate = new Date(' Aug 09 2001 10:00:00')

  const noAllDayEvent = new EventImpl({
    start: new Date(' Aug 09 2001 01:00:00'),
    end: new Date(' Aug 09 2001 10:00:00'),
    id: 1,
    name: 'noAllDayEvent'
  })

  const bothArrowEvent = new EventImpl({
    start: new Date(' Aug 08 2001 01:00:00'),
    end: new Date(' Aug 10 2001 10:00:00'),
    id: 1,
    name: 'bothArrowEvent'
  })
  const leftArrowEvent = new EventImpl({
    start: new Date(' Aug 08 2001 01:00:00'),
    end: new Date(' Aug 9 2001 10:00:00'),
    id: 1,
    name: 'leftArrowEvent'
  })
  const rightArrowEvent = new EventImpl({
    start: new Date(' Aug 09 2001 01:00:00'),
    end: new Date(' Aug 10 2001 10:00:00'),
    id: 1,
    name: 'rightArrowEvent'
  })
  const noArrowEvent = new EventImpl({
    start: new Date(' Aug 09 2001 00:00:00'),
    end: new Date(' Aug 9 2001 23:59:59'),
    id: 1,
    name: 'noArrowEvent'
  })

  expect(isEventRightOrLeftOrNone(noAllDayEvent, initDate)).toBe('month-item-no-all-day')
  expect(isEventRightOrLeftOrNone(bothArrowEvent, initDate)).toBe('month-both-arrow')
  expect(isEventRightOrLeftOrNone(leftArrowEvent, initDate)).toBe('month-left-arrow')
  expect(isEventRightOrLeftOrNone(rightArrowEvent, initDate)).toBe('month-right-arrow')
  expect(isEventRightOrLeftOrNone(noArrowEvent, initDate)).toBe('month-no-arrow')
})

test('all day arrowing in  a Date function utils', () => {
  const range1 = new Date(' Aug 2 2001 10:00:00')
  const range2 = new Date(' Aug 10 2001 10:00:00')

  const noAllDayEvent = new EventImpl({
    start: new Date(' Aug 09 2001 01:00:00'),
    end: new Date(' Aug 09 2001 10:00:00'),
    id: 1,
    name: 'noAllDayEvent'
  })

  const bothArrowEvent = new EventImpl({
    start: new Date(' Aug 01 2001 01:00:00'),
    end: new Date(' Aug 11 2001 10:00:00'),
    id: 1,
    name: 'bothArrowEvent'
  })

  const leftArrowEvent = new EventImpl({
    start: new Date(' Aug 01 2001 01:00:00'),
    end: new Date(' Aug 9 2001 10:00:00'),
    id: 1,
    name: 'leftArrowEvent'
  })

  const rightArrowEvent = new EventImpl({
    start: new Date(' Aug 03 2001 01:00:00'),
    end: new Date(' Aug 13 2001 10:00:00'),
    id: 1,
    name: 'rightArrowEvent'
  })

  const noArrowEvent = new EventImpl({
    start: new Date(' Aug 03 2001 00:00:00'),
    end: new Date(' Aug 9 2001 23:59:59'),
    id: 1,
    name: 'noArrowEvent'
  })

  expect(isEventRightOrLeftOrNoneRange(noAllDayEvent, range1, range2)).toBe('month-item-no-all-day')
  expect(isEventRightOrLeftOrNoneRange(bothArrowEvent, range1, range2)).toBe('month-both-arrow')
  expect(isEventRightOrLeftOrNoneRange(leftArrowEvent, range1, range2)).toBe('month-left-arrow')
  expect(isEventRightOrLeftOrNoneRange(rightArrowEvent, range1, range2)).toBe('month-right-arrow')
  expect(isEventRightOrLeftOrNoneRange(noArrowEvent, range1, range2)).toBe('month-no-arrow')
})
