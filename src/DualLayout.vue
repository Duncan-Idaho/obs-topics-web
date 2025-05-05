<script setup lang="ts">
import { ref } from 'vue'
import { DragCol } from "vue-resizer";
import StandardLayout from './StandardLayout.vue'

import VdoNinjaFrame from '@/components/VdoNinjaFrame.vue'
import { useVdoNinjaStore } from '@/stores/vdoNinja'

const vdoNinjaStore = useVdoNinjaStore()
const isNotDragging = ref(true)
</script>

<template>
  <template v-if="vdoNinjaStore.url.length">
    <DragCol :left-percent="40" width="100%" height="100%" :slider-width="8" class="overall-layout" @isDragging="(value : boolean) => isNotDragging = !value">
      <template #left>
        <div class="main-layout-container">
          <StandardLayout/>
        </div>
      </template>
      <template #right>
        <VdoNinjaFrame v-show="isNotDragging"/>
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
</style>
