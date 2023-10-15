<script setup lang="ts">
import { useTopicsStore, type FormatsDefinitions } from '@/stores/topics';
import FormattedText from '@/components/FormattedText.vue';

defineProps<{
  formatType: keyof FormatsDefinitions,
  id: string
}>()

const store = useTopicsStore()
</script>

<template>
  <FormattedText v-if="formatType === 'current'" :text="store.currentFormatted[id]"/>
  <FormattedText v-if="formatType === 'next'" :text="store.nextFormatted[id]"/>
</template>

<style scoped>
</style>