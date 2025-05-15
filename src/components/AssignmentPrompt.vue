<script setup lang="ts">
import { useTopicsStore } from '@/stores/topics';
import { useVdoNinjaStore, type Stream } from '@/stores/vdoNinja';

const topicsStore = useTopicsStore()
const vdoNinjaStore = useVdoNinjaStore()

defineProps<{
  firstUnassigned: Stream,
  firstFormat: string,
}>()
</script>

<template>
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
      <button 
        v-for="(role, id) in vdoNinjaStore.roles"
        :key="id"
        @click="vdoNinjaStore.assignRole(firstUnassigned.streamID, [id+''], role)">
        {{ role.name }}
      </button>
    </li>
  </ul>
  <button @click="vdoNinjaStore.ignore(firstUnassigned.streamID)">
    ❌ Ignore
  </button>
</template>

<style scoped>
</style>