<script setup lang="ts">
import { useTopicsStore, type FormatsDefinitions } from '@/stores/topics';
import { computed } from 'vue';
import FormattersEntry from './FormattersEntry.vue'
import FormattersAdd from './FormattersAdd.vue'

const props = defineProps<{
  title: string,
  formatType: keyof FormatsDefinitions,
}>()

const formats = computed(() => store.formats[props.formatType])
const store = useTopicsStore()
const shouldDisplay = computed(() => Object.keys(formats.value).length)
</script>

<template>
  <template v-if="shouldDisplay">
    <h2>{{ title }}</h2>
    <ul>
      <FormattersEntry 
        v-for="(format, id) in formats" 
        :key="id"
        :id="id + ''"
        :format="format"
        :format-type="formatType"
        @delete="id => delete formats[id]"
      />
    </ul>
  </template>
</template>

<style scoped>
@import "@/assets/formatter-card.css";
</style>