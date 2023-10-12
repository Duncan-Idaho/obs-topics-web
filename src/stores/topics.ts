import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export type Topic = {
  [column: string]: string;
}

export type ColumnSelection = {
  [column: string]: boolean;
}

export type Topics = Topic[]

export const useTopicsStore = defineStore('topics', () => {
  const headers = useStorage<string[]>('headers', [])
  const topics = useStorage<Topics>('topics', [])
  const columnDisplay = useStorage<ColumnSelection>('column-display', {})
  
  const displayedColumns = computed(() => headers.value.filter(header => columnDisplay.value[header]))

  function importRawString(rawString: string, shouldStopImportAtFirstEmptyLine: boolean) {
    var lines = splitLines(rawString);

    if (lines.length < 1)
        return;

    headers.value = lines[0].trim().split('\t').map(header => header.trim());
    topics.value = lines.slice(1)
        .map(entry => parseTopicEntry(entry));

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

    function parseTopicEntry(topicEntry: string): Topic {
      const columnEntries = topicEntry.split('\t')
        .map((value, index) => ({ index, value: value.trim() }))
        .filter(pair => pair.index < headers.value.length)
        .map(pair => [ headers.value[pair.index], tryParse(pair.value) ])

      return Object.fromEntries(columnEntries)
    }

    function tryParse(value: string) : string | number {
      const intValue = parseInt(value)
      return Number.isNaN(intValue)
        ? value
        : intValue
    }
  }

  return { topics, headers, columnDisplay, displayedColumns, importRawString }
})
