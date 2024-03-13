-- CreateTable
CREATE TABLE "users" (
    "user_id" TEXT,
    "username" TEXT,
    "password" TEXT NOT NULL,
    "progress" INTEGER,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "dob" TIMESTAMP(3),
    "picture" TEXT,
    "accesstoken" TEXT
);

-- CreateTable
CREATE TABLE "feedbacks" (
    "f_id" TEXT,
    "from" TEXT NOT NULL,
    "name" TEXT,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_id_key" ON "users"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "feedbacks_f_id_key" ON "feedbacks"("f_id");

-- CreateIndex
CREATE UNIQUE INDEX "feedbacks_createdAt_key" ON "feedbacks"("createdAt");
