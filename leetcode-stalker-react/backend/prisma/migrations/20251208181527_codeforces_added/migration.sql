-- CreateTable
CREATE TABLE "CodeForcesProfile" (
    "id" SERIAL NOT NULL,
    "handle" TEXT NOT NULL,
    "total" INTEGER NOT NULL DEFAULT 0,
    "rating" INTEGER,
    "rank" TEXT,
    "maxRating" INTEGER,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "CodeForcesProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CodeForcesTagStats" (
    "id" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,
    "solvedCount" INTEGER NOT NULL DEFAULT 0,
    "profileId" INTEGER NOT NULL,

    CONSTRAINT "CodeForcesTagStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CodeForcesProfile_ownerId_idx" ON "CodeForcesProfile"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "CodeForcesProfile_ownerId_handle_key" ON "CodeForcesProfile"("ownerId", "handle");

-- CreateIndex
CREATE INDEX "CodeForcesTagStats_profileId_idx" ON "CodeForcesTagStats"("profileId");

-- AddForeignKey
ALTER TABLE "CodeForcesProfile" ADD CONSTRAINT "CodeForcesProfile_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodeForcesTagStats" ADD CONSTRAINT "CodeForcesTagStats_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "CodeForcesProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
