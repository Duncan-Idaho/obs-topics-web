<script setup lang="ts">
import { computed } from 'vue'
import { useTopicsStore } from '@/stores/topics'
import { useVdoNinjaStore } from '@/stores/vdoNinja'
import CardMap from '@/components/CardMap.vue'
import AssignmentPrompt from '@/components/AssignmentPrompt.vue'
import AssignmentEntry from '@/components/AssignmentEntry.vue'

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
  <template v-if="topicsStore.displayedColumns.length && firstFormat">
    <AssignmentPrompt 
      v-if="firstUnassigned" 
      :firstUnassigned="firstUnassigned" 
      :firstFormat="firstFormat"
    />
    <CardMap :items="vdoNinjaStore.assignments">
      <template #default="{item: assignment, key}">
        <AssignmentEntry 
          :streamID="key" 
          :assignment="assignment"
          :format="firstFormat"
          @delete="id => vdoNinjaStore.deleteAssignment(key+'')"/>
      </template>
    </CardMap>
  </template>
  <div v-else-if="firstFormat">
    Go to <RouterLink to="/settings">Settings</RouterLink> to set up at least one format
  </div>
  <div v-else-if="topicsStore.topics.length">
    Go to <RouterLink to="/columns">Columns displayed</RouterLink> to choose which columns should be displayed
  </div>
  <div v-else>
    Go to <RouterLink to="/import">Import</RouterLink> to add topics
  </div>
</template>

<style scoped>
</style>