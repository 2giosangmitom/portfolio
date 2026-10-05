<script setup lang="ts">
import { profile, socials } from "~/data";

const { data: posts } = await useAsyncData("home-posts", () =>
  queryCollection("blog")
    .order("date", "DESC")
    .limit(3)
    .select("path", "title", "description", "date")
    .all(),
);
const email = socials.find((s) => s.name === "Email")?.url;
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
        <div v-reveal="rise(0.12)" class="mt-8 flex flex-wrap gap-3">
          <UiButton to="/projects" variant="primary">View projects</UiButton>
          <UiButton to="/blog">Read the blog</UiButton>
        </div>
        <SocialLinks v-reveal="rise(0.16)" class="mt-10" />
      </div>
      <HeroArt v-reveal="rise(0.1)" class="self-center" />
    </section>

    <section v-reveal aria-labelledby="activity" class="mb-32">
      <SectionHeading id="activity">GitHub activity</SectionHeading>
      <ContributionGraph />
    </section>

    <section v-if="posts?.length" v-reveal aria-labelledby="writing" class="mb-32">
      <SectionHeading id="writing">
        Writing
        <template #action
          ><NuxtLink to="/blog" class="link whitespace-nowrap text-sm"
            >All posts</NuxtLink
          ></template
        >
      </SectionHeading>
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

    <section v-reveal aria-labelledby="contact" class="mb-8 max-w-2xl">
      <SectionHeading id="contact">Get in touch</SectionHeading>
      <p class="mb-8 text-lg leading-relaxed">
        Have something to build, or want to talk backend and AI? My inbox is open.
      </p>
      <div class="flex flex-wrap gap-3">
        <UiButton v-if="email" :to="email" variant="primary">Email me</UiButton>
        <UiButton to="/about">More about me</UiButton>
      </div>
    </section>
  </div>
</template>
