import { EventClass, FComponent, SourceEvent } from '@full-event-calendar/shared-ts'
import { For, createSignal,  } from 'solid-js'
import { TimeRange } from './TimeRange'

// import './TimeRange.scss'

interface TimeRangeProps {
  onAddEvent: (event: SourceEvent) => void
  gridDate: Date
  locale: string
  timeZone: string
  editable: boolean
  oneHoureInPixel: number
}

export const TimeRanges: FComponent<TimeRangeProps> = (props) => {
  const [resiserGr, setResizer] = createSignal<EventClass | null>(null)

  let [selectedHouse, setSelectedHouse] = createSignal(null)

  function setS(data:any,houre:any){
    setSelectedHouse(houre)
    setResizer(data)
  }

  function getD(hour:any){
    if(hour === selectedHouse()){
        return resiserGr()
    }
    return null
  }

  const timess = [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

  return (
    <>
          <For each={timess}>
            {(_, i) => {
              return (
                  <TimeRange
                    onAddEvent={props.onAddEvent}
                    gridDate={props.gridDate}
                    locale={props.locale}
                    timeZone={props.timeZone}
                    oneHoureInPixel={props.oneHoureInPixel}
                    editable={props.editable}
                    houre={i()}
                    eventPreviewData={getD(i())}
                    setEventPreview={setS}
                  ></TimeRange>
              )
            }}
          </For>
    </>
  )
}
