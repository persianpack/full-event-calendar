<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import { ref, watch } from 'vue'
import { FullEventCalendar } from './components/FullEventCalendar'
// import { events } from '@full-event-calendar/test-events'
import { DailyGridPlugin } from '@full-event-calendar/daily-grid'
import { MonthGridPlugin } from '@full-event-calendar/month-grid'
import { WeeklyGridPlugin } from '@full-event-calendar/weekly-grid'
import { ListPlugin } from '@full-event-calendar/list/dist/index.js'
import '@full-event-calendar/core/dist/main.css'
const events = [
  //all days for wwekly

  {
    name: 'some name',
    start: new Date(' Aug 01 2023 08:00:0'),
    end: new Date(' Aug 03 2023 10:00:00'),
    id: 16123,
    color: '#BF51F9'
  },
  {
    name: 'some name',
    start: new Date(' Aug 04 2023 08:00:0'),
    color: '#31B5F7',
    end: new Date(' Aug 07 2023 10:00:00'),
    id: 18123
  },
  {
    name: 'some name',
    start: new Date(' Aug 01 2023 08:00:0'),
    end: new Date(' Aug 02 2023 10:00:00'),
    id: 17123,
    color: '#FF5280'
  },
  {
    name: 'some name',
    color: '#BF51F9',
    start: new Date(' Aug 03 2023 08:00:0'),
    end: new Date(' Aug 05 2023 10:00:00'),
    id: 19123
  },

  {
    name: 'some name',
    start: new Date(' Aug 06 2023 08:00:0'),
    color: '#31B5F7',
    end: new Date(' Aug 09 2023 10:00:00'),
    id: 110
  },
  {
    name: 'some name',
    start: new Date(' Aug 06 2023 08:00:0'),
    color: '#FF5280',
    end: new Date(' Aug 07 2023 10:00:00'),
    id: 111
  },
  {
    name: 'some name',
    start: new Date(' Aug 08 2023 08:00:0'),
    color: '#BF51F9',
    end: new Date(' Aug 09 2023 10:00:00'),
    id: 112
  },
  {
    name: 'some name',
    start: new Date(' Aug 08 2023 08:00:0'),
    color: '#31B5F7',
    end: new Date(' Aug 09 2023 10:00:00'),
    id: 113
  },
  {
    name: 'some name',
    color: '#FF5280',
    start: new Date(' Aug 05 2023 08:00:0'),
    end: new Date(' Aug 30 2023 10:00:00'),
    id: 114
  },
  {
    name: 'some name',
    color: '#BF51F9',
    start: new Date(' Aug 11 2023 00:00:00'),
    end: new Date(' Aug 11 2023 23:59:59'),
    id: 117
  },

  {
    name: 'some name',
    color: '#35D4CB',
    start: new Date(' Aug 08 2023 05:00:00'),
    end: new Date(' Aug 08 2023 07:59:59'),
    id: 186
  },
  {
    name: 'some name',
    start: new Date(' Aug 19 2023 05:00:00'),
    color: '#FF5280',
    end: new Date(' Aug 20 2023 07:59:59'),
    id: 189
  },

  {
    name: 'some name',
    start: new Date('Thu Aug 08 2023 08:00:0'),
    color: '#BF51F9',
    end: new Date('Thu Aug 13 2023 10:00:00'),
    id: 32
  },

  {
    name: 'some name',
    color: '#35D4CB',
    start: new Date('Thu Aug 05 2023 08:00:0'),
    end: new Date('Thu Aug 08 2023 10:00:00'),
    id: 31
  },

  {
    name: 'some name',
    start: new Date('Thu Aug 01 2023 08:00:0'),
    color: '#FF5280',
    end: new Date('Thu Aug 20 2023 10:00:00'),
    id: 30
  },
  {
    name: 'some name',
    color: '#BF51F9',
    start: new Date('Thu Aug 01 2023 08:00:0'),
    end: new Date('Thu Aug 4 2023 10:00:00'),
    id: 33
  },

  //all days for daily
  {
    name: 'some name',
    color: '#FF5280',
    start: new Date('Thu Aug 08 2023 08:00:0'),
    end: new Date('Thu Aug 08 2023 10:00:00'),
    id: 23
  },
  {
    name: 'some name',
    start: new Date('Thu Aug 08 2023 03:00:00'),
    end: new Date('Thu Aug 08 2023 04:00:00'),
    color: '#31B5F7',
    id: 24
  },
  {
    name: 'some name',
    start: new Date('Thu Aug 08 2023 13:30:00'),
    color: '#BF51F9',
    end: new Date('Thu Aug 08 2023 15:00:00'),
    id: 25
  },

  {
    name: 'some name',
    start: new Date('Thu Aug 09 2023 15:00:0'),
    color: '#FF5280',
    end: new Date('Thu Aug 09 2023 17:00:00'),
    id: 20
  },
  {
    name: 'some name',
    color: '#31B5F7',
    start: new Date('Thu Aug 09 2023 13:00:00'),
    end: new Date('Thu Aug 09 2023 17:00:00'),
    id: 21
  },
  {
    name: 'some name',
    color: '#BF51F9',
    start: new Date('Thu Aug 09 2023 13:30:00'),
    end: new Date('Thu Aug 09 2023 15:00:00'),
    id: 22
  },

  {
    name: 'some name',
    start: new Date('Thu Aug 10 2023 15:00:0'),
    color: '#35D4CB',
    end: new Date('Thu Aug 10 2023 17:00:00'),
    id: 7
  },
  {
    name: 'some name',
    color: '#31B5F7',
    start: new Date('Thu Aug 10 2023 13:00:00'),
    end: new Date('Thu Aug 10 2023 17:00:00'),
    id: 8
  },
  {
    name: 'some name',
    color: '#BF51F9',
    start: new Date('Thu Aug 10 2023 13:30:00'),
    end: new Date('Thu Aug 10 2023 15:00:00'),
    id: 9
  },
  {
    name: 'some name',
    start: new Date('Thu Aug 10 2023 14:00:00'),
    color: '#FF5280',
    end: new Date('Thu Aug 10 2023 16:30:00'),
    id: 10
  },
  {
    name: 'some name',
    color: '#31B5F7',
    start: new Date('Thu Aug 10 2023 16:00:00'),
    end: new Date('Thu Aug 10 2023 18:00:00'),
    id: 11
  },
  {
    name: 'some name',
    start: new Date('Thu Aug 10 2023 12:00:00'),
    color: '#35D4CB',
    end: new Date('Thu Aug 10 2023 14:05:00'),
    id: 6
  },
  {
    name: 'some name',
    start: new Date('Thu Aug 10 2023 16:15:00'),
    color: '#FF5280',
    end: new Date('Thu Aug 10 2023 22:05:00'),
    id: 12
  },
  {
    color: '#31B5F7',
    name: 'some name',
    start: new Date('Thu Aug 10 2023 17:30:00'),
    end: new Date('Thu Aug 10 2023 22:05:00'),
    id: 13
  },
  {
    name: 'some name',
    color: '#BF51F9',
    start: new Date('Thu Aug 10 2023 17:10:00'),
    end: new Date('Thu Aug 10 2023 19:30:00'),
    id: 14,
    groups: [2]
  },
  {
    name: 'some name',
    color: '#31B5F7',
    start: new Date('Thu Aug 10 2023 17:15:00'),
    end: new Date('Thu Aug 10 2023 20:00:00'),
    id: 15,
    groups: [1]
  },
  {
    name: 'some name',
    start: new Date('Thu Aug 10 2023 19:00:00'),
    color: '#FF5280',
    end: new Date('Thu Aug 10 2023 22:05:00'),
    id: 16
  },
  {
    name: 'some name',
    start: new Date('Thu Aug 10 2023 20:00:00'),
    color: '#BF51F9',
    end: new Date('Thu Aug 10 2023 23:05:00'),
    id: 170
  },
  {
    name: 'some name',
    start: new Date('Thu Aug 10 2023 00:00:00'),
    end: new Date('Thu Aug 10 2023 23:59:59'),
    color: '#31B5F7',
    id: 18
  },
  {
    name: 'some name',
    start: new Date('Thu Aug 10 2023 00:00:00'),
    end: new Date('Thu Aug 11 2023 15:59:59'),
    id: 19,
    color: '#31B5F7'
  }
]
const eventsList = ref(events)
const count = ref(0)
//@ts-ignore
function saySmt(ss) {
  console.log('sdsd', ss.data.ondataChange(new Date()))
}
// import
function eventUpdate(data: any) {
  console.log('on event update ', data)
  eventsList.value.push(data.next.sourceEvent)
}

