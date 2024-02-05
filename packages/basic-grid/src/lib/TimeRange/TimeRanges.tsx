//@ts-nocheck
import { EventClass, FComponent, SourceEvent } from '@full-event-calendar/shared-ts'
import { For, createEffect, createSignal, on, onCleanup, onMount } from 'solid-js'
import { TimeRange } from './TimeRange/TimeRange'
import './TimeRanges.scss'
import { useSlot, useSlotModal } from '@full-event-calendar/utils'
interface TimeRangeProps {
  onAddEvent: (event: SourceEvent) => void
  gridDate: Date
  locale: string
  timeZone: string
  editable: boolean
  oneHoureInPixel: number
  stopAddEvent: boolean
}

export const TimeRanges: FComponent<TimeRangeProps> = (props) => {
  // const [slotModalData, setSlotModalData] = createSignal<EventClass | null>(null)
  let [selectedHoure, setSelectedHoure] = createSignal(null)
  const { modalElementNode, setSlotModalData, openSlotModalOnElement, slotModalData, isSlotModalOpen } = useSlotModal(
    'addModal',
    clearDataCb
  )

  function clearDataCb() {
    setSlotModalData(null)
    setSelectedHoure(null)
  }

  function getPreviewDate(data: any, houre: any) {
    if (!props.editable) return
    setSelectedHoure(houre)
    setSlotModalData(data)
  }

  const timess = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

  function getEventPreviewData(hour: any) {
    if (hour === selectedHoure()) {
      return slotModalData()
    }
    return null
  }

  return (
    <>
      {modalElementNode}

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
              eventPreviewData={getEventPreviewData(i())}
              setEventPreview={getPreviewDate}
              setEventPreview2={setSlotModalData}
              setContainerRef={openSlotModalOnElement}
              showModal={isSlotModalOpen()}
              stopAddEvent={props.stopAddEvent}
            ></TimeRange>
          )
        }}
      </For>
    </>
  )
}
