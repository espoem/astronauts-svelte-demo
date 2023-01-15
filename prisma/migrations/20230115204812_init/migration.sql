-- CreateTable
CREATE TABLE "Astronaut" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Astronaut_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Superpower" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "astronautId" INTEGER,

    CONSTRAINT "Superpower_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Superpower" ADD CONSTRAINT "Superpower_astronautId_fkey" FOREIGN KEY ("astronautId") REFERENCES "Astronaut"("id") ON DELETE SET NULL ON UPDATE CASCADE;
