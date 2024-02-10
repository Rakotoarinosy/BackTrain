const { PrismaClient } = require('@prisma/client')
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt');

const QRCode = require('qrcode');
const nodemailer = require('nodemailer');
const path = require('path');

const prisma = new PrismaClient()




exports.addReservation = async (req, res, next) => {

  let start= await getNomGare(req.body.start);
  let end = await  getNomGare(req.body.end);

  let dataQr = {
    nbPersonne: req.body.numP,
    personne: req.body.personne,
    start : start,
    end : end
  }

  try {
    
    userId = await getIdByToken(req.body.token)
    const user = await getUser(userId)
    dataQr['user'] = user.nom;

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

    await prisma.reservationValidate.create({
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

    })


    let stringdata = JSON.stringify(dataQr);
    let imageName = `${reservationId}.png`;
    let filePath = `./images/imageQr/${imageName}`;
    QRCode.toFile(filePath, stringdata, { errorCorrectionLevel: 'H' }, function (err) {
      if (err) throw err;
      console.log('Le code QR a été sauvegardé !');
  });

  let filePathEmail = `../images/imageQr/${imageName}`;
  let repEmail = sendEmail(user.email,imageName,filePathEmail)


  updatePlaceTrain(req.body.start, req.body.end, req.body.date, req.body.numP)

    res.json(repEmail)
    
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
  


const getNomGare = async (idGare)  => {

  try{   


    const gare = await prisma.gare.findUnique({
      where:{
        id: idGare
      }
    })
   
    return gare.nom
  } catch (error) {
    return error  }
};


const getUser = async (idUser)  => {

  try{   


    const user = await prisma.user.findUnique({
      where:{
        id: idUser
      }
    })
   
    return user
  } catch (error) {
    return error
  }
};



const sendEmail = (email,imageName,pathName) => {

  // Création du transporteur avec les informations de connexion au serveur SMTP
  const transporter = nodemailer.createTransport({
      service: 'gmail', // Utilisez le service de messagerie que vous préférez
      auth: {
          user: process.env.EMAIL,
          pass: process.env.MDP_APP
      }
  });

  // Paramètres de l'e-mail
  const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'code QR de reservation ',
      text: 'Veuillez trouver le code QR joint à cet e-mail.',
      html: '<b>Veuillez trouver le code QR joint à cet e-mail.</b>',
      attachments: [
          {
              filename: imageName, // Nom du fichier que vous avez créé précédemment
              path: path.join(__dirname, pathName) // Chemin absolu vers le fichier
          }
      ]
  };

  // Envoi de l'e-mail
  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
          console.log(error);
      } else {
          console.log('Email sent: ' + info.response);
          return "votre Qr code a ete envoye par email"
      }
  });


}



const updatePlaceTrain = async (startId, endId, date, nb, trainId)  => {
  var isReserve = false
  const trainGare = await prisma.trainGare.findMany({
    where:{
      trainId: trainId
    },
    orderBy:{
      id: 'asc'
    }
  })


  await Promise.all(
  trainGare.map (async (element) => {
      console.log(endId + " = " + element.gareId )
      if(element.gareId == endId){
        isReserve = false
      }
   
      if(element.gareId == startId && element.date.toISOString() == date){
        isReserve = true
      }

      if(isReserve == true){
        await updatePlace(element.id,element.trainId, element.gareId,element.date, nb)
      }


  }))
  return trainGare
}




const updatePlace= async (idTrainGare,trainId, gareId, date, nb) => {
  try {
   const id = parseInt(idTrainGare)

  //tester le id
  if(!id) {
      return res.status(400).json({msg:"missing parameters"});
  }

  
  const trainGares = await prisma.trainGare.findUnique({
    where:{
      id: idTrainGare
    }
  })

  
  let placeDispo = trainGares.placeDispo - nb
  let data = {
    trainId: trainId,
    gareId: gareId,
    date: date,
    placeDispo: placeDispo
  }



    const trainGare = await prisma.trainGare.update({
      data: data,
      where:{
        id: Number(id)
      }
    })

    return trainGare
    
  } catch (error) {
    return error
  } 
};


