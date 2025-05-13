<script setup lang="ts">
import { ref } from 'vue'
import { useVdoNinjaStore } from '@/stores/vdoNinja'
import CardList from './CardList.vue'
import RoleEntry from './RoleEntry.vue'

const vdoNinjaStore = useVdoNinjaStore()

</script>

<template>
  <div class="roles">
    <div class="title">
      <h3>VDO Ninja Roles</h3>
    </div>
    <CardList :items="vdoNinjaStore.roles">
      <template #default="{item: role, index}">
        <RoleEntry 
          :id="index"
          :role="role"
          @delete="id => vdoNinjaStore.roles.splice(index, 1)"
          />
      </template>
    </CardList>
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

.footer {
  width: 100%;
  padding: 0rem 0.5rem;
}
button {
  width: 100%;
}
</style>