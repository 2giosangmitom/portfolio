<script setup lang="ts">
const props = defineProps<{ src?: string; alt: string; hint: string; sizes?: string; loading?: "lazy" | "eager" }>();
const dev = import.meta.dev;
const eager = computed(() => props.loading === "eager");
</script>

<template>
  <LazyNuxtImg
    v-if="src"
    :src="src"
    :alt="alt"
    :sizes="sizes ?? 'sm:100vw md:50vw xl:50vw'"
    :format="imageFormat(src)"
    :loading="loading ?? 'lazy'"
    :preload="eager ? { fetchPriority: 'high' } : undefined"
    :fetchpriority="eager ? 'high' : undefined"
    placeholder
    placeholder-class="blur-xl"
    class="size-full object-cover transition-[filter] duration-500"
  />
  <span
    v-else
    role="img"
    :aria-label="`${alt} (image coming soon)`"
    class="grid size-full place-items-center bg-surface-strong bg-[radial-gradient(var(--line-strong)_1px,transparent_1px)] bg-size-[14px_14px] p-3 text-center"
  >
    <span class="font-mono text-xs text-fg-subtle">
      <span class="mx-auto mb-1 block w-fit"><Icon name="ph:image" class="block size-5" aria-hidden="true" /></span>
      <template v-if="dev">{{ hint }}</template>
    </span>
  </span>
</template>
