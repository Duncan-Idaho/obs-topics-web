<script setup lang="ts">
import SceneList from './SceneList.vue'

defineProps<{
  id: number,
  role: {
    name: string,
    mainScenes: string[],
    shareScenes: string[],
  },
}>()

const emit = defineEmits<{
  (e: 'delete', id: number): void
}>()

</script>

<template>
  <div class="title">
    <input type="text" :id="id + '-pattern'" v-model="role.name"/>
    <button 
      @click="() => emit('delete', id)"
      class="action-button"
      title="Delete"
    >❌</button>
  </div>
  <SceneList :id="id" type="main" title="Main scenes" :scenes="role.mainScenes"/>
  <SceneList :id="id" type="share" title="Share scenes" :scenes="role.shareScenes"/>
</template>

<style scoped>

.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  justify-content: space-between;
  margin-bottom: 0.25rem;
}
</style>