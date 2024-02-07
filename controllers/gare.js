const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client')

const { UserError, RequestError } = require('../error/customError')



const prisma = new PrismaClient()

exports.getAllGare = async (req, res, next) => {

    try{   

      const users = await prisma.user.findMany()
     
      res.json({users})
    } catch (error) {
      next(error)
    }
  };