const express = require('express')
const router = express.Router();
const CasesController = require('../controller/CasesController.js')

router.post('/post',CasesController.add);
router.get('/', CasesController.get)
router.delete('/delete/:id',CasesController.deleteCases)
router.put('/update/:id',CasesController.update)
module.exports = router
