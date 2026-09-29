type PullRequest = {
  html_url: string;
  title: string;
  repository_url: string;
  created_at: string;
  pull_request: { merged_at: string };
};

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { data } = await useGitHub().rest.search.issuesAndPullRequests({
    q: String(query.q || ""),
    sort: "created",
    order: "desc",
    per_page: Number(query.per_page) || 10,
  });

  return { items: data.items as PullRequest[] };
});
