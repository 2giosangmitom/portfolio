<script setup lang="ts">
import { animate, stagger } from "motion-v";

type Day = [date: string, count: number, level: number];

const { data, refresh } = await useFetch("/api/github/contributions", { key: "contributions" });

onMounted(() => {
  if (!data.value?.days.length) refresh();
});

const year = ref<number>();
const today = new Date().toISOString().slice(0, 10);

const view = computed(() => {
  if (!data.value?.days.length) return null;
  let days: Day[];
  if (year.value) {
    days = data.value.days.filter((d) => d[0].startsWith(String(year.value)));
  } else {
    const from = new Date();
    from.setUTCFullYear(from.getUTCFullYear() - 1);
    const start = from.toISOString().slice(0, 10);
    days = data.value.days.filter((d) => d[0] > start && d[0] <= today);
  }
  const total = days.reduce((n, d) => n + d[1], 0);
  const pad = days.length ? new Date(days[0]![0]).getUTCDay() : 0;
  const cells: (Day | null)[] = [...Array(pad).fill(null), ...days];
  const weeks: (Day | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  const months = weeks.map((w) => {
    const first = w.find((d) => d?.[0].endsWith("-01"));
    return first
      ? new Date(first[0]).toLocaleString("en-US", { month: "short", timeZone: "UTC" })
      : "";
  });
  return { weeks, months, total };
});

const grid = ref<HTMLElement>();
watch(year, async () => {
  await nextTick();
  if (!grid.value || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  animate(
    grid.value.querySelectorAll("[data-cell]"),
    { opacity: [0, 1], scale: [0.4, 1] },
    { duration: 0.4, delay: stagger(0.0012), ease: "easeOut" },
  );
});

const shade = ["bg-surface-strong", "bg-accent/30", "bg-accent/55", "bg-accent/80", "bg-accent"];
</script>

<template>
  <div v-if="data && view" class="flex flex-col gap-4 xl:flex-row">
    <figure class="surface m-0 max-w-full min-w-0 p-5 sm:p-8">
      <div
        class="overflow-x-auto pb-1 [direction:rtl]"
        tabindex="0"
        role="region"
        aria-label="Contribution calendar"
      >
        <div
          class="w-max [direction:ltr]"
          role="img"
          :aria-label="`${view.total} contributions ${year ? `in ${year}` : 'in the last year'}`"
        >
          <div class="mb-1 flex gap-[3px] font-mono text-[10px] text-fg-subtle" aria-hidden="true">
            <span
              v-for="(m, i) in view.months"
              :key="i"
              class="w-3 overflow-visible whitespace-nowrap"
              >{{ m }}</span
            >
          </div>
          <div ref="grid" class="flex gap-[3px]">
            <div v-for="(w, i) in view.weeks" :key="i" class="grid grid-rows-7 gap-[3px]">
              <span
                v-for="(d, j) in w"
                :key="j"
                data-cell
                class="size-3 rounded-[2px]"
                :class="d ? shade[d[2]] : 'invisible'"
                :title="d ? `${d[1]} contributions on ${d[0]}` : undefined"
              />
            </div>
          </div>
        </div>
      </div>
      <figcaption class="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
        <span>
          <strong class="text-fg tabular-nums">{{ view.total }}</strong> contributions
          {{ year ? `in ${year}` : "in the last year" }}
        </span>
        <span class="flex items-center gap-1 font-mono text-xs text-fg-subtle" aria-hidden="true">
          Less <span v-for="s in shade" :key="s" class="size-3 rounded-[2px]" :class="s" /> More
        </span>
      </figcaption>
    </figure>

    <div
      class="flex flex-row flex-wrap gap-2 xl:flex-col"
      role="group"
      aria-label="Contribution year"
    >
      <UiButton
        v-for="y in data.years"
        :key="y"
        :aria-pressed="year === y"
        :variant="year === y ? 'primary' : 'secondary'"
        :title="`View contributions in ${y}`"
        @click="year = year === y ? undefined : y"
      >
        {{ y }}
      </UiButton>
    </div>
  </div>
</template>
