import axios from "axios";

const CODEFORCES_API = "https://codeforces.com/api";


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

    const submissionsRes = await axios.get(
      `${CODEFORCES_API}/user.status?handle=${handle}`
    );

    if (submissionsRes.data.status !== "OK") return null;

    const submissions = submissionsRes.data.result;

    const solvedSet = new Set();
    let easy = 0,
      medium = 0,
      hard = 0;

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
    };
  } catch (err) {
    return null;
  }
}
