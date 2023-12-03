const db=require("../config/config")


const add = async (req, res) => {
  const { title, subtitle, content } = req.body;
  const video = req.files['video'][0].filename;


  // Insert the user's data and image into the database.
  const sqlInsert = "INSERT INTO home (title, subtitle, content, video) VALUES (?, ?, ?, ?)";
  db.query(sqlInsert, [title, subtitle, content, video], (err, result) => {
    if (err) {
      console.error('Error inserting data: ' + err.message);
      return res.json({ message: "Error" });
    }
    return res.json({ status: "success" });
  });
};


const get = async (req, res) => {
    const sqlSelect = 'SELECT * FROM home';
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




const deleteHome=async(req,res)=>{
    const id=req.params.id
    const sqlDelete="DELETE FROM home WHERE id = ? ";
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
//     const subtitle = req.body.subtitle;
//     const content = req.body.content;
//     const video = req.files["video"][0].filename;

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
//                 const sqlUpdate = 'UPDATE home SET title = ?, subtitle = ?, content = ? , video = ? WHERE id = ?';
//                 db.query(sqlUpdate, [title, subtitle, content, video, id], (updateErr, updateResult) => {
//                     if (updateErr) {
//                         console.log(updateErr);
//                         res.json({ error: 'Error updating data' });
//                     } else {
//                         console.log(updateResult);
//                         res.json({ id, title, video });
//                     }
//                 });
//             }
//         }
//     });
// };

const update = async (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const subtitle = req.body.subtitle;
    const content = req.body.content;

    let video = ''; // Initialize video variable

    // Check if the 'video' file exists in the request
    if (req.files && req.files['video'] && req.files['video'][0]) {
        video = req.files['video'][0].filename; // If video exists, update the variable
    }

    // Check if 'video' value is empty
    if (!video) {
        // If 'video' value is not updated, only update the text fields
        const checkSql = 'SELECT video FROM home WHERE id = ?';
        db.query(checkSql, [id], (checkErr, checkResult) => {
            if (checkErr) {
                console.log(checkErr);
                res.json({ error: 'Error checking data' });
            } else {
                if (checkResult.length === 0) {
                    res.json({ error: 'No data found for the specified ID' });
                } else {
                    const currentVideo = checkResult[0].video;

                    // Update only the text fields without changing the video
                    const sqlUpdateText = 'UPDATE home SET title = ?, subtitle = ?, content = ? WHERE id = ?';
                    db.query(sqlUpdateText, [title, subtitle, content, id], (updateErr, updateResult) => {
                        if (updateErr) {
                            console.log(updateErr);
                            res.json({ error: 'Error updating text data' });
                        } else {
                            console.log(updateResult);
                            res.json({ id, title, subtitle, content, video: currentVideo });
                        }
                    });
                }
            }
        });
    } else {
        // If 'video' is updated or a new video is provided, proceed with the update
        const sqlUpdateAll = 'UPDATE home SET title = ?, subtitle = ?, content = ?, video = ? WHERE id = ?';
        db.query(sqlUpdateAll, [title, subtitle, content, video, id], (updateErr, updateResult) => {
            if (updateErr) {
                console.log(updateErr);
                res.json({ error: 'Error updating data' });
            } else {
                console.log(updateResult);
                res.json({ id, title, subtitle, content, video });
            }
        });
    }
};


module.exports={add,get,update,deleteHome}