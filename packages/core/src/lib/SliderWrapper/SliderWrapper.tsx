import { onMount } from 'solid-js'
import { useGridSliderAnimation } from './hooks/GridSliderAnimation'
import { FComponent } from '@full-event-calendar/shared-ts'
import './SliderWrapper.scss'

export const SliderWrapper: FComponent = (props) => {
  let containerRef: any
  let calendarContainerRef: any

  onMount(() => {
    useGridSliderAnimation({
      containerRef,
      calendarContainerRef
    })
  })
  return (
    <div ref={calendarContainerRef} style="position:relative;flex: 1;" id="calendar-container">
      <div ref={containerRef} class="not-cloned grid-wrapper" id="full-event-calendar-wrapper">
        {props.children}
      </div>
    </div>
  )
}
