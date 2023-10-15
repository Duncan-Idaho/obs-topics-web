<script setup lang="ts">
import { useTopicsStore } from '@/stores/topics';
import ColumnsView from '@/components/ColumnsList.vue';

const store = useTopicsStore()
</script>

<template>
  <ColumnsView v-if="store.headers.length"/>
</template>

<style scoped>
</style>