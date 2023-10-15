<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import PreviewTooltip from '@/components/PreviewTooltip.vue'
</script>

<template>
  <header>
    <PreviewTooltip/>
    <nav>
      <RouterLink to="/import">Import</RouterLink>
      <RouterLink to="/">Topics</RouterLink>
      <RouterLink to="/columns">Columns displayed</RouterLink>
      <RouterLink to="/settings">Settings</RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  display: flex;
}

nav {
  width: 100%;
  font-size: 1em;
  text-align: center;
  margin-bottom: 1rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
