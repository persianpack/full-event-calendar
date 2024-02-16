import { FComponent, Group } from "@full-event-calendar/shared-ts";
import './GroupItemHeader.scss'

interface GroupDailyHeader {
    group:Group
}

export const GroupItemHeader:FComponent<GroupDailyHeader> = (props)=>{

    return (
        <div style="position:relative">
            <div class="fec-groupContainer">
                 <div class="fec-group-name">{props.group.name}</div>
                 <div class="fec-group-avatar"> {props.group.name[0]}</div>
            </div>
            <div class="fec-some-border">

            </div>
            <div class="fec-some-borderw">

            </div>
        </div>
    )
}