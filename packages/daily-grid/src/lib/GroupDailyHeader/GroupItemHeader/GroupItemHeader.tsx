import { FComponent, Group } from '@full-event-calendar/shared-ts'
import './GroupItemHeader.scss'
import { useSlot } from '@full-event-calendar/utils'
import { Show } from 'solid-js'

interface GroupDailyHeader {
  group: Group
}

export const GroupItemHeader: FComponent<GroupDailyHeader> = (props) => {
  const dd = () => {
    return { group: props.group }
  }
  let slotRef: any = {
    el: null
  }
  const { isSlotAvalibale } = useSlot(slotRef, dd, 'groupContainer', () => props.group)

  return (
    <div style="position:relative" ref={slotRef.el}>
      <Show when={!isSlotAvalibale}>
        <div class="fec-groupContainer">
          <div class="fec-group-name">{props.group.name}</div>
          <div class="fec-group-avatar"> {props.group.name[0]}</div>
        </div>
        <div class="fec-some-border"></div>
        <div class="fec-some-borderw"></div>
      </Show>
    </div>
  )
}
