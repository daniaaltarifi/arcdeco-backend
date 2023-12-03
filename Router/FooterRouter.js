const express = require('express')
const router = express.Router();
const footerController = require('../controller/FooterController.js')
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
router.post('/post', upload.fields([{ name: 'social1', maxCount: 1 },{ name: 'social2', maxCount: 1 },{ name: 'social3', maxCount: 1 }]), footerController.add);
router.get('/', footerController.get)
router.delete('/delete/:id', footerController.deleteFooter)
router.put('/update/:id', upload.fields([{ name: 'social1', maxCount: 1 },{ name: 'social2', maxCount: 1 },{ name: 'social3', maxCount: 1 }]),footerController.update)
module.exports = router
