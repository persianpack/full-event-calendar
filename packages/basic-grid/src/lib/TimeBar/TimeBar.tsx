import { createSignal, onMount } from 'solid-js'
import { FComponent } from '@full-event-calendar/shared-ts'
import './TimeBar.scss'

export const TimeBar: FComponent<{ container: any }> = (props) => {
  const [topOfFSET, SETtOPoFFSET] = createSignal(0)
  onMount(() => {
    const onehInPix = props.container.current.clientHeight / 24
    const oneMinInPix = onehInPix / 60

    const currentMin = new Date().getHours() * 60 + new Date().getMinutes()
    const y = currentMin * oneMinInPix
    SETtOPoFFSET(y)
  })

  function getstyles() {
    return `top:${topOfFSET()}px`
  }

  return (
    <div class="daily-timeBar" style={getstyles()}>
      <div class="daily-timeBar-ball"></div>
    </div>
  )
}
