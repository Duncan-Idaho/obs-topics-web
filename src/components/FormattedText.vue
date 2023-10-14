<script setup lang="ts">
import { useTopicsStore, type FormatsDefinitions } from '@/stores/topics';
import { onUpdated, ref, onMounted, onBeforeUnmount } from 'vue';
import textfit from 'textfit'

const props = defineProps<{
  formatType: keyof FormatsDefinitions,
  id: string
}>()

const store = useTopicsStore()

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
    <template v-if="formatType === 'current'">
      {{ store.currentFormatted[id] }}
    </template>
    <template v-if="formatType === 'next'">
      {{ store.nextFormatted[id] }}
    </template>
  </div>
</template>

<style scoped>
div {
  width: 100%;
  height: 100%;
}
</style>