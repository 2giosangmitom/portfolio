<script setup lang="ts">
const route = useRoute();
const path = route.path.replace(/\/$/, "");
const { data: project } = await useAsyncData(path, () =>
  queryCollection("projects").path(path).first(),
);
if (!project.value)
  throw createError({ statusCode: 404, statusMessage: "Project not found", fatal: true });
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
    <PageBreadcrumb to="/projects" parent="Projects" :current="project.title" />
    <div class="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div class="flex min-w-0 items-center gap-4">
        <span
          v-if="project.logo"
          class="block size-14 shrink-0 overflow-hidden rounded-lg border border-line"
        >
          <ImageSlot
            :src="project.logo"
            :alt="`${project.title} logo`"
            :hint="`projects${path.slice(9)}/logo.png`"
            sizes="56px"
            fit="cover"
          />
        </span>
        <h1 class="min-w-0 text-3xl sm:text-5xl">{{ project.title }}</h1>
      </div>
      <div class="flex items-center gap-2">
        <UiButton v-if="live" :to="live">
          <Icon name="ph:arrow-square-out" class="size-4" aria-hidden="true" />Live
        </UiButton>
        <UiButton v-if="project.repo" :to="`https://github.com/${project.repo}`">
          <Icon name="simple-icons:github" class="size-4" aria-hidden="true" />GitHub
          <span
            v-if="stats?.stars"
            class="flex items-center gap-1 font-mono text-xs text-fg-subtle tabular-nums"
            ><Icon name="ph:star" class="size-3" aria-hidden="true" />{{ stats.stars }}</span
          >
        </UiButton>
        <UiBadge v-else
          ><Icon name="ph:lock-simple" class="size-4" aria-hidden="true" />Closed source</UiBadge
        >
      </div>
    </div>
    <p class="text-lg">{{ project.description }}</p>
    <p class="eyebrow-date mt-3">{{ project.stack.join(", ") }}</p>
    <ContentRenderer :value="project" class="mt-10 text-[1.0625rem]" />
  </article>
</template>
