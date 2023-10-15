<script setup lang="ts">
import { useTopicsStore } from '@/stores/topics';
import ColumnsView from '@/components/ColumnsList.vue';
import FormattersList from '@/components/FormattersList.vue';
import StartTimeSettings from '@/components/StartTimeSettings.vue';

const store = useTopicsStore()
</script>

<template>
  <ColumnsView v-if="store.headers.length"/>
  <FormattersList title="Current formatters" format-type="current"/>
  <FormattersList title="Next formatters" format-type="next"/>
  <StartTimeSettings/>
</template>

<style scoped>
</style>