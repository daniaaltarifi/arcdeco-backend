const db=require("../config/config")


const add = async (req, res) => {
  const { name} = req.body;
  const icon = req.files['icon'][0].filename;


  // Insert the user's data and image into the database.
  const sqlInsert = "INSERT INTO favicon (name, icon) VALUES (?, ?)";
  db.query(sqlInsert, [name, icon], (err, result) => {
    if (err) {
      console.error('Error inserting data: ' + err.message);
      return res.json({ message: "Error" });
    }
    return res.json({ status: "success" });
  });
};


const get = async (req, res) => {
    const sqlSelect = 'SELECT * FROM favicon';
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




const deleteFavicon=async(req,res)=>{
    const id=req.params.id
    const sqlDelete="DELETE FROM favicon WHERE id = ? ";
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
//     const name = req.body.name;
//     const subname = req.body.subname;
//     const content = req.body.content;
//     const icon = req.files["icon"][0].filename;

//     // Check if the row with the specified 'id' exists
//     const checkSql = 'SELECT * FROM home WHERE id = ?';
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
//                 const sqlUpdate = 'UPDATE home SET name = ?, subname = ?, content = ? , icon = ? WHERE id = ?';
//                 db.query(sqlUpdate, [name, subname, content, icon, id], (updateErr, updateResult) => {
//                     if (updateErr) {
//                         console.log(updateErr);
//                         res.json({ error: 'Error updating data' });
//                     } else {
//                         console.log(updateResult);
//                         res.json({ id, name, icon });
//                     }
//                 });
//             }
//         }
//     });
// };

const update = async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    

    let icon = ''; // Initialize icon variable

    // Check if the 'icon' file exists in the request
    if (req.files && req.files['icon'] && req.files['icon'][0]) {
        icon = req.files['icon'][0].filename; // If icon exists, update the variable
    }

    // Check if 'icon' value is empty
    if (!icon) {
        // If 'icon' value is not updated, only update the text fields
        const checkSql = 'SELECT icon FROM favicon WHERE id = ?';
        db.query(checkSql, [id], (checkErr, checkResult) => {
            if (checkErr) {
                console.log(checkErr);
                res.json({ error: 'Error checking data' });
            } else {
                if (checkResult.length === 0) {
                    res.json({ error: 'No data found for the specified ID' });
                } else {
                    const currenticon = checkResult[0].icon;

                    // Update only the text fields without changing the icon
                    const sqlUpdateText = 'UPDATE favicon SET name = ? WHERE id = ?';
                    db.query(sqlUpdateText, [name, id], (updateErr, updateResult) => {
                        if (updateErr) {
                            console.log(updateErr);
                            res.json({ error: 'Error updating text data' });
                        } else {
                            console.log(updateResult);
                            res.json({ id, name, icon: currenticon });
                        }
                    });
                }
            }
        });
    } else {
        // If 'icon' is updated or a new icon is provided, proceed with the update
        const sqlUpdateAll = 'UPDATE favicon SET name = ?, icon = ? WHERE id = ?';
        db.query(sqlUpdateAll, [name,icon, id], (updateErr, updateResult) => {
            if (updateErr) {
                console.log(updateErr);
                res.json({ error: 'Error updating data' });
            } else {
                console.log(updateResult);
                res.json({ id, name, icon });
            }
        });
    }
};


module.exports={add,get,update,deleteFavicon}