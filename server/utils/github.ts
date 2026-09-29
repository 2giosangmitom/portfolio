import { Octokit } from "@octokit/rest";

// Backend-only Octokit client. Token stays server-side via private runtimeConfig.
export function useGitHub() {
  const token = useRuntimeConfig().githubToken;
  return new Octokit({
    auth: token || undefined,
    userAgent: "2giosangmitom.github.io",
  });
}
