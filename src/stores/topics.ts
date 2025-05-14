import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export type Topic = {
  [column: string]: string | number;
}

export type ColumnSelection = {
  [column: string]: boolean;
}

export type Topics = Topic[]

export type FormatsDefinitions = {
  current: Formats;
  next: Formats;
}

export type Formats = {
  [column: string]: Format;
}

export type Format = {
  pattern: string;
  default: string;
  color?: string;
  font?: string;
}

export const useTopicsStore = defineStore('topics', () => {
  const headers = useStorage<string[]>('headers', [])
  const columnDisplay = useStorage<ColumnSelection>('column-display', {})
  const topics = useStorage<Topics>('topics', [])
  const topicsDone = useStorage<Topics>('topicsDone', [])
  const allTopics = computed(() => [...topics.value, ...topicsDone.value])
  
  const formats = useStorage<FormatsDefinitions>('formats', {
    current: {},
    next: {}
  })

  function makeFormatter(key: keyof FormatsDefinitions) {
    return computed(() => {
      return Object.fromEntries(
        Object.entries(formats.value[key]).map(([ key, format ]) => [key, formatParser(format)]))
    })
  }

  const formatters = {
    current: makeFormatter('current'),
    next: makeFormatter('next')
  }

  const currentFormatted = makeFormatted('current', 0)
  const nextFormatted = makeFormatted('next', 1)

  const allFormatted = computed(() => {
    return Object.fromEntries(
      [...topics.value, ...topicsDone.value].map(topic => [+topic.$id, Object.fromEntries(
        Object.entries(formatters.current.value).map(([ key, formatter ]) => [key, formatter(topic)]))])
    )
  })

  function makeFormatted(key: keyof FormatsDefinitions, index: number) {
    const parsedFormats = computed(() => {
      return Object.fromEntries(
        Object.entries(formats.value[key]).map(([ key, format ]) => [key, formatParser(format)]))
    }) 
  
    return computed(() => {
      return Object.fromEntries(
        Object.entries(parsedFormats.value).map(([ key, formatter ]) => [key, formatter(topics.value[index])]))
    })
  }
  
  const displayedColumns = computed({
    get: () => headers.value.filter(header => columnDisplay.value[header]),
    set: newList => {
      headers.value = newList.concat(
        headers.value.filter(header => !newList.find(existingHeader => existingHeader === header))
      )
    }
  })

  function importRawString(rawString: string, shouldStopImportAtFirstEmptyLine: boolean) {
    var lines = splitLines(rawString);

    if (lines.length < 1)
        return;

    headers.value = lines[0].trim().split('\t').map(header => header.trim());
    topics.value = lines.slice(1)
        .map((entry, index) => parseTopicEntry(entry, index));

    topics.value.sort((topicLeft, topicRight) => getOrder(topicLeft) - getOrder(topicRight))

    function getOrder(topic: Topic): number {
      return typeof topic.Order === "number"
        ? topic.Order
        : Number.MAX_VALUE
    }

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

    function parseTopicEntry(topicEntry: string, topicIndex: number): Topic {
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

  function formatParser(format: Format): (topic?: Topic) => string {
    const matches = [...format.pattern.matchAll(/(?<prefix>[^{]*)\{(?<placeholder>[^}]*)\}(?<suffix>[^{]*)/g)]
    if (matches.length === 0)
      return topic => topic ? format.pattern : format.default
    
    const recursiveFormatter = matches.reduce(
      (acumulator, currentValue) => (topic: Topic) => {
        return acumulator(topic)
          + (currentValue.groups?.prefix || '')
          + (currentValue.groups?.placeholder ? topic[currentValue.groups.placeholder] : '') 
          + (currentValue.groups?.suffix || '')
      },
      (_: Topic): string => ""
    )
    return topic => topic ? recursiveFormatter(topic) : format.default
  }

  return { 
    topics,
    headers, 
    columnDisplay, 
    displayedColumns,
    topicsDone, 
    allTopics,
    formats,
    currentFormatted,
    nextFormatted,
    allFormatted,
    importRawString,
    markAsDone,
    moveToNow,
    moveToNext,
    moveToLast,
    formatParser,
  }
})
