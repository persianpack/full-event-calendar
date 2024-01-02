import { FComponent, Group } from "@full-event-calendar/shared-ts";
import './GroupItemHeader.scss'



interface GroupDailyHeader {
    group:Group
}
export const GroupItemHeader:FComponent<GroupDailyHeader> = (props)=>{

    return (
        <div style="position:relative">
            <div class="groupContainer">
                 <div class="group-name">{props.group.name}</div>
                 <div class="group-avatar"> {props.group.name[0]}</div>
            </div>
            <div class="some-border">

            </div>
            <div class="some-borderw">

            </div>
        </div>
    )
}