<script setup lang="ts">
import { NuxtLink } from "#components";

withDefaults(
  defineProps<{
    to?: string;
    variant?: "primary" | "secondary" | "ghost" | "link";
    iconOnly?: boolean;
    type?: "button" | "submit" | "reset";
  }>(),
  { variant: "secondary", type: "button" },
);
</script>

<template>
  <component
    :is="to ? NuxtLink : 'button'"
    :to="to"
    :type="to ? undefined : type"
    class="ui-control"
    :class="[
      `ui-control--${variant}`,
      variant === 'link' ? 'p-0' : iconOnly ? 'size-9 shrink-0 p-0' : 'min-h-9 px-3.5 py-2',
    ]"
  >
    <slot />
  </component>
</template>
