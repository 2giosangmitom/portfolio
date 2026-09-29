export function readTime(body: { value?: unknown[] } | undefined) {
  let words = 0;
  const walk = (node: unknown): void => {
    if (typeof node === "string") words += node.split(/\s+/).filter(Boolean).length;
    else if (Array.isArray(node)) node.slice(2).forEach(walk);
  };
  body?.value?.forEach(walk);
  return Math.max(1, Math.round(words / 200));
}
