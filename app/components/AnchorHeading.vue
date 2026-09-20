<script setup lang="ts">
defineProps<{ tag: string; id?: string }>();
</script>

<template>
  <component :is="tag" :id="id" class="group relative scroll-mt-8">
    <a
      v-if="id"
      :href="`#${id}`"
      aria-label="Link to this section"
      class="absolute -left-5 text-accent no-underline opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
      >#</a
    >
    <slot />
  </component>
</template>
