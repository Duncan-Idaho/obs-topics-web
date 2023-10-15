<script setup lang="ts">
import PreviewPanel from '@/components/PreviewPanel.vue'
import { ref } from 'vue';

const showPreviewPanel = ref(false)
const previewPanel = ref<HTMLElement | null>(null)
</script>

<template>
  <div 
    class="preview-button" 
    @mouseenter="showPreviewPanel = true"
    @mouseleave="showPreviewPanel = false"
  >
    👁
    <div class="preview-panel" ref="previewPanel" v-if="showPreviewPanel">
      <PreviewPanel/>
    </div>
  </div>
</template>

<style scoped>


.preview-button {
  position: relative;
  cursor: help;
}

.preview-panel {
  position: absolute;
  z-index: 1;
  overflow: hidden;
  top: 1em;
  left: 1em;
  
  background: var(--color-background-mute);
  width: 50vh;
  padding: 1em;
  border: 1px solid black;
}
</style>