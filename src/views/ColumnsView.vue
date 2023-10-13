<script setup lang="ts">
import { useTopicsStore } from '@/stores/topics';

const store = useTopicsStore()
</script>

<template>
  <ul>
    <li v-for="header in store.headers" :key="header">
      <input type="checkbox" :id="header" v-model="store.columnDisplay[header]"/>
      <label :for="header">{{ header }}</label>
    </li>
  </ul>
</template>

<style scoped>
ul {
  list-style-type: none;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  padding-inline-start: 0;
}
</style>