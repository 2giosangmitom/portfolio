export function github<T>(path: string, body?: unknown) {
  const token = useRuntimeConfig().githubToken;
  return $fetch<T>(`https://api.github.com${path}`, {
    method: body ? "POST" : "GET",
    body: body as Record<string, unknown> | undefined,
    headers: { "User-Agent": "2giosangmitom.github.io", ...(token && { Authorization: `Bearer ${token}` }) },
  });
}
