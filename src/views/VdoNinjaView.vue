<script setup lang="ts">
import VdoNinjaFrame from '@/components/VdoNinjaFrame.vue'
import { useVdoNinjaStore } from '@/stores/vdoNinja'

const store = useVdoNinjaStore()
</script>

<template>
  <template v-if="store.url.length">
    <VdoNinjaFrame/>
  </template>
  <template v-else>
    Go to <RouterLink to="/settings">Import</RouterLink> to add topics
  </template>
</template>

<style scoped>
</style>