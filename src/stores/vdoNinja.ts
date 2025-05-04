import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useVdoNinjaStore = defineStore('vdo-ninja', () => {
  const url = useStorage('url', '')

  return { 
    url
  }
})
