const db=require("../config/config")


const add = async (req, res) => {
  const { title, descriptionofservice} = req.body;
const image=req.files['image'][0].filename

  // Insert the user's data and image into the database.
  const sqlInsert = "INSERT INTO typeofservices (title, descriptionofservice, image) VALUES (?, ?, ?)";
  db.query(sqlInsert, [title, descriptionofservice, image], (err, result) => {
    if (err) {
      console.error('Error inserting data: ' + err.message);
      return res.json({ message: "Error" });
    }
    // return res.json({ status: "success" });
    return res.status(200).json({message:"succsess"})
  });
};


const get = async (req, res) => {
    const sqlSelect = 'SELECT * FROM typeofservices';
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




const deletetypeofservices=async(req,res)=>{
    const id=req.params.id
    const sqlDelete="DELETE FROM typeofservices WHERE id = ? ";
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
//     const descriptionofservice = req.body.descriptionofservice;
//     const image = req.files["image"][0].filename;

//     // Check if the row with the specified 'id' exists
//     const checkSql = 'SELECT * FROM typeofservices WHERE id = ?';
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
//                 const sqlUpdate = 'UPDATE typeofservices SET title = ?, descriptionofservice = ?, image = ?  WHERE id = ?';
//                 db.query(sqlUpdate, [title, descriptionofservice, image, id], (updateErr, updateResult) => {
//                     if (updateErr) {
//                         console.log(updateErr);
//                         res.json({ error: 'Error updating data' });
//                     } else {
//                         console.log(updateResult);
//                         res.json({ id,title, descriptionofservice, image});
//                     }
//                 });
//             }
//         }
//     });
// };
const update = async (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const descriptionofservice = req.body.descriptionofservice;

    let image = ''; // Initialize image variable

    // Check if the 'image' file exists in the request
    if (req.files && req.files['image'] && req.files['image'][0]) {
        image = req.files['image'][0].filename; // If image exists, update the variable
    }

    // Check if 'image' value is empty
    if (!image) {
        // If 'image' value is not updated, only update the text fields
        const checkSql = 'SELECT image FROM typeofservices WHERE id = ?';
        db.query(checkSql, [id], (checkErr, checkResult) => {
            if (checkErr) {
                console.log(checkErr);
                res.json({ error: 'Error checking data' });
            } else {
                if (checkResult.length === 0) {
                    res.json({ error: 'No data found for the specified ID' });
                } else {
                    const currentimage = checkResult[0].image;

                    // Update only the text fields without changing the image
                    const sqlUpdateText = 'UPDATE typeofservices SET title = ?, descriptionofservice = ? WHERE id = ?';
                    db.query(sqlUpdateText, [title, descriptionofservice, id], (updateErr, updateResult) => {
                        if (updateErr) {
                            console.log(updateErr);
                            res.json({ error: 'Error updating text data' });
                        } else {
                            console.log(updateResult);
                            res.json({ id, title, descriptionofservice, image: currentimage });
                        }
                    });
                }
            }
        });
    } else {
        // If 'image' is updated or a new image is provided, proceed with the update
        const sqlUpdateAll = 'UPDATE typeofservices SET title = ?, descriptionofservice = ?, image = ? WHERE id = ?';
        db.query(sqlUpdateAll, [title, descriptionofservice, image, id], (updateErr, updateResult) => {
            if (updateErr) {
                console.log(updateErr);
                res.json({ error: 'Error updating data' });
            } else {
                console.log(updateResult);
                res.json({ id, title, descriptionofservice, image });
            }
        });
    }
};

module.exports={add,get,update,deletetypeofservices}