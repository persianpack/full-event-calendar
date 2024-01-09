import { FComponent } from '@full-event-calendar/shared-ts'
import {formatNumber } from '@full-event-calendar/utils'
import { MonthDateObject } from '../../MonthGrid'
import { For, Show } from 'solid-js'
import { getExtraRowsCount } from '../../..'
import './MonthRowMoreBtns.scss'
interface MonthGridRowProps {
  locale: string
  monthRowDates: MonthDateObject[] // monthRowArr
  rowLimit: number // props.rowLimit
  monthRowData: any // monthRowData()[monthRowIndex()]
  openModalEvents: any // openModalEvents
}

export const MonthRowMoreBtns: FComponent<MonthGridRowProps> = (props) => {
  return (
    <>
      <div class="month-more-wrapper">
          {/* get rowse count byand the row limit */}
        <For
          each={getExtraRowsCount(
            props.monthRowData,
            props.monthRowDates[0].date,
            props.monthRowDates[6].date,
            props.rowLimit
          )}
        >
          {(extraCount, j) => (
            <div class="month-more-item">
              <Show when={extraCount > 0}>
                <div class="month-more-btn" onclick={[props.openModalEvents, props.monthRowDates[j()]]}>
                  {formatNumber(props.locale, extraCount as any)} +
                </div>
              </Show>
            </div>
          )}
        </For>
      </div>
    </>
  )
}
