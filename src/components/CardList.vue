<script setup lang="ts" generic="T">
defineProps<{
  items: T[]
}>()
</script>

<template>
  <ul>
    <template v-for="(item, index) in items" :key="index">
      <li>
        <slot :item="item" :index="index" />
      </li>
    </template>
  </ul>
</template>

<style scoped>
@import "@/assets/formatter-card.css";
</style>