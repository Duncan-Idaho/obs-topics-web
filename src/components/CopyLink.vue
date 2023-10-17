<script setup lang="ts">
import { useCopyLink } from '@/use/useCopyLink';
import { ref } from 'vue';
import type { RouteLocationRaw } from 'vue-router';

const props = defineProps<{
  to: RouteLocationRaw
}>()

const input = ref<HTMLInputElement | null>(null)

const { href, copy, isSupported, isGranted, legacyCopyInput } = useCopyLink(props.to)
</script>

<template>
  <button v-if="isSupported && isGranted" @click="() => copy(href)" class="copy">📋</button>
  <input v-else type="text" v-model="href" readonly ref="input" @click="() => legacyCopyInput(input)"/>
</template>

