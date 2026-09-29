<script setup lang="ts">
defineProps<{ to: string; parent: string; current: string }>();
</script>

<template>
  <nav aria-label="Breadcrumb" class="mb-8 border-b border-line pb-6 text-sm text-fg-subtle">
    <ol class="flex min-w-0 items-center gap-2">
      <li class="shrink-0">
        <NuxtLink :to="to" class="link">{{ parent }}</NuxtLink>
      </li>
      <li class="flex min-w-0 items-center gap-2" aria-current="page">
        <Icon name="ph:caret-right" class="block size-3.5 shrink-0" aria-hidden="true" />
        <span class="truncate">{{ current }}</span>
      </li>
    </ol>
  </nav>
</template>
