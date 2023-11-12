export function whichColumeWasDropped(containerIds: string[], dropPointX: number): number {
  let result = 0

  for (let i = 0; i < containerIds.length; i++) {
    const containerNode = document.getElementById(containerIds[i])
    if (!containerNode) return result
    const containerRect = containerNode.getBoundingClientRect()
    const isIwith = containerRect.left < dropPointX && containerRect.right > dropPointX
    if (isIwith) {
      result = i
      break
    }
  }

  return result
}
