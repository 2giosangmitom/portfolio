<template>
  <svg viewBox="0 0 24 24" aria-hidden="true" class="shrink-0">
    <g fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="stroke-fg">
      <path d="M5.3 11.5V13.6C5.3 18 8.3 21.6 12 21.6C15.7 21.6 18.7 18 18.7 13.6V11.5" />
      <path d="M5.3 13C4.2 13 4.2 15.4 5.5 15.4M18.7 13C19.8 13 19.8 15.4 18.5 15.4" />
      <path d="M10.9 18.2H13.1" />
    </g>
    <path :d="hair" class="fill-fg" />
    <g fill="none" stroke-width="1.2" stroke-linejoin="round" class="stroke-accent">
      <rect x="5.8" y="11.6" width="5.2" height="3.2" rx="0.6" />
      <rect x="13" y="11.6" width="5.2" height="3.2" rx="0.6" />
      <path d="M11 12.3H13" />
    </g>
  </svg>
</template>

<script setup lang="ts">
const hair = "M4.8 12.5C4 7 6.5 3.6 10.5 3L12 1.2L13 2.9L15.4 1.6L15.6 3.4L18.2 3L17.8 4.8C19.6 6.5 19.8 9 19.2 12.5L18 9.2L16.5 9.8L15.3 8.2L13.4 9.2L12.2 7.8L10.2 9.4L9 8.2L7.3 9.8L6 9.2Z";
</script>
