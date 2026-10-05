<script setup lang="ts">
const links = [
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" },
];
const route = useRoute();
const open = ref(false);
const panel = ref<HTMLElement | null>(null);

function onKey(e: KeyboardEvent) {
  if (e.key === "Escape") open.value = false;
}
watch(
  () => route.path,
  () => {
    open.value = false;
  },
);
watch(open, (v) => {
  document.body.style.overflow = v ? "hidden" : "";
  if (v) {
    window.addEventListener("keydown", onKey);
    nextTick(() => panel.value?.focus());
  } else {
    window.removeEventListener("keydown", onKey);
  }
});
onUnmounted(() => {
  document.body.style.overflow = "";
  window.removeEventListener("keydown", onKey);
});
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
              class="text-base font-medium text-fg-muted hover:text-fg"
              active-class="!text-accent"
              >{{ l.label }}</NuxtLink
            >
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-2">
        <ThemeToggle />
        <UiButton
          icon-only
          class="md:hidden"
          aria-label="Open menu"
          :aria-expanded="open"
          aria-controls="mobile-menu"
          @click="open = true"
        >
          <Icon name="ph:list" class="block size-4" aria-hidden="true" />
        </UiButton>
      </div>
    </div>
  </header>

  <Teleport to="body">
    <Transition name="menu">
      <div v-if="open" class="fixed inset-0 z-40 md:hidden">
        <div class="menu-overlay absolute inset-0 bg-black/50" @click="open = false" />
        <aside
          id="mobile-menu"
          ref="panel"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          tabindex="-1"
          class="menu-panel absolute top-0 right-0 flex h-full w-72 max-w-[80vw] flex-col border-l border-line bg-canvas p-4 outline-none"
        >
          <div class="flex items-center justify-between">
            <span class="font-display text-lg font-semibold text-fg">Menu</span>
            <UiButton icon-only aria-label="Close menu" @click="open = false">
              <Icon name="ph:x" class="block size-4" aria-hidden="true" />
            </UiButton>
          </div>
          <nav aria-label="Mobile" class="mt-4">
            <ul class="space-y-1">
              <li v-for="l in links" :key="l.to">
                <NuxtLink
                  :to="l.to"
                  class="block rounded-md px-3 py-3 font-medium text-fg hover:bg-surface-strong"
                  active-class="!text-accent"
                  >{{ l.label }}</NuxtLink
                >
              </li>
            </ul>
          </nav>
          <div class="mt-auto border-t border-line pt-4">
            <SocialLinks />
          </div>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.menu-enter-active .menu-overlay,
.menu-leave-active .menu-overlay {
  transition: opacity 0.2s ease;
}
.menu-enter-active .menu-panel,
.menu-leave-active .menu-panel {
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}
.menu-enter-from .menu-overlay,
.menu-leave-to .menu-overlay {
  opacity: 0;
}
.menu-enter-from .menu-panel,
.menu-leave-to .menu-panel {
  transform: translateX(100%);
}
@media (prefers-reduced-motion: reduce) {
  .menu-enter-active .menu-overlay,
  .menu-leave-active .menu-overlay,
  .menu-enter-active .menu-panel,
  .menu-leave-active .menu-panel {
    transition: none;
  }
}
</style>
