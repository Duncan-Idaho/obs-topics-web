<script setup lang="ts">
import { useStartTimeStore } from '@/stores/startTime'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { computed } from 'vue';

const store = useStartTimeStore()
const presetDates = computed(() => [
  { label: 'Default', value: store.today },
  { label: 'Now', value: store.now },
])

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
        <button @click="store.setInOffsetSeconds(5)">5s</button>
        <button @click="store.setInOffsetMinutes(1)">1m</button>
        <button @click="store.setInOffsetMinutes(2)">2m</button>
        <button @click="store.setInOffsetMinutes(5)">5m</button>
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