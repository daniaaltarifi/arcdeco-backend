const express = require('express')
const router = express.Router();
const FaviconController = require('../controller/faviconController.js')
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
router.post('/post', upload.fields([{ name: 'icon', maxCount: 1 }]), FaviconController.add);
router.get('/', FaviconController.get)
router.delete('/delete/:id', FaviconController.deleteFavicon)
router.put('/update/:id', upload.fields([{ name: 'icon', maxCount: 1 }]),FaviconController.update)
module.exports = router
