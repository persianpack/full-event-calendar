import { expect, test } from 'vitest'
import {
  floorDate,
  ceilDate,
  isDateToday,
  rightOrLeftInDate,
  EventImpl,
  rightOrLeftInDateInRange
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

  expect(rightOrLeftInDate(noAllDayEvent, initDate)).toBe('month-item-no-all-day')
  expect(rightOrLeftInDate(bothArrowEvent, initDate)).toBe('month-both-arrow')
  expect(rightOrLeftInDate(leftArrowEvent, initDate)).toBe('month-left-arrow')
  expect(rightOrLeftInDate(rightArrowEvent, initDate)).toBe('month-right-arrow')
  expect(rightOrLeftInDate(noArrowEvent, initDate)).toBe('month-no-arrow')
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

  expect(rightOrLeftInDateInRange(noAllDayEvent, range1, range2)).toBe('month-item-no-all-day')
  expect(rightOrLeftInDateInRange(bothArrowEvent, range1, range2)).toBe('month-both-arrow')
  expect(rightOrLeftInDateInRange(leftArrowEvent, range1, range2)).toBe('month-left-arrow')
  expect(rightOrLeftInDateInRange(rightArrowEvent, range1, range2)).toBe('month-right-arrow')
  expect(rightOrLeftInDateInRange(noArrowEvent, range1, range2)).toBe('month-no-arrow')
})
