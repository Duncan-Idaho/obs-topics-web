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
  <FormattedText :format-type="formatType" :id="id"/>
</template>

<style scoped>
</style>