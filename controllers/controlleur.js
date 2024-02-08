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

        let trainReservations = [];

        trainReservations = await prisma.trainReservation.findMany({
            where: {
                trainId: idTrain,
                OR: [
                    {
                        reservation: {
                            start: idGare
                        }
                    },
                    {
                        reservation: {
                            end: idGare
                        }
                    }
                ]
            },
            include: {
                reservation: true,
                train: true,
            },
        });

        res.json(trainReservations);
        // console.log(trainReservations)
        let rep = [];

        trainReservations.map((element) => {
            rep.push({
                start: element.reservation.start,
                end: element.reservation.end,
                nump: element.reservation.numP
            });
        });


        let repStart = 0;
        let repEnd = 0;

        rep.map((element) => {
            if (element.start === idGare) {
                repStart = repStart + element.nump
            } else if(element.end === idGare){
                console.log(element.end)
                repEnd = repEnd + element.nump
            }else {
                console.log("aucun reservation ne correspant à ce train")
            }
        });
        res.json({
            repStart,
            repEnd
        });

    } catch (error) {
        next(error);
    }
};
