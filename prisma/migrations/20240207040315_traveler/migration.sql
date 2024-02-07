-- CreateTable
CREATE TABLE "Traveler" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "cin" TEXT NOT NULL,

    CONSTRAINT "Traveler_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReservationTraveler" (
    "id" SERIAL NOT NULL,
    "reservationId" INTEGER NOT NULL,
    "travelerId" INTEGER NOT NULL,

    CONSTRAINT "ReservationTraveler_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReservationTraveler" ADD CONSTRAINT "ReservationTraveler_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationTraveler" ADD CONSTRAINT "ReservationTraveler_travelerId_fkey" FOREIGN KEY ("travelerId") REFERENCES "Traveler"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
