import tailwindcss from "@tailwindcss/vite";
import { readTime } from "./app/utils/readTime.ts";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/a11y", "@nuxt/content", "@nuxt/eslint", "@nuxt/fonts", "@nuxt/hints", "@nuxt/icon", "@nuxt/image", "@nuxtjs/color-mode", "motion-v/nuxt"],
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      title: "Vo Quang Chien",
      meta: [
        {
          name: "description",
          content: "Vo Quang Chien, student developer at Hue University of Sciences. Backend, microservices, and applied AI.",
        },
        { property: "og:site_name", content: "Vo Quang Chien" },
        { property: "og:type", content: "website" },
        { property: "og:title", content: "Vo Quang Chien" },
        { property: "og:description", content: "Vo Quang Chien, student developer at Hue University of Sciences. Backend, microservices, and applied AI." },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      ],
      noscript: [{ innerHTML: '<style>[style*="opacity"]{opacity:1!important;transform:none!important}</style>' }],
    },
  },
  motionV: {
    presets: {
      reveal: {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        inViewOptions: { once: true, margin: "0px 0px -5% 0px" },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      },
    },
  },
  colorMode: { storageKey: "theme" },
  hooks: {
    "content:file:afterParse"({ content, collection }) {
      if (collection.name === "blog") content.readingTime = readTime(content.body as { value?: unknown[] });
    },
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: { default: "github-light-high-contrast", dark: "github-dark-high-contrast" },
          langs: ["js", "ts", "json", "vue", "css", "html", "bash", "sh", "md", "yaml", "lua", "rust", "python", "sql"],
        },
      },
    },
  },
  image: { quality: 80 },
  mdc: { components: { map: { style: "ContentStyle" } } },
  fonts: {
    defaults: { styles: ["normal"], subsets: ["latin"] },
    families: [
      { name: "Inter", weights: ["400 600"], preload: true },
      { name: "Tomorrow", weights: [400, 500, 600, 700], preload: true },
      { name: "Geist Mono", weights: [400] },
    ],
  },
  runtimeConfig: { githubToken: "" },
  icon: { serverBundle: { collections: ["ph", "simple-icons"] } },
  vite: {
    plugins: [tailwindcss()],
  },
});
