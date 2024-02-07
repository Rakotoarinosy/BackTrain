
const router = require('express').Router();

const train_C = require('../controllers/train')
const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()

// Middleware recuperation Date du requete
router.use( (req, res, next) => {
  const event = new Date()
  console.log('train Time:', event.toString())
  next()
})



router.put('/addTrain', train_C.addTrain)
router.get('/allTrain', train_C.getAllTrain)
router.put('/addTrainGare', train_C.addTrainGare)
router.get('/getTrainGare/:id', train_C.getTrainGare)



module.exports = router;