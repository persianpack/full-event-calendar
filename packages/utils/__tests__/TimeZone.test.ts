import { describe, expect, test } from 'vitest'
import { convertTZ } from '../src'

test('test timezone convert', () => {
  const date10 = new Date(' Aug 01 2001 01:00:00')
  expect(convertTZ(date10, 'Africa/Abidjan').getTime()).toBe(996595200000)
})
