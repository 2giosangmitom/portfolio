import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: "blog/*.md",
      schema: z.object({
        date: z.string(),
        updated: z.string().optional(),
        tags: z.array(z.string()).optional(),
        cover: z.string().optional(),
        readingTime: z.number().optional(),
      }),
    }),
    projects: defineCollection({
      type: "page",
      source: "projects/*.md",
      schema: z.object({
        kind: z.enum(["product", "learning"]),
        repo: z.string().optional(),
        stack: z.array(z.string()),
        order: z.number(),
        url: z.string().optional(),
        logo: z.string().optional(),
        cover: z.string().optional(),
      }),
    }),
    experience: defineCollection({
      type: "page",
      source: "experience/*.md",
      schema: z.object({
        company: z.string(),
        role: z.string(),
        url: z.string().optional(),
        logo: z.string().optional(),
        start: z.string(),
        end: z.string().optional(),
      }),
    }),
  },
});
