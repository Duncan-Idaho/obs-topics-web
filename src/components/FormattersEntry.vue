<script setup lang="ts">
import { type Format, type FormatsDefinitions } from '@/stores/topics';
import { useCopyLink } from '@/use/useCopyLink';

const props = defineProps<{
  id: string,
  format: Format,
  formatType: keyof FormatsDefinitions
}>()

const { href, copy, isSupported } = useCopyLink(() => ({
  name: 'label', 
  params: { 
    id: props.id,
    formatType: props.formatType
  }
}))

const emit = defineEmits<{
  (e: 'delete', id: string): void
}>()
</script>

<template>
  <li>
    <div>
      <h3>{{ id }}</h3>
      <button v-if="isSupported" @click="() => copy(href)" class="copy">📋</button>
    </div>
    <div>
      <label :for="'format-' + id + '-pattern'">Pattern:</label>
      <input type="text" :id="id + '-pattern'" v-model="format.pattern"/>
    </div>
    <div>
      <label :for="'format-' + id + '-default'">Default value:</label>
      <input type="text" :id="id + '-default'" v-model="format.default"/>
    </div>
    <button @click="() => emit('delete', id)" class="action-button">Delete</button>
  </li>
</template>
