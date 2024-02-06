const bcrypt = require('bcrypt');

const router = require('express').Router();

const auth_C = require('../controllers/auth')
const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()

// Middleware recuperation Date du requete
router.use( (req, res, next) => {
  const event = new Date()
  console.log('AUTH Time:', event.toString())
  next()
})



router.post('/login', auth_C.login)




module.exports = router;