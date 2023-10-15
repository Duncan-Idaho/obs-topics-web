<script setup lang="ts">
import { onUpdated, ref, onMounted, onBeforeUnmount, computed } from 'vue';
import textfit from 'textfit'

const props = defineProps<{ 
  text: string;
  preview?: boolean;
  color?: string;
  font?: string;
}>()

const container = ref<HTMLElement | null>(null)

const style = computed(() => ({
  color: props.color ?? undefined,
  fontFamily: props.font ?? undefined
}))

function fitText() {
  if (!props.preview && container.value && container.value.offsetParent !== null) {
    textfit(container.value, {
      minFontSize: 0,
      maxFontSize: 400,
      alignVert: true,
      alignHoriz: true,
      multiLine: true
    })
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
  <div ref="container" :style="style">
    {{ text }}
  </div>
</template>

<style scoped>
div {
  width: 100%;
  height: 100%;
}
</style>