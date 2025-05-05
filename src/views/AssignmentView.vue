<script setup lang="ts">
import { computed } from 'vue'
import { useTopicsStore } from '@/stores/topics';
import { useVdoNinjaStore } from '@/stores/vdoNinja';

const topicsStore = useTopicsStore()
const vdoNinjaStore = useVdoNinjaStore()

const firstFormat = computed(() => {
  const formats = Object.keys(topicsStore.formats.current)
  return formats.length ? formats[0] : null
})

const firstUnassigned = computed(() => {
  return vdoNinjaStore.unassigned.length > 0 ? vdoNinjaStore.unassigned[0] : null
})
</script>

<template>
  <template v-if="topicsStore.displayedColumns.length">
    <template v-if="firstUnassigned && firstFormat">
      <h3>
        Who is
        <template v-if="firstUnassigned.label">
          {{ firstUnassigned.label }} ({{firstUnassigned.streamID}})
        </template>
        <template v-else>
          {{ firstUnassigned.streamID }}
        </template>
        ?
      </h3>
      <ul>
        <li v-for="(topic, id) in topicsStore.allFormatted" :key="id">
          {{ topic[firstFormat] }} : 
          <button @click="vdoNinjaStore.assignAsPresenter(firstUnassigned.streamID, [id+''])">🧑‍💻</button>
          <button @click="vdoNinjaStore.assignAsRemotePresenter(firstUnassigned.streamID, [id+''])">🌍</button>
          <button @click="vdoNinjaStore.assignAsScreenshare(firstUnassigned.streamID, [id+''])">💻</button>
          <button @click="vdoNinjaStore.ignore(firstUnassigned.streamID)">❌</button>
        </li>
      </ul>
    </template>
  </template>
  <div v-else-if="topicsStore.topics.length">
    Go to <RouterLink to="/columns">Columns displayed</RouterLink> to choose which columns should be displayed
  </div>
  <div v-else>
    Go to <RouterLink to="/import">Import</RouterLink> to add topics
  </div>
</template>

<style scoped>
:deep(.drager_top > div), :deep(.drager_bottom > div) {
  overflow: auto;
}
</style>