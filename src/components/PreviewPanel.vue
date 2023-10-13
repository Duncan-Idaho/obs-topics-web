<script setup lang="ts">
import { useTopicsStore } from '@/stores/topics';
import ColumnsView from '@/components/ColumnsList.vue';
import FormattersListVue from '@/components/FormattersList.vue';
import FormattedText from './FormattedText.vue';

const store = useTopicsStore()
</script>

<template>
  <h2>Current Formatters</h2>
  <ul>
    <li v-for="(_, id) in store.currentFormatted">
      <div>{{ id }}:</div>
      <FormattedText format-type="current" :id="id + ''"/>
    </li>
  </ul>
  <h2>Next Formatters</h2>
  <ul>
    <li v-for="(_, id) in store.nextFormatted">
      <div>{{ id }}:</div>
      <FormattedText format-type="next" :id="id + ''"/>
    </li>
  </ul>
</template>

<style scoped>
li {
  display: flex;
  flex-direction: row;
  gap: 1em;
}
</style>