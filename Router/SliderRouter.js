const express = require('express')
const router = express.Router();
const sliderController = require('../controller/SliderController.js')
const multer = require("multer");
const path = require("path");
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'images'); // Define the upload directory
//     },
//     filename: (req, file, cb) => {
//       const uniqueFileName = Date.now() + '-' + file.originalname;
//       cb(null, uniqueFileName);
//     },
//   });
  
// const upload = multer({
//     storage: storage
// })
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post('/post', upload.array('images'),sliderController.add);
router.get('/',sliderController.get)
router.delete('/delete/:id', sliderController.deleteSlider)
router.put('/update/:id', upload.array('images'),sliderController.update)
module.exports = router
