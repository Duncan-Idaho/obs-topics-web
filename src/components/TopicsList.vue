<script setup lang="ts">
import type { Topic, Topics } from '@/stores/topics';
import VueDraggable from "vuedraggable"

defineProps<{
  columns: string[],
  modelValue: Topics,
  isDone?: boolean
}>()

const emit = defineEmits<{
  (e: 'moveToNow', id: number): void
  (e: 'moveToNext', id: number): void
  (e: 'moveToLast', id: number): void
  (e: 'markAsDone', id: number): void
  (e: 'update:modelValue', topics: Topics): void
}>()

</script>

<template>
  <table>
    <thead>
      <th>Actions</th>
      <th v-for="column in columns" :key="column">{{ column }}</th>
    </thead>
    <VueDraggable 
      :model-value="modelValue"
      @update:model-value="newValue => emit('update:modelValue', newValue)" 
      tag="tbody" 
      item-key="$id"
      ghost-class="ghost">
      <template #item="{ element: topic, index }">
        <tr>
          <td>
            <button @click="emit('moveToNow', index)" v-if="isDone || index !== 0">▶️</button>
            <div class="button-gap" v-else></div>

            <button @click="emit('moveToNext', index)" v-if="isDone || index !== 1">⏱️</button>
            <div class="button-gap" v-else></div>

            <button @click="emit('moveToLast', index)" v-if="isDone || index !== modelValue.length - 1">⏬</button>
            <div class="button-gap" v-else></div>

            <button @click="emit('markAsDone', index)" v-if="!isDone">✔️</button>
            <div class="button-gap" v-else></div>
          </td>
          <td v-for="column in columns" :key="column">{{ topic[column] }}</td>
        </tr>
      </template>
    </VueDraggable>
  </table>
</template>

<style scoped>
table {
  overflow: auto;
  white-space: nowrap;
  --font-size: 1.05em;
  font-size: var(--font-size);
}

th {
  text-align: left;
  font-weight: bold;
}

tr {
  cursor: move;
}

button, .button-gap {
  display: inline-block;
  padding: 0;
  font-size: var(--font-size);
  width: calc(var(--font-size)*1.7);
  height: calc(var(--font-size)*1.7);
  padding-bottom: calc(var(--font-size)/15);
  padding-right: calc(var(--font-size)/60);
}
.button-gap::before {
  content: "\00a0";
}

.ghost {
  opacity: .7;
  background: #C8EBFB;
}
</style>
