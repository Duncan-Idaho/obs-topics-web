<script setup lang="ts">
import { useStartTimeStore } from '@/stores/startTime'
import { useNow } from '@vueuse/core'
import { computed } from 'vue';
import { useTopicsStore } from '@/stores/topics';
const topicsStore = useTopicsStore()

const store = useStartTimeStore()
const now = useNow()
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

const firstFormatCurrent = computed(() => {
  const formats = Object.keys(topicsStore.formats.current)
  return formats.length ? formats[0] : null
})
const firstFormatNext = computed(() => {
  const formats = Object.keys(topicsStore.formats.next)
  return formats.length ? formats[0] : null
})
</script>

<template>
  <div class="controls">
    <div class="current" v-if="firstFormatCurrent">
      <button @click="topicsStore.moveToLast(false, 0)" v-if="topicsStore.topics.length > 1">⏬</button>
      <button @click="topicsStore.markAsDone(0)" v-if="topicsStore.topics.length">✔️</button>
      Now: {{ topicsStore.currentFormatted[firstFormatCurrent] }}
    </div>
    <div class="next" v-if="firstFormatNext">
      <button @click="topicsStore.moveToLast(false, 1)" v-if="topicsStore.topics.length > 2">⏬</button>
      Next: {{ topicsStore.nextFormatted[firstFormatNext] }}
    </div>
    <div class="postponing">      
      <div class="clock">⏱️</div>
      <button @click="setInOffsetSeconds(5)">5s</button>
      <button @click="setInOffsetMinutes(1)">1m</button>
      <button @click="setInOffsetMinutes(2)">2m</button>
      <button @click="setInOffsetMinutes(5)">5m</button>
    </div>
  </div>
</template>

<style>
.controls {
  display: flex;
  gap: 0.5em;
  margin-left: 0.2em;
  justify-self: stretch;
  flex-wrap: nowrap;
}
.postponing {
  margin-left: 0.3em;
  display: flex;
  gap: 0.2em;
  align-items: stretch;
  vertical-align: middle;
}
.current, .next {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}
.clock {
  align-self: center;
}
</style>