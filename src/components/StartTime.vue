<script setup lang="ts">
import { useStartTimeStore } from '@/stores/startTime';
import { useDuration } from '@/use/useDuration';
import FormattedText from './FormattedText.vue';
import { useNow } from '@vueuse/core';
import { storeToRefs } from 'pinia'

const storeRefs = storeToRefs(useStartTimeStore())
const duration = useDuration(
  useNow(),
  storeRefs.startTime,
  { 
    format: storeRefs.format,
    pastformat: storeRefs.pastFormat,
  }
)
</script>

<template>
  <FormattedText :text="duration"/>
</template>