const bcrypt = require('bcrypt');

const router = require('express').Router();

const user_C = require('../controllers/user')
const multer = require('multer')

const { PrismaClient } = require('@prisma/client')



const prisma = new PrismaClient()


const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images/imageUser"); //important this is a direct path fron our current file to storage location
    },
    filename: async (req, file, cb) => {
      const fileName = Date.now() + "--" + file.originalname;
      
      try {
        // Code pour enregistrer le nom de fichier dans la base de données avec Prisma
        await prisma.image.create({
          data: {
            nom: fileName,
          },
        });
        
        console.log('Nom de fichier enregistré avec succès dans la base de données');
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement du fichier dans la base de données :', error);
      }
  
      cb(null, fileName);
    },
  });
  
  const upload = multer({ storage: fileStorageEngine });
  

  


// Middleware recuperation Date du requete
router.use( (req, res, next) => {
  const event = new Date()
  console.log('User Time:', event.toString())
  next()
})


router.get('/', user_C.getAllUsers)

router.get('/:id', user_C.getUser)

//router.put('/register', upload.single('image'), user_C.addUser)
router.put('/register', upload.single('image'),user_C.addUser);

router.post('/getUserByToken', user_C.getUserByToken);




module.exports = router;