
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()



exports.addGare = async (req, res, next) => {

  try {

    const newGare= {
      nom: req.body.nom,
    }
    //Ajouter la notification

    const gare = await prisma.gare.create({
      data: newGare,
    })
    
    res.json(gare)
    
  } catch (error) {
    next(error)
  }  

};




exports.getAllGare = async (req, res, next) => {

    try{   

      const gares = await prisma.gare.findMany()
     
      res.json({gares})
    } catch (error) {
      next(error)
    }
  };


