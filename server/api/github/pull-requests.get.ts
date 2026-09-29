type PullRequest = {
  html_url: string;
  title: string;
  repository_url: string;
  created_at: string;
  pull_request: { merged_at: string };
};

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const params = new URLSearchParams({
    q: String(query.q || ""),
    sort: "created",
    order: "desc",
    per_page: String(query.per_page || 10),
  });

  return github<{ items: PullRequest[] }>(`/search/issues?${params}`);
});
