<script setup lang="ts">
useHead({ title: "Projects · Vo Quang Chien" });
const { data: projects } = await useAsyncData("projects", () => queryCollection("projects").order("order", "ASC").select("path", "title", "description", "cover", "repo", "stack", "kind").all());
const { data: repos } = await useRepos();
const kinds = { product: "Product", learning: "Learning project" };
</script>

<template>
  <div>
    <PageHeading
      title="Projects"
      description="Products I have shipped and projects I build to learn. Open source ones link to their code on GitHub."
    />
    <ul class="grid grid-cols-1 gap-5 md:grid-cols-2">
      <li v-for="(p, i) in projects" :key="p.path" v-reveal="rise(0.06 * i)">
        <NuxtLink :to="p.path" class="surface-link group flex h-full flex-col overflow-hidden">
          <span class="block aspect-[1200/630] overflow-hidden border-b border-line">
            <ImageSlot :src="p.cover" :alt="`${p.title} screenshot`" :hint="`projects${p.path.slice(9)}/cover.png, 1200x630`" sizes="sm:100vw md:50vw xl:50vw" />
          </span>
          <span class="flex flex-1 flex-col p-5">
            <span class="flex items-baseline justify-between gap-4">
              <span class="font-display text-2xl font-semibold tracking-tight text-fg group-hover:text-accent">{{ p.title }}</span>
              <span v-if="p.repo && repos?.[p.repo]?.stars" class="flex shrink-0 items-center gap-1 font-mono text-sm text-fg-subtle tabular-nums">
                <Icon name="ph:star" class="size-3.5" aria-hidden="true" />{{ repos[p.repo]!.stars }}
              </span>
            </span>
            <span class="mt-2 block">{{ p.description }}</span>
            <span class="mt-auto flex flex-wrap items-center gap-2 pt-5 text-xs">
              <span class="rounded-md border border-line px-2 py-0.5 text-fg">{{ kinds[p.kind] }}</span>
              <span v-if="!p.repo" class="flex items-center gap-1 rounded-md border border-line px-2 py-0.5"><Icon name="ph:lock-simple" class="size-3" aria-hidden="true" />Closed source</span>
              <span class="font-mono text-fg-subtle">{{ p.stack.join(", ") }}</span>
            </span>
          </span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
