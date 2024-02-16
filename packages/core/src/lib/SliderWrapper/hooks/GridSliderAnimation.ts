import { createEffect, on, onCleanup, onMount } from 'solid-js'
import { useGlobalState } from '../../../context-injector/context'
import { useCalenderContainerState } from '@full-event-calendar/utils'

interface containers {
  containerRef: any
  calendarContainerRef: any
}

export function useGridSliderAnimation(containers: containers) {
  const data = useGlobalState()

  let isGoing = false
  let clonedCalendar: any
  let scrollTop = 0
  let prevInitDate = data.store.initialDate

  function startAnimation(hasAnimation: boolean = false) {
    // Start Animation

    isGoing = true
    clonedCalendar.classList.add('fec-cloned-calendar')
    clonedCalendar.classList.remove('fec-not-cloned')
    containers.calendarContainerRef?.insertAdjacentElement('beforeend', clonedCalendar)

    const scroller = clonedCalendar.querySelector('.fec-scroll-wrapper')
    // const scroller2 = containers.containerRef.querySelector('.fec-scroll-wrapper')
    if (scroller) {
      scroller.scrollTop = scrollTop
    }

    const baseEl = containers.containerRef
    if (hasAnimation) {
      baseEl?.classList.add('fec-grid-animate-smooth')
    } else {
      if (new Date(prevInitDate) > new Date(data.store.initialDate)) {
        baseEl?.classList.add('fec-grid-animate-backward')
      } else {
        baseEl?.classList.add('fec-grid-animate-forward')
      }
    }

    prevInitDate = data.store.initialDate

    setTimeout(() => {
      // End Animation
      containers.calendarContainerRef.querySelector('.fec-cloned-calendar')?.remove()
      baseEl?.classList.remove('fec-grid-animate-forward')
      baseEl?.classList.remove('fec-grid-animate-backward')
      baseEl?.classList.remove('fec-grid-animate-smooth')
      makeClone()
      addListners()
      isGoing = false
    }, 250)
  }

  createEffect(
    on(
      () => data.store.initialDate,
      () => {
        if (!clonedCalendar || isGoing) return
        startAnimation()
      }
    )
  )
  onMount(() => {
    makeClone()
    addListners()

    const observer = new MutationObserver(() => {
      makeClone()
    })
    const container = useCalenderContainerState()
 
    if(container){
      // call `observe()`, passing it the element to observe, and the options object
      observer.observe(container.querySelector('#full-event-calendar-wrapper') as HTMLElement, {
        subtree: true,
        childList: true,
        attributes: true
      })

    }
  })
  const scrollContainer = containers.containerRef.querySelector('.fec-scroll-wrapper')
  if(scrollContainer){
    containers.containerRef.querySelector('.fec-scroll-wrapper').addEventListener('scroll', makeClone)
  }

  function addListners() {
  const scrollContainer = containers.containerRef.querySelector('.fec-scroll-wrapper')
  if(scrollContainer){
    containers.containerRef.querySelector('.fec-scroll-wrapper')?.removeEventListener('scroll', makeClone)
    containers.containerRef.querySelector('.fec-scroll-wrapper')?.addEventListener('scroll', makeClone)
  }
  }

  onCleanup(() => {
    containers.containerRef.querySelector('.fec-scroll-wrapper')?.removeEventListener('scroll', makeClone)
  })

  function makeClone() {
    clonedCalendar = containers.containerRef?.cloneNode(true) as HTMLElement
    const scroller2 = containers.containerRef.querySelector('.fec-scroll-wrapper') as HTMLElement
    if (scroller2) {
      scrollTop = scroller2.scrollTop
    }
    // console.log(clonedCalendar.scrollTop)
  }

  createEffect(
    on(
      () => data.store.grid,
      () => {
        if (!clonedCalendar || isGoing) return
        startAnimation(true)
      }
    )
  )
}
