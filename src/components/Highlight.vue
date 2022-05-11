<template>
  <p v-html="html"></p>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';

  const props = defineProps<{
    html: string;
    highText: string;
    color?: string;
  }>()

  const html = computed(() => {
    return props.html.replace(RegExp(props.highText, 'g'), 
    `<span class="highlight" ${props.color === undefined ? `` : `style="background-color:${props.color};"`}>${props.highText}</span>`);
  })
</script>

<style>
.highlight {
  background-color: #ff0;
}
</style>