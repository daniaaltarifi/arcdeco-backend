const db=require("../config/config")


const add = async (req, res) => {
const logo=req.files['image'][0].filename

  // Insert the user's data and image into the database.
  const sqlInsert = "INSERT INTO logo (logo) VALUES (?)";
  db.query(sqlInsert, [logo], (err, result) => {
    if (err) {
      console.error('Error inserting logo: ' + err.message);
      return res.json({ message: "Error" });
    }
    // return res.json({ status: "success" });
    return res.status(200).json({message:"succsess"})
  });
};


const get = async (req, res) => {
    const sqlSelect = 'SELECT * FROM logo';
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
    
//     const logo = req.files["logo"][0].filename;

//     // Check if the row with the specified 'id' exists
//     const checkSql = 'SELECT * FROM logo WHERE id = ?';
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
//                 const sqlUpdate = 'UPDATE logo SET logo = ?  WHERE id = ?';
//                 db.query(sqlUpdate, [logo, id], (updateErr, updateResult) => {
//                     if (updateErr) {
//                         console.log(updateErr);
//                         res.json({ error: 'Error updating data' });
//                     } else {
//                         console.log(updateResult);
//                         res.json({logo});
//                     }
//                 });
//             }
//         }
//     });
// };

const update = async (req, res) => {
    const id = req.params.id;
   

    let logo = ''; // Initialize logo variable

    // Check if the 'logo' file exists in the request
    if (req.files && req.files['logo'] && req.files['logo'][0]) {
        logo = req.files['logo'][0].filename; // If logo exists, update the variable
    }

    // Check if 'logo' value is empty
    if (!logo) {
        // If 'logo' value is not updated, only update the text fields
        const checkSql = 'SELECT logo FROM logo WHERE id = ?';
        db.query(checkSql, [id], (checkErr, checkResult) => {
            if (checkErr) {
                console.log(checkErr);
                res.json({ error: 'Error checking data' });
            } else {
                if (checkResult.length === 0) {
                    res.json({ error: 'No data found for the specified ID' });
                } else {
                    const currentlogo = checkResult[0].logo;
                    res.json({ id,logo: currentlogo });

                
                }
            }
        });
    } else {
        // If 'logo' is updated or a new logo is provided, proceed with the update
        const sqlUpdateAll = 'UPDATE logo SET logo = ? WHERE id = ?';
        db.query(sqlUpdateAll, [logo, id], (updateErr, updateResult) => {
            if (updateErr) {
                console.log(updateErr);
                res.json({ error: 'Error updating data' });
            } else {
                console.log(updateResult);
                res.json({ id,logo });
            }
        });
    }
};



module.exports={add,get,update}