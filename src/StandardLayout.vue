<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useElementSize } from '@vueuse/core'
import PreviewTooltip from '@/components/PreviewTooltip.vue'
import { computed, ref, useTemplateRef } from 'vue';

const standardLayout = useTemplateRef('standardLayout')
const { width } = useElementSize(standardLayout)
const largeWidth = computed(() => width.value >= 448);

const menuOpened = ref(false)
const displayMenu = computed (() => largeWidth.value || menuOpened.value)

const menu = ref<HTMLElement | null>(null)

function closeMenu() {
  menuOpened.value = false
}
</script>

<template>
  <div class="standard-layout" ref="standardLayout" @click="closeMenu">
    <PreviewTooltip/>

    <header>
      <a
        v-if="!largeWidth"
        class="menu-toggle"
        @click.stop="menuOpened = !menuOpened">
        <span v-if="menuOpened">⯆</span>
        <span v-else>⯈</span>
        Menu
      </a> 
      <nav v-if="displayMenu" ref="menu">
        <RouterLink to="/import">Import</RouterLink>
        <RouterLink to="/">Topics</RouterLink>
        <RouterLink to="/columns">Columns displayed</RouterLink>
        <RouterLink to="/vdoNinja">Vdo Ninja</RouterLink>
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
  display: grid;
  grid: auto 1fr / auto 1fr;
  grid: "tool menu" auto
        "main main" 1fr
        / auto 1fr;
  height: 100vh;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
}

@container (min-width: 800px) {
  .standard-layout {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
@container (min-height: 800px) {
  .standard-layout {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
}

header {
  line-height: 1.5;
  display: flex;
  position: relative;
  grid-area: menu;
}

main {
  grid-area: main;
  overflow: auto;
  
  display: flex;
  flex-flow: column;
  position: relative;
}

.menu-toggle {
  width: 100%;
  font-size: 1em;
  text-align: center;
  margin-bottom: 1rem;
  cursor: pointer;
  user-select: none;
}

nav {
  font-size: 1em;
  text-align: center;

  position: absolute;
  width: 90%;
  left: 5%;
  top: 1.5em;
  z-index: 2;
  background-color: var(--vt-c-black-soft);
  border: 1px solid var(--color-border);
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: block;
  padding: 0 1rem;
  border-top: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}


@container (min-width: 448px) {
  nav {
    position: initial;
    background-color: transparent;
    border: 0;
    width: 100%;
    margin-bottom: 1rem;
  }

  nav a {
    display: inline-block;
    padding: 0 1rem;
    border-top: 0;
    border-left: 1px solid var(--color-border);
  }

  nav a:first-of-type {
    border: 0;
  }
}
</style>
