<template>
  <MotionConfig reduced-motion="user">
    <div class="flex min-h-dvh flex-col">
      <NuxtRouteAnnouncer />
      <a
        href="#main"
        class="sr-only z-50 rounded-md bg-accent px-4 py-2 text-canvas focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <AppHeader />
      <main id="main" class="container-page flex-1">
        <NuxtPage />
      </main>
      <AppFooter />
    </div>
  </MotionConfig>
</template>
