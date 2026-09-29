<script setup lang="ts">
import { socials } from "~/data";
</script>

<template>
  <ul class="flex flex-wrap items-center gap-x-6 gap-y-3">
    <li v-for="s in socials" :key="s.name">
      <a
        :href="s.url"
        class="group flex items-center gap-2 border-b border-line pb-0.5 text-fg hover:border-accent"
      >
        <Icon
          :name="s.icon"
          class="size-4 text-fg-subtle group-hover:text-accent"
          aria-hidden="true"
        />
        {{ s.name }}
      </a>
    </li>
  </ul>
</template>
