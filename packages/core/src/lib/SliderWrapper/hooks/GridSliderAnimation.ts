import { createEffect, on, onMount } from 'solid-js'
import { useGlobalState } from '../../../context-injector/context'

interface containers {
  containerRef: any
  calendarContainerRef: any
}

export function useGridSliderAnimation(containers: containers) {
  const data = useGlobalState()

  let isGoing = false
  let clonedCalendar: any
  let prevInitDate = data.store.initialDate

  function startAnimation(hasAnimation: boolean = false) {
    // Start Animation

    isGoing = true
    clonedCalendar.classList.add('cloned-calendar')
    clonedCalendar.classList.remove('not-cloned')
    const baseEl = containers.containerRef
    if (hasAnimation) {
      baseEl?.classList.add('grid-animate-smooth')
    } else {
      if (new Date(prevInitDate) > new Date(data.store.initialDate)) {
        baseEl?.classList.add('grid-animate-backward')
      } else {
        baseEl?.classList.add('grid-animate-forward')
      }
    }

    prevInitDate = data.store.initialDate
    containers.calendarContainerRef?.insertAdjacentElement('beforeend', clonedCalendar)

    const scroller = clonedCalendar.querySelector('.scroll-wrapper')
    const scroller2 = containers.containerRef.querySelector('.scroll-wrapper')
    if (scroller && scroller2) {
      scroller.scrollTop = scroller2.scrollTop
    }

    setTimeout(() => {
      // End Animation
      containers.calendarContainerRef.querySelector('.cloned-calendar')?.remove()
      baseEl?.classList.remove('grid-animate-forward')
      baseEl?.classList.remove('grid-animate-backward')
      baseEl?.classList.remove('grid-animate-smooth')
      clonedCalendar = baseEl?.cloneNode(true) as HTMLElement
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
    clonedCalendar = containers.containerRef?.cloneNode(true) as HTMLElement
  })

  document.querySelector('.more-wrapper')?.addEventListener('click', () => {
    setTimeout(() => {
      clonedCalendar = containers.containerRef?.cloneNode(true) as HTMLElement
    }, 500)
  })
  document.querySelector('.all-collapser')?.addEventListener('click', () => {
    setTimeout(() => {
      clonedCalendar = containers.containerRef?.cloneNode(true) as HTMLElement
    }, 500)
  })

  createEffect(
    on(
      () => data.store.grid,
      () => {
        if (!clonedCalendar || isGoing) return
        startAnimation(true)
        // clonedCalendar = containers.containerRef?.cloneNode(true) as HTMLElement
      }
    )
  )
}
