
const router = require('express').Router();

const gare_C = require('../controllers/gare')
const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()

// Middleware recuperation Date du requete
router.use( (req, res, next) => {
  const event = new Date()
  console.log('gare Time:', event.toString())
  next()
})



router.put('/addGare', gare_C.addGare)
router.get('/allGare', gare_C.getAllGare)




module.exports = router;