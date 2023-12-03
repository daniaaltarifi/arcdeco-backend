const express = require('express')
const router = express.Router();
const footerHomeController = require('../controller/FooterHomeController.js')
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
router.post('/post', upload.fields([ { name: 'socialmedia', maxCount: 1 }]), footerHomeController.add);
router.get('/', footerHomeController.get)
router.delete('/delete/:id', footerHomeController.deleteFooterHome)
router.put('/update/:id', upload.fields([ { name: 'socialmedia', maxCount: 1 }]),footerHomeController.update)
module.exports = router
