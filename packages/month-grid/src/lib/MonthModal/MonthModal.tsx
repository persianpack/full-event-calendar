// Types
import { EventClass, FComponent } from '@full-event-calendar/shared-ts'
import { MonthDateObject } from '../MonthGrid'
// Utils
import { getEventForAdate } from '@full-event-calendar/utils'
// Solid.js
import { For, Show, createSignal, onCleanup } from 'solid-js'

interface ModalData {
  bottom: string
  left: string
  events: EventClass[]
  show: boolean
  somDate: Date
}

const [modalData, setModalData] = createSignal<ModalData>({
  bottom: '0px',
  left: '0px',
  events: [],
  show: false,
  somDate: new Date()
})

export function openModal(data: MonthDateObject, e: MouseEvent, events: EventClass[]) {
  const eventsModal = getEventForAdate(events, data.date)
  const target = e.target as HTMLElement
  const targetRect = target.getBoundingClientRect()
  const modalDataCopy = { ...modalData() }
  modalDataCopy.left = targetRect.left + 'px'
  modalDataCopy.bottom = targetRect.bottom + targetRect.height + 'px'
  modalDataCopy.show = true
  modalDataCopy.events = eventsModal
  modalDataCopy.somDate = data.date

  setModalData(modalDataCopy)
}

interface ModalProps {
  onDragStart: (draggingOnStartDate: Date, event: EventClass) => void
  onDragEnd: () => void
}

export const EventModal: FComponent<ModalProps> = (props) => {
  //move this to utils
  //@ts-ignore
  function ClickOutSide(el: any, accessor: any) {
    const onClick = (e: any) => !el.contains(e.target) && accessor()?.()
    document.body.addEventListener('click', onClick)
    onCleanup(() => document.body.removeEventListener('click', onClick))
  }

  function modalClickOutSide() {
    const modalDataCopy = { ...modalData() }
    modalDataCopy.show = false
    setModalData(modalDataCopy)
  }

  function handelMouseUp() {
    document.removeEventListener('mouseup', handelMouseUp)
    document.getElementById('month-wrapper-id')?.classList.remove('month-is-dragging')
    props.onDragEnd()
  }

  function modalDragStart(event: EventClass) {
    document.addEventListener('mouseup', handelMouseUp)
    document.getElementById('month-wrapper-id')?.classList.add('month-is-dragging')
    props.onDragStart(modalData().somDate, event)
  }

  return (
    <Show when={modalData().show}>
      {/*
         //@ts-ignore */}
      <div
        use:ClickOutSide={modalClickOutSide}
        class="modal-event-list"
        style={`left:${modalData().left};bottom:${modalData().bottom}`}
      >
        <For each={modalData().events}>
          {(item) => (
            <div class="modal-event" onmousedown={[modalDragStart, item]}>
              {item.id}
            </div>
          )}
        </For>
      </div>
    </Show>
  )
}
