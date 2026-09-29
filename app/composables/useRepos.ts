export const useRepos = () => useFetch("/api/github/repos", { key: "repos" });
