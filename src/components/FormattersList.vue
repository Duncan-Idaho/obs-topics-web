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
</script>

<template>
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
    <FormattersAdd :format-type="formatType"/>
  </ul>
</template>

<style scoped>
.add-panel {
  display: flex;
  flex-direction: row;
  gap: 1em;
  margin: 1em 0em;
}

ul {
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  gap: 0.6em;
  padding: 0.6em 0em;
}

:deep(li) {
  border: 1px solid var(--vt-c-divider-dark-2);
  /* margin: 0.3em; */
  padding: 0.3em 1em 0.3em 1em;
  display: flex;
  flex-direction: column;
}

:deep(.action-button) {
  justify-self: stretch;
  margin: 0.5em 0em;
}

:deep(label) {
  width: 8em;
}

:deep(div) {
  display: flex;
  gap: 0.5em;
}
</style>