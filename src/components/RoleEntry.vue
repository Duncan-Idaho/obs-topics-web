<script setup lang="ts">
import { ref } from 'vue'
import { useVdoNinjaStore } from '@/stores/vdoNinja';
import SceneList from './SceneList.vue';

const vdoNinjaStore = useVdoNinjaStore()

const props = defineProps<{
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

const customScene = ref("")

function addMainScene(scene: string) {
  props.role.mainScenes.push(scene)
  customScene.value = ""
}

function addShareScene(scene: string) {
  props.role.shareScenes.push(scene)
  customScene.value = ""
}

</script>

<template>
  <li>
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
  </li>
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


li {
  border: 1px solid var(--vt-c-divider-dark-2);
  /* margin: 0.3em; */
  padding: 0.3em 1em 0.3em 1em;
  display: flex;
  flex-direction: column;
}

h4 {
  font-weight: 500;
  display: inline;
}

.sub-section {
  border-left: 0.25rem solid var(--vt-c-divider-dark-2);
  padding-left: 0.5rem;
  margin: 0.3rem 0rem;
}

</style>