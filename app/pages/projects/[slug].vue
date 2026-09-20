<script setup lang="ts">
const route = useRoute();
const path = route.path.replace(/\/$/, "");
const { data: project } = await useAsyncData(path, () => queryCollection("projects").path(path).first());
if (!project.value) throw createError({ statusCode: 404, statusMessage: "Project not found", fatal: true });
useSeoMeta({
  title: `${project.value.title} · Projects`,
  description: project.value.description,
  ogTitle: project.value.title,
  ogDescription: project.value.description,
});
const { data: repos } = await useRepos();
const stats = computed(() => (project.value?.repo ? repos.value?.[project.value.repo] : undefined));
const live = computed(() => project.value?.url ?? stats.value?.homepage);
</script>

<template>
  <article v-if="project" v-reveal class="mx-auto max-w-3xl">
    <nav aria-label="Breadcrumb" class="mb-8 flex items-center gap-2 text-sm text-fg-subtle">
      <NuxtLink to="/projects" class="border-b border-line hover:text-fg">cd ..</NuxtLink>
      <Icon name="ph:caret-right" class="size-3.5" aria-hidden="true" />
      <span class="truncate">{{ project.title }}</span>
    </nav>
    <div class="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div class="flex items-center gap-4">
        <span class="block size-14 shrink-0 overflow-hidden rounded-lg border border-line">
          <ImageSlot :src="project.logo" :alt="`${project.title} logo`" :hint="`projects${path.slice(9)}/logo.png`" sizes="56px" />
        </span>
        <h1 class="text-4xl sm:text-5xl">{{ project.title }}</h1>
      </div>
      <div class="flex items-center gap-2">
        <a v-if="live" :href="live" class="surface-link flex items-center gap-2 px-4 py-2 text-fg">
          <Icon name="ph:arrow-square-out" class="size-4" aria-hidden="true" />Live
        </a>
        <a v-if="project.repo" :href="`https://github.com/${project.repo}`" class="surface-link flex items-center gap-2 px-4 py-2 text-fg">
          <Icon name="simple-icons:github" class="size-4" aria-hidden="true" />GitHub
          <span v-if="stats?.stars" class="flex items-center gap-1 font-mono text-xs text-fg-subtle tabular-nums"><Icon name="ph:star" class="size-3" aria-hidden="true" />{{ stats.stars }}</span>
        </a>
        <span v-else class="flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm"><Icon name="ph:lock-simple" class="size-4" aria-hidden="true" />Closed source</span>
      </div>
    </div>
    <p class="text-lg">{{ project.description }}</p>
    <p class="eyebrow-date mt-3">{{ project.stack.join(", ") }}</p>
    <div class="mt-8 aspect-[1200/630] overflow-hidden rounded-xl border border-line">
      <ImageSlot :src="project.cover" :alt="`${project.title} screenshot`" :hint="`projects${path.slice(9)}/cover.png, 1200x630`" loading="eager" sizes="sm:100vw md:768px" />
    </div>
    <ContentRenderer :value="project" class="mt-10 text-[1.0625rem]" />
  </article>
</template>
