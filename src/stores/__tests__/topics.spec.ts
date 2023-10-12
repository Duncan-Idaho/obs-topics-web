import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import { useTopicsStore } from "../topics"
import example from "./example"

const expectedColumns = [
  'Team', 'Order', 'Presenter(s)', 'Subject', 'For the mail', 'For the chat', "What's this about, or what's great about what you're about to show ?"
]

describe('Topics store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  
  it('starts empty', () => {
    const store = useTopicsStore()
    expect(store.topics).toHaveLength(0)
    expect(store.headers).toHaveLength(0)
  })
  
  it('can parse headers', () => {
    const store = useTopicsStore()
    store.importRawString(example, true)
    expect(store.headers).toEqual(expectedColumns)
  })
  
  it('can parse topics, stopping at empty lines', () => {
    const store = useTopicsStore()
    store.importRawString(example, true)
    expect(store.topics).toHaveLength(8)
    expect(store.topics[1].Team).toBe("Falcon")
    expect(store.topics[1].Order).toBe(2)
    expect(store.topics[1]["Presenter(s)"]).toBe("Roxy")
  })
  
  it('can parse topics, without stopping lines', () => {
    const store = useTopicsStore()
    store.importRawString(example, false)
    expect(store.topics).toHaveLength(13)
    expect(store.topics[1].Team).toBe("Falcon")
    expect(store.topics[1].Order).toBe(2)
    expect(store.topics[1]["Presenter(s)"]).toBe("Roxy")
    expect(store.topics[9].Team.startsWith("Special thanks")).toBeTruthy()
  })
})
