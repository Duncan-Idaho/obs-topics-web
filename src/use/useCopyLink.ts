import router from '@/router';
import { useClipboard, usePermission } from '@vueuse/core';
import { computed, toValue, type MaybeRefOrGetter } from 'vue';
import type { RouteLocationRaw } from 'vue-router';

const permissionWrite = usePermission('clipboard-write')

export function useCopyLink(to: MaybeRefOrGetter<RouteLocationRaw>) {
  const href = computed(() => {
    const { href } = router.resolve(toValue(to))

    return (new URL(href, document.location.href)).href
  })

  function legacyCopyInput(input: MaybeRefOrGetter<HTMLInputElement | null>) {
    const element = toValue(input)
    if (element) {
      element.select()
      document.execCommand("copy");
    }
  }

  return {
    ...useClipboard({ source: href }), 
    href,
    isGranted: permissionWrite.value === 'granted',
    legacyCopyInput
  }
}