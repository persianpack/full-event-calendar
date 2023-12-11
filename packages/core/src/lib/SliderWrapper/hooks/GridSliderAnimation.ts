import { createEffect, on, onCleanup, onMount } from 'solid-js'
import { useGlobalState } from '../../../context-injector/context'

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
    clonedCalendar.classList.add('cloned-calendar')
    clonedCalendar.classList.remove('not-cloned')
    containers.calendarContainerRef?.insertAdjacentElement('beforeend', clonedCalendar)

    const scroller = clonedCalendar.querySelector('.scroll-wrapper')
    // const scroller2 = containers.containerRef.querySelector('.scroll-wrapper')
    if (scroller) {
      scroller.scrollTop = scrollTop
    }

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

    setTimeout(() => {
      // End Animation
      containers.calendarContainerRef.querySelector('.cloned-calendar')?.remove()
      baseEl?.classList.remove('grid-animate-forward')
      baseEl?.classList.remove('grid-animate-backward')
      baseEl?.classList.remove('grid-animate-smooth')
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
  })

  document.querySelector('.more-wrapper')?.addEventListener('click', () => {
    setTimeout(() => {
      makeClone()
    }, 500)
  })
  document.querySelector('.all-collapser')?.addEventListener('click', () => {
    setTimeout(() => {
      makeClone()
    }, 500)
  })

  document.querySelector('.go-some-d')?.addEventListener('click', () => {
    makeClone()
  })

  containers.containerRef.querySelector('.scroll-wrapper').addEventListener('scroll', makeClone)

  function addListners() {
    containers.containerRef.querySelector('.scroll-wrapper')?.removeEventListener('scroll', makeClone)
    containers.containerRef.querySelector('.scroll-wrapper')?.addEventListener('scroll', makeClone)
  }
  onCleanup(() => {
    containers.containerRef.querySelector('.scroll-wrapper')?.removeEventListener('scroll', makeClone)
  })

  function makeClone() {
    clonedCalendar = containers.containerRef?.cloneNode(true) as HTMLElement
    const scroller2 = containers.containerRef.querySelector('.scroll-wrapper') as HTMLElement
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
