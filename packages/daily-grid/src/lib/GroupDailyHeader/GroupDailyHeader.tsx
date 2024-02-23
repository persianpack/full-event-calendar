import { EventClass, FComponent, SourceEvent } from '@full-event-calendar/shared-ts'
import { DailyAllDay } from './DailyAllDay/DailyAllDay'
import { For, Show, createSignal, mergeProps } from 'solid-js'
import { columData } from '../GroupDaily'

import './GroupDailyHeader.scss'
import { DailyHeader } from '../..'
import { GroupItemHeader } from './GroupItemHeader/GroupItemHeader'
export interface GroupDailyHeaderProps {
  columData: columData[]
  initialDate?: Date
  onDateChange?: (d: Date) => void
  onEventClick?: (event: EventClass) => void
  onAddEvent?: (event: SourceEvent) => void
  calendar?: string
  timeZone?: string
  locale?: string
  id?: string
  showAllDay?: boolean
  container?: string
  avalibalSots?: string[]
  slotRenderStore: any
}

export const dailyDefaultProps = {
  events: [],
  id: '',
  initialDate: new Date(),
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  calendar: 'gregory',
  locale: 'en-US',
  showAllDay: true,
  onDateChange: () => {},
  onEventUpdate: () => {},
  onEventClick: () => {},
  onAddEvent: () => {},
  gridHeight: 65 * 24,
  avalibalSots: []
}

export const GroupDailyHeader: FComponent<GroupDailyHeaderProps> = (props) => {
  const mergedProps = mergeProps(dailyDefaultProps, props)

  const [isAllDOpen, setIsAllDOpen] = createSignal(false)

  return (
    <>
      <div style="display:flex;position:relative">
        <DailyHeader
          headerDate={mergedProps.initialDate}
          slotRenderStore={mergedProps.slotRenderStore}
          timeZone={mergedProps.timeZone}
          calendar={mergedProps.calendar}
          onDateChange={mergedProps.onDateChange}
          locale={mergedProps.locale}
        />

        <div class="fec-group-item-header">
          <For each={mergedProps.columData}>
            {(item) => (
              <Show when={item.props.group}>
                <GroupItemHeader group={item.props.group} />
              </Show>
            )}
          </For>
        </div>
      </div>

      <div class="fec-alld-main-container">
        <For each={mergedProps.columData}>
          {(item) => (
            <DailyAllDay
              isAllDOpen={isAllDOpen()}
              setIsAllDOpen={setIsAllDOpen}
              onEventClick={mergedProps.onEventClick}
              locale={mergedProps.locale}
              events={item.props.events}
              initialDate={mergedProps.initialDate}
            ></DailyAllDay>
          )}
        </For>
      </div>
    </>
  )
}
