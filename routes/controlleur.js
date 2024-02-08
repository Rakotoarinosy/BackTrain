const bcrypt = require('bcrypt');

const router = require('express').Router();

const controlleur_C = require('../controllers/controlleur')
const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()

// Middleware recuperation Date du requete
router.use( (req, res, next) => {
  const event = new Date()
  console.log('AUTH Time:', event.toString())
  next()
})



router.post('/reservationTrain', controlleur_C.getTrainReservation)




module.exports = router;