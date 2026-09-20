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
let timer: ReturnType<typeof setTimeout> | undefined;
async function copy() {
  try {
    await navigator.clipboard.writeText(props.code ?? "");
    copied.value = true;
    clearTimeout(timer);
    timer = setTimeout(() => (copied.value = false), 1500);
  } catch {}
}
</script>

<template>
  <figure
    class="group relative my-6 overflow-hidden rounded-lg border border-line bg-canvas dark:bg-surface"
  >
    <figcaption
      v-if="filename"
      class="border-b border-line px-4 py-2 font-mono text-xs text-fg-subtle"
    >
      {{ filename }}
    </figcaption>
    <button
      type="button"
      class="absolute right-2 z-10 grid size-8 place-items-center rounded-md border border-line bg-canvas text-fg-subtle opacity-0 group-hover:opacity-100 hover:text-fg focus-visible:opacity-100 active:translate-y-px"
      :class="filename ? 'top-10' : 'top-2'"
      :aria-label="copied ? 'Copied' : 'Copy code'"
      @click="copy"
    >
      <span v-if="copied" class="text-accent"
        ><Icon name="ph:check" class="block size-4" aria-hidden="true"
      /></span>
      <span v-else><Icon name="ph:copy" class="block size-4" aria-hidden="true" /></span>
    </button>
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
