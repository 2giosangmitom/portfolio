<script setup lang="ts">
// Animation is CSS-only: one-shot draw/fade runs on mount, blink and shine
// loop on the compositor thread (transform/opacity only, no JS runtime).
const play = ref(false);
onMounted(() => {
  play.value = true;
});

const hair =
  "M4.8 12.5C4 7 6.5 3.6 10.5 3L12 1.2L13 2.9L15.4 1.6L15.6 3.4L18.2 3L17.8 4.8C19.6 6.5 19.8 9 19.2 12.5L18 9.2L16.5 9.8L15.3 8.2L13.4 9.2L12.2 7.8L10.2 9.4L9 8.2L7.3 9.8L6 9.2Z";
const lenses = [5.8, 13];
</script>

<template>
  <svg
    viewBox="2 -1 20 25"
    aria-hidden="true"
    class="hero-art w-full max-w-[340px]"
    :class="{ play }"
  >
    <defs>
      <clipPath id="hero-lenses">
        <rect v-for="x in lenses" :key="x" :x="x" y="11.6" width="5.2" height="3.2" rx="0.6" />
      </clipPath>
    </defs>

    <g
      fill="none"
      stroke-width="0.2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="stroke-fg"
    >
      <path
        class="hero-draw"
        style="--d: 1.6s; --delay: 0s"
        pathLength="1"
        d="M5.3 11.5V13.6C5.3 18 8.3 21.6 12 21.6C15.7 21.6 18.7 18 18.7 13.6V11.5"
      />
      <path
        class="hero-draw"
        style="--d: 0.6s; --delay: 0.9s"
        pathLength="1"
        d="M5.3 13C4.2 13 4.2 15.4 5.5 15.4M18.7 13C19.8 13 19.8 15.4 18.5 15.4"
      />
      <path class="hero-draw" style="--d: 2s; --delay: 0.3s" pathLength="1" :d="hair" />
      <path class="hero-draw" style="--d: 0.4s; --delay: 1.6s" pathLength="1" d="M10.9 18.2H13.1" />
    </g>

    <g class="hero-glasses" style="--delay: 1.8s">
      <g fill="none" stroke-width="0.25" stroke-linejoin="round" class="stroke-accent">
        <rect
          v-for="x in lenses"
          :key="x"
          :x="x"
          y="11.6"
          width="5.2"
          height="3.2"
          rx="0.6"
          class="fill-accent/10"
        />
        <path d="M11 12.3H13" />
      </g>
      <g class="hero-eyes fill-fg">
        <circle cx="8.4" cy="13.2" r="0.45" />
        <circle cx="15.6" cy="13.2" r="0.45" />
      </g>
      <g clip-path="url(#hero-lenses)">
        <path d="M0 16L3 10.5" stroke-width="0.9" class="hero-shine stroke-fg/40" />
      </g>
    </g>
  </svg>
</template>

<style scoped>
@media (prefers-reduced-motion: no-preference) {
  .play .hero-draw {
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    animation: hero-draw var(--d) var(--ease-in-out) var(--delay) forwards;
  }
  .play .hero-glasses {
    opacity: 0;
    translate: 0 -1.5px;
    animation: hero-in 0.6s var(--ease-out) var(--delay) forwards;
  }
  .play .hero-eyes {
    transform-box: fill-box;
    transform-origin: center;
    animation: hero-blink 3.9s ease-in-out 3.2s infinite;
  }
  .play .hero-shine {
    animation: hero-shine 5.9s ease-in-out 2.6s infinite;
  }
}
@keyframes hero-draw {
  to {
    stroke-dashoffset: 0;
  }
}
@keyframes hero-in {
  to {
    opacity: 1;
    translate: 0 0;
  }
}
@keyframes hero-blink {
  0%,
  3%,
  8%,
  100% {
    transform: scaleY(1);
  }
  5% {
    transform: scaleY(0.1);
  }
}
@keyframes hero-shine {
  0% {
    transform: translateX(3px);
  }
  15%,
  100% {
    transform: translateX(21px);
  }
}
</style>
