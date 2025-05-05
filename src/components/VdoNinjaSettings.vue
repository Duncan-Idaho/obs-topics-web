<script setup lang="ts">
import { useVdoNinjaStore } from '@/stores/vdoNinja'

const store = useVdoNinjaStore()
</script>

<template>
  <div class="section">
    <div class="title">
      <h2>Vdo Ninja URL</h2>
      <input type="text" id="vdo-ninja-url" v-model="store.url"/>
    </div>
    <div class="title">
      <h2>Presenter scene</h2>
      <input type="text" id="vdo-ninja-presenter" v-model="store.presenterScene"/>
    </div>
  </div>
    <div class="title">
      <h2>Additional presenter scene when remote</h2>
      <input type="text" id="vdo-ninja-remote-presenter" v-model="store.remotePresenterScene"/>
    </div>
    <div class="title">
      <h2>Screenshare scene</h2>
      <input type="text" id="vdo-ninja-screen-share" v-model="store.screenShareScene"/>
    </div>
</template>

<style scoped>
.section {
  margin-bottom: 1em;
}
.section div {
  display: flex;
}
.title {
  gap: 1em;
}
label {
  width: 11em;
}
</style>