-- CreateTable
CREATE TABLE "TrainReservation" (
    "id" SERIAL NOT NULL,
    "reservationId" INTEGER NOT NULL,
    "trainId" INTEGER NOT NULL,

    CONSTRAINT "TrainReservation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TrainReservation" ADD CONSTRAINT "TrainReservation_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainReservation" ADD CONSTRAINT "TrainReservation_trainId_fkey" FOREIGN KEY ("trainId") REFERENCES "Train"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
