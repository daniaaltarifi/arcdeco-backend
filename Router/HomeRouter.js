const express = require('express')
const router = express.Router();
const homeController = require('../controller/HomeController.js')
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
router.post('/post', upload.fields([{ name: 'video', maxCount: 1 }, { name: 'social1', maxCount: 1 },{ name: 'social2', maxCount: 1 },{ name: 'social3', maxCount: 1 }]), homeController.add);
router.get('/', homeController.get)
router.delete('/delete/:id', homeController.deleteHome)
router.put('/update/:id', upload.fields([{ name: 'video', maxCount: 1 }, { name: 'social1', maxCount: 1 },{ name: 'social2', maxCount: 1 },{ name: 'social3', maxCount: 1 }]),homeController.update)
module.exports = router
