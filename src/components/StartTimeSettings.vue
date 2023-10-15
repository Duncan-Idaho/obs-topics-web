<script setup lang="ts">
import router from '@/router';
import { useStartTimeStore } from '@/stores/startTime'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { useClipboard } from '@vueuse/core';
import { computed } from 'vue';

const store = useStartTimeStore()

const href = computed(() => {
  const { href } = router.resolve('start')
  return (new URL(href, document.location.href)).href
})
  
const { copy, isSupported } = useClipboard({ source: href })
</script>

<template>
  <div class="title">
    <h2>Start time</h2>
    <button v-if="isSupported" @click="() => copy(href)" class="copy">📋</button>
    <span v-else>Your does not support Clipboard API</span>
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
    <label for="default-start-time">Default start time: </label>
    <VueDatePicker 
      v-model="store.defaultStartTime" 
      time-picker
      text-input 
      auto-apply
      class="time-picker"
    />
  </div>
</template>

<style>
.title {
  gap: 1em;
}
.copy {
  align-self: center;
}
div {
  display: flex;
}
label {
  width: 11em;
}
.time-picker {
  display: inline-block;
  width: 8em;
}
</style>