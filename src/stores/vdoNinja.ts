import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { computed, ref, shallowRef, watch } from 'vue'

export type DetailedState = {
  [key: string]: Stream
}

export type Stream = {
  label: string
  streamID: string
  scenes: Scenes
}

export type Scenes = {
  [key: string]: boolean
}


export type Assignments = {
  [key: string]: Assignment
}

export type Assignment = {
  topics: string[]
  scenes: string[]
}

export type Roles = Role[]

export type Role = {
  name: string
  mainScenes: string[]
  shareScenes: string[]
}

import { useTopicsStore } from '@/stores/topics';
import { useVdoNinjaApi } from '@/use/useWebSocket'

export const useVdoNinjaStore = defineStore('vdo-ninja', () => {
  const topics = useTopicsStore()

  const url = useStorage('url', '')
  const apiKey = useStorage('api-key', crypto.randomUUID())
  const fullUrl = computed(() => url.value + (url.value.includes('?') ? '&': '?') + 'api=' + apiKey.value)

  const roles = useStorage<Roles>('vdo-ninja-roles', [{
    name: '🧑‍💻',
    mainScenes: ['presenter'],
    shareScenes: ['screen']
  },{
    name: '🌍',
    mainScenes: ['presenter', 'remote'],
    shareScenes: ['screen']
  },{
    name: '💻',
    mainScenes: ['screen'],
    shareScenes: []
  },])

  const iframeElement = shallowRef<HTMLIFrameElement | null>(null)

  const detailedState = ref<DetailedState>({})
  const assignments = useStorage<Assignments>('vdo-ninja-assignments', {})
  const unassigned = computed(() => Object.values(detailedState.value).filter(isSceneToAssign))
  const allScenes = computed(() => [...new Set(Object.values(detailedState.value).flatMap(state => Object.keys(state.scenes)))])

  function isSceneToAssign(stream: Stream) {
    if (stream.streamID.endsWith(':s'))
      return false
    return !Object.keys(assignments.value).includes(stream.streamID)
  }

  function handleMessage(event: MessageEvent) {
    if (!url.value.startsWith(event.origin)) {
      return
    }
    const data = event.data;
  
    if (data.action === 'view-stats-updated')
      return
  
    if (data.detailedState) {
      detailedState.value = (data.detailedState as DetailedState)
    } else { 
      getDetailedState()
    }
  }
  
  function getDetailedState() {
    postMessage({ getDetailedState: true })
  }

  function clearAssignments() {
    assignments.value = {}
  }

  function assignRole(streamID: string, topics: string[], role: Role) {
    assignments.value[streamID] = {
      topics: topics,
      scenes: role.mainScenes
    }
    assignments.value[streamID + ':s'] = {
      topics: topics,
      scenes: role.shareScenes
    }
  }

  function deleteAssignment(streamID: string) {
    delete assignments.value[streamID]
  }

  function ignore(streamID: string) {
    assignments.value[streamID] = {
      topics: [],
      scenes: []
    }
    assignments.value[streamID + ':s'] = {
      topics: [],
      scenes: []
    }
  }

  const currentTopicId = computed(() => topics.topics.length ? topics.topics[0].$id + "" : null)

  watch(currentTopicId, id => {
    if (!id) 
      return

    for (let state of Object.values(detailedState.value)) {
      const assignment = assignments.value[state.streamID]
      if (!assignment)
        continue

      const scenes = assignment.topics.includes(id+ "") ? assignment.scenes : []
      for (let scene in state.scenes) {
        setSceneState(state, scene, scenes.includes(scene))
      }
    }
  })

  function setSceneState(stream: Stream, scene: string, state: boolean) {
    if (stream.scenes[scene] === state)
      return
    postMessage({ 
      action: "addScene",
      value: scene,
      target: stream.streamID,
    })
  }

  function postMessage(message: any) {
    if (iframeElement.value) {
      console.log("postMessage", message)
      iframeElement.value.contentWindow?.postMessage(message, '*');
    }
  }

  useVdoNinjaApi({
    apiKey,
    markTopicAsDone: () => topics.markAsDone(0),
    moveTopicToLast: () => topics.moveToLast(false, 0)
  })

  return { 
    url, apiKey, fullUrl, roles, 
    iframeElement, 
    detailedState, assignments, unassigned, allScenes,
    currentTopicId,
    clearAssignments, assignRole, deleteAssignment, ignore,
    handleMessage
  }
})
