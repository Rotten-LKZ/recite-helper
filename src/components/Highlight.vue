<template>
  <p v-html="html"></p>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';

  const props = defineProps<{
    html: string;
    highText: string;
  }>()

  const html = computed(() => {
    if (eval)
      return props.html.replace(eval(`/${props.highText}/g`), `<span class="highlight">${props.highText}</span>`);
    else
      return props.html;
  })
</script>

<style>
.highlight {
  background-color: #ff0;
}
</style>