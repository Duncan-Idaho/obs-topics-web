import { defineStore } from 'pinia'
import { useNow, useStorage } from '@vueuse/core'
import { computed } from 'vue'

export const useStartTimeStore = defineStore('startTime', () => {
  const startTime = useStorage('start-time', new Date().valueOf())
  const defaultStartTime = useStorage('default-start-time', {
    hours: 13,
    minutes: 30
  })
  const format = useStorage('start-time-format', 'mm:ss')
  const pastFormat = useStorage('start-time-past-format', '[IN A SEC]')
  const color = useStorage('start-time-color', '')
  const font = useStorage('start-time-font', '')
  const now = useNow()
  const today = computed(() => {
    const result = new Date(now.value)
    result.setHours(defaultStartTime.value.hours)
    result.setMinutes(defaultStartTime.value.minutes)
    result.setSeconds(0)
    result.setMilliseconds(0)
    return result  
  })

  function setInOffsetSeconds(minutes: number) {
    const newStartTime = new Date(now.value)
    newStartTime.setSeconds(newStartTime.getSeconds() + minutes)
    startTime.value = newStartTime.valueOf()
  }
  function setInOffsetMinutes(minutes: number) {
    const newStartTime = new Date(now.value)
    newStartTime.setMinutes(newStartTime.getMinutes() + minutes)
    startTime.value = newStartTime.valueOf()
  }
  function setDefault() {
    startTime.value = today.value.valueOf()
  }

  return { 
    startTime,
    defaultStartTime,
    format,
    pastFormat,
    color,
    font,
    now,
    today,

    setInOffsetSeconds,
    setInOffsetMinutes,
    setDefault
  }
})
