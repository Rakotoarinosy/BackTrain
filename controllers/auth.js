const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()


const { AuthenticationError } = require('../error/customError')


exports.login = async (req, res, next) => {
  
    try {

      
    // Validation des données reçues
    if (!req.body.email || !req.body.password) {
      throw new AuthenticationError('Mauvais password ou email', 0)
    }


    // Recherche de l'utilisateur
      const user = await prisma.user.findMany({
        include:{statu_user_role: true},
        where:{
          email: req.body.email
        }
      })

      if (user.length === 0) {
        throw new AuthenticationError(' Ce compte n\'existe pas', 1)
      }

    user.map((user) => {

    let  statuUser = user.statu_user_role[user.statu_user_role.length-1].statuId
    if(statuUser ===3){
      throw new AuthenticationError(' Ce compte est supprimer', 2)
    }
    })



    // Comparer le mot de passe
      const match = await bcrypt.compare(req.body.password, user[0].password);
      if(!match) {
        throw new AuthenticationError('Mot de passe invalide', 2)
      }
      


    // Génération du token et envoi
        const token = jwt.sign({
            id: user[0].id,
            nom: user[0].nom,
            email: user[0].email
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING})
        
        console.log("tonga ato")

        //recuperation du role de l'utilisateur

        const userRole = await prisma.statu_user_role.findMany({
          where: {
            userId: Number(user[0].id),
          },
  
        })
  
        if (userRole.length == 0) {
          throw new UserError(`L\'utilisateur n\'existe pas`, 0)
        }
        
        const role= userRole[userRole.length-1].roleId


         //recuperation image de l'utilisateur

         const userImage = await prisma.userImage.findMany({
          include:{image:true},
          where: {
            userId: Number(user[0].id),
          },
  
        })
        let image =""
        if (userImage.length == 0) {
            image ="avatar.png"
        }else{
         image = userImage[0]?.image?.nom;
        }


        return res.json({
          access_token: token,
          id: user[0].id,
          nom: user[0].nom,
          email: user[0].nom,
          role: role,
          image: image,
          
        })
      
      
    } catch (error) {
      next(error)
    }  
  
  };

