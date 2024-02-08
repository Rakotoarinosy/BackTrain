
const router = require('express').Router();

const reservation_C = require('../controllers/reservation')
const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()

// Middleware recuperation Date du requete
router.use( (req, res, next) => {
  const event = new Date()
  console.log('reservation Time:', event.toString())
  next()
})



router.put('/addReservation', reservation_C.addReservation)
router.get('/allReservation', reservation_C.getAllReservation)




module.exports = router;