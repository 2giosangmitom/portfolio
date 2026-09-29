<script setup lang="ts">
const props = defineProps<{ src?: string; alt: string; hint?: string }>();
const video = computed(() => /\.(mp4|webm)$/i.test(props.src ?? ""));
const el = ref<HTMLVideoElement>();
onMounted(() => {
  if (el.value && matchMedia("(prefers-reduced-motion: reduce)").matches) el.value.pause();
});
</script>

<template>
  <figure class="my-8">
    <video
      v-if="src && video"
      ref="el"
      :src="src"
      :aria-label="alt"
      autoplay
      muted
      loop
      playsinline
      controls
      class="w-full rounded-lg border border-line bg-surface"
    />
    <LazyNuxtImg
      v-else-if="src"
      :src="src"
      :alt="alt"
      :format="imageFormat(src)"
      loading="lazy"
      sizes="sm:100vw md:768px"
      class="w-full rounded-lg border border-line bg-surface"
    />
    <div
      v-else
      class="aspect-video overflow-hidden rounded-lg border border-dashed border-line-strong"
    >
      <LazyImageSlot :alt="alt" :hint="hint ?? 'add a GIF, PNG, or MP4'" />
    </div>
    <figcaption v-if="$slots.default" class="mt-2 text-center text-sm text-fg-subtle">
      <slot mdc-unwrap="p" />
    </figcaption>
  </figure>
</template>
