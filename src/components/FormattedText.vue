<script setup lang="ts">
import { useTopicsStore, type FormatsDefinitions } from '@/stores/topics';

const props = defineProps<{
  formatType: keyof FormatsDefinitions,
  id: string
}>()

const store = useTopicsStore()
</script>

<template>
  <template v-if="formatType === 'current'">
    {{ store.currentFormatted[id] }}
  </template>
  <template v-if="formatType === 'next'">
    {{ store.nextFormatted[id] }}
  </template>
</template>

<style scoped>
</style>