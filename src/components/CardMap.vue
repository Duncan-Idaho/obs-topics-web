<script setup lang="ts" generic="T">
defineProps<{
  items: { [key: string]: T }
}>()
</script>

<template>
  <ul>
    <template v-for="(item, key) in items" :key="key">
      <li>
        <slot :item="item" :key="key" />
      </li>
    </template>
  </ul>
</template>

<style scoped>
@import "@/assets/formatter-card.css";
</style>