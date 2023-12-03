const express = require('express')
const router = express.Router();
const AboutController = require('../controller/AboutController.js')
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
router.post('/post', upload.fields([{ name: 'imageleft', maxCount: 1 }, { name: 'imageright', maxCount: 1 }]), AboutController.add);
router.get('/', AboutController.get)
router.delete('/delete/:id',AboutController.deleteAbout)
router.put('/update/:id', upload.fields([{ name: 'imageleft', maxCount: 1 }, { name: 'imageright', maxCount: 1 }]),AboutController.update)
module.exports = router
