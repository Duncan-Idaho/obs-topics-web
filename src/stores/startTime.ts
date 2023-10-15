import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useStartTimeStore = defineStore('startTime', () => {
  const startTime = useStorage('start-time', new Date().valueOf())
  const defaultStartTime = useStorage('default-start-time', {
    hours: 13,
    minutes: 30
  })
  const format = useStorage('start-time-format', 'mm:ss')
  const pastFormat = useStorage('start-time-past-format', '[IN A SEC]')

  return { 
    startTime,
    defaultStartTime,
    format,
    pastFormat
  }
})
