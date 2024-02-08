const { PrismaClient } = require('@prisma/client')
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt');

const prisma = new PrismaClient()




exports.addReservation = async (req, res, next) => {

  try {

    userId = await getIdByToken(req.body.token)
    console.log(userId)

    const newReservation= {
      start: parseInt(req.body.start),          
      end: parseInt(req.body.end),              
      numP: parseInt(req.body.numP)
    }
    //Ajouter la reservation

    await prisma.reservation.create({
      data: newReservation,
    })
    
    
  //Prendre l'id du reservation ajouter
  const result = await prisma.reservation.findFirst({
    select: {
      id: true,
    },
    orderBy: {
      id: 'desc',
    },
  });

  const reservationId = result?.id || 0; // Si la table est vide, retourne 0 comme dernière ID



    const newReservationValidate = {
      userId:  parseInt(userId),
      reservationId: reservationId,
      trainId:  parseInt(req.body.trainId)
    }

    const rep = await prisma.reservationValidate.create({
      data: newReservationValidate,
    })

    //AJOUT DES PERSONNES
    req.body.personne.map(async (personne) => {
        
      await prisma.traveler.create({
        data: {"nom": personne.nom, "cin": personne.cin},
      })
      
      
    //Prendre l'id du reservation ajouter
    const result = await prisma.traveler.findFirst({
      select: {
        id: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
  
    const travelerId = result?.id || 0; // Si la table est vide, retourne 0 comme dernière ID
  
  
  
      const rep = await prisma.reservationTraveler.create({
        data: {"reservationId":reservationId,"travelerId":travelerId},
      })

      
      console.log(rep)


    })

    
    res.json(rep)
    
  } catch (error) {
    next(error)
  }  

};



exports.getAllReservation = async (req, res, next) => {

    try{   

      const gares = 1
     
      res.json(gares)
    } catch (error) {
      next(error)
    }

  };


const getIdByToken = async (token) => {

  try {
    const decodedToken = jwt.decode(token);
    
    console.log(decodedToken)
    
    if (!decodedToken) {

    // Si le token est invalide ou non décodé, vous pouvez renvoyer une réponse appropriée.
    return res.status(400).json({ error: 'Invalid token' });

    }

    return decodedToken.id
    
    
  } catch (error) {
    // En cas d'erreur lors du décodage du token, vous pouvez renvoyer une réponse d'erreur.
    return { error: 'Internal server error' };
  }

}
  