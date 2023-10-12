<script setup lang="ts">
import { useTopicsStore } from '@/stores/topics';
import TopicsList from '@/components/TopicsList.vue'

const store = useTopicsStore()
</script>

<template>
  <template v-if="store.displayedColumns.length">
    <TopicsList 
      v-if="store.displayedColumns.length" 
      :columns="store.displayedColumns"
      :topics="store.topics"
      
      @move-to-now="(index) => store.moveToNow(false, index)"
      @move-to-next="(index) => store.moveToNext(false, index)"
      @move-to-last="(index) => store.moveToLast(false, index)"
      @mark-as-done="(index) => store.markAsDone(index)"
    />
    <TopicsList 
      v-if="store.displayedColumns.length" 
      :columns="store.displayedColumns"
      :topics="store.topicsDone"
      isDone
      
      @move-to-now="(index) => store.moveToNow(true, index)"
      @move-to-next="(index) => store.moveToNext(true, index)"
      @move-to-last="(index) => store.moveToLast(true, index)"
    />
  </template>
  <template v-else>
    Go to <RouterLink to="/columns">Columns displayed</RouterLink> to choose which columns should be displayed
  </template>
</template>
