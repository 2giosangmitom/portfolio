<script setup lang="ts">
const props = defineProps<{ href?: string; target?: string }>();
const external = computed(() => /^https?:\/\//.test(props.href ?? ""));
</script>

<template>
  <NuxtLink
    :href="href"
    :target="target ?? (external ? '_blank' : undefined)"
    class="border-b border-line text-fg hover:border-accent hover:text-accent"
  >
    <slot />
  </NuxtLink>
</template>
