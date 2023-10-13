<script setup lang="ts">
import { useTopicsStore, type Formats, type FormatsDefinitions } from '@/stores/topics';
import { computed, ref } from 'vue';

const props = defineProps<{
  title: string,
  formatType: keyof FormatsDefinitions,
}>()

const formats = computed(() => store.formats[props.formatType])

const newId = ref('')
const newPattern = ref('')
const newDefault = ref('')

function add() {
  if (newId.value && newPattern.value) {
    formats.value[newId.value] = { 
      pattern: newPattern.value,
      default: newDefault.value
    }
  }
}

const store = useTopicsStore()
</script>

<template>
  <h2>{{ title }}</h2>
  <ul>
    <li v-for="(format, id) in formats" :key="id">
      <div>
        <label :for="'format-' + id + '-pattern'" class="id">{{ id }}: </label>
        <input type="text" :id="id + '-pattern'" v-model="format.pattern"/>
      </div>
      <div>
        <label :for="'format-' + id + '-default'">&nbsp;&mdash; Default value</label>
        <input type="text" :id="id + '-default'" v-model="format.default"/>
      </div>
      <div>
        <button @click="delete formats[id]">Delete</button>
      </div>
    </li>
  </ul>
  <div class="add-panel">
    <input type="text" id="add-id'" placeholder="Identifier" v-model="newId"/>
    <input type="text" id="add-pattern" placeholder="Pattern" v-model="newPattern"/>
    <input type="text" id="add-default" placeholder="Default Value" v-model="newDefault"/>
    <button @click="add">Add</button>
  </div>
</template>

<style scoped>
li, li > div, .add-panel {
  display: flex;
  flex-direction: row;
  gap: 0.5em;
}

label.id {
  width: 10em;
}

.add-panel {
  gap: 1em;
  margin: 1em 0em;
}
</style>