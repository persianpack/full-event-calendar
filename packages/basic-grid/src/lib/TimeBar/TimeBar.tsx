import { createSignal, onCleanup, onMount } from 'solid-js'
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

  let timerInterval = setInterval(() => {
    const onehInPix = props.container.current.clientHeight / 24
    const oneMinInPix = onehInPix / 60

    const currentMin = new Date().getHours() * 60 + new Date().getMinutes()
    const y = currentMin * oneMinInPix
    SETtOPoFFSET(y)
  }, 60000)

  onCleanup(() => {
    clearInterval(timerInterval)
  })
  function getstyles() {
    return `top:${topOfFSET()}px`
  }

  return (
    <div class="fec-daily-timeBar" style={getstyles()}>
      <div class="fec-daily-timeBar-ball"></div>
    </div>
  )
}
