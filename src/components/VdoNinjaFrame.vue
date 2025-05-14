<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useEventListener } from '@vueuse/core'
import { useVdoNinjaStore } from '@/stores/vdoNinja'
import { watch } from 'vue'

const store = useVdoNinjaStore()
const iframe = useTemplateRef('vdoNinjaFrame')

watch(iframe, value => store.iframeElement = value);
useEventListener(window, 'message', store.handleMessage)
</script>

<template>
  <iframe 
    ref="vdoNinjaFrame"
    allow="document-domain;encrypted-media;sync-xhr;usb;web-share;cross-origin-isolated;midi *;geolocation;camera *;microphone *;fullscreen;picture-in-picture;display-capture;accelerometer;autoplay;gyroscope;screen-wake-lock;"
    :src="store.fullUrl"      
    />
</template>

<style scoped>
iframe {
  width: 100%;
  height: 100%;
}
</style>
