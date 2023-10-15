<script setup lang="ts">
import { useTopicsStore } from '@/stores/topics';
import FormattedText from './FormattedText.vue';
import StartTime from './StartTime.vue';

const store = useTopicsStore()
</script>

<template>
  <h2>Current Formatters</h2>
  <ul>
    <li v-for="(_, id) in store.currentFormatted">
      <div class="header">{{ id }}:</div>
      <FormattedText :text="store.currentFormatted[id]" preview/>
    </li>
  </ul>
  <h2>Next Formatters</h2>
  <ul>
    <li v-for="(_, id) in store.nextFormatted">
      <div class="header">{{ id }}:</div>
      <FormattedText :text="store.nextFormatted[id]" preview/>
    </li>
  </ul>
  <h2>Start Time</h2>
  <div class="start-time-block">
    <div class="header">Starting in:</div>
    <StartTime preview />
  </div>
</template>

<style scoped>
ul {
  margin: 0.5em 0em;
}

.start-time-block {
  margin-top: 0.5em;
}

li, .start-time-block {
  display: flex;
  flex-direction: row;
  gap: 1em;
  height: 2em;
}

.header {
  width: 10em;
}
</style>