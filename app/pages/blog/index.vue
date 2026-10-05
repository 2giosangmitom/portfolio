<script setup lang="ts">
const description = "Notes on backend, AI, and games I build for fun, written as I learn.";
useSeoMeta({
  title: "Blog · Vo Quang Chien",
  description,
  ogTitle: "Blog · Vo Quang Chien",
  ogDescription: description,
  ogType: "website",
});
useSchemaOrg([defineWebPage({ "@type": "CollectionPage", description })]);
const { data: posts } = await useAsyncData("posts", () =>
  queryCollection("blog")
    .order("date", "DESC")
    .select("path", "title", "description", "date", "readingTime")
    .all(),
);
</script>

<template>
  <div>
    <PageHeading
      title="Blog"
      description="Notes on backend, AI, and games I build for fun, written as I learn."
    />
    <ul v-if="posts?.length" class="flex max-w-[950px] flex-col gap-y-8">
      <li
        v-for="p in posts"
        :key="p.path"
        v-reveal
        class="[content-visibility:auto] [contain-intrinsic-size:auto_240px]"
      >
        <NuxtLink :to="p.path" class="surface-link group block p-5">
          <span class="max-w-lg">
            <span
              class="block font-display text-2xl font-semibold tracking-tight text-fg group-hover:text-accent"
              >{{ p.title }}</span
            >
            <span class="mt-3 block">{{ p.description }}</span>
            <span class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-fg-subtle">
              <span class="flex items-center gap-1.5"
                ><Icon name="ph:calendar-blank" class="size-3.5" aria-hidden="true" /><time
                  :datetime="p.date"
                  >{{ formatDate(p.date) }}</time
                ></span
              >
              <span class="flex items-center gap-1.5"
                ><Icon name="ph:clock" class="size-3.5" aria-hidden="true" />{{ p.readingTime }} min
                read</span
              >
            </span>
          </span>
        </NuxtLink>
      </li>
    </ul>
    <p v-else>No posts yet.</p>
  </div>
</template>
