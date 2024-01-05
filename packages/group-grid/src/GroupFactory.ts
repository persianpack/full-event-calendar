import { EventClass } from "@full-event-calendar/shared-ts";
import { createMutable } from "solid-js/store";

interface ColumData {
    events: EventClass[]
    props: any
}

class GroupFactory
{
    group:ColumData[]=createMutable([])
}