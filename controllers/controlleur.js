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
              reservation: {
                include: {
                  reservationTraveler: { // Utilisez la relation reservationTraveler pour accéder aux voyageurs associés à chaque réservation
                    include: {
                      traveler: true // Inclure les détails du voyageur
                    }
                  }
                }
              },
              train: true,
            },
          });
          
        // console.log("test : ", trainReservations)
        let rep = [];

        trainReservations.forEach((element) => {
            const reservation = element.reservation;
            console.log("reservation kely :" , trainReservations)
            const travelers = reservation.reservationTraveler.map(rt => rt.traveler);
            travelers.forEach(traveler => {
                rep.push({
                    reservation: element.reservationId,
                    start: reservation.start,
                    end: reservation.end,
                    nump: reservation.numP,
                    name: traveler.nom, // Ajouter le nom du voyageur à la réponse
                    CIN: traveler.cin // Ajouter l'email du voyageur à la réponse
                });
            });
        });
        
        let repStart = 0;
        let repEnd = 0;
        
        rep.map((element) => {
            console.log(element);
            if (element.start === idGare) {
                repStart = repStart + element.nump
            } else if (element.end === idGare) {
                repEnd = repEnd + element.nump
            } else {
                console.log("aucun reservation ne correspond à ce train")
            }
        });
        res.json({
            repStart,
            repEnd,
            reservations: rep // Ajouter les détails des réservations et des voyageurs à la réponse
        });
        

    } catch (error) {
        next(error);
    }
};
