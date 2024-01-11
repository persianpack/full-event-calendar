import { FComponent } from '@full-event-calendar/shared-ts'

export const ScrollBarWrapper: FComponent = (props) => {
  return (
    <div style="position: relative; flex: 1;">
      <div
        style=" position: absolute;height: 100%;width: 100%;"
        id="scroll-wrapper"
        class="custome-scroll-bar scroll-wrapper"
      >
        {props.children}
      </div>
    </div>
  )
}
