import { EventClass, FComponent, SourceEvent } from "@full-event-calendar/shared-ts";
 
import { createMutable } from "solid-js/store";
import { createEffect, mergeProps } from "solid-js";
import { DailyGrid, DailyGridProps, dailyDefaultProps } from "./DailyGrid";
import { GroupGrid } from "@full-event-calendar/group-grid";

import "./GroupDaily.scss"
import { DailyHeader } from "..";

export interface GroupDailyProps extends DailyGridProps {
    groups?: number[]
}
const defaultProps = {
    ...dailyDefaultProps,
    groups: [1,2]
}


interface columData {
    events: EventClass[] 
    props: any
}

export const GroupDaily: FComponent<GroupDailyProps> = (props) => {
    const mergedProps = mergeProps(defaultProps, props)
   
    // const columData = createMutable([]) as unknown as columData[]

    function onDateChange(d: Date) {
        mergedProps.onDateChange(d)
        // mergedProps.onGridChange('daily')
    }

    const columData2 = createMutable([
        { events: [], props: { initialDate: null, locale: null, timeZone: null, calendar: null, showAllDay: false } },
      ]) as unknown as columData[]
      function getCols(){
          for (let i = 0; i < mergedProps.groups.length; i++) {
            if(columData2[i]){
    
            }else{
                let x =   { events: [], props: { initialDate: null, locale: null, timeZone: null, calendar: null, showAllDay: false } }
                columData2.push(x)
            }
          }

      }
      getCols()
    function generageCols() {
       
        // const columData = [] as unknown as columData[]
        for (let i = 0; i < mergedProps.groups.length; i++) {
            // let data: columData = { events: [], props: { initialDate: null, locale: null, timeZone: null, calendar: null, showAllDay: false } }

            columData2[i].events = mergedProps.events
            columData2[i].props.initialDate = new Date(mergedProps.initialDate)
            columData2[i].props.gridDate = new Date(mergedProps.initialDate)
            columData2[i].props.locale = mergedProps.locale
            columData2[i].props.timeZone =  mergedProps.timeZone
            columData2[i].props.calendar = mergedProps.calendar
            columData2[i].props.gridHeight = mergedProps.gridHeight
            columData2[i].props.showAllDay = false
            columData2[i].props.onDateChange = onDateChange

            // columData.push(data)
        }
        console.log(columData2,mergedProps.locale)
        // return columData
      
    }
    generageCols()


        function onEventUpdateProxy(updatedSourceEvent: SourceEvent, targetCol: number, baseCol: number, isDragend: boolean) {
            // TargetCol and baseCol are indexes for which colum was event moved in .
            const sourceCopy = { ...updatedSourceEvent }
            if (isDragend) {
                sourceCopy.start.setDate(sourceCopy.start.getDate() - (baseCol - targetCol))
                sourceCopy.end.setDate(sourceCopy.end.getDate() - (baseCol - targetCol))
            }
            mergedProps.onEventUpdate(sourceCopy)
        }
        createEffect(generageCols)      
        return (
            <>
            <DailyHeader
                 headerDate={mergedProps.initialDate}
                 timeZone={mergedProps.timeZone}
                 calendar={mergedProps.calendar}
                 onDateChange={mergedProps.onDateChange}
                 locale={mergedProps.locale}
                 >

            </DailyHeader>
                <GroupGrid
                    gridComponent={DailyGrid}
                    cols={columData2}
                    onEventUpdate={onEventUpdateProxy}
                     onAddEvent={mergedProps.onAddEvent}

                    initialDate={mergedProps.initialDate}
                    hasCrossGridDrag={false}
                />
            </>
        )
    }