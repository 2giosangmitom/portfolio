<script setup lang="ts">
import { profile } from "~/data";

const { data: posts } = await useAsyncData("home-posts", () =>
  queryCollection("blog")
    .order("date", "DESC")
    .limit(3)
    .select("path", "title", "description", "date")
    .all(),
);
</script>

<template>
  <div>
    <section
      class="mb-24 flex flex-col items-start justify-between gap-12 xl:flex-row xl:items-center"
    >
      <div class="max-w-2xl">
        <h1 v-reveal class="mb-6 text-4xl leading-tight sm:text-5xl sm:leading-[1.15]">
          {{ profile.headline }}
        </h1>
        <p v-reveal="rise(0.08)" class="text-lg leading-relaxed">{{ profile.summary }}</p>
        <SocialLinks v-reveal="rise(0.16)" class="mt-10" />
      </div>
      <HeroArt v-reveal="rise(0.1)" class="self-center" />
    </section>

    <section v-reveal aria-labelledby="graph" class="mb-32">
      <h2 id="graph" class="mb-8 text-3xl font-bold sm:text-4xl">Contribution graph</h2>
      <ContributionGraph />
    </section>

    <section v-reveal aria-labelledby="work" class="mb-32">
      <h2 id="work" class="mb-12 text-3xl font-bold sm:text-4xl">Work experience</h2>
      <ExperienceList />
    </section>

    <section v-if="posts?.length" v-reveal aria-labelledby="writing">
      <div class="mb-8 flex items-baseline justify-between gap-4">
        <h2 id="writing" class="text-3xl font-bold sm:text-4xl">Latest writing</h2>
        <NuxtLink to="/blog" class="link whitespace-nowrap text-sm">All posts</NuxtLink>
      </div>
      <ul class="divide-y divide-line border-y border-line">
        <li v-for="p in posts" :key="p.path">
          <NuxtLink
            :to="p.path"
            class="group grid gap-1 py-5 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:items-baseline sm:gap-8"
          >
            <span class="min-w-0">
              <span
                class="block font-display text-xl font-semibold tracking-tight text-fg group-hover:text-accent"
                >{{ p.title }}</span
              >
              <span class="mt-1 block max-w-[65ch] text-pretty">{{ p.description }}</span>
            </span>
            <time :datetime="p.date" class="eyebrow-date sm:order-first">{{
              formatDate(p.date)
            }}</time>
          </NuxtLink>
        </li>
      </ul>
    </section>
  </div>
</template>
