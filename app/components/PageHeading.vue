<script setup lang="ts">
defineProps<{ title: string; description?: string }>();
</script>

<template>
  <header v-reveal class="mb-12">
    <h1 class="mb-6 max-w-3xl text-3xl sm:text-5xl lg:leading-[3.7rem]">{{ title }}</h1>
    <p v-if="description" class="max-w-2xl text-base leading-relaxed">{{ description }}</p>
  </header>
</template>
