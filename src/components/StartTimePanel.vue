<script setup lang="ts">
import { useStartTimeStore } from '@/stores/startTime'
import { useNow } from '@vueuse/core'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { computed } from 'vue';

const store = useStartTimeStore()
const now = useNow()
const today = computed(() => {
  const result = new Date(now.value)
  result.setHours(store.defaultStartTime.hours)
  result.setMinutes(store.defaultStartTime.minutes)
  result.setSeconds(0)
  result.setMilliseconds(0)
  return result  
})
const presetDates = computed(() => [
  { label: 'Default', value: today.value },
  { label: 'Now', value: now.value },
])
function setInOffsetSeconds(minutes: number) {
  const newStartTime = new Date(now.value)
  newStartTime.setSeconds(newStartTime.getSeconds() + minutes)
  store.startTime = newStartTime.valueOf()
}
function setInOffsetMinutes(minutes: number) {
  const newStartTime = new Date(now.value)
  newStartTime.setMinutes(newStartTime.getMinutes() + minutes)
  store.startTime = newStartTime.valueOf()
}
</script>

<template>
  <div class="panel">
    <div class="header">Starts:</div>
      <div class="controls">
      <div>
        <VueDatePicker 
          v-model="store.startTime" 
          model-type="timestamp"
          :preset-dates="presetDates"
          text-input 
          enable-seconds
          :flow="['calendar', 'time']"
          auto-apply
          class="date-picker"
          input-class-name="dense-date-picker-input"
          dark
        />
      </div>
      <div class="postponing">      
        <div class="clock">⏱️</div>
        <button @click="setInOffsetSeconds(5)">5s</button>
        <button @click="setInOffsetMinutes(1)">1m</button>
        <button @click="setInOffsetMinutes(2)">2m</button>
        <button @click="setInOffsetMinutes(5)">5m</button>
      </div>
    </div>
  </div>
</template>

<style>
.panel {
  display: flex;
  gap: 0.5em;
  margin-left: 0.2em;
  margin-bottom: 0.5em;
}
.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
}
.header {
  font-weight: bold;
  width: 7.3em;
}
.date-picker {
  width: 14.5em;
}
.postponing {
  margin-left: 0.3em;
  display: flex;
  gap: 0.2em;
  align-items: stretch;
  vertical-align: middle;
}
.clock {
  align-self: center;
}
</style>