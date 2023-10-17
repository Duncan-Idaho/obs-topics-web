<script setup lang="ts">
import FormattersList from '@/components/FormattersList.vue';
import StartTimeSettings from '@/components/StartTimeSettings.vue';
</script>

<template>
  <StartTimeSettings/>
  <FormattersList title="Current formatters" format-type="current"/>
  <FormattersList title="Next formatters" format-type="next"/>
</template>
