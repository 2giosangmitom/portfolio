<script setup lang="ts">
const props = defineProps<{ src: string; alt: string }>();
const open = ref(false);
const close = () => (open.value = false);
const onKey = (e: KeyboardEvent) => {
  if (e.key === "Escape") close();
};

watch(open, (v) => {
  document.body.style.overflow = v ? "hidden" : "";
  if (v) window.addEventListener("keydown", onKey);
  else window.removeEventListener("keydown", onKey);
});
onUnmounted(() => {
  document.body.style.overflow = "";
  window.removeEventListener("keydown", onKey);
});
</script>

<template>
  <button
    type="button"
    class="block w-full cursor-zoom-in"
    :aria-label="`Enlarge image: ${props.alt}`"
    @click="open = true"
  >
    <slot />
  </button>
  <Teleport to="body">
    <Transition name="zoom">
      <div
        v-if="open"
        role="dialog"
        aria-modal="true"
        :aria-label="props.alt"
        class="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/70 p-4 backdrop-blur-[2px] md:p-8"
        @click="close"
      >
        <img
          :src="props.src"
          :alt="props.alt"
          class="zoom-img max-h-full max-w-full rounded-lg object-contain"
        />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.zoom-enter-active,
.zoom-leave-active {
  transition: opacity 0.25s ease;
}
.zoom-enter-active .zoom-img,
.zoom-leave-active .zoom-img {
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}
.zoom-enter-from,
.zoom-leave-to {
  opacity: 0;
}
.zoom-enter-from .zoom-img,
.zoom-leave-to .zoom-img {
  transform: scale(0.96);
}
@media (prefers-reduced-motion: reduce) {
  .zoom-enter-active,
  .zoom-leave-active,
  .zoom-enter-active .zoom-img,
  .zoom-leave-active .zoom-img {
    transition: none;
  }
}
</style>
