import { expect, test } from 'vitest'
import { ArraySplitIntoChunks } from '../src'
//expectTypeOf(Date).instance.toHaveProperty('toISOString')

test('test array chunk split', () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
  expect(ArraySplitIntoChunks(arr, 3)).toStrictEqual([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12],
    [13, 14, 15],
    [16]
  ])
  expect(ArraySplitIntoChunks(arr, 4)).toStrictEqual([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
  ])
})
