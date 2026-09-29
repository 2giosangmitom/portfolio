<template>
  <svg
    viewBox="0 0 20 20"
    fill="currentColor"
    role="status"
    aria-label="Loading"
    class="loading-diamond"
  >
    <rect
      v-for="(p, i) in pixels"
      :key="i"
      :x="p[0]"
      :y="p[1]"
      width="4"
      height="4"
      :style="{ animationDelay: `${i * 0.1}s` }"
    />
  </svg>
</template>

<script setup lang="ts">
const pixels = [
  [8, 0],
  [12, 4],
  [16, 8],
  [12, 12],
  [8, 16],
  [4, 12],
  [0, 8],
  [4, 4],
];
</script>

<style scoped>
rect {
  opacity: 0;
  animation: spin-pixel 0.8s ease-in-out infinite;
}
@keyframes spin-pixel {
  0% {
    opacity: 0;
  }
  1% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  rect {
    animation: none;
    opacity: 0.5;
  }
}
</style>
