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
      <div>{{ id }}:</div>
      <FormattedText :text="store.currentFormatted[id]"/>
    </li>
  </ul>
  <h2>Next Formatters</h2>
  <ul>
    <li v-for="(_, id) in store.nextFormatted">
      <div>{{ id }}:</div>
      <FormattedText :text="store.nextFormatted[id]"/>
    </li>
  </ul>
  <h2>Start Time</h2>
  <StartTime />
</template>

<style scoped>
li {
  display: flex;
  flex-direction: row;
  gap: 1em;
}
</style>