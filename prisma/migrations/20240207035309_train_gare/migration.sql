-- CreateTable
CREATE TABLE "TrainGare" (
    "id" SERIAL NOT NULL,
    "trainId" INTEGER NOT NULL,
    "gareId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrainGare_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TrainGare" ADD CONSTRAINT "TrainGare_trainId_fkey" FOREIGN KEY ("trainId") REFERENCES "Train"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainGare" ADD CONSTRAINT "TrainGare_gareId_fkey" FOREIGN KEY ("gareId") REFERENCES "Gare"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
