<script setup lang="ts">
import { profile } from "~/data";

const stack = [
  { name: "Nuxt", icon: "simple-icons:nuxt", color: "text-[#00DC82]" },
  { name: "Tailwind CSS", icon: "simple-icons:tailwindcss", color: "text-[#06B6D4]" },
];
</script>

<template>
  <footer class="mt-32 border-t border-line">
    <div class="container-page pt-12">
      <SignatureChien />
    </div>
    <div
      class="container-page flex flex-col items-center justify-between gap-4 pt-8 pb-12 text-sm md:flex-row"
    >
      <p class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        <span class="text-fg">Built with:</span>
        <span v-for="s in stack" :key="s.name" class="flex items-center gap-1.5 text-fg-subtle">
          <Icon :name="s.icon" class="size-4" :class="s.color" aria-hidden="true" />{{ s.name }}
        </span>
      </p>
      <p class="text-xs text-fg-subtle">
        Copyright © {{ profile.name }} {{ new Date().getFullYear() }}. All rights reserved.
      </p>
    </div>
  </footer>
</template>
