import axios from "axios";

const CODEFORCES_API = "https://codeforces.com/api";

async function getUserSolvedProblemsWithTags(handle) {
  const submissionsRes = await axios.get(
    `${CODEFORCES_API}/user.status?handle=${handle}`
  );

  if (submissionsRes.data.status !== "OK") return {};

  const submissions = submissionsRes.data.result;

  const result = {};
  const seen = new Set();

  submissions.forEach((sub) => {
    if (sub.verdict === "OK") {
      const key = `${sub.problem.contestId}-${sub.problem.index}`;

      if (!seen.has(key)) {
        seen.add(key);

        result[sub.problem.name] = sub.problem.tags;
      }
    }
  });

  return result;
}

export default async function CodeforcesDataFetcher(handle) {
  try {
    const userInfoRes = await axios.get(
      `${CODEFORCES_API}/user.info?handles=${handle}`
    );

    if (userInfoRes.data.status !== "OK") return null;

    const user = userInfoRes.data.result[0];
    const rating = user.rating || null;
    const rank = user.rank || null;
    const maxRating = user.maxRating || null;

    const submissionsCountsRes = await axios.get(
      `${CODEFORCES_API}/user.status?handle=${handle}`
    );

    if (submissionsCountsRes.data.status !== "OK") return null;

    const submissions = submissionsCountsRes.data.result;

    const solvedSet = new Set();

    submissions.forEach((sub) => {
      if (sub.verdict === "OK") {
        const key = `${sub.problem.contestId}-${sub.problem.index}`;

        if (!solvedSet.has(key)) {
          solvedSet.add(key);
        }
      }
    });

    const total = solvedSet.size;

    return {
      total,
      rating,
      rank,
      maxRating,
      problems_with_tags: await getUserSolvedProblemsWithTags(handle),
    };
  } catch (err) {
    return null;
  }
}
