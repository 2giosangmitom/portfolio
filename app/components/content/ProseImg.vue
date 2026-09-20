<script setup lang="ts">
defineProps<{ src?: string; alt?: string; width?: string | number; height?: string | number }>();
</script>

<template>
  <figure class="my-8">
    <LazyNuxtImg
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :format="imageFormat(src)"
      loading="lazy"
      sizes="sm:100vw md:768px"
      class="w-full rounded-lg border border-line bg-surface"
    />
    <figcaption v-if="alt" class="mt-2 text-center text-sm text-fg-subtle">{{ alt }}</figcaption>
  </figure>
</template>
