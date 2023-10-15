<script setup lang="ts">
import { useTopicsStore, type FormatsDefinitions } from '@/stores/topics';
import FormattedText from '@/components/FormattedText.vue';
import { computed } from 'vue';

const props = defineProps<{
  formatType: keyof FormatsDefinitions,
  id: string
}>()

const text = computed(() => props.formatType === 'current'
  ? store.currentFormatted[props.id]
  : store.nextFormatted[props.id]
)

const settings = computed(() => store.formats[props.formatType][props.id])

const store = useTopicsStore()
</script>

<template>
  <FormattedText 
    :text="text"
    :color="settings.color"
    :font="settings.font"
  />
</template>

<style scoped>
</style>