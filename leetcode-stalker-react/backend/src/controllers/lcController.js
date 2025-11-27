import prisma from "../config/prisma.js";
import LeetCodeDataFetcher from "../services/LeetCodeDataFetcher.js";

// --- LIST PROFILES ---
export async function listProfiles(req, res) {
  const userID = req.user.id;

  const profiles = await prisma.leetCodeProfile.findMany({
    where: { ownerId: userID },
  });

  res.json(profiles);
}

// --- ADD PROFILE ---
export async function addProfile(req, res) {
  const userID = req.user.id;
  const { username } = req.params; // ✔ FIXED

  if (!username) {
    return res.status(400).json({ message: "Username missing" });
  }

  const data = await LeetCodeDataFetcher(username);
  if (!data) {
    return res.status(404).json({ message: "LeetCode user not found" });
  }

  try {
    const profile = await prisma.leetCodeProfile.create({
      data: {
        username,
        easy: data.easy,
        medium: data.medium,
        hard: data.hard,
        total: data.total,
        rating: data.rating,
        topPercentage: data.topPercentage,
        owner: { connect: { id: userID } },
      },
    });

    return res.status(201).json(profile);
  } catch (e) {
    if (e.code === "P2002") {
      return res.status(400).json({ message: "Profile already exists" });
    }
    return res.status(500).json({ message: "Server error" });
  }
}

// --- DELETE PROFILE ---
export async function deleteProfile(req, res) {
  const userID = req.user.id;
  const { username } = req.params;

  await prisma.leetCodeProfile.deleteMany({
  where: { username, ownerId: userID },
});
  return res.json({ message: "Profile deleted successfully" });
}

// --- REFRESH PROFILE ---
export async function refreshProfile(req, res) {
  const userID = req.user.id;
  const { username } = req.params;

  const data = await LeetCodeDataFetcher(username);
  if (!data) {
    return res.status(404).json({ message: "LeetCode user not found" });
  }

  const updated = await prisma.leetCodeProfile.updateMany({
    where: { username, ownerId: userID },
    data: {
      easy: data.easy,
      medium: data.medium,
      hard: data.hard,
      total: data.total,
      rating: data.rating,
      topPercentage: data.topPercentage,
    },
  });

  return res.json(updated);
}
