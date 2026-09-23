<script setup lang="ts">
const { data: jobs } = await useAsyncData("experience", () =>
  queryCollection("experience").order("start", "DESC").all(),
);
</script>

<template>
  <ol v-if="jobs?.length" class="divide-y divide-line border-y border-line">
    <li
      v-for="job in jobs"
      :key="job.company"
      class="grid grid-cols-[4rem_minmax(0,1fr)] items-start gap-x-5 gap-y-4 py-7 sm:grid-cols-[5rem_minmax(0,1fr)] sm:gap-x-7 sm:py-9 lg:grid-cols-[5rem_minmax(0,1fr)_auto]"
    >
      <component
        :is="job.url ? 'a' : 'span'"
        :href="job.url"
        class="surface-link row-span-2 block size-16 overflow-hidden sm:size-20"
        :aria-label="job.url ? `${job.company} website` : undefined"
      >
        <ImageSlot
          :src="job.logo"
          :alt="`${job.company} logo`"
          :hint="`images/experience/${job.company.toLowerCase()}.jpg`"
          sizes="sm:80px 64px"
        />
      </component>
      <div class="min-w-0 self-center">
        <h3 class="text-xl sm:text-2xl">{{ job.company }}</h3>
        <p class="mt-1 text-fg">{{ job.role }}</p>
      </div>
      <p class="eyebrow-date col-start-2 self-center lg:col-start-3 lg:row-start-1 lg:justify-self-end">
        <time :datetime="job.start">{{ formatMonth(job.start) }}</time> -
        <time v-if="job.end" :datetime="job.end">{{ formatMonth(job.end) }}</time>
        <span v-else class="text-accent">Present</span>
      </p>
      <p class="col-start-2 max-w-2xl leading-relaxed lg:col-span-2">{{ job.description }}</p>
    </li>
  </ol>
</template>
