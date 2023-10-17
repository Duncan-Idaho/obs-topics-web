<script setup lang="ts">
import { useTopicsStore, type FormatsDefinitions } from '@/stores/topics';
import { ref } from 'vue';

const newId = ref('')
const newPattern = ref('')
const newDefault = ref('')
const newColor = ref('')
const newFont = ref('')

function add(format: keyof FormatsDefinitions) {
  if (newId.value && newPattern.value) {
    store.formats[format][newId.value] = {
      pattern: newPattern.value,
      default: newDefault.value,
      color: newColor.value,
      font: newFont.value      
    }
  }
}

const store = useTopicsStore()
</script>

<template>
  <h2>Add formatter</h2>
  <div class="add-panel">
    <div>
      <input type="text" id="add-id" class="add-id" placeholder="Identifier" v-model="newId"/>
    </div>
    <div>
      <label for="add-pattern">Pattern:</label>
      <input type="text" id="add-pattern" placeholder="Pattern" v-model="newPattern"/>
    </div>
    <div>
      <label for="add-default">Default value:</label>
      <input type="text" id="add-default" placeholder="Default Value" v-model="newDefault"/>
    </div>
    <div>
      <label for="add-color">Text color:</label>
      <input type="text" id="add-color" v-model="newColor"/>
    </div>
    <div>
      <label for="add-font">Text font:</label>
      <input type="text" id="add-font" v-model="newFont"/>
    </div>
    <div>
      <button @click="add('current')" class="action-button">Add current</button>
      <button @click="add('next')" class="action-button">Add next</button>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/formatter-card.css";

.add-panel {
  align-self: flex-start;
}

.add-id {
  font-size: 1.17em;
  margin: 0.13em 0em;
}
</style>
