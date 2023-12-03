const express = require('express')
const router = express.Router();
const ServicesController = require('../controller/ServicesController.js')

router.post('/post',ServicesController.add);
router.get('/', ServicesController.get)
router.delete('/delete/:id',ServicesController.deleteServices)
router.put('/update/:id',ServicesController.update)
module.exports = router
