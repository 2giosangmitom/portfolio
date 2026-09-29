import { queryCollection } from "@nuxt/content/server";

export default defineCachedEventHandler(
  async (event) => {
    const octokit = useGitHub();
    const projects = await queryCollection(event, "projects").select("repo").all();
    const entries = await Promise.all(
      projects.flatMap((p) => {
        const fullName = p.repo;
        if (!fullName) return [];
        return [
          (async () => {
            try {
              const [owner, repo] = fullName.split("/");
              if (!owner || !repo) return null;
              const { data } = await octokit.rest.repos.get({ owner, repo });
              if (data.private) return null;
              return [
                fullName,
                { stars: data.stargazers_count, homepage: data.homepage || undefined },
              ] as const;
            } catch {
              return null;
            }
          })(),
        ];
      }),
    );
    return Object.fromEntries(entries.filter((e) => e !== null));
  },
  { maxAge: 60 * 60 },
);
