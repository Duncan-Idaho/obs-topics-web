<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import { useVdoNinjaStore } from '@/stores/vdoNinja'
import { onMounted, ref } from 'vue'

const store = useVdoNinjaStore()
const state = ref<DetailedState>({})

useEventListener(window, 'message', onEvent)

function onEvent(event: MessageEvent) {
  if (!store.url.startsWith(event.origin)) {
    return
  }
  const data = event.data;

  if (data.action === 'view-stats-updated')
    return

  // console.log(event.data);
  // if (data.action === 'new-stream-added' || data.action === 'end-view-connection') {
  // }
  if (data.detailedState) {
    state.value = (data.detailedState as DetailedState)
  } else { 
    getDetailedState()
  }
}


function postMessage(message: any) {
  const iframe = document.querySelector('iframe');
  if (iframe) {
    iframe.contentWindow?.postMessage(message, '*');
  }
}

type DetailedState = {
  [key: string]: Stream
}

type Stream = {
  label: string
  streamID: string
  scenes: Scenes
}

type Scenes = {
  [key: string]: boolean
}

function addToAgora() {
  if (Object.values(state.value)[0].scenes.agora) {
    return
  }
  postMessage({ 
    action: "addScene",
    value: "agora",
    target: Object.values(state.value)[0].streamID,
  })
}

function getStreamIDs() {
  console.log(postMessage({ getStreamIDs: true }))
}

function getStreamInfo() {
  console.log(postMessage({ getStreamInfo: true }))
}

function getDetailedState() {
  console.log(postMessage({ getDetailedState: true }))
}

function getGuestList() {
  console.log(postMessage({ getGuestList: true }))
}
</script>

<template>
  <main>
    <div>
      <span v-for="stream in state" :key="stream.streamID">{{ stream.label }}</span>
    </div>
    <div>
      <button @click="getStreamIDs">getStreamIDs</button>
      <button @click="getStreamInfo">getStreamInfo</button>
      <button @click="getDetailedState">getDetailedState</button>
      <button @click="getGuestList">getGuestList</button>
      <button @click="addToAgora">addToAgora</button>
    </div>
    <iframe 
      allow="document-domain;encrypted-media;sync-xhr;usb;web-share;cross-origin-isolated;midi *;geolocation;camera *;microphone *;fullscreen;picture-in-picture;display-capture;accelerometer;autoplay;gyroscope;screen-wake-lock;"
      :src="store.url"      
      />
  </main>
</template>

<style scoped>
iframe {
  width: 100%;
  height: 51rem;
}

div {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
</style>
