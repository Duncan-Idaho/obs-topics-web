<script setup lang="ts">
import { useTopicsStore } from '@/stores/topics';
import ColumnsView from '@/components/ColumnsList.vue';
import FormattersListVue from '@/components/FormattersList.vue';

const store = useTopicsStore()
</script>

<template>
  <ColumnsView v-if="store.headers.length"/>
  <FormattersListVue title="Current formatters" format-type="current"/>
  <FormattersListVue title="Next formatters" format-type="next"/>
</template>

<style scoped>
</style>