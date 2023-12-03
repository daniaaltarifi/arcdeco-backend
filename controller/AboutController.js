const db=require("../config/config")


const add = async (req, res) => {
  const { title, paragraphleft, paragraphright} = req.body;
const imageleft=req.files['imageleft'][0].filename
const imageright=req.files['imageright'][0].filename

  // Insert the user's data and image into the database.
  const sqlInsert = "INSERT INTO about (title, paragraphleft, paragraphright,imageleft,imageright) VALUES (?, ?, ?, ?, ?)";
  db.query(sqlInsert, [title, paragraphleft, paragraphright, imageleft,imageright], (err, result) => {
    if (err) {
      console.error('Error inserting data: ' + err.message);
      return res.json({ message: "Error" });
    }
    return res.json({ status: "success" });
  });
};


const get = async (req, res) => {
    const sqlSelect = 'SELECT * FROM about';
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




const deleteAbout=async(req,res)=>{
    const id=req.params.id
    const sqlDelete="DELETE FROM about WHERE id = ? ";
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
// const update = async (req, res) => {
//     const id = req.params.id;
//     const title = req.body.title;
//     const paragraphleft = req.body.paragraphleft;
//     const paragraphright = req.body.paragraphright;
//     const imageleft = req.files["imageleft"][0].filename;
//     const imageright = req.files["imageright"][0].filename;

//     // Check if the row with the specified 'id' exists
//     const checkSql = 'SELECT * FROM about WHERE id = ?';
//     db.query(checkSql, [id], (checkErr, checkResult) => {
//         if (checkErr) {
//             console.log(checkErr);
//             res.json({ error: 'Error checking data' });
//         } else {
//             if (checkResult.length === 0) {
//                 // No matching row found, return an error
//                 res.json({ error: 'No data found for the specified ID' });
//             } else {
//                 // Row exists, proceed with the update
//                 const sqlUpdate = 'UPDATE about SET title = ?, paragraphleft = ?, paragraphright = ? ,  imageleft = ? , imageright = ?  WHERE id = ?';
//                 db.query(sqlUpdate, [title, paragraphleft, paragraphright, imageleft, imageright, id], (updateErr, updateResult) => {
//                     if (updateErr) {
//                         console.log(updateErr);
//                         res.json({ error: 'Error updating data' });
//                     } else {
//                         console.log(updateResult);
//                         res.json({ id,title, paragraphleft, paragraphright, imageleft, imageright});
//                     }
//                 });
//             }
//         }
//     });
// };
const update = async (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const paragraphleft = req.body.paragraphleft;
    const paragraphright = req.body.paragraphright;

    let imageleft = ''; // Initialize imageleft variable
    let imageright = ''; // Initialize imageright variable

    // Check if the 'imageleft' file exists in the request
    if (req.files && req.files['imageleft'] && req.files['imageleft'][0]) {
        imageleft = req.files['imageleft'][0].filename; // If imageleft exists, update the variable
    }

    // Check if the 'imageright' file exists in the request
    if (req.files && req.files['imageright'] && req.files['imageright'][0]) {
        imageright = req.files['imageright'][0].filename; // If imageright exists, update the variable
    }

    // Fetch the current values of imageleft and imageright
    const checkSql = 'SELECT imageleft, imageright FROM about WHERE id = ?';
    db.query(checkSql, [id], (checkErr, checkResult) => {
        if (checkErr) {
            console.log(checkErr);
            res.json({ error: 'Error checking data' });
        } else {
            if (checkResult.length === 0) {
                res.json({ error: 'No data found for the specified ID' });
            } else {
                const currentimageleft = checkResult[0].imageleft;
                const currentimageright = checkResult[0].imageright;

                // Determine which images to update based on whether they are provided in the request
                let updatedImageleft = currentimageleft;
                let updatedImageright = currentimageright;

                if (imageleft) {
                    updatedImageleft = imageleft;
                }

                if (imageright) {
                    updatedImageright = imageright;
                }

                // Update only the text fields and respective images
                const sqlUpdateText = 'UPDATE about SET title = ?, paragraphleft = ?, paragraphright = ?, imageleft = ?, imageright = ? WHERE id = ?';
                db.query(sqlUpdateText, [title, paragraphleft, paragraphright, updatedImageleft, updatedImageright, id], (updateErr, updateResult) => {
                    if (updateErr) {
                        console.log(updateErr);
                        res.json({ error: 'Error updating data' });
                    } else {
                        console.log(updateResult);
                        res.json({ id, title, paragraphleft, paragraphright, imageleft: updatedImageleft, imageright: updatedImageright });
                    }
                });
            }
        }
    });
};


module.exports={add,get,update,deleteAbout}