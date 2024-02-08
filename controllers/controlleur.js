const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getTrainReservation = async (req, res, next) => {
    try {
        const idTrain = parseInt(req.body.idTrain);
        const idGare = parseInt(req.body.idGare);

        // Vérification si les paramètres id sont présents et cohérents
        if (!idTrain || !idGare) {
            throw new Error('Missing parameter');
        }

        const trainReservations = await prisma.trainReservation.findMany({
            where: {
                trainId: idTrain,
                reservation: {
                    end: idGare
                }
            },
            include: {
                reservation: true,
                train: true,
            },
        });

        res.json(trainReservations);

    } catch (error) {
        next(error);
    }
};
