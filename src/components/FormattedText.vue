<script setup lang="ts">
import { onUpdated, ref, onMounted, onBeforeUnmount } from 'vue';
import textfit from 'textfit'

defineProps<{ text: string }>()

const container = ref<HTMLElement | null>(null)

function fitText() {
  if (container.value) {
    console.log("resizing")
    textfit(container.value, {
      minFontSize: 0,
      maxFontSize: 400,
      alignVert: true,
      alignHoriz: true,
      multiLine: true
    })
  } else {
    
    console.log("container not available")
  }
}

onMounted(() => {
  window.addEventListener('resize', fitText);
  fitText()
})

onUpdated(fitText)

onBeforeUnmount(() => {
  window.removeEventListener('resize', fitText);
})
</script>

<template>
  <div ref="container">
    {{ text }}
  </div>
</template>

<style scoped>
div {
  width: 100%;
  height: 100%;
}
</style>