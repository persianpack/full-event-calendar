import { createSignal, batch, onCleanup } from 'solid-js'
import { roundMinutesToMultipleOf5 } from '@full-event-calendar/utils'
import { DraggeddData, EventClass } from '@full-event-calendar/shared-ts'

const initialDragNode: DraggeddData = {
  width: '',
  height: '',
  left: '',
  top: '',
  item: null,
  duration: 0,
  dragedStartDate: new Date(),
  dragedEndDate: new Date(),
  animation: '',
  itemRect: null,
  mouseX: 0
}

export function userDrager(
  containerRef: any,
  dragEndCallBack: (initialDragNode: DraggeddData) => void,
  wrapperContainer: any
) {
  const [isDragging, setIsDragging] = createSignal(false)
  const [draggedData, setDraggedData] = createSignal<DraggeddData>(initialDragNode)

  let xAndYDiff = [0, 0]
  let mouseDown = false
  let firstTopPosition = 0
  let shouldDuplicate = false
  let wrapperHeight = 1
  let hasScrolled = false
  let isMouseoutsideTheContainer = false
  let hasMoved = false

  function resetValueToDefalt() {
    xAndYDiff = [0, 0]
    mouseDown = false
    firstTopPosition = 0

    wrapperHeight = 1
    hasScrolled = false
    isMouseoutsideTheContainer = false
    hasMoved = false
  }

  function getEventNode(id: any) {
    const target = document.querySelectorAll(`#event-${id}`)
    const targets = document.querySelector(`#event-${id}`)

    if (target.length > 1) {
      console.log(shouldDuplicate)
      if (shouldDuplicate) {
        return target[1] as HTMLElement
      }
      return target[0] as HTMLElement
    }
    return targets as HTMLElement
  }

  function setOpacityForElemetns(opacity: string, id: any) {
    //@ts-ignore
    document.querySelectorAll(`#event-${id}`).forEach((element: HTMLElement) => {
      element.style.opacity = opacity
    })
  }

  function handelScroll() {
    hasScrolled = true
  }

  function containerMouseEnter() {
    console.log('mouse endter')

    isMouseoutsideTheContainer = false
  }
  function containerMouseLeave() {
    console.log('mouse leave')
    isMouseoutsideTheContainer = true
  }

  function itemDragstart(e: EventClass, d: any, shouldDuplica: boolean) {
    if (isDragging()) return
    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', handelMouseUp)
    document.addEventListener('scroll', handelScroll)
    wrapperContainer.current.addEventListener('mouseenter', containerMouseEnter)
    wrapperContainer.current.addEventListener('mouseleave', containerMouseLeave)
    mouseDown = true
    console.log(shouldDuplica)
    shouldDuplicate = shouldDuplica
    // const target = document.querySelector(`#event-${e.id}`) as HTMLElement
    const target = getEventNode(e.id)
    // target.style.opacity = '0'
    firstTopPosition = target.getBoundingClientRect().top + window.scrollY
    const targetElement = target.getBoundingClientRect()
    const fullC = containerRef.current.clientWidth || 0

    let clonedNode: DraggeddData = {
      width: fullC + 'px',
      height: target.clientHeight + 2 + 'px',
      item: e,
      dragedStartDate: e.start,
      dragedEndDate: e.end,
      left: targetElement.left + 0 + 'px',
      top: targetElement.top + 0 + 'px',
      duration: e.duration,
      animation: '',
      itemRect: null,
      mouseX: 0
    }

    xAndYDiff[0] = d.clientX - targetElement.left
    xAndYDiff[1] = d.clientY - targetElement.top

    batch(() => {
      setDraggedData(clonedNode)
    })
    wrapperHeight = containerRef.current.querySelector('.time-range')?.clientHeight || 1
  }

  let time1: number = 0
  let time2: number = 0

  function cleanUps() {
    clearTimeout(time1)
    clearTimeout(time2)
  }
  function mouseMove(e: MouseEvent) {
    if (!mouseDown) return
    hasMoved = true
    if (!isDragging()) {
      setIsDragging(true)
      document.getElementById('full-event-calendar-core')?.classList.add('calendar-draging')
      //const target = document.querySelector(`#event-${draggedData().item?.id}`) as HTMLElement
      // const target = getEventNode(draggedData().item?.id)
      setOpacityForElemetns('0.3', draggedData().item?.id)
    }

    const eventRect = containerRef.current
      .querySelector(`#draging-event-${draggedData().item?.id}`)
      ?.getBoundingClientRect()
    if (eventRect) {
      let dragCopy: DraggeddData = { ...draggedData() }

      const statDate = dragCopy.item?.start as Date
      const endDate = dragCopy.item?.end as Date
      const inMin = ((eventRect.top + window.scrollY - firstTopPosition) * 60) / wrapperHeight
      const delta = inMin * 60000
      const newS = new Date(statDate.getTime() + delta)
      newS.setSeconds(0, 0)
      const newE = new Date(endDate.getTime() + delta)

      dragCopy.dragedStartDate = roundMinutesToMultipleOf5(newS)
      dragCopy.dragedEndDate = newE
      dragCopy.itemRect = eventRect
      dragCopy.left = e.clientX - xAndYDiff[0] + 'px'
      dragCopy.top = e.clientY - xAndYDiff[1] + 'px'
      dragCopy.mouseX = e.pageX

      setDraggedData(dragCopy)
    }
  }

  function handelMouseUp(e: MouseEvent) {
    // call mouse move in case of scolling not moving
    // mouseMove(e)
    if (hasScrolled) {
      mouseMove(e)
    } else if (!hasMoved) {
      console.log('eventClicked ')
    }

    if (isDragging()) {
      cleanUps()
      if (!isMouseoutsideTheContainer) {
        dragEndCallBack(draggedData())
      }
      //basiclly start the transition animation from the base event to the target element
      const baseEl = { ...draggedData() }

      setOpacityForElemetns('0.0', baseEl.item?.id)
      document.getElementById('full-event-calendar-core')?.classList.remove('calendar-draging')
      time1 = setTimeout(() => {
        let targetEl = getEventNode(baseEl.item?.id)
        const targetElRect = targetEl?.getBoundingClientRect()
        setOpacityForElemetns('0.0', baseEl.item?.id)
        baseEl.width = targetEl?.clientWidth + 2 + 'px'
        baseEl.height = targetEl?.clientHeight + 2 + 'px'
        baseEl.left = targetElRect?.left + 'px'
        baseEl.top = targetElRect?.top + 'px'
        baseEl.animation = 'all 0.5s;'
        setDraggedData(baseEl)
      }, 0)

      time2 = setTimeout(() => {
        baseEl.animation = ''
        batch(() => {
          setDraggedData(baseEl)
          setIsDragging(false)
        })
        // let y = document.querySelector(`#event-${baseEl.item?.id}`) as HTMLElement
        setOpacityForElemetns('', baseEl.item?.id)
      }, 500)
    }
    removeListenrs()
    resetValueToDefalt()
  }
  function removeListenrs() {
    wrapperContainer.current.removeEventListener('mouseenter', containerMouseEnter)
    wrapperContainer.current.removeEventListener('mouseleave', containerMouseLeave)
    document.removeEventListener('mouseup', handelMouseUp)
    document.removeEventListener('mousemove', mouseMove)
    document.removeEventListener('scroll', handelScroll)
  }

  onCleanup(() => {
    removeListenrs()
    cleanUps()
  })

  return { draggedData, isDragging, itemDragstart }
}
