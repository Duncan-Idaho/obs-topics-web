<script setup lang="ts">
import { useVdoNinjaStore } from '@/stores/vdoNinja'
import RoleList from './RoleList.vue'

const store = useVdoNinjaStore()
</script>

<template>
  <div class="section">
    <div class="title">
      <h2>Vdo Ninja</h2>
    </div>
    <div class="setting">
      <label for="vdo-ninja-url">Url</label>
      <input type="text" id="vdo-ninja-url" v-model="store.url"/>
    </div>
    <div class="setting">
      <label for="vdo-ninja-api-key">API Key</label>
      <input type="text" id="vdo-ninja-api-key" v-model="store.apiKey"/>
    </div>
    <RoleList/>
  </div>
</template>

<style scoped>
.section {
  margin-bottom: 1em;
}
.section .setting, .section .title{
  display: flex;
}
.title {
  gap: 1em;
}
label {
  width: 11em;
}
</style>