function AddEvent(data: any) {
  console.log('dataAdded', data)
  eventsList.value.push(data.sourceEvent)
}

const dateee = ref(new Date('Thu Aug 10 2023 15:00:0'))
const gridType = ref('daily') as any
watch(gridType, () => {
  console.log('dfonowad')
})
setTimeout(() => {
  //dateee.value = new Date()
}, 4000)
function eventAdd({ event }) {
  eventsList.value.push(event)
  console.log(event)
}
//@ts-ignore
const timeZonez = Intl.supportedValuesOf('timeZone')
//@ts-ignore
const calendars = Intl.supportedValuesOf('calendar')

const localesss = [
  'af-ZA',
  'am-ET',
  'ar-AE',
  'ar-BH',
  'ar-DZ',
  'ar-EG',
  'ar-IQ',
  'ar-JO',
  'ar-KW',
  'ar-LB',
  'ar-LY',
  'ar-MA',
  'arn-CL',
  'ar-OM',
  'ar-QA',
  'ar-SA',
  'ar-SD',
  'ar-SY',
  'ar-TN',
  'ar-YE',
  'as-IN',
  'az-az',
  'az-Cyrl-AZ',
  'az-Latn-AZ',
  'ba-RU',
  'be-BY',
  'bg-BG',
  'bn-BD',
  'bn-IN',
  'bo-CN',
  'br-FR',
  'bs-Cyrl-BA',
  'bs-Latn-BA',
  'ca-ES',
  'co-FR',
  'cs-CZ',
  'cy-GB',
  'da-DK',
  'de-AT',
  'de-CH',
  'de-DE',
  'de-LI',
  'de-LU',
  'dsb-DE',
  'dv-MV',
  'el-CY',
  'el-GR',
  'en-029',
  'en-AU',
  'en-BZ',
  'en-CA',
  'en-cb',
  'en-GB',
  'en-IE',
  'en-IN',
  'en-JM',
  'en-MT',
  'en-MY',
  'en-NZ',
  'en-PH',
  'en-SG',
  'en-TT',
  'en-US',
  'en-ZA',
  'en-ZW',
  'es-AR',
  'es-BO',
  'es-CL',
  'es-CO',
  'es-CR',
  'es-DO',
  'es-EC',
  'es-ES',
  'es-GT',
  'es-HN',
  'es-MX',
  'es-NI',
  'es-PA',
  'es-PE',
  'es-PR',
  'es-PY',
  'es-SV',
  'es-US',
  'es-UY',
  'es-VE',
  'et-EE',
  'eu-ES',
  'fa-IR',
  'fi-FI',
  'fil-PH',
  'fo-FO',
  'fr-BE',
  'fr-CA',
  'fr-CH',
  'fr-FR',
  'fr-LU',
  'fr-MC',
  'fy-NL',
  'ga-IE',
  'gd-GB',
  'gd-ie',
  'gl-ES',
  'gsw-FR',
  'gu-IN',
  'ha-Latn-NG',
  'he-IL',
  'hi-IN',
  'hr-BA',
  'hr-HR',
  'hsb-DE',
  'hu-HU',
  'hy-AM',
  'id-ID',
  'ig-NG',
  'ii-CN',
  'in-ID',
  'is-IS',
  'it-CH',
  'it-IT',
  'iu-Cans-CA',
  'iu-Latn-CA',
  'iw-IL',
  'ja-JP',
  'ka-GE',
  'kk-KZ',
  'kl-GL',
  'km-KH',
  'kn-IN',
  'kok-IN',
  'ko-KR',
  'ky-KG',
  'lb-LU',
  'lo-LA',
  'lt-LT',
  'lv-LV',
  'mi-NZ',
  'mk-MK',
  'ml-IN',
  'mn-MN',
  'moh-CA',
  'mr-IN',
  'ms-BN',
  'ms-MY',
  'mt-MT',
  'nb-NO',
  'ne-NP',
  'nl-BE',
  'nl-NL',
  'nn-NO',
  'no-no',
  'nso-ZA',
  'oc-FR',
  'or-IN',
  'pa-IN',
  'pl-PL',
  'prs-AF',
  'ps-AF',
  'pt-BR',
  'pt-PT',
  'qut-GT',
  'quz-BO',
  'quz-EC',
  'quz-PE',
  'rm-CH',
  'ro-mo',
  'ro-RO',
  'ru-mo',
  'ru-RU',
  'rw-RW',
  'sah-RU',
  'sa-IN',
  'se-FI',
  'se-NO',
  'se-SE',
  'si-LK',
  'sk-SK',
  'sl-SI',
  'sma-NO',
  'sma-SE',
  'smj-NO',
  'smj-SE',
  'smn-FI',
  'sms-FI',
  'sq-AL',
  'sr-BA',
  'sr-CS',
  'sr-ME',
  'sr-RS',
  'sr-sp',
  'sv-FI',
  'sv-SE',
  'sw-KE',
  'syr-SY',
  'ta-IN',
  'te-IN',
  'th-TH',
  'tk-TM',
  'tlh-QS',
  'tn-ZA',
  'tr-TR',
  'tt-RU',
  'ug-CN',
  'uk-UA',
  'ur-PK',
  'uz-uz',
  'vi-VN',
  'wo-SN',
  'xh-ZA',
  'yo-NG',
  'zh-CN',
  'zh-HK',
  'zh-MO',
  'zh-SG',
  'zh-TW',
  'zu-ZA'
]
const themes = ['light', 'dark']
const listModes = ['day', 'month', 'week']
const selectedTz = ref('America/New_York')

