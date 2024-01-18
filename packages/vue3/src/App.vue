<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue';
import FullEventCalendar from './components/FullEventCalendar'
const count = ref(0)
function saySmt(ss){
  console.log('sdsd',ss.data.ondataChange(new Date()))
}
// import
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
  <FullEventCalendar>
    <template #dailyHeader="data" >
      <button @click="saySmt(data)" >click</button>
  boooooos {{ data }} </template>
  <!-- <template #timeRange="{data}">{{ data.time }}</template> -->
    <template #headerSlot="data"> <button @click="count++" >click</button> this is {{ count }} a test {{ data }} </template>
  </FullEventCalendar>
</template>

<style scoped>
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
