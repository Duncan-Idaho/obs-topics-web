<script setup lang="ts">
import { useTopicsStore } from '@/stores/topics';
import ColumnsView from '@/components/ColumnsList.vue';

const store = useTopicsStore()
</script>

<template>
  <ColumnsView v-if="store.headers.length"/>
  <div v-else-if="store.topics.length">
    No columns found in imported topics.
    Go to <RouterLink to="/columns">Columns displayed</RouterLink> to choose which columns should be displayed
  </div>
  <div v-else>
    Go to <RouterLink to="/import">Import</RouterLink> to add topics
  </div>
</template>

<style scoped>
</style>