const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client')

const { UserError, RequestError } = require('../error/customError')



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

      const users = await prisma.gare.findMany()
     
      res.json({users})
    } catch (error) {
      next(error)
    }
  };


