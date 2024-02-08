
const { PrismaClient } = require('@prisma/client')



const prisma = new PrismaClient()
const { UserError, RequestError } = require('../error/customError')

const dateFormat= (date) =>{
    const formattedDate = currentDate.getFullYear() + "-" + (currentDate.getMonth() +  1) + "-" + currentDate.getDate();
    const formattedTime = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    const dateTime = formattedDate + " " + formattedTime; 
    return dateTime
  
  }



exports.addTrain = async (req, res, next) => {

  try {

    const newTrain= {
      nom: req.body.nom,
      matricule: req.body.matricule,
      idStatu: 4
    }
    //Ajouter la notification

    const train = await prisma.train.create({
      data: newTrain,
    })
    
    res.json(train)
    
  } catch (error) {
    next(error)
  }  

};




exports.getAllTrain = async (req, res, next) => {

    try{   

      const trains = await prisma.train.findMany()
     
      res.json({trains})
    } catch (error) {
      next(error)
    }
  };



  exports.addTrainGare = async (req, res, next) => {

    try {
    const currentDate = new Date();

  
    const newTrainGare = {
        trainId: parseInt(req.body.trainId),
        gareId:  parseInt(req.body.gareId),
        date: currentDate
      }
      //Ajouter la notification
  
      const trainGare = await prisma.trainGare.create({
        data: newTrainGare,
      })
      
      res.json(trainGare)
      
    } catch (error) {
      next(error)
    }  
  
  };


  
exports.getTrainGare = async (req, res, next) => {

    try{   
        const gareId = parseInt(req.params.id)

        // Vérification si le champ id est présent et cohérent
        if (!gareId) {
          throw new RequestError('Missing parameter')
        }

      const trainGares = await prisma.trainGare.findMany({
        include:{ train:true, gare:true},
        where: {
          gareId: gareId,
        },
      });
     
      res.json({trainGares})
    } catch (error) {
      next(error)
    }
  };
