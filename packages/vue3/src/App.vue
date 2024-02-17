<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'
import { FullEventCalendar } from './components/FullEventCalendar'
import { events } from '@full-event-calendar/test-events'
import { DailyGridPlugin } from '@full-event-calendar/daily-grid'
import { MonthGridPlugin } from '@full-event-calendar/month-grid'
import { WeeklyGridPlugin } from '@full-event-calendar/weekly-grid'
import { ListPlugin } from '@full-event-calendar/list/dist/index.js'
import '@full-event-calendar/core/dist/main.css'

const eventsList = ref(events)
const count = ref(0)
//@ts-ignore
function saySmt(ss) {
  console.log('sdsd', ss.data.ondataChange(new Date()))
}
// import
function eventUpdate(data: any) {
  console.log('on event update ', data)
  // eventsList.value.push(data.next.sourceEvent)
}

function AddEvent(data: any) {
  console.log('dataAdded', data)
  eventsList.value.push(data.sourceEvent)
}
const dateee = ref(new Date('Thu Aug 10 2023 15:00:0'))
setTimeout(() => {
  //dateee.value = new Date()
}, 4000)
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <button @click="count++">count</button>
  <FullEventCalendar
    :auto-update-event-on-change="true"
    :editable="true"
    v-model:events="eventsList"
    @eventUpdate="eventUpdate"
    stop-add-event
    :initial-date="dateee"
    :plugins="[DailyGridPlugin, MonthGridPlugin, WeeklyGridPlugin, ListPlugin]"
  >
    <template #dailyHeader="data"> daily header slot {{ data }} </template>
    <!-- <template #timeRange="{data}">{{ data.time }}</template> -->
    <template #addModal="{ data }">
      <div class="modaaaaal">
        this is a vue modal slot {{ data?.time?.start?.toString() }} --- {{ data?.time?.end?.toString() }}
        <div @click="data.saveModal">
          <button @click="AddEvent(data.time)">save</button>
        </div>
      </div>
    </template>
    <template #eventClick="{ data }">
      <div class="eventClickModal">{{ data }}</div>
    </template>
    <template #headerSlot="data">
      <button @click="count++">click</button> this is {{ count }} a test {{ data }}
    </template>
    <template #headerDateSlot="data">
      <button @click="count++">click</button> this is {{ count }} a test {{ data }}
    </template>
    <template #todayBtn>
      <button>go to mee</button>
    </template>
    <template #goBackDate>
      <button>عقب</button>
    </template>
    <template #goForwardDate>
      <button>جلو</button>
    </template>
    <!-- <template #gridDropDown="DATA">
      <button  >گرید</button>  {{ DATA }}
    </template> -->
  </FullEventCalendar>
</template>

<style scoped>
.modaaaaal {
  width: 200px;
  background-color: red;
}

.eventClickModal {
  width: 200px;
  background-color: green;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
