<script setup lang="ts">
import FormattersList from '@/components/FormattersList.vue';
import FormattersAdd from '@/components/FormattersAdd.vue';
import StartTimeSettings from '@/components/StartTimeSettings.vue';
import VdoNinjaSettings from '@/components/VdoNinjaSettings.vue';
</script>

<template>
  <StartTimeSettings/>
  <FormattersList title="Current formatters" format-type="current"/>
  <FormattersList title="Next formatters" format-type="next"/>
  <FormattersAdd/>
  <VdoNinjaSettings/>
</template>
