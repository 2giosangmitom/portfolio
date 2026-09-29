<script setup lang="ts">
defineProps<{ id: string }>();
</script>

<template>
  <div class="mb-8 flex flex-wrap items-baseline justify-between gap-4">
    <h2 :id="id" class="text-2xl font-medium leading-tight sm:text-3xl"><slot /></h2>
    <slot name="action" />
  </div>
</template>
