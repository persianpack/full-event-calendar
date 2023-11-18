export const ArraySplitIntoChunks = <T extends any[]>(arr: T, chunkSize: number) => {
  let res = []

  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize)
    // do whatever
    res.push(chunk)
  }
  return res
}
