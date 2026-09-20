<!-- Ported from theme-toggles by Alfie Jones (MIT): https://github.com/AlfieJones/theme-toggles -->
<script setup lang="ts">
const colorMode = useColorMode();
const mounted = ref(false);
onMounted(() => (mounted.value = true));
const toggled = computed(() =>
  !mounted.value || colorMode.unknown ? undefined : colorMode.value === "dark",
);

function toggle() {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}

const clipMainId = `classic-main-${useId()}`;
const rays = [
  "M12 1.4v2.4",
  "m20.3 3.7-2.5 2.5",
  "M22.6 12h-2.4",
  "M12 22.6v-2.4",
  "M1.4 12h2.4",
  "m20.3 20.3-2.5-2.5",
  "m3.7 20.3 2.5-2.5",
  "m3.7 3.7 2.5 2.5",
];
</script>

<template>
  <button
    type="button"
    title="Toggle theme"
    aria-label="Toggle theme"
    :aria-pressed="toggled"
    :class="toggled === true ? 'dark' : toggled === false ? 'light' : undefined"
    class="grid size-9 place-items-center rounded-full border border-line bg-surface/60 text-lg text-fg hover:border-line-strong hover:text-accent active:translate-y-px"
    @click="toggle"
  >
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      aria-hidden="true"
      style="--toggles-dot-dev--duration: 400ms"
    >
      <defs>
        <clipPath :id="clipMainId">
          <path
            d="M0 0h25a1 1 0 0010 10v14H0Z"
            class="motion-safe:transition-[d,translate] motion-safe:duration-(--toggles-dot-dev--duration) motion-safe:dark:delay-[calc(var(--toggles-dot-dev--duration)*0.15)] dark:[d:path('M0_2h13a1_1_0_0010_10v14H0Z')] dark:not-supports-[d:path('M0_0')]:-translate-x-3.25 dark:not-supports-[d:path('M0_0')]:translate-y-0.5"
          />
        </clipPath>
      </defs>
      <g stroke="currentColor" stroke-linecap="round">
        <circle
          cx="12"
          cy="12"
          r="5"
          fill="currentColor"
          :clip-path="`url(#${clipMainId})`"
          class="origin-center motion-safe:transition-transform motion-safe:duration-(--toggles-dot-dev--duration) dark:scale-170"
        />
        <path
          v-for="d in rays"
          :key="d"
          :d="d"
          fill="none"
          stroke-width="2"
          stroke-linejoin="round"
          stroke-miterlimit="0"
          paint-order="stroke markers fill"
          class="[transform-box:view-box] [transform-origin:center] motion-safe:[transition:transform_var(--toggles-dot-dev--duration),opacity_var(--toggles-dot-dev--duration)] motion-safe:delay-[calc(var(--toggles-dot-dev--duration)*0.15)] motion-safe:dark:delay-0 dark:[transform:scale(0)] dark:opacity-0"
        />
      </g>
    </svg>
  </button>
</template>
