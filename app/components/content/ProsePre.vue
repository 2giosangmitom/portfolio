<script setup lang="ts">
const props = defineProps<{
  code?: string;
  language?: string;
  filename?: string;
  highlights?: number[];
  meta?: string;
  class?: string;
}>();

const copied = ref(false);
const failed = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;
async function copy() {
  failed.value = false;
  try {
    await navigator.clipboard.writeText(props.code ?? "");
    copied.value = true;
    clearTimeout(timer);
    timer = setTimeout(() => (copied.value = false), 1500);
  } catch {
    failed.value = true;
  }
}
onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
  <figure
    class="group relative my-6 overflow-hidden rounded-lg border border-line bg-canvas dark:bg-surface"
  >
    <figcaption
      class="flex min-h-12 items-center justify-between gap-4 border-b border-line bg-surface/60 px-3 py-1.5"
    >
      <span class="min-w-0 truncate font-mono text-xs text-fg-subtle">{{
        filename || language || "Code"
      }}</span>
      <UiButton
        icon-only
        :aria-label="copied ? 'Copied' : 'Copy code'"
        :title="copied ? 'Copied' : 'Copy code'"
        @click="copy"
      >
        <Icon v-if="copied" name="ph:check" class="block size-4 text-accent" aria-hidden="true" />
        <Icon v-else name="ph:copy" class="block size-4" aria-hidden="true" />
      </UiButton>
    </figcaption>
    <p v-if="failed" role="status" class="px-4 pt-3 text-sm text-fg-muted">
      Couldn’t copy. Select the code and copy it manually.
    </p>
    <span class="sr-only" role="status">{{ copied ? "Code copied to clipboard" : "" }}</span>
    <pre
      :class="props.class"
      class="overflow-x-auto p-4 font-mono text-sm leading-relaxed"
      tabindex="0"
    ><slot /></pre>
  </figure>
</template>

<style>
pre code .line {
  display: block;
}
</style>
