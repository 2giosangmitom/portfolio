<script setup lang="ts">
useHead({ title: "Blog · Vo Quang Chien" });
const { data: posts } = await useAsyncData("posts", () => queryCollection("blog").order("date", "DESC").select("path", "title", "description", "date", "cover", "readingTime").all());
</script>

<template>
  <div>
    <PageHeading title="Blog" description="Notes on backend engineering, AI, and the tools I use every day, written as I learn." />
    <ul v-if="posts?.length" class="flex max-w-[950px] flex-col gap-y-8">
      <li v-for="p in posts" :key="p.path" v-reveal>
        <NuxtLink :to="p.path" class="surface-link group flex flex-col items-start gap-6 p-5 lg:flex-row lg:items-center">
          <span class="block aspect-[1200/630] w-full shrink-0 overflow-hidden rounded-md lg:w-[360px]">
            <ImageSlot :src="p.cover" :alt="p.title" :hint="`blog/${p.path.split('/').pop()}.png · 1200×630`" sizes="sm:100vw md:100vw lg:360px" />
          </span>
          <span class="max-w-lg">
            <span class="block font-display text-2xl font-semibold tracking-tight text-fg group-hover:text-accent">{{ p.title }}</span>
            <span class="mt-3 block">{{ p.description }}</span>
            <span class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-fg-subtle">
              <span class="flex items-center gap-1.5"><Icon name="ph:calendar-blank" class="size-3.5" aria-hidden="true" /><time :datetime="p.date">{{ formatDate(p.date) }}</time></span>
              <span class="flex items-center gap-1.5"><Icon name="ph:clock" class="size-3.5" aria-hidden="true" />{{ p.readingTime }} min read</span>
            </span>
          </span>
        </NuxtLink>
      </li>
    </ul>
    <p v-else>No posts yet.</p>
  </div>
</template>
