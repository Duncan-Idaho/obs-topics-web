<script setup lang="ts">
import { ref } from 'vue'
import { DragCol } from "vue-resizer";
import StandardLayout from './StandardLayout.vue'

import VdoNinjaFrame from '@/components/VdoNinjaFrame.vue'
import { useVdoNinjaStore } from '@/stores/vdoNinja'
import QuickToolbar from './components/QuickToolbar.vue';

const vdoNinjaStore = useVdoNinjaStore()
const isNotDragging = ref(true)

const leftPercent = ref(40)
</script>

<template>
  <template v-if="vdoNinjaStore.url">
    <DragCol 
      :left-percent="leftPercent" 
      width="100%" 
      height="100%" 
      :slider-width="8" 
      class="overall-layout" 
      @isDragging="(value : boolean) => isNotDragging = !value"
      @click="leftPercent = 0">
      <template #left>
        <div class="main-layout-container">
          <StandardLayout/>
        </div>
      </template>
      <template #right>
        <div class="frame-layout">
          <QuickToolbar/>
          <div class="frame-container">
            <VdoNinjaFrame v-show="isNotDragging"/>
          </div>
        </div>
      </template>
    </DragCol>
  </template>
  <template v-else>
    <div class="overall-layout main-layout-container">
      <StandardLayout/>
    </div>
  </template>
</template>

<style scoped>
.overall-layout {
  background: var(--color-background);
  color: var(--color-text);
}

.main-layout-container {
  container-type: size;
  height: 100%;
  width: 100%;
}
.frame-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.frame-container {
  flex: 1;
}
</style>
