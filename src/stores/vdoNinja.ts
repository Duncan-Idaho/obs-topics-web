import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { computed, ref, shallowRef, watch, watchEffect } from 'vue'

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

import { useTopicsStore } from '@/stores/topics';

export const useVdoNinjaStore = defineStore('vdo-ninja', () => {
  const topics = useTopicsStore()

  const url = useStorage('url', '')
  const presenterScene = useStorage('vdo-ninja-presenter-scene', 'presenter')
  const remotePresenterScene = useStorage('vdo-ninja-remote-presenter-scene', 'remote')
  const screenShareScene = useStorage('vdo-ninja-schare-screen-scene', 'screen')
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
  
    // console.log(event.data);
    // if (data.action === 'new-stream-added' || data.action === 'end-view-connection') {
    // }
    if (data.detailedState) {
      detailedState.value = (data.detailedState as DetailedState)
    } else { 
      getDetailedState()
    }
  }
  
  function getDetailedState() {
    postMessage({ getDetailedState: true })
  }

  function assignAsPresenter(streamID: string, topics: string[]) {
    assignments.value[streamID] = {
      topics: topics,
      scenes: [presenterScene.value]
    }
    assignAsScreenshare(streamID + ':s', topics)
  }

  function assignAsRemotePresenter(streamID: string, topics: string[]) {
    assignments.value[streamID] = {
      topics: topics,
      scenes: [presenterScene.value, remotePresenterScene.value]
    }
    assignAsScreenshare(streamID + ':s', topics)
  }

  function assignAsScreenshare(streamID: string, topics: string[]) {
    assignments.value[streamID] = {
      topics: topics,
      scenes: [screenShareScene.value]
    }
  }

  function ignore(streamID: string) {
    assignments.value[streamID] = {
      topics: [],
      scenes: []
    }
  }

  const currentTopicId = computed(() => topics.topics.length ? topics.topics[0].$id + "" : null)

  watch(currentTopicId, () => console.log(currentTopicId.value))

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

  return { 
    url, presenterScene, remotePresenterScene, screenShareScene, 
    iframeElement, 
    detailedState, assignments, unassigned, allScenes,
    currentTopicId,
    assignAsPresenter, assignAsRemotePresenter, assignAsScreenshare, ignore,
    handleMessage
  }
})
