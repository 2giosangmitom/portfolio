<script setup lang="ts">
const props = defineProps<{
  src?: string;
  alt: string;
  hint: string;
  sizes?: string;
  loading?: "lazy" | "eager";
  /** "cover" fills a fixed-size wrapper (avatars, logos); "natural" keeps original ratio. */
  fit?: "cover" | "natural";
}>();
const dev = import.meta.dev;
const eager = computed(() => props.loading === "eager");
const imgClass = computed(() =>
  props.fit === "cover" ? "size-full bg-surface object-cover" : "h-auto w-full bg-surface",
);
</script>

<template>
  <LazyNuxtImg
    v-if="src"
    :src="src"
    :alt="alt"
    :sizes="sizes ?? 'sm:100vw md:50vw xl:50vw'"
    densities="x1 x2"
    :format="imageFormat(src)"
    :loading="loading ?? 'lazy'"
    :preload="eager ? { fetchPriority: 'high' } : undefined"
    :fetchpriority="eager ? 'high' : undefined"
    :class="imgClass"
  />
  <span
    v-else
    role="img"
    :aria-label="`${alt} (image coming soon)`"
    class="grid size-full place-items-center bg-surface-strong p-3 text-center"
  >
    <span class="font-mono text-xs text-fg-subtle">
      <span class="mx-auto mb-1 block w-fit"
        ><Icon name="ph:image" class="block size-5" aria-hidden="true"
      /></span>
      <template v-if="dev">{{ hint }}</template>
    </span>
  </span>
</template>
