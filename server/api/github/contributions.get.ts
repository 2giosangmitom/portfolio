import { profile } from "../../../app/data";

type Day = { date: string; contributionCount: number; contributionLevel: string };
type Calendar = {
  contributionCalendar: { totalContributions: number; weeks: { contributionDays: Day[] }[] };
};
const LEVELS = ["NONE", "FIRST_QUARTILE", "SECOND_QUARTILE", "THIRD_QUARTILE", "FOURTH_QUARTILE"];

const getContributions = defineCachedFunction(
  async () => {
    const octokit = useGitHub();

    const yearsData = await octokit.graphql<{
      user: { contributionsCollection: { contributionYears: number[] } };
    }>(
      `query($login: String!) { user(login: $login) { contributionsCollection { contributionYears } } }`,
      { login: profile.handle },
    );
    const years = yearsData.user.contributionsCollection.contributionYears.slice(0, 5);
    const fields = years.map(
      (y) =>
        `y${y}: contributionsCollection(from: "${y}-01-01T00:00:00Z", to: "${y}-12-31T23:59:59Z") { contributionCalendar { totalContributions weeks { contributionDays { date contributionCount contributionLevel } } } }`,
    );
    const { user } = await octokit.graphql<{
      user: Record<string, Calendar>;
    }>(`query($login: String!) { user(login: $login) { ${fields.join(" ")} } }`, {
      login: profile.handle,
    });

    const total: Record<number, number> = {};
    const days: [date: string, count: number, level: number][] = [];
    for (const y of years) {
      const cal = user[`y${y}`]!.contributionCalendar;
      total[y] = cal.totalContributions;
      for (const w of cal.weeks)
        for (const d of w.contributionDays)
          days.push([d.date, d.contributionCount, LEVELS.indexOf(d.contributionLevel)]);
    }
    return { years, total, days: days.sort((a, b) => a[0].localeCompare(b[0])) };
  },
  { name: "github-contributions", maxAge: 60 * 60 },
);

export default defineEventHandler(() => {
  if (!useRuntimeConfig().githubToken) {
    console.warn("[github] GITHUB_TOKEN is unset; the contribution graph is hidden.");
    return {
      years: [] as number[],
      total: {} as Record<number, number>,
      days: [] as [date: string, count: number, level: number][],
    };
  }
  return getContributions();
});
