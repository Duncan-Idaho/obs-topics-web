<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import PreviewTooltip from '@/components/PreviewTooltip.vue'
</script>

<template>
  <div class="standard-layout">
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
  </div>
</template>

<style scoped>
.standard-layout {
  display: flex;
  flex-flow: column;
  height: 100vh;
  background: var(--color-background);
  padding-left: 0.4rem;
  padding-right: 0.4rem;
}

@media (min-width: 800px) {
  .standard-layout {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
@media (min-height: 800px) {
  .standard-layout {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
}

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
