<script setup lang="ts">
const { data: jobs } = await useAsyncData("experience", () =>
  queryCollection("experience").order("start", "DESC").all(),
);
</script>

<template>
  <ol
    v-if="jobs?.length"
    class="grid grid-cols-1 gap-x-12 gap-y-14"
    :class="{ 'lg:grid-cols-2': jobs.length > 1 }"
  >
    <li
      v-for="job in jobs"
      :key="job.path"
      class="relative flex max-w-3xl items-start gap-x-4 before:absolute before:top-[5.75rem] before:bottom-0 before:left-10 before:w-px before:bg-line lg:gap-x-6"
    >
      <component
        :is="job.url ? 'a' : 'span'"
        :href="job.url"
        class="surface-link block size-20 shrink-0 overflow-hidden"
        :aria-label="job.url ? `${job.company} website` : undefined"
      >
        <ImageSlot
          :src="job.logo"
          :alt="`${job.company} logo`"
          :hint="`logos/${job.company.toLowerCase()}.png`"
          sizes="80px"
        />
      </component>
      <div class="min-w-0">
        <h3 class="text-xl">{{ job.company }}</h3>
        <p class="text-fg">{{ job.role }}</p>
        <p class="eyebrow-date mt-2">
          <time :datetime="job.start">{{ formatMonth(job.start) }}</time> -
          <time v-if="job.end" :datetime="job.end">{{ formatMonth(job.end) }}</time>
          <span v-else class="text-accent">Present</span>
        </p>
        <ContentRenderer :value="job" class="[&>p:first-child]:mt-4 [&_li]:my-2 [&_ul]:my-4" />
      </div>
    </li>
  </ol>
</template>
