-- CreateTable
CREATE TABLE "TeamMemberInfo" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,

    CONSTRAINT "TeamMemberInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TesterInfo" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,

    CONSTRAINT "TesterInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "repository_name" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_project_team" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProjectToTesterInfo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TeamMemberInfo_id_key" ON "TeamMemberInfo"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TeamMemberInfo_user_id_key" ON "TeamMemberInfo"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "TesterInfo_id_key" ON "TesterInfo"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TesterInfo_user_id_key" ON "TesterInfo"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Project_id_key" ON "Project"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_project_team_AB_unique" ON "_project_team"("A", "B");

-- CreateIndex
CREATE INDEX "_project_team_B_index" ON "_project_team"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToTesterInfo_AB_unique" ON "_ProjectToTesterInfo"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToTesterInfo_B_index" ON "_ProjectToTesterInfo"("B");

-- AddForeignKey
ALTER TABLE "TeamMemberInfo" ADD CONSTRAINT "TeamMemberInfo_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TesterInfo" ADD CONSTRAINT "TesterInfo_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "TeamMemberInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_project_team" ADD CONSTRAINT "_project_team_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_project_team" ADD CONSTRAINT "_project_team_B_fkey" FOREIGN KEY ("B") REFERENCES "TeamMemberInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToTesterInfo" ADD CONSTRAINT "_ProjectToTesterInfo_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToTesterInfo" ADD CONSTRAINT "_ProjectToTesterInfo_B_fkey" FOREIGN KEY ("B") REFERENCES "TesterInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
