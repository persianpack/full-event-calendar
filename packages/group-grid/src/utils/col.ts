export function whichColumWasDropped(containerIds: string[], dropPointX: number,container:HTMLElement): number {
  let result = 0

  for (let i = 0; i < containerIds.length; i++) {
    const containerNode = container.querySelector('#'+containerIds[i])
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
