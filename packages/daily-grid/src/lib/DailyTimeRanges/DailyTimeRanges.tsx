import { For } from 'solid-js'
import './DailyTimeRanges.scss'
const timess = [
  '',
  '1 am',
  '2 am',
  '3 am',
  '4 am',
  '5 am',
  '6 am',
  '7 am',
  '8 am',
  '9 am',
  '10 am',
  '11 am',
  '12 pm',
  '13 pm',
  '14 pm',
  '15 pm',
  '16 pm',
  '17 pm',
  '18 pm',
  '19 pm',
  '20 pm',
  '21 pm',
  '22 pm',
  '23 pm'
]
export const DailyTimeRanges = () => {
  return (
    <div class="daily-time-ranges">
      <For each={timess}>
        {(time) => (
          <div>
            <div class="time-range-time">{time}</div>
            <div class="time-range-hairline"></div>
          </div>
        )}
      </For>
    </div>
  )
}
