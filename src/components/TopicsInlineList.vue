<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTopicsStore } from '@/stores/topics'
const topicsStore = useTopicsStore()

const props = defineProps<{
  id: number | string,
  type: string,
  title: string,
  format: string,
  topics: string[],
}>()

const customTopic = ref<number | string | null>(null)

const selectedTopics = computed(() => {
  return Object.entries(topicsStore.allFormatted)
    .filter(([id, topic]) => props.topics.includes(id + ''))
    .map(([id, topic]) => {
      return {
        id,
        topic: topic[props.format],
      }
    })
})

function add() {
  if (customTopic.value !== null) {
    props.topics.push(customTopic.value + '')
    customTopic.value = null
  }
}

function remove(id: string) {
  const index = props.topics.indexOf(id)
  if (index > -1) {
    props.topics.splice(index, 1)
  }
}

</script>

<template>
  <div class="sub-section">
    <div>
      <h4>{{ title }}:</h4>
      <span v-if="topics.length > 0">
        <span class="topic" v-for="(pair, index) in selectedTopics" :key="pair.id">
          <template v-if="index !==0"> , </template>
          {{ pair.topic }}
          <button 
            @click="() => remove(pair.id)"
            class="delete-button"
            :title="'Remove ' + pair.topic"
          >❌</button>
        </span>
      </span>
      <span v-else>None</span>
    </div>
    <div>
      <select v-model="customTopic">
        <template
          v-for="(topic, id) in topicsStore.allFormatted"
          :key="id"
        >
          <option 
            v-if="!topics.includes(id+'')"
            :value="id"
          >
            {{ topic[format] }}
          </option>

        </template>
      </select>
      <button @click="() => add()" title="Add">➕ Add</button>
    </div>
  </div>
</template>

<style scoped>
h4 {
  font-weight: 500;
  display: inline;
  margin-right: 0.25rem;
}

.sub-section {
  border-left: 0.25rem solid var(--vt-c-divider-dark-2);
  padding-left: 0.5rem;
  margin: 0.3rem 0rem;
}

.delete-button {
  border-radius: 100%;
  padding: 0.1rem;
  font-size: 0.7rem;
}
</style>