<script setup lang="ts">
import { useStartTimeStore } from '@/stores/startTime';
import { useDuration } from '@/use/useDuration';
import FormattedText from './FormattedText.vue';
import { useNow } from '@vueuse/core';
import { storeToRefs } from 'pinia'
import { computed } from 'vue';

const storeRefs = storeToRefs(useStartTimeStore())
const duration = useDuration(
  useNow(),
  storeRefs.startTime,
  { 
    format: storeRefs.format,
    pastformat: storeRefs.pastFormat,
  }
)

const props = defineProps<{ 
  preview?: boolean;
}>()

const color = computed(() => props.preview ? undefined : storeRefs.color.value)
const font = computed(() => props.preview ? undefined : storeRefs.font.value)
</script>

<template>
  <FormattedText 
    :text="duration" 
    :preview="preview"
    :color="color"
    :font="font"
  />
</template>