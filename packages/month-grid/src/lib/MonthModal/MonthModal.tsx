import { EventClass, FComponent } from '@full-event-calendar/shared-ts'
import { getEventForAdate } from '@full-event-calendar/utils'
import { For, Show, createSignal, onCleanup } from 'solid-js'
import { MonthDateObject } from '../MonthGrid'

const [modalData, setModalData] = createSignal({
  bottom: '0px',
  left: '0px',
  evets: [] as any as EventClass[],
  show: false,
  somDate: new Date()
})

export function openModal(data: MonthDateObject, e: MouseEvent, events: EventClass[]) {
  const eventsModal = getEventForAdate(events, data.date)
  const target = e.target as HTMLElement
  const rectt = target.getBoundingClientRect()
  const coppy = { ...modalData() }
  coppy.left = rectt.left + 'px'
  coppy.bottom = rectt.bottom + rectt.height + 'px'
  coppy.show = true
  coppy.evets = eventsModal
  coppy.somDate = data.date
  setModalData(coppy)
}

interface ModalProps {
  onDragStart: (draggingOnStartDate: Date, event: EventClass) => void
  onDragEnd: () => void
}

export const EventModal: FComponent<ModalProps> = (props) => {
  // console.log(Mrows)
  //move this to utils
  function clickout(el: any, accessor: any) {
    const onClick = (e: any) => !el.contains(e.target) && accessor()?.()
    document.body.addEventListener('click', onClick)

    onCleanup(() => document.body.removeEventListener('click', onClick))
  }

  function modalClickOutSide() {
    const coppy = { ...modalData() }

    coppy.show = false
    setModalData(coppy)
  }
  function handelMouseUp() {
    document.removeEventListener('mouseup', handelMouseUp)

    document.getElementById('month-wrapper-id')?.classList.remove('month-is-dragging')
    console.log('mouseUp')
    // dragEnd()
    props.onDragEnd()
  }

  function modalDragStart(event: EventClass) {
    document.addEventListener('mouseup', handelMouseUp)
    document.getElementById('month-wrapper-id')?.classList.add('month-is-dragging')
    // draggingOnStartDate = modalData().somDate
    //  onEventDrag(event)
    props.onDragStart(modalData().somDate, event)
  }

  return (
    <Show when={modalData().show}>
      {/*
         //@ts-ignore */}
      <div
        use:clickout={modalClickOutSide}
        class="modal-event-list"
        style={`left:${modalData().left};bottom:${modalData().bottom}`}
      >
        <For each={modalData().evets}>
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
