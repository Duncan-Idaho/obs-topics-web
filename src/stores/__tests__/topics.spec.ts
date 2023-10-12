import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import { useTopicsStore } from "../topics"
import example from "./example"

const expectedColumns = [
  'Team', 'Order', 'Presenter(s)', 'Subject', 'For the mail', 'For the chat', "What's this about, or what's great about what you're about to show ?"
]

describe('Topics store', () => {
  beforeEach(() => {
    localStorage.clear();
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

    expect(store.topics[0].Team).toBe("Star - Falcon")
    expect(store.topics[1].Team).toBe("Falcon")
    expect(store.topics[2].Team).toBe("ANTARES")
    expect(store.topics[3].Team).toBe("PIB")
    expect(store.topics[4].Team).toBe("Stellar Mobile")
    expect(store.topics[5].Team).toBe("Prometheus")
    expect(store.topics[6].Team).toBe("Prometheus")
    expect(store.topics[7].Team).toBe("Amethyst")
  })
  
  it('can parse topics, without stopping lines', () => {
    const store = useTopicsStore()
    store.importRawString(example, false)
    expect(store.topics).toHaveLength(13)
    expect(store.topics[1].Team).toBe("Falcon")
    expect(store.topics[1].Order).toBe(2)
    expect(store.topics[1]["Presenter(s)"]).toBe("Roxy")
    expect((store.topics[9].Team + "").search("thanks")).toBeTruthy()
  })
  
  it('displays no column shown at first', () => {
    const store = useTopicsStore()
    store.importRawString(example, false)
    expect(store.displayedColumns).toHaveLength(0)
  })
  
  it('displays columns chosen', () => {
    const store = useTopicsStore()
    
    store.importRawString(example, false)
    store.columnDisplay.Team = true
    store.columnDisplay.Order = true

    expect(store.displayedColumns).toEqual(["Team", "Order"])
  })
  
  it('does not displays columns chosen that are not present in topics', () => {
    const store = useTopicsStore()
    
    store.importRawString(example, false)
    store.columnDisplay.Team = true
    store.columnDisplay.Order = true
    store.columnDisplay.Power = true

    expect(store.displayedColumns).toEqual(["Team", "Order"])
  })

  it('displays no topic as done initially', () => {
    const store = useTopicsStore()
    
    store.importRawString(example, true)
    
    expect(store.topicsDone).toHaveLength(0)
  })

  describe("markAsDone", () => {  
    it('removes topics from next', () => {
      const store = useTopicsStore()
      
      store.importRawString(example, true)
      store.markAsDone(1)
      store.markAsDone(3)
      
      expect(store.topics).toHaveLength(6)
      expect(store.topics[1].Team).toBe("ANTARES")
      expect(store.topics[2].Team).toBe("PIB")
      expect(store.topics[3].Team).toBe("Prometheus")
    })
    
    it('adds topic in done', () => {
      const store = useTopicsStore()
      
      store.importRawString(example, true)
      store.markAsDone(1)
      store.markAsDone(3)
      
      expect(store.topicsDone).toHaveLength(2)
      expect(store.topicsDone[0].Team).toBe("Falcon")
      expect(store.topicsDone[1].Team).toBe("Stellar Mobile")
    })
    
    it('adds topic in done in the order of action', () => {
      const store = useTopicsStore()
      
      store.importRawString(example, true)
      store.markAsDone(4)
      store.markAsDone(1)
      
      expect(store.topicsDone).toHaveLength(2)
      expect(store.topicsDone[0].Team).toBe("Stellar Mobile")
      expect(store.topicsDone[1].Team).toBe("Falcon")
    })
  })

  describe("moveToNow", () => {  
    it('moves topics to now when from topics', () => {
      const store = useTopicsStore()
      
      store.importRawString(example, true)
      store.moveToNow(false, 2)
      
      expect(store.topics).toHaveLength(8)
      expect(store.topics[0].Team).toBe("ANTARES")
      expect(store.topics[1].Team).toBe("Star - Falcon")
      expect(store.topics[2].Team).toBe("Falcon")
      expect(store.topicsDone).toHaveLength(0)
    })

    it('moves topics to now when from done', () => {
      const store = useTopicsStore()
      
      store.importRawString(example, true)
      store.markAsDone(1)
      store.markAsDone(3)
      store.moveToNow(true, 1)
      
      expect(store.topics).toHaveLength(7)
      expect(store.topics[0].Team).toBe("Stellar Mobile")
      expect(store.topics[1].Team).toBe("Star - Falcon")
      expect(store.topics[2].Team).toBe("ANTARES")
      expect(store.topicsDone).toHaveLength(1)
      expect(store.topicsDone[0].Team).toBe("Falcon")
    })
  })

  describe("moveToNext", () => {  
    it('moves topics to next when from topics', () => {
      const store = useTopicsStore()
      
      store.importRawString(example, true)
      store.moveToNext(false, 2)
      
      expect(store.topics).toHaveLength(8)
      expect(store.topics[0].Team).toBe("Star - Falcon")
      expect(store.topics[1].Team).toBe("ANTARES")
      expect(store.topics[2].Team).toBe("Falcon")
      expect(store.topicsDone).toHaveLength(0)
    })

    it('moves topics to now when from done', () => {
      const store = useTopicsStore()
      
      store.importRawString(example, true)
      store.markAsDone(1)
      store.markAsDone(3)
      store.moveToNext(true, 1)
      
      expect(store.topics).toHaveLength(7)
      expect(store.topics[0].Team).toBe("Star - Falcon")
      expect(store.topics[1].Team).toBe("Stellar Mobile")
      expect(store.topics[2].Team).toBe("ANTARES")
      expect(store.topicsDone).toHaveLength(1)
      expect(store.topicsDone[0].Team).toBe("Falcon")
    })
    
    it('works on the first topic', () => {
      const store = useTopicsStore()
      
      store.importRawString(example, true)
      store.moveToNext(false, 0)
      
      expect(store.topics).toHaveLength(8)
      expect(store.topics[0].Team).toBe("Falcon")
      expect(store.topics[1].Team).toBe("Star - Falcon")
      expect(store.topics[2].Team).toBe("ANTARES")
      expect(store.topicsDone).toHaveLength(0)
    })
  })

  describe("moveToLast", () => {  
    it('moves topics to last when from topics', () => {
      const store = useTopicsStore()
      
      store.importRawString(example, true)

      expect(store.topics[6].Team).toBe("Prometheus")
      expect(store.topics[7].Team).toBe("Amethyst")
      store.moveToLast(false, 2)
      
      expect(store.topics).toHaveLength(8)
      expect(store.topics[0].Team).toBe("Star - Falcon")
      expect(store.topics[1].Team).toBe("Falcon")
      expect(store.topics[2].Team).toBe("PIB")
      expect(store.topics[5].Team).toBe("Prometheus")
      expect(store.topics[6].Team).toBe("Amethyst")
      expect(store.topics[7].Team).toBe("ANTARES")
      expect(store.topicsDone).toHaveLength(0)
    })

    it('moves topics to now when from done', () => {
      const store = useTopicsStore()
      
      store.importRawString(example, true)
      store.markAsDone(1)
      store.markAsDone(3)
      

      expect(store.topics[0].Team).toBe("Star - Falcon")
      expect(store.topics[1].Team).toBe("ANTARES")
      expect(store.topics[2].Team).toBe("PIB")
      expect(store.topics[4].Team).toBe("Prometheus")
      expect(store.topics[5].Team).toBe("Amethyst")
      store.moveToLast(true, 1)
      
      expect(store.topics).toHaveLength(7)
      expect(store.topics[0].Team).toBe("Star - Falcon")
      expect(store.topics[1].Team).toBe("ANTARES")
      expect(store.topics[2].Team).toBe("PIB")
      expect(store.topics[4].Team).toBe("Prometheus")
      expect(store.topics[5].Team).toBe("Amethyst")
      expect(store.topics[6].Team).toBe("Stellar Mobile")
      expect(store.topicsDone).toHaveLength(1)
      expect(store.topicsDone[0].Team).toBe("Falcon")
    })
  })
})
