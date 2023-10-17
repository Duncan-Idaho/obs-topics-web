<script setup lang="ts">
import { useTopicsStore } from '@/stores/topics';
import { ref } from 'vue';
import router from '@/router';

const rawLines = ref('')
const shouldStopImportAtFirstEmptyLine = ref(true)

const store = useTopicsStore()

function importRawString() {
  store.importRawString(rawLines.value, shouldStopImportAtFirstEmptyLine.value)
  router.push({ 
    name: store.displayedColumns.length
      ? 'topics'  
      : 'columns'
  })
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
