import { Octokit } from "@octokit/rest";

export function github<T>(path: string, body?: unknown) {
  const token = useRuntimeConfig().githubToken;
  const octokit = new Octokit({
    auth: token || undefined,
    userAgent: "2giosangmitom.github.io",
  });

  return octokit
    .request(`${body ? "POST" : "GET"} ${path}`, body as Record<string, unknown> | undefined)
    .then(({ data }) => data as T);
}
