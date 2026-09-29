import tailwindcss from "@tailwindcss/vite";
import { readTime } from "./app/utils/readTime.ts";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    githubToken: "",
  },
  modules: [
    "@nuxt/a11y",
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/hints",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/color-mode",
    "@nuxtjs/seo",
    "motion-v/nuxt",
  ],
  site: {
    url: "https://2giosangmitom.github.io",
    name: "Vo Quang Chien",
    description:
      "Vo Quang Chien, student developer at Hue University of Sciences, focused on backend, embedded systems, and AI.",
    defaultLocale: "en",
  },
  // Social previews use the generated, static cover assets.
  ogImage: { enabled: false },
  schemaOrg: {
    identity: { type: "Person", name: "Vo Quang Chien", image: "/images/2giosangmitom.png" },
  },
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      title: "Vo Quang Chien",
      link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
      noscript: [
        {
          innerHTML:
            '<style>[style*="opacity"]{opacity:1!important;transform:none!important}</style>',
        },
      ],
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
      if (collection.name === "blog")
        content.readingTime = readTime(content.body as { value?: unknown[] });
    },
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: { default: "github-light-high-contrast", dark: "github-dark-high-contrast" },
          langs: ["javascript", "typescript", "vue", "lua", "rust", "python", "sql"],
        },
      },
    },
  },
  image: { quality: 80, format: ["webp"] },
  // This state appears only after a click, so static hosting must bundle it for the client.
  icon: { clientBundle: { icons: ["ph:check"] } },
  fonts: {
    families: [
      { name: "Tomorrow", weights: [500, 600] },
      { name: "Public Sans", weights: [400, 500, 600, 700] },
      { name: "Geist Mono", weights: [400, 500] },
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
