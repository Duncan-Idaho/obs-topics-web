<script setup lang="ts">
import { ref } from 'vue'
import { useVdoNinjaStore } from '@/stores/vdoNinja';
import RoleEntry from './RoleEntry.vue';

const vdoNinjaStore = useVdoNinjaStore()

</script>

<template>
  <div class="roles">
    <div class="title">
      <h3>VDO Ninja Roles</h3>
    </div>
    <ul>
      <RoleEntry 
      v-for="(role, id) in vdoNinjaStore.roles" 
      :key="id"
      :id="id"
      :role="role"
      @delete="id => vdoNinjaStore.roles.splice(id, 1)"
      />
    </ul>
  </div>
  <div class="footer">
    <button @click="() => vdoNinjaStore.roles.push({ name: '', mainScenes: [], shareScenes: [] })">
      ➕ Add role
    </button>
  </div>
</template>

<style scoped>
.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}

ul {
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  gap: 0.6em;
  padding: 0.6em 0em;
}
.footer {
  width: 100%;
  padding: 0rem 0.5rem;
}
button {
  width: 100%;
}
</style>