<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();
const notFound = computed(() => props.error.statusCode === 404);
useHead({ title: notFound.value ? "Page not found · Vo Quang Chien" : "Error · Vo Quang Chien" });
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <AppHeader />
    <main id="main" class="container-page flex-1">
      <div class="grid items-center gap-12 py-12 md:grid-cols-[minmax(0,1fr)_auto]">
        <div>
          <p class="eyebrow-date">Error {{ error.statusCode }}</p>
          <h1 class="mt-4 text-4xl sm:text-5xl">
            {{ notFound ? "This page doesn't exist." : "Something broke." }}
          </h1>
          <p class="mt-6 max-w-[55ch] text-lg leading-relaxed">
            {{ notFound ? "The link may be old, or the post was removed." : error.message }}
          </p>
          <p class="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            <UiButton @click="clearError({ redirect: '/' })"> Go home </UiButton>
            <UiButton @click="clearError({ redirect: '/blog' })"> Read the blog </UiButton>
          </p>
        </div>
        <AppLogo class="hidden size-48 opacity-40 md:block" />
      </div>
    </main>
    <AppFooter />
  </div>
</template>
