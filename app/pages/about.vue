<script setup lang="ts">
import { profile, usage } from "~/data";

useHead({ title: "About · Vo Quang Chien" });

type PR = { html_url: string; title: string; repository_url: string; created_at: string; pull_request: { merged_at: string } };
const PAGE = 10;
const prs = ref<PR[]>([]);
const loading = ref(true);
const failed = ref(false);
const done = ref(false);
const searchUrl = `https://github.com/search?q=${encodeURIComponent(`author:${profile.handle} is:pr is:merged is:public -user:${profile.handle}`)}&type=pullrequests`;

async function loadMore() {
  loading.value = true;
  failed.value = false;
  const cursor = prs.value.at(-1)?.created_at;
  const q = `author:${profile.handle} is:pr is:merged is:public -user:${profile.handle}${cursor ? ` created:<${cursor}` : ""}`;
  try {
    const r = await $fetch<{ items: PR[] }>("https://api.github.com/search/issues", { query: { q, sort: "created", order: "desc", per_page: PAGE } });
    prs.value.push(...r.items);
    done.value = r.items.length < PAGE;
  } catch {
    failed.value = true;
  } finally {
    loading.value = false;
  }
}
onMounted(loadMore);
</script>

<template>
  <div>
    <section class="grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <div class="order-2 lg:order-none">
        <h1 v-reveal class="mb-8 text-4xl leading-tight sm:text-5xl sm:leading-[1.15]">
          I'm Chien, a student developer building backend systems and AI features for the web.
        </h1>
        <div v-reveal="rise(0.08)" class="space-y-4 text-lg leading-relaxed">
          <p>
            I study at {{ profile.school }} in Viet Nam. Most of my work happens on the server: I design APIs, split
            systems into services that deploy and scale on their own, and connect language models to real product features.
          </p>
          <p>
            As an intern at DIMORI, I build backend services for Web3 and AI products, including a DeFi platform, an
            e-learning app with on-chain payments on Polkadot, and an AI support agent for Facebook, Zalo, and the web.
          </p>
          <p>
            I write code in Neovim on Arch Linux, and when a tool I depend on is missing something, I contribute the fix
            upstream. In my free time, I am learning game development.
          </p>
        </div>
      </div>

      <aside v-reveal="rise(0.12)" class="lg:justify-self-end">
        <div class="lg:sticky lg:top-10">
          <div class="mb-4 aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-line">
            <ImageSlot :src="profile.photo" :alt="`Photo of ${profile.name}`" hint="me.jpg · square, 800×800" loading="eager" sizes="sm:100vw md:384px" />
          </div>
          <SocialLinks />
        </div>
      </aside>
    </section>

    <section v-reveal aria-labelledby="usage" class="mt-32 max-w-3xl">
      <h2 id="usage" class="mb-4 text-3xl font-bold sm:text-4xl">Tech stack</h2>
      <p class="mb-8">What I use to design, build, and ship: TypeScript most days, Python for AI work, and Rust when speed matters.</p>
      <dl class="grid gap-6 sm:grid-cols-2">
        <div v-for="u in usage" :key="u.group">
          <dt class="font-display font-semibold text-fg">{{ u.group }}</dt>
          <dd class="mt-2 flex flex-wrap gap-2">
            <span v-for="i in u.items" :key="i.name" class="flex items-center gap-1.5 rounded-md border border-line bg-surface/60 px-2 py-1 text-sm">
              <Icon :name="i.icon" class="size-3.5" :class="i.color" aria-hidden="true" />{{ i.name }}
            </span>
          </dd>
        </div>
      </dl>
    </section>

    <section v-reveal aria-labelledby="upstream" class="mt-32 max-w-3xl">
      <h2 id="upstream" class="mb-4 text-3xl font-bold sm:text-4xl">Open source contributions</h2>
      <p class="mb-8">Merged pull requests to public projects I use and care about.</p>
      <ul v-if="prs.length" class="divide-y divide-line border-y border-line">
        <li v-for="c in prs" :key="c.html_url">
          <a :href="c.html_url" class="group flex items-baseline justify-between gap-6 py-4">
            <span class="min-w-0">
              <span class="block font-mono text-xs text-fg-subtle">{{ c.repository_url.split("/repos/")[1] }}</span>
              <span class="text-fg group-hover:text-accent">{{ c.title }}</span>
            </span>
            <span class="eyebrow-date shrink-0">{{ formatMonth(c.pull_request.merged_at) }}</span>
          </a>
        </li>
      </ul>
      <p class="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm" aria-live="polite">
        <span v-if="loading" class="flex items-center gap-2 text-fg-subtle"><LoadingDiamond class="size-4 text-accent" aria-hidden="true" />Loading pull requests…</span>
        <span v-else-if="failed" class="text-fg-subtle">Couldn't reach GitHub right now.</span>
        <button v-if="!loading && (failed || !done)" type="button" class="link" @click="loadMore">{{ failed ? "Try again" : "Load more" }}</button>
        <a :href="searchUrl" class="link">View all on GitHub</a>
      </p>
    </section>
  </div>
</template>
