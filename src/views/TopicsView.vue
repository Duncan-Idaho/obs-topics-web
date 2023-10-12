<script setup lang="ts">
import { useTopicsStore } from '@/stores/topics';

const store = useTopicsStore()
</script>

<template>
  <table v-if="store.displayedColumns.length">
    <thead>
      <th>Actions</th>
      <th v-for="column in store.displayedColumns" :key="column">{{ column }}</th>
    </thead>
    <tbody>
      <tr v-for="(topic, index) in store.topics" :key="index">
        <td></td>
        <td v-for="column in store.displayedColumns" :key="column">{{ topic[column] }}</td>
      </tr>
    </tbody>
  </table>
  <template v-else>
    Go to <RouterLink to="/columns">Columns displayed</RouterLink> to choose which columns should be displayed
  </template>
</template>

<style>
table {
  overflow: auto;
  white-space: nowrap;
}

th {
  text-align: left;
  font-weight: bold;
}
</style>