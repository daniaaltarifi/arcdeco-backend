const express = require('express')
const router = express.Router();
const loginController = require('../controller/LoginController.js')

router.post('/signup/post', loginController.signUp);
router.post('/login/post', loginController.login);
router.get('/logout', loginController.logout)
// router.delete('/delete/:id', homeController.deleteHome)
// router.put('/update/:id', upload.fields([{ name: 'video', maxCount: 1 }, { name: 'social1', maxCount: 1 },{ name: 'social2', maxCount: 1 },{ name: 'social3', maxCount: 1 }]),homeController.update)
module.exports = router
