const express = require('express')
const router = express.Router();
const NewPageController = require('../controller/NewPageController.js')
router.post('/post',NewPageController.add);
router.get('/',NewPageController.get);
router.get('/:id',NewPageController.getbyid);
router.delete('/delete/:id',NewPageController.deleteNewPage)
router.put('/update/:id',NewPageController.update)
module.exports=router