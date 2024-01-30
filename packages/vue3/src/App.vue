<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue';
import FullEventCalendar from './components/FullEventCalendar'
import { events } from '@full-event-calendar/test-events'


const eventsList = ref(events)
const count = ref(0)
function saySmt(ss){
  console.log('sdsd',ss.data.ondataChange(new Date()))
}
// import
function eventUpdate(data:any){
console.log('on event update ',data)
// eventsList.value.push(data.next.sourceEvent)

}

function AddEvent(data:any){
  console.log('dataAdded' ,data)
  eventsList.value.push(data.sourceEvent)
}
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
  <FullEventCalendar v-model:events="eventsList" @eventUpdate="eventUpdate">
    <template #dailyHeader="data" >
      <button @click="saySmt(data)" >click</button>
  boooooos {{ data }} </template>
  <!-- <template #timeRange="{data}">{{ data.time }}</template> -->
  <template #addModal="{data}"><div class="modaaaaal">this is a vue modal slot {{ data?.time?.start?.toString() }}
    --- {{ data?.time?.end?.toString() }}
  <div @click="data.saveModal">

    <button  @click="AddEvent(data.time)">save</button>
  </div>
  </div></template>
  <template #eventClick="{data}">
  <div class="eventClickModal">{{data}}</div>
  </template>
    <template #headerSlot="data"> <button @click="count++" >click</button> this is {{ count }} a test {{ data }} </template>
  </FullEventCalendar>
</template>

<style scoped>
.modaaaaal{
  width: 200px;
  background-color: red;
}
.eventClickModal{
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
