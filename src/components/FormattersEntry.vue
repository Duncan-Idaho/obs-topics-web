<script setup lang="ts">
import { useTopicsStore, type Format, type FormatsDefinitions } from '@/stores/topics';
import { computed } from 'vue';
import { useClipboard } from '@vueuse/core'
import router from '@/router';
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

const store = useTopicsStore()
</script>

<template>
  <li>
    <div>
      <label :for="'format-' + id + '-pattern'" class="id">{{ id }}: </label>
      <input type="text" :id="id + '-pattern'" v-model="format.pattern"/>
    </div>
    <div>
      <label :for="'format-' + id + '-default'">&nbsp;&mdash; Default value</label>
      <input type="text" :id="id + '-default'" v-model="format.default"/>
    </div>
    <div>
      <button @click="() => emit('delete', id)">Delete</button>
    </div>
    <div>
      <button v-if="isSupported" @click="() => copy(href)">📋</button>
      <template v-else>Your does not support Clipboard API</template>
    </div>
  </li>
</template>

<style scoped>
li, div {
  display: flex;
  flex-direction: row;
  gap: 0.5em;
}

label.id {
  width: 10em;
}
</style>