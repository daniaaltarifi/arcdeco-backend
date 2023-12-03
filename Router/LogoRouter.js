const express = require('express')
const router = express.Router();
const LogoController = require('../controller/LogoController.js')
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})
router.post('/post', upload.fields([{ name: 'image', maxCount: 1 }]), LogoController.add);
router.get('/', LogoController.get)
// router.delete('/delete/:id',TypeOfServicesController.deletetypeofservices)
router.put('/update/:id', upload.fields([{ name: 'logo', maxCount: 1 }]),LogoController.update)
module.exports = router
