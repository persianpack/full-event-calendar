import { For, Show } from 'solid-js'
import './DailyTimeRanges.scss'
import { formatToShortTime, useSlot } from '@full-event-calendar/utils'
import { FComponent } from '@full-event-calendar/shared-ts'
const timess = [
  '',
  new Date(' Aug 07 2023 01:00:00'),
  new Date(' Aug 07 2023 02:00:00'),
  new Date(' Aug 07 2023 03:00:00'),
  new Date(' Aug 07 2023 04:00:00'),
  new Date(' Aug 07 2023 05:00:00'),
  new Date(' Aug 07 2023 06:00:00'),
  new Date(' Aug 07 2023 07:00:00'),
  new Date(' Aug 07 2023 08:00:00'),
  new Date(' Aug 07 2023 09:00:00'),
  new Date(' Aug 07 2023 10:00:00'),
  new Date(' Aug 07 2023 11:00:00'),
  new Date(' Aug 07 2023 12:00:00'),
  new Date(' Aug 07 2023 13:00:00'),
  new Date(' Aug 07 2023 14:00:00'),
  new Date(' Aug 07 2023 15:00:00'),
  new Date(' Aug 07 2023 16:00:00'),
  new Date(' Aug 07 2023 17:00:00'),
  new Date(' Aug 07 2023 18:00:00'),
  new Date(' Aug 07 2023 19:00:00'),
  new Date(' Aug 07 2023 20:00:00'),
  new Date(' Aug 07 2023 21:00:00'),
  new Date(' Aug 07 2023 22:00:00'),
  new Date(' Aug 07 2023 23:00:00')
]

interface rangeProps {
  locale: string
}

export const DailyTimeRanges: FComponent<rangeProps> = (props) => {

  return (
    <div class="fec-daily-time-ranges ">
      <For each={timess}>
        {(time) => (
          // <div ref={headerSlot.el}>
          //   <div class="fec-time-range-time">{(time && formatToShortTime(time as Date, props.locale)) || ''}</div>
          //   <div class="fec-time-range-hairline"></div>
          // </div>
          <Time time={time} locale={props.locale} />
        )}
      </For>
    </div>
  )
}
const Time:FComponent<any> = (props)=>{

  let headerSlot: any = {
    el: null
  }
 
  const dd = () => {
    return { time: props.time}
  }

  const { isSlotAvalibale } = useSlot(headerSlot, dd, 'timeRange', () => {})

  return (
    <div ref={headerSlot.el}>
      <Show when={!isSlotAvalibale}>
        <div class="fec-time-range-time">{(props.time && formatToShortTime(props.time as Date, props.locale)) || ''}</div>
        <div class="fec-time-range-hairline"></div>
      </Show>
  </div>
  )
}