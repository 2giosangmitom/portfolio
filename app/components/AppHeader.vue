<script setup lang="ts">
const links = [
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" },
];
const route = useRoute();
const menu = ref<HTMLDetailsElement>();
watch(
  () => route.path,
  () => menu.value?.removeAttribute("open"),
);
</script>

<template>
  <header class="mb-12 border-b border-line py-5 md:mb-24">
    <div class="container-page flex items-center justify-between gap-4">
      <NuxtLink to="/" class="-m-1 p-1 hover:opacity-80" aria-label="Vo Quang Chien, home">
        <AppLogo class="size-8" />
      </NuxtLink>

      <nav aria-label="Main" class="hidden md:block">
        <ul class="flex items-center gap-x-8">
          <li v-for="l in links" :key="l.to">
            <NuxtLink
              :to="l.to"
              class="font-display text-base text-fg-muted hover:text-fg"
              active-class="!text-accent"
              >{{ l.label }}</NuxtLink
            >
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-2">
        <ThemeToggle />
        <details ref="menu" class="group relative md:hidden">
          <summary
            class="ui-control ui-control--secondary size-9 list-none p-0 [&::-webkit-details-marker]:hidden"
            aria-label="Menu"
          >
            <span class="group-open:hidden"
              ><Icon name="ph:list" class="block size-4" aria-hidden="true"
            /></span>
            <span class="hidden group-open:block"
              ><Icon name="ph:x" class="block size-4" aria-hidden="true"
            /></span>
          </summary>
          <nav
            aria-label="Mobile"
            class="surface absolute right-0 z-30 mt-2 w-48 bg-canvas p-2 shadow-lg"
          >
            <NuxtLink
              v-for="l in links"
              :key="l.to"
              :to="l.to"
              class="block rounded-md px-3 py-2 font-display text-fg hover:bg-surface-strong"
              active-class="!text-accent"
            >
              {{ l.label }}
            </NuxtLink>
          </nav>
        </details>
      </div>
    </div>
  </header>
</template>
