<script setup lang="ts">
import { useStartTimeStore } from '@/stores/startTime'
import VueDatePicker from '@vuepic/vue-datepicker';
import CopyLink from './CopyLink.vue';
import '@vuepic/vue-datepicker/dist/main.css'

const store = useStartTimeStore()
</script>

<template>
  <div class="section">
    <div class="title">
      <h2>Start time</h2>
      <CopyLink to="start" class="copy-link"/>
    </div>
    <div>
      <label for="format">Format: </label>
      <input type="text" id="format" v-model="store.format"/>
    </div>
    <div>
      <label for="past-format">Format when due past: </label>
      <input type="text" id="past-format" v-model="store.pastFormat"/>
    </div>
    <div>
      <label for="color">Color: </label>
      <input type="text" id="color" v-model="store.color"/>
    </div>
    <div>
      <label for="past-font">Font: </label>
      <input type="text" id="past-font" v-model="store.font"/>
    </div>
    <div>
      <label for="default-start-time">Default start time: </label>
      <VueDatePicker 
        v-model="store.defaultStartTime" 
        time-picker
        text-input 
        auto-apply
        class="time-picker"
        input-class-name="dense-date-picker-input"
        dark
      />
    </div>
  </div>
</template>

<style scoped>
.section {
  margin-bottom: 1em;
}
.section div {
  display: flex;
}
.title {
  gap: 1em;
}
label {
  width: 11em;
}
.time-picker {
  display: inline-block;
  width: 8em;
}
.copy-link {
  max-width: 21.6em;
}
</style>