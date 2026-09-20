<script setup lang="ts">
import { motion, useReducedMotion } from "motion-v";

const reduce = useReducedMotion();
const ease = [0.65, 0, 0.35, 1] as const;
const draw = (delay: number, duration = 1.6) => ({
  initial: reduce.value ? false : { pathLength: 0 },
  animate: { pathLength: 1 },
  transition: { duration, delay, ease },
});
const hair =
  "M4.8 12.5C4 7 6.5 3.6 10.5 3L12 1.2L13 2.9L15.4 1.6L15.6 3.4L18.2 3L17.8 4.8C19.6 6.5 19.8 9 19.2 12.5L18 9.2L16.5 9.8L15.3 8.2L13.4 9.2L12.2 7.8L10.2 9.4L9 8.2L7.3 9.8L6 9.2Z";
const lenses = [5.8, 13];
</script>

<template>
  <svg viewBox="2 -1 20 25" aria-hidden="true" class="w-full max-w-[340px]">
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
      <motion.path
        d="M5.3 11.5V13.6C5.3 18 8.3 21.6 12 21.6C15.7 21.6 18.7 18 18.7 13.6V11.5"
        v-bind="draw(0)"
      />
      <motion.path
        d="M5.3 13C4.2 13 4.2 15.4 5.5 15.4M18.7 13C19.8 13 19.8 15.4 18.5 15.4"
        v-bind="draw(0.9, 0.6)"
      />
      <motion.path :d="hair" v-bind="draw(0.3, 2)" />
      <motion.path d="M10.9 18.2H13.1" v-bind="draw(1.6, 0.4)" />
    </g>

    <motion.g
      :initial="reduce ? false : { opacity: 0, y: -1.5 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.6, delay: 1.8, ease: [0.16, 1, 0.3, 1] }"
    >
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
      <motion.g
        class="fill-fg [transform-box:fill-box] [transform-origin:center]"
        :animate="reduce ? undefined : { scaleY: [1, 1, 0.1, 1] }"
        :transition="{
          duration: 0.3,
          times: [0, 0.3, 0.6, 1],
          delay: 3.2,
          repeat: Infinity,
          repeatDelay: 3.6,
        }"
      >
        <circle cx="8.4" cy="13.2" r="0.45" />
        <circle cx="15.6" cy="13.2" r="0.45" />
      </motion.g>
      <g v-if="!reduce" clip-path="url(#hero-lenses)">
        <motion.path
          d="M0 16L3 10.5"
          stroke-width="0.9"
          class="stroke-fg/40"
          :initial="{ x: 3 }"
          :animate="{ x: [3, 21] }"
          :transition="{
            duration: 0.9,
            delay: 2.6,
            repeat: Infinity,
            repeatDelay: 5,
            ease: 'easeInOut',
          }"
        />
      </g>
    </motion.g>
  </svg>
</template>
