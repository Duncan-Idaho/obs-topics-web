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
ul {
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  gap: 0.6em;
  padding: 0.6em 0em;
}

li {
  border: 1px solid var(--vt-c-divider-dark-2);
  /* margin: 0.3em; */
  padding: 0.3em 1em 0.3em 1em;
  display: flex;
  flex-direction: column;
}
</style>