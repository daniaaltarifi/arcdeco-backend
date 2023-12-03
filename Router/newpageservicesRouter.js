const express = require('express')
const router = express.Router();
const NewPageServicesController = require('../controller/NewPageServicesController.js')
router.post('/post',NewPageServicesController.add);
router.get('/',NewPageServicesController.get);
router.get('/:id',NewPageServicesController.getbyid);
router.delete('/delete/:id',NewPageServicesController.deleteNewPageServices)
router.put('/update/:id',NewPageServicesController.update)
module.exports=router