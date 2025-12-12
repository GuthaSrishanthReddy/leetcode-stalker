import prisma from "../config/prisma.js";
import codeForcesDataFetcher from "../services/CodeForcesDataFetcher.js";

export async function listProfiles(req, res) {
  const userId = req.user.id;

  const profiles = await prisma.codeForcesProfile.findMany({
    where: { ownerId: userId },
  });

  res.json(profiles);
}

export async function addProfile(req, res) {
  const userId = req.user.id;
  const { username } = req.params;

  if (!username) {
    return res.status(400).json({ message: "username missing" });
  }

  const data = await codeForcesDataFetcher(username);
  if (!data) {
    return res.status(404).json({ message: "CodeForces user not found" });
  }
  try {
    const profile = await prisma.codeForcesProfile.create({
      data: {
        username: username,
        rank: data.rank ?? null,
        rating: data.rating ?? null,
        total: data.totalProblemsSolved,
        owner: { connect: { id: userId } },
        ownerId: userId,
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

export async function deleteProfile(req, res) {
  const userId = req.user.id;
  const { username } = req.params;
  await prisma.codeForcesProfile.deleteMany({
    where: { username: username, ownerId: userId },
  });
  return res.json({ message: "Profile deleted successfully" });
}

export async function refreshProfile(req, res) {
  const userId = req.user.id;
  const { username } = req.params;

  const data = await codeForcesDataFetcher(username);
  if (!data) {
    return res.status(404).json({ message: "CodeForces user not found" });
  }
  const updated = await prisma.codeForcesProfile.updateMany({
    where: { username: username, ownerId: userId },
    data: {
      username: username,
      rank: data.rank ?? null,
      rating: data.rating ?? null,
      total: data.totalProblemsSolved,
      owner: { connect: { id: userId } },
      ownerId: userId,
    },
  });
  return res.json(updated);
}