const selectedCalendar = ref('gregory')
const selectedLocale = ref('en-US')
const selectedTheme = ref('light')
const selectedListMode = ref('week')

watch(selectedTz, () => {
  console.log(selectedTz.value)
})
</script>

<template>
  <div style="display: flex">
    <div style="margin: 30px 10px">
      <label for="cars">Choose a timezone :</label>
      <select name="cars" id="cars" v-model="selectedTz">
        <option v-for="tz in timeZonez" :value="tz">{{ tz }}</option>
      </select>
    </div>

    <div style="margin: 30px 10px">
      <label for="selectedCalendar">Choose a Calendar :</label>
      <select name="selectedCalendar" id="selectedCalendar" v-model="selectedCalendar">
        <option v-for="ca in calendars" :value="ca">{{ ca }}</option>
      </select>
    </div>

    <div style="margin: 30px 10px">
      <label for="selectedLocale">Choose a Locale :</label>
      <select name="selectedLocale" id="selectedLocale" v-model="selectedLocale">
        <option v-for="lang in localesss" :value="lang">{{ lang }}</option>
      </select>
    </div>

    <div style="margin: 30px 10px">
      <label for="selectedTheme">Choose a Theme :</label>
      <select name="selectedTheme" id="selectedTheme" v-model="selectedTheme">
        <option v-for="theme in themes" :value="theme">{{ theme }}</option>
      </select>
    </div>
    <div style="margin: 30px 10px">
      <label for="selectedlistModes">Choose a listMode :</label>
      <select name="selectedlistModes" id="selectedlistModes" v-model="selectedListMode">
        <option v-for="listMode in listModes" :value="listMode">{{ listMode }}</option>
      </select>
    </div>
  </div>

  <FullEventCalendar
    :auto-update-event-on-change="false"
    :editable="true"
    v-model:grid="gridType"
    v-model:events="eventsList"
    @eventUpdate="eventUpdate"
    @eventAdd="eventAdd"
    stop-add-event
    :list-mode="selectedListMode"
    :theme="selectedTheme"
    :time-zone="selectedTz"
    :locale="selectedLocale"
    v-model:initial-date="dateee"
    :calendar="selectedCalendar"
    :plugins="[DailyGridPlugin, WeeklyGridPlugin, MonthGridPlugin, ListPlugin]"
  >
    <!-- <template #dailyHeader="data"> daily header slot {{ data }} </template> -->
    <!-- <template #timeRange="{data}">{{ data.time }}</template> -->
    <template #addModal="{ data }">
      <div class="addModal">
        this can be a vue.js/React.js slot
        <h2>{{ data.eventData?.name }}</h2>
        <span style="display: block"
          ><b>{{ data.eventData?.start?.toString() }}</b></span
        >
        <span style="display: block"
          ><b>{{ data.eventData?.end?.toString() }}</b></span
        >
        <div class="" style="flex: 1"></div>
        <div @click="data.saveModal">
          <button @click="AddEvent(data.eventData)">save</button>
        </div>
      </div>
    </template>
    <template #eventClick="{ data }">
      <div class="eventClickModal">
        this can be a vue.js/React.js slot
        <h2>{{ data.eventData?.name }}</h2>
        <span style="display: block"
          ><b>{{ data.eventData?.start?.toString() }}</b></span
        >
        <span style="display: block"
          ><b>{{ data.eventData?.end?.toString() }}</b></span
        >
        <div class="" style="flex: 1"></div>
        <!-- <button>Edit event</button> -->
      </div>
      <!-- <div class="eventClickModal">{{ data }}</div> -->
    </template>
    <!-- <template #headerSlot="data">
     how am i
    </template> -->
    <!-- <template #headerDateSlot="data">
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
    <template #groupContainer="{data}">
      <button>{{data}}</button>
    </template>
     <template #gridDropDown="data">
      {{ data.data }}
    </template>  -->
  </FullEventCalendar>
</template>

<style>
/* .calendar-theme-light {
  --shadow: 0px 4px 4px 0px rgba(60, 64, 67, 0.3), 0px 8px 12px 6px rgba(60, 64, 67, 0.15);
  --now: rgb(234, 67, 53);
  --primary: red;
  --hairline: rgb(218, 220, 224);
  --on-surface-variant-agm: #70757a;
  --on-surface-variant: rgb(95, 99, 104);
  --textfield-surface: rgb(32, 33, 36);
  --bg-color:white;
  --bg-hover:rgba(208, 208, 208, 0.38);
  --shawdow:inset 0 0 0.5px 1px hsla(0, 0%,   100%, 0.075),  0 0 0 1px hsla(0, 0%, 0%, 0.05),
  0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),
  0 0.9px 1.5px hsla(0, 0%, 0%, 0.045),
  0 3.5px 6px hsla(0, 0%, 0%, 0.09);
} */
.addModal {
  width: 300px;
  height: 200px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
}

.eventClickModal {
  width: 300px;
  height: 200px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
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
.full-event-calendar-core {
  border-radius: 20px;
}
</style>
