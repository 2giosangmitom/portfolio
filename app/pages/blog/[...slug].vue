<script setup lang="ts">
import { profile } from "~/data";

const route = useRoute();
const path = route.path.replace(/\/$/, "");
const { data: post } = await useAsyncData(path, () => queryCollection("blog").path(path).first());
if (!post.value)
  throw createError({ statusCode: 404, statusMessage: "Post not found", fatal: true });
const { data: others } = await useAsyncData(`${path}-others`, () =>
  queryCollection("blog")
    .where("path", "<>", path)
    .order("date", "DESC")
    .limit(3)
    .select("path", "title", "date")
    .all(),
);
useSeoMeta({
  title: `${post.value.title} · Vo Quang Chien`,
  description: post.value.description,
  ogTitle: post.value.title,
  ogDescription: post.value.description,
  ogType: "article",
});
</script>

<template>
  <div v-if="post">
    <nav
      aria-label="Breadcrumb"
      class="flex items-center gap-2 border-b border-line pb-8 text-sm text-fg-subtle"
    >
      <NuxtLink to="/blog" class="border-b border-line whitespace-nowrap hover:text-fg"
        >cd ..</NuxtLink
      >
      <Icon name="ph:caret-right" class="size-3.5 shrink-0" aria-hidden="true" />
      <span class="truncate">{{ post.title }}</span>
    </nav>

    <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)]">
      <article class="min-w-0 pt-10 pb-4 lg:border-r lg:border-line lg:pr-8">
        <p class="mb-8 flex flex-wrap items-center gap-x-4 gap-y-1 text-fg-subtle">
          <span class="flex items-center gap-1.5"
            ><Icon name="ph:calendar-blank" class="size-4" aria-hidden="true" /><time
              :datetime="post.date"
              >{{ formatDate(post.date) }}</time
            ></span
          >
          <span v-if="post.updated" class="text-sm">Updated {{ formatDate(post.updated) }}</span>
          <span class="flex items-center gap-1.5"
            ><Icon name="ph:clock" class="size-4" aria-hidden="true" />{{ post.readingTime }} min
            read</span
          >
        </p>
        <PageHeading :title="post.title" :description="post.description" />
        <div class="aspect-[1200/630] overflow-hidden rounded-xl border border-line">
          <ImageSlot
            :src="post.cover"
            :alt="post.title"
            :hint="`blog/${path.split('/').pop()}.png · 1200×630`"
            loading="eager"
            sizes="sm:100vw md:100vw lg:900px"
          />
        </div>
        <ContentRenderer :value="post" class="mt-10 text-[1.0625rem]" />
      </article>

      <aside class="flex h-max flex-col gap-y-8 py-10 lg:sticky lg:top-2 lg:px-6">
        <section class="border-b border-line pb-8">
          <p class="text-sm text-fg-subtle">Written by</p>
          <address class="mt-4 flex items-center gap-3 not-italic">
            <span class="block size-12 shrink-0 overflow-hidden rounded-full border border-line">
              <ImageSlot :src="profile.photo" :alt="profile.name" hint="me.jpg" sizes="48px" />
            </span>
            <span>
              <NuxtLink
                to="/about"
                rel="author"
                class="block font-display text-lg font-semibold tracking-tight text-fg hover:text-accent"
                >{{ profile.name }}</NuxtLink
              >
              <a :href="`https://github.com/${profile.handle}`" class="text-sm text-accent"
                >@{{ profile.handle }}</a
              >
            </span>
          </address>
        </section>
        <section v-if="post.tags?.length" class="border-b border-line pb-8">
          <h2 class="mb-4 text-xl">Tags</h2>
          <ul class="flex flex-wrap gap-2">
            <li
              v-for="t in post.tags"
              :key="t"
              class="rounded-md border border-line bg-surface/60 px-2 py-1 text-sm"
            >
              {{ t }}
            </li>
          </ul>
        </section>
        <section v-if="others?.length">
          <h2 class="mb-4 text-xl">More posts</h2>
          <ul class="space-y-4">
            <li v-for="o in others" :key="o.path">
              <NuxtLink :to="o.path" class="text-fg hover:text-accent">{{ o.title }}</NuxtLink>
              <time :datetime="o.date" class="eyebrow-date mt-1 block">{{
                formatDate(o.date)
              }}</time>
            </li>
          </ul>
        </section>
      </aside>
    </div>
  </div>
</template>
