<script setup lang="ts">
import PreviewPanel from '@/components/PreviewPanel.vue'
</script>

<template>
  <div class="preview-button">
    👁
    <div class="preview-panel">
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
  visibility: hidden;

  position: absolute;
  z-index: 1;
  overflow: hidden;
  top: 1em;
  left: 1em;
  cursor: help;
  
  background: var(--color-background-mute);
  width: 50vh;
  padding: 1em;
  border: 1px solid black;
}

.preview-button:hover .preview-panel {
  visibility: visible;
}
</style>