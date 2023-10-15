<script setup lang="ts">
import { useTopicsStore, type FormatsDefinitions } from '@/stores/topics';
import { computed, ref } from 'vue';

const props = defineProps<{
  formatType: keyof FormatsDefinitions,
}>()

const formats = computed(() => store.formats[props.formatType])

const newId = ref('')
const newPattern = ref('')
const newDefault = ref('')
const newColor = ref('')
const newFont = ref('')

function add() {
  if (newId.value && newPattern.value) {
    formats.value[newId.value] = { 
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
  <li>
    <div>
      <input type="text" :id="formatType + 'add-id'" class="add-id" placeholder="Identifier" v-model="newId"/>
    </div>
    <div>
      <label :for="formatType + 'add-pattern'">Pattern:</label>
      <input type="text" :id="formatType + 'add-pattern'" placeholder="Pattern" v-model="newPattern"/>
    </div>
    <div>
      <label :for="formatType + 'add-default'">Default value:</label>
      <input type="text" :id="formatType + 'add-default'" placeholder="Default Value" v-model="newDefault"/>
    </div>
    <div>
      <label :for="formatType + 'add-color'">Text color:</label>
      <input type="text" :id="formatType + 'add-color'" v-model="newColor"/>
    </div>
    <div>
      <label :for="formatType + 'add-font'">Text font:</label>
      <input type="text" :id="formatType + 'add-font'" v-model="newFont"/>
    </div>
    <button @click="add" class="action-button">Add</button>
  </li>
</template>

<style scoped>
.add-id {
  font-size: 1.17em;
  margin: 0.13em 0em;
}
</style>
