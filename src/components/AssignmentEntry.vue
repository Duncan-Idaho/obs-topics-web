<script setup lang="ts">
import { type Assignment } from '@/stores/vdoNinja'
import SceneList from './SceneList.vue'
import TopicsInlineList from './TopicsInlineList.vue'

defineProps<{
  streamID: string | number,
  assignment: Assignment,
  format: string,
}>()

const emit = defineEmits<{
  (e: 'delete', id: string | number): void
}>()
</script>

<template>
  <div class="title">
    <h3> {{ streamID }} </h3>
    <button 
      @click="() => emit('delete', streamID)"
      class="action-button"
      title="Delete"
    >❌</button>
  </div>
  <TopicsInlineList :id="streamID" type="main" title="Topics" :topics="assignment.topics" :format="format"/>
  <SceneList :id="streamID" type="main" title="Scenes" :scenes="assignment.scenes"/>
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

h4 {
  font-weight: 500;
  display: inline;
  margin-right: 0.25rem;
}

.sub-section {
  border-left: 0.25rem solid var(--vt-c-divider-dark-2);
  padding-left: 0.5rem;
  margin: 0.3rem 0rem;
}

</style>