import router from '@/router';
import { useClipboard } from '@vueuse/core';
import { computed, toValue, type MaybeRefOrGetter } from 'vue';
import type { RouteLocationRaw } from 'vue-router';

export function useCopyLink(to: MaybeRefOrGetter<RouteLocationRaw>) {
  const href = computed(() => {
    const { href } = router.resolve(toValue(to))

    return (new URL(href, document.location.href)).href
  })
    
  return {...useClipboard({ source: href }), href}
}