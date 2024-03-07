import { For, Show, createMemo, createSignal, onCleanup } from 'solid-js'
import './CalendarHeader.scss'
import { FComponent } from '@full-event-calendar/shared-ts'
import { useGlobalState } from '../../context-injector/context'
import { GridModes } from '../../api/CalendarImpl'
import { Transition } from 'solid-transition-group'
import { HeaderFormat } from './filterRange'
import { calendarLocale } from '@full-event-calendar/locale'
import { useSlot } from '@full-event-calendar/utils'
interface CalendarHeader {
  onDateChange: (d: Date) => void
  changeGrid: (grid: GridModes) => void
}

export const CalendarHeader: FComponent<CalendarHeader> = (props) => {
  const [showDropDown, SetDropDown] = createSignal(false)
  const data = useGlobalState()
  function ClickOutSide(el: any, accessor: any) {
    const onClick = (e: any) => !el.contains(e.target) && accessor()?.()
    document.addEventListener('click', onClick)
    onCleanup(() => document.removeEventListener('click', onClick))
  }
  function amodalClickOut() {
    SetDropDown(false)
  }

  const headerDate = createMemo(() => {
    return new HeaderFormat(data.store).format()
  })

  function changeGrid(grid: GridModes) {
    props.changeGrid(grid)
  }

  function goBack() {
    const dCopy = new Date(data.store.initialDate)
    const grid = data.store.grid
    if (grid === 'daily') {
      dCopy.setDate(dCopy.getDate() - 1)
    } else if (grid === 'weekly') {
      dCopy.setDate(dCopy.getDate() - 7)
    } else if (grid === 'month') {
      dCopy.setMonth(dCopy.getMonth() - 1)
    } else if (grid === 'list') {
      if (data.store.listMode === 'day') {
        dCopy.setDate(dCopy.getDate() - 1)
      } else if (data.store.listMode === 'month') {
        dCopy.setMonth(dCopy.getMonth() - 1)
      } else if (data.store.listMode === 'week') {
        dCopy.setDate(dCopy.getDate() - 7)
      }
    }
    props.onDateChange(dCopy)
  }
  function goToday() {
    props.onDateChange(new Date())
  }
  function goForward() {
    const dCopy = new Date(data.store.initialDate)
    const grid = data.store.grid
    if (grid === 'daily') {
      dCopy.setDate(dCopy.getDate() + 1)
    } else if (grid === 'weekly') {
      dCopy.setDate(dCopy.getDate() + 7)
    } else if (grid === 'month') {
      dCopy.setMonth(dCopy.getMonth() + 1)
    } else if (grid === 'list') {
      if (data.store.listMode === 'day') {
        dCopy.setDate(dCopy.getDate() + 1)
      } else if (data.store.listMode === 'month') {
        dCopy.setMonth(dCopy.getMonth() + 1)
      } else if (data.store.listMode === 'week') {
        dCopy.setDate(dCopy.getDate() + 7)
      }
    }
    props.onDateChange(dCopy)
  }

  let headerSlot: any = {
    el: null
  }
  let gridDropDown: any = {
    el: null
  }
  let todayBtnSlot: any = {
    el: null
  }
  let goBackDateBtnSlot: any = {
    el: null
  }
  let goForwardDateBtnSlot: any = {
    el: null
  }

  const dd = () => {
    return data.store.initialDate
  }
  const haedderData = () => {
    return {
      date: headerDate()
    }
  }
  const gridData = () => {
    return {
      grid: data.store.grid
    }
  }
  const { isSlotAvalibale: isHeaderDateSlotAvalibale } = useSlot(
    headerSlot,
    haedderData,
    'headerDateSlot',
    () => data.store.initialDate
  )
  const { isSlotAvalibale: isGridDropDownSlotAvalibale } = useSlot(
    gridDropDown,
    gridData,
    'gridDropDown',
    () => data.store.grid
  )
  const { isSlotAvalibale: isTodayBtnSlotAvalibale } = useSlot(
    todayBtnSlot,
    () => {},
    'todayBtn',
    () => {}
  )
  const { isSlotAvalibale: isGoBackDateSlotAvalibale } = useSlot(
    goBackDateBtnSlot,
    () => {},
    'goBackDate',
    () => {}
  )
  const { isSlotAvalibale: isGoForwardDateSlotAvalibale } = useSlot(
    goForwardDateBtnSlot,
    () => {},
    'goForwardDate',
    () => {}
  )

  return (
    <div class="fec-calendar-header">
      <div onclick={goToday} ref={todayBtnSlot.el}>
        <Show when={!isTodayBtnSlotAvalibale}>
          <div class="fec-go-to-today">{calendarLocale(data.instance.storeManager.locale, 'today')}</div>
        </Show>
      </div>

      <div ref={goBackDateBtnSlot.el} onclick={goBack}>
        <Show when={!isGoBackDateSlotAvalibale}>
          <div class="fec-go-back-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M13.28 10.0333L8.93333 5.68667C8.42 5.17333 7.58 5.17333 7.06667 5.68667L2.72 10.0333"
                stroke="#7E7E7F"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
        </Show>
      </div>
      {/* <div id="test-vue-id" ref={headerSlot.el}></div> */}
      <div ref={goForwardDateBtnSlot.el} onclick={goForward}>
        <Show when={!isGoForwardDateSlotAvalibale}>
          <div class="fec-go-forward-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M13.28 10.0333L8.93333 5.68667C8.42 5.17333 7.58 5.17333 7.06667 5.68667L2.72 10.0333"
                stroke="#7E7E7F"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
        </Show>
      </div>

      <div class="fec-header-date" dir="rtl" ref={headerSlot.el}>
        <Show when={!isHeaderDateSlotAvalibale}>{headerDate()}</Show>
      </div>

      <div style="flex:1"></div>
      <div ref={gridDropDown.el}>
        <Show when={!isGridDropDownSlotAvalibale}>
          <div class="fec-grid-drop" data-test-id-dropdown="1" onclick={() => SetDropDown(!showDropDown())}>
            {calendarLocale(data.instance.storeManager.locale, data.store.grid)}
            <Transition name="slide-fade">
              <Show when={showDropDown()}>
                {/*
            //@ts-ignore */}
                <div use:ClickOutSide={amodalClickOut} class="fec-dropdown-calendar">
                  <For each={data.instance.getOptions()}>
                    {(item: any) => (
                      <div
                        class="fec-dropdown-calendar-item"
                        onclick={(e) => {
                          e.stopPropagation()
                          SetDropDown(false)
                          changeGrid(item)
                        }}
                        data-test-id-drop="0"
                      >
                        {calendarLocale(data.instance.storeManager.locale, item)}
                      </div>
                    )}
                  </For>
                </div>
              </Show>
            </Transition>
          </div>
        </Show>
      </div>
    </div>
  )
}
