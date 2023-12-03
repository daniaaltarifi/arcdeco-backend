const db=require("../config/config")
// const add = async (req, res) => {
//     try {
//       const imageFilenames = req.files.map((file) => file.filename);
//       console.log('Image filenames:', imageFilenames);
  
//       // Construct URLs for the images
//       const imageUrls = imageFilenames.map(filename => `/${filename}`);
  
//       const sql = 'INSERT INTO slider (images) VALUES (?)';
//       await new Promise((resolve, reject) => {
//         db.query(sql, [JSON.stringify(imageUrls)], (err, result) => {
//           if (err) {
//             console.error('Error adding slider: ' + err.message);
//             reject(err);
//           } else {
//             console.log('Slider added successfully');
  
//             // Return image URLs to the frontend
//             res.json({ imageUrls });
//           }
//         });
//       });
//     } catch (error) {
//       res.status(500).json({ message: 'Error adding slider' });
//     }
//   };
  


const add =async(req,res)=>{
  const images = req.files;

  if (!images) {
    return res.status(400).json({ message: 'File upload failed' });
  }


  images.forEach((file) => {
    const filePath = '/' + file.filename;

    // Insert data into the database
    const sql = 'INSERT INTO partners (images) VALUES (?)';
    const values = [filePath];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting into the database: ' + err.message);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    });
  });

  return res.status(200).json({ message: 'File uploaded successfully' });

}
  // const get = (req, res) => {
  //   const sqlSelect = 'SELECT images FROM slider'; // Assuming that 'images' is the column where you store image URLs
  
  //   db.query(sqlSelect, (err, result) => {
  //     if (err) {
  //       console.log(err);
  //       res.json({ error: 'Error fetching data' });
  //     } else {
  //       const imageUrls = JSON.parse(result[0].images); // Assuming you store image URLs as a JSON array in the 'images' column
  
  //       // Return the image URLs to the frontend
  //       res.json({ imageUrls });
  //     }
  //   });
  // };
  
  
const get = async (req, res) => {
  const sqlSelect = 'SELECT * FROM partners';
  db.query(sqlSelect, (err, result) => {
      if (err) {
          console.log(err);
          res.json({ error: "Error fetching data" });
      } else {
          console.log(result);
          res.json(result);
      }
  });
};
const update = async (req, res) => {
  const images = req.files;
  const { id } = req.params; // Assuming you send the record ID in the URL parameters

  if (!images) {
    return res.status(400).json({ message: 'File upload failed' });
  }

  // Update existing images for the record
  images.forEach((file) => {
    const filePath = '/' + file.filename;
    const sql = 'INSERT INTO partners (id, images) VALUES (?, ?) ON DUPLICATE KEY UPDATE images = VALUES(images)';
    const values = [id, filePath];

    db.query(sql, values, (updateErr, updateResult) => {
      if (updateErr) {
        console.error('Error updating the database: ' + updateErr.message);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    });
  });

  return res.status(200).json({ message: images });
};
const deletePartners=async(req,res)=>{
  const id=req.params.id
  const sqlDelete="DELETE FROM partners WHERE id = ? ";
  db.query(sqlDelete,[id],(err,result)=>{
      if(err){
          console.log(err)
          res.json("Error Deleted")
      }
      else{
          console.log(result)
          res.json("Deleted Succsesfully")
      }
  })
}
module.exports={add,get,update,deletePartners}