
const { PrismaClient } = require('@prisma/client')



const prisma = new PrismaClient()



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


