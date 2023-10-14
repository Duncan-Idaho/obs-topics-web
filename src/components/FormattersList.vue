<script setup lang="ts">
import { useTopicsStore, type FormatsDefinitions } from '@/stores/topics';
import { computed, ref } from 'vue';
import FormattersEntry from './FormattersEntry.vue'

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
    <FormattersEntry 
      v-for="(format, id) in formats" 
      :key="id"
      :id="id + ''"
      :format="format"
      :format-type="formatType"
      @delete="id => delete formats[id]"
    />
  </ul>
  <div class="add-panel">
    <input type="text" id="add-id'" placeholder="Identifier" v-model="newId"/>
    <input type="text" id="add-pattern" placeholder="Pattern" v-model="newPattern"/>
    <input type="text" id="add-default" placeholder="Default Value" v-model="newDefault"/>
    <button @click="add">Add</button>
  </div>
</template>

<style scoped>
.add-panel {
  display: flex;
  flex-direction: row;
  gap: 1em;
  margin: 1em 0em;
}
</style>