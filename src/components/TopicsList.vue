<script setup lang="ts">
import type { Topics } from '@/stores/topics';

defineProps<{
  columns: string[],
  topics: Topics,
  isDone?: boolean
}>()

const emit = defineEmits<{
  (e: 'moveToNow', id: number): void
  (e: 'moveToNext', id: number): void
  (e: 'moveToLast', id: number): void
  (e: 'markAsDone', id: number): void
}>()

</script>

<template>
  <table>
    <thead>
      <th>Actions</th>
      <th v-for="column in columns" :key="column">{{ column }}</th>
    </thead>
    <tbody>
      <tr v-for="(topic, index) in topics" :key="index">
        <td>
          <button @click="emit('moveToNow', index)" v-if="isDone || index !== 0">▶️</button>
          <div class="button-gap" v-else></div>

          <button @click="emit('moveToNext', index)" v-if="isDone || index !== 1">⏱️</button>
          <div class="button-gap" v-else></div>

          <button @click="emit('moveToLast', index)" v-if="isDone || index !== topics.length - 1">⏬</button>
          <div class="button-gap" v-else></div>

          <button @click="emit('markAsDone', index)" v-if="!isDone">✔️</button>
          <div class="button-gap" v-else></div>
        </td>
        <td v-for="column in columns" :key="column">{{ topic[column] }}</td>
      </tr>
    </tbody>
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
</style>
