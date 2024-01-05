import { getExtraRows } from "@full-event-calendar/month-grid";
import { FComponent } from "@full-event-calendar/shared-ts";
import { For, Show, createMemo } from "solid-js";
import { rowList } from "../WeeklyAllDayHeader";
import { formatNumber } from "@full-event-calendar/utils";
import './ShowMoreBtns.scss'

interface ShowMoreBtnsProps{
    onClick:any
    show:boolean
    rowList:rowList
    headerDates:Date[]
    locale:string
    openAllDayContainer:any
}

export const ShowMoreBtns: FComponent<ShowMoreBtnsProps> = (props) => {
    // Get overflowing events count for each colum grid
    const extraRowsData = createMemo(() => getExtraRows(props.rowList, props.headerDates[0], props.headerDates[6], 3))

    return (
        <Show when={props.show}>
        <div class="weeklymores">
          <For each={extraRowsData()}>
            {(item, i) => (
              <div onclick={props.openAllDayContainer} style={item === 0 ? 'opacity:0;pointer-events: none;' : ''}>
                {formatNumber(props.locale, item)} +
              </div>
            )}
          </For>
        </div>
      </Show>
    )

}