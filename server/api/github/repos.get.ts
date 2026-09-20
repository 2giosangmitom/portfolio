import { queryCollection } from "@nuxt/content/server";

type Repo = { private: boolean; stargazers_count: number; homepage: string | null };

export default defineCachedEventHandler(
  async (event) => {
    const projects = await queryCollection(event, "projects").select("repo").all();
    const entries = await Promise.all(
      projects.flatMap((p) =>
        p.repo ? [github<Repo>(`/repos/${p.repo}`).then((r) => (r.private ? null : [p.repo, { stars: r.stargazers_count, homepage: r.homepage || undefined }] as const), () => null)] : [],
      ),
    );
    return Object.fromEntries(entries.filter((e) => e !== null));
  },
  { maxAge: 60 * 60 },
);
