<script setup lang="ts">
import { type Format, type FormatsDefinitions } from '@/stores/topics';
import CopyLink from './CopyLink.vue';

const props = defineProps<{
  id: string,
  format: Format,
  formatType: keyof FormatsDefinitions
}>()

const emit = defineEmits<{
  (e: 'delete', id: string): void
}>()
</script>

<template>
  <li>
    <div>
      <h3>{{ id }}</h3>
      <CopyLink 
        :to="{ 
          name: 'label', 
          params: { 
            id: props.id,
            formatType: props.formatType
          }
        }"
      />
    </div>
    <div>
      <label :for="'format-' + id + '-pattern'">Pattern:</label>
      <input type="text" :id="id + '-pattern'" v-model="format.pattern"/>
    </div>
    <div>
      <label :for="'format-' + id + '-default'">Default value:</label>
      <input type="text" :id="id + '-default'" v-model="format.default"/>
    </div>
    <div>
      <label :for="'format-' + id + '-color'">Text color:</label>
      <input type="text" :id="id + '-color'" v-model="format.color"/>
    </div>
    <div>
      <label :for="'format-' + id + '-font'">Text font:</label>
      <input type="text" :id="id + '-font'" v-model="format.font"/>
    </div>
    <button @click="() => emit('delete', id)" class="action-button">Delete</button>
  </li>
</template>

<style scoped>
@import "@/assets/formatter-card.css";
</style>

