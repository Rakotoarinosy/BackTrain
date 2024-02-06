-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "CIN" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Statu" (
    "id" SERIAL NOT NULL,
    "libelle" TEXT NOT NULL,

    CONSTRAINT "Statu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Statu_user_role" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,
    "statuId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Statu_user_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserImage" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "imageId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Train" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "matricule" TEXT NOT NULL,
    "idStatu" INTEGER NOT NULL,

    CONSTRAINT "Train_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gare" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "Gare_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "start" INTEGER NOT NULL,
    "end" INTEGER NOT NULL,
    "numP" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "hour" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QRcode" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "QRcode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QrImageUser" (
    "id" SERIAL NOT NULL,
    "qrId" INTEGER NOT NULL,
    "imageId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "QrImageUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReservationValidate" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "reservationId" INTEGER NOT NULL,
    "trainId" INTEGER NOT NULL,

    CONSTRAINT "ReservationValidate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Statu_user_role" ADD CONSTRAINT "Statu_user_role_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statu_user_role" ADD CONSTRAINT "Statu_user_role_statuId_fkey" FOREIGN KEY ("statuId") REFERENCES "Statu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statu_user_role" ADD CONSTRAINT "Statu_user_role_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserImage" ADD CONSTRAINT "UserImage_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserImage" ADD CONSTRAINT "UserImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Train" ADD CONSTRAINT "Train_idStatu_fkey" FOREIGN KEY ("idStatu") REFERENCES "Statu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrImageUser" ADD CONSTRAINT "QrImageUser_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrImageUser" ADD CONSTRAINT "QrImageUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrImageUser" ADD CONSTRAINT "QrImageUser_qrId_fkey" FOREIGN KEY ("qrId") REFERENCES "QRcode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationValidate" ADD CONSTRAINT "ReservationValidate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationValidate" ADD CONSTRAINT "ReservationValidate_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationValidate" ADD CONSTRAINT "ReservationValidate_trainId_fkey" FOREIGN KEY ("trainId") REFERENCES "Train"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
