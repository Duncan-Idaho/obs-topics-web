<script setup lang="ts">
import { ref } from 'vue'

import { useVdoNinjaStore } from '@/stores/vdoNinja';
const vdoNinjaStore = useVdoNinjaStore()

const props = defineProps<{
  id: number,
  type: string,
  title: string,
  scenes: string[],
}>()

const customScene = ref("")

function add(scene: string) {
  props.scenes.push(scene)
  customScene.value = ""
}

function remove(scene: string) {
  const index = props.scenes.indexOf(scene)
  if (index > -1) {
    props.scenes.splice(index, 1)
  }
}

</script>

<template>
  <div class="sub-section">
    <div>
      <h4>{{ title }}:</h4>
      <span v-if="scenes.length > 0">
        <span class="scene" v-for="(scene, index) in scenes" :key="scene">
          <template v-if="index !==0"> , </template>
          {{ scene }}
          <button 
            @click="() => remove(scene)"
            class="delete-button"
            :title="'Remove ' + scene"
          >❌</button>
        </span>
      </span>
      <span v-else>None</span>
    </div>
    <div>
      <button 
        v-for="scene in vdoNinjaStore.allScenes"
        @click="() => add(scene)"
        :title="'Add ' + scene"
      >
        ➕ {{ scene }}
      </button>
    </div>
    <div>
      <button 
        @click="() => add(customScene)"
        title="Add custom scene"
      >➕ :</button>
      <input type="text" :id="`${id}-${type}-custom-scene`" v-model="customScene"/>
    </div>
    
  </div>
</template>

<style scoped>
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

.delete-button {
  border-radius: 100%;
  padding: 0.1rem;
  font-size: 0.7rem;
}
</style>