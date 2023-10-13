<script setup lang="ts">
import { useTopicsStore } from '@/stores/topics';
import TopicsList from '@/components/TopicsList.vue'

import { DragRow } from "vue-resizer";

const store = useTopicsStore()
</script>

<template>
  <template v-if="store.displayedColumns.length">
    <DragRow :top-percent="66" width="100%" height="100%" :slider-width="8">
      <template #top>
        <TopicsList 
          v-if="store.displayedColumns.length" 
          :columns="store.displayedColumns"
          :topics="store.topics"
          
          @move-to-now="(index) => store.moveToNow(false, index)"
          @move-to-next="(index) => store.moveToNext(false, index)"
          @move-to-last="(index) => store.moveToLast(false, index)"
          @mark-as-done="(index) => store.markAsDone(index)"
        />
      </template>
      <template #bottom>
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
    </DragRow>
  </template>
  <template v-else>
    Go to <RouterLink to="/columns">Columns displayed</RouterLink> to choose which columns should be displayed
  </template>
</template>

<style scoped>
:deep(.drager_top > div), :deep(.drager_bottom > div) {
  overflow: auto;
}
</style>