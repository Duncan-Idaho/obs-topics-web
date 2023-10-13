import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export type Topic = {
  [column: string]: string | number;
}

export type ColumnSelection = {
  [column: string]: boolean;
}

export type Topics = Topic[]

export const useTopicsStore = defineStore('topics', () => {
  const headers = useStorage<string[]>('headers', [])
  const topics = useStorage<Topics>('topics', [])
  const columnDisplay = useStorage<ColumnSelection>('column-display', {})
  const topicsDone = useStorage<Topics>('topicsDone', [])
  
  const displayedColumns = computed(() => headers.value.filter(header => columnDisplay.value[header]))

  function importRawString(rawString: string, shouldStopImportAtFirstEmptyLine: boolean) {
    var lines = splitLines(rawString);

    if (lines.length < 1)
        return;

    headers.value = lines[0].trim().split('\t').map(header => header.trim());
    topics.value = lines.slice(1)
        .map((entry, index) => parseTopicEntry(entry, index));

    function splitLines(rawString: string): string[] {
      const allTopicLines = rawString.split('\n')

      return shouldStopImportAtFirstEmptyLine
          ? [...takeWhile(allTopicLines, line => line.trim() !== '')]
          : allTopicLines.filter(line => line.trim() !== '');
    }

    function* takeWhile(source: string[], filter: (item: string) => boolean) {
        for (let entry of source)
          if (filter(entry))
            yield entry;
          else
            break;
    }

    function parseTopicEntry(topicEntry: string, topicIndex: Number): Topic {
      const columnEntries = topicEntry.split('\t')
        .map((value, index) => ({ index, value: value.trim() }))
        .filter(pair => pair.index < headers.value.length)
        .map(pair => [ headers.value[pair.index], tryParse(pair.value) ])

      const topic = Object.fromEntries(columnEntries)
      topic["$id"] = topicIndex
      return topic
    }

    function tryParse(value: string) : string | number {
      const intValue = parseInt(value)
      return Number.isNaN(intValue) || intValue + "" != value
        ? value
        : intValue
    }
  }

  function markAsDone(topicIndex: number) {
    const topic = topics.value.splice(topicIndex, 1)[0]
    if (topic) {
      topicsDone.value.push(topic)
    }
  }

  function getTopics(done: boolean) {
    return done ? topicsDone.value : topics.value
  }

  
  function moveToIndex(fromDone: boolean, topicIndex: number, newIndex: number) {
    const topic = getTopics(fromDone).splice(topicIndex, 1)[0]
      if (topic) {
      topics.value.splice(newIndex, 0, topic)
    }
  }

  function moveToNow(fromDone: boolean, topicIndex: number) {
    moveToIndex(fromDone, topicIndex, 0)
  }
  
  function moveToNext(fromDone: boolean, topicIndex: number) {
    moveToIndex(fromDone, topicIndex, 1)
  }
  
  function moveToLast(fromDone: boolean, topicIndex: number) {
    moveToIndex(fromDone, topicIndex, topics.value.length - (fromDone ? 0 : 1))
  }

  return { 
    topics,
    headers, 
    columnDisplay, 
    displayedColumns,
    topicsDone, 
    importRawString,
    markAsDone,
    moveToNow,
    moveToNext,
    moveToLast
  }
})
