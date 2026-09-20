export const formatMonth = (d: string) =>
  new Date(d.length === 7 ? `${d}-01` : d).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

export const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
