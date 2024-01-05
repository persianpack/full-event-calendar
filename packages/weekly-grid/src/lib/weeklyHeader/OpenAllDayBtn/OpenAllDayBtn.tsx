import { FComponent } from "@full-event-calendar/shared-ts";
import { Show } from "solid-js";


interface OpenAllDayBtnProps{
    onClick:any
    show:boolean
}

export const OpenAllDayBtn: FComponent<OpenAllDayBtnProps> = (props) => {


    return (
        <div class="more-btn-container" style='width:51px'>
        <Show when={props.show}>
          <div class="all-collapser" onclick={props.onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M13.28 10.0333L8.93333 5.68667C8.42 5.17333 7.58 5.17333 7.06667 5.68667L2.72 10.0333"
                stroke="#7E7E7F"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </Show>
      </div>
    )

}