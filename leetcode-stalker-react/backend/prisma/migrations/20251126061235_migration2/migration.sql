-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeetCodeProfile" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "easy" INTEGER NOT NULL DEFAULT 0,
    "medium" INTEGER NOT NULL DEFAULT 0,
    "hard" INTEGER NOT NULL DEFAULT 0,
    "total" INTEGER NOT NULL DEFAULT 0,
    "rating" INTEGER,
    "topPercentage" DOUBLE PRECISION,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "LeetCodeProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "LeetCodeProfile_ownerId_idx" ON "LeetCodeProfile"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "LeetCodeProfile_ownerId_username_key" ON "LeetCodeProfile"("ownerId", "username");

-- AddForeignKey
ALTER TABLE "LeetCodeProfile" ADD CONSTRAINT "LeetCodeProfile_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
