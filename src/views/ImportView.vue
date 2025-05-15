<script setup lang="ts">
import { useTopicsStore } from '@/stores/topics';
import { useVdoNinjaStore } from '@/stores/vdoNinja'
import { ref } from 'vue';
import router from '@/router';
import { useStartTimeStore } from '@/stores/startTime';

const rawLines = ref('')
const shouldStopImportAtFirstEmptyLine = ref(true)

const store = useTopicsStore()
const vdoNinjaStore = useVdoNinjaStore()
const startTimeStore = useStartTimeStore()

function importRawString() {
  store.importRawString(rawLines.value, shouldStopImportAtFirstEmptyLine.value)
  vdoNinjaStore.clearAssignments()
  startTimeStore.setDefault()
  router.push({ 
    name: getNextRoute()
  })
}

function getNextRoute() {
  if (!store.displayedColumns.length)
    return 'columns'
  
  if (vdoNinjaStore.url)
    return 'assignments'
  
  return 'topics'
}
</script>

<template>
  <h1>Import</h1>
  <textarea v-model="rawLines"/>
  <div class="button-panel">
    <input type="checkbox" id="shouldStopImportAtFirstEmptyLine" v-model="shouldStopImportAtFirstEmptyLine" />
    <label for="shouldStopImportAtFirstEmptyLine">Stop import at first empty line</label>
    <button @click="importRawString">Import</button>
  </div>
</template>

<style scoped>
textarea {
  resize: none;
  flex: 1;
}

.button-panel {
  display: flex;
  flex-flow: row;
  margin-top: 1em;
}

button {
  margin-left: 1em;
  flex: 1;
}
</style>
