export function whichColumWasDropped(containerIds: string[], dropPointX: number): number {
  let result = 0

  for (let i = 0; i < containerIds.length; i++) {
    const containerNode = document.getElementById(containerIds[i])
    if (!containerNode) return result
    const containerRect = containerNode.getBoundingClientRect()
    const isDropped = containerRect.left < dropPointX && containerRect.right > dropPointX
    if (isDropped) {
      result = i
      break
    }
  }

  return result
}
