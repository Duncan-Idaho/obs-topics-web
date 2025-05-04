<script setup lang="ts">
import { useVdoNinjaStore } from '@/stores/vdoNinja'

const store = useVdoNinjaStore()
</script>

<template>
  <div class="section">
    <div class="title">
      <h2>Vdo Ninja URL</h2>
      <input type="text" id="vdo-ninja-url" v-model="store.url"/>
    </div>
  </div>
</template>

<style scoped>
.section {
  margin-bottom: 1em;
}
.section div {
  display: flex;
}
.title {
  gap: 1em;
}
label {
  width: 11em;
}
</style>