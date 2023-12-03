// const db=require("../config/config")


// // const add = async (req, res) => {
// //   const { link1, link2, link3 } = req.body;
// // const social1=req.files['social1'][0].filename
// // const social2=req.files['social2'][0].filename
// // const social3=req.files['social3'][0].filename

// //   // Insert the user's data and image into the database.
// //   const sqlInsert = "INSERT INTO footerhome (link1, link2, link3, social1,social2,social3) VALUES (?, ?, ?, ?, ?, ?)";
// //   db.query(sqlInsert, [link1, link2, link3,social1,social2,social3], (err, result) => {
// //     if (err) {
// //       console.error('Error inserting data: ' + err.message);
// //       return res.json({ message: "Error" });
// //     }
// //     return res.json({ status: "success" });
// //   });
// // };
// const add = async (req, res) => {
//     const { link1, link2, link3 } = req.body;
//     const social1 = req.files['social1'] ? req.files['social1'][0].filename : null;
//     const social2 = req.files['social2'] ? req.files['social2'][0].filename : null;
//     const social3 = req.files['social3'] ? req.files['social3'][0].filename : null;
  
//     // Check if link1 is empty and social1 is not empty
//     const link1IsEmpty = !link1 || link1.trim() === '';
//     const social1IsNotEmpty = !!social1;
  
//     // If link1 is empty and social1 is not empty, set social1 to null
//     const finalSocial1 = (link1IsEmpty && social1IsNotEmpty) ? null : social1;
//     const link2IsEmpty = !link2 || link2.trim() === '';
//     const social2IsNotEmpty = !!social2;
  
//     const finalSocial2 = (link2IsEmpty && social2IsNotEmpty) ? null : social2;
//       const link3IsEmpty = !link3 || link3.trim() === '';
//       const social3IsNotEmpty = !!social3;
    
//       const finalSocial3 = (link3IsEmpty && social3IsNotEmpty) ? null : social3;
//     const sqlInsert = "INSERT INTO footerhome (link1, link2, link3, social1, social2, social3) VALUES (?, ?, ?, ?, ?, ?)";
//     db.query(sqlInsert, [link1, link2, link3, finalSocial1, finalSocial2, finalSocial3], (err, result) => {
//       if (err) {
//         console.error('Error inserting data: ' + err.message);
//         return res.json({ message: "Error" });
//       }
//       return res.json({ status: "success" });
//     });
//   };
  

// const get = async (req, res) => {
//     const sqlSelect = 'SELECT * FROM footerhome';
//     db.query(sqlSelect, (err, result) => {
//         if (err) {
//             console.log(err);
//             res.json({ error: "Error fetching data" });
//         } else {
//             console.log(result);
//             res.json(result);
//         }
//     });
// };




// const deleteFooterHome=async(req,res)=>{
//     const id=req.params.id
//     const sqlDelete="DELETE FROM footerhome WHERE id = ? ";
//     db.query(sqlDelete,[id],(err,result)=>{
//         if(err){
//             console.log(err)
//             res.json("Error Deleted")
//         }
//         else{
//             console.log(result)
//             res.json("Deleted Succsesfully")
//         }
//     })
// }
// const update = async (req, res) => {
//     const id = req.params.id;
//     const link1 = req.body.link1 || null;
//     const link2 = req.body.link2 || null;
//     const link3 = req.body.link3 || null;
//     const social1 = req.files["social1"] ? req.files["social1"][0].filename : null;
//   const social2 = req.files["social2"] ? req.files["social2"][0].filename : null;
//   const social3 = req.files["social3"] ? req.files["social3"][0].filename : null;

//     const link1IsEmpty = !link1 || link1.trim() === '';
//     const social1IsNotEmpty = !!social1;
    
//     const finalSocial1 = (link1IsEmpty && social1IsNotEmpty) ? null : social1;

//     const link2IsEmpty=!link2 || link2.trim() === '';
//     const social2IsNotEmpty=!!social2
//     const finalSocial2=(link2IsEmpty && social2IsNotEmpty) ? null : social2;
    
//     const link3IsEmpty=!link3 || link3.trim() === '';
//     const social3IsNotEmpty=!!social3 
//     const finalSocial3=(link3IsEmpty && social3IsNotEmpty) ? null : social3;
//     // If link1 is empty and social1 is not empty, set social1 to null
//     // Check if the row with the specified 'id' exists
//     const checkSql = 'SELECT * FROM footerhome WHERE id = ?';
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
//                 const sqlUpdate = 'UPDATE footerhome SET link1 = ?, link2 = ?, link3 = ?  , social1 = ? , social2 = ? , social3 = ? WHERE id = ?';
//                 db.query(sqlUpdate, [link1, link2, link3, finalSocial1, finalSocial2, finalSocial3, id], (updateErr, updateResult) => {
//                     if (updateErr) {
//                         console.log(updateErr);
//                         res.json({ error: 'Error updating data' });
//                     } else {
//                         console.log(updateResult);
//                         res.json({ id, link1, link2,link3, finalSocial1, finalSocial2, finalSocial3 });
//                     }
//                 });
//             }
//         }
//     });
// };

// // const update = async (req, res) => {
// //     const id = req.params.id;
// //     const link1 = req.body.link1 || null;
// //     const link2 = req.body.link2 || null;
// //     const link3 = req.body.link3 || null;
// //     const social1 = req.files["social1"] ? req.files["social1"][0].filename : null;
// //     const social2 = req.files["social2"] ? req.files["social2"][0].filename : null;
// //     const social3 = req.files["social3"] ? req.files["social3"][0].filename : null;

// //     // Check if the row with the specified 'id' exists
// //     const checkSql = 'SELECT * FROM footerhome WHERE id = ?';
// //     db.query(checkSql, [id], (checkErr, checkResult) => {
// //         if (checkErr) {
// //             console.log(checkErr);
// //             res.json({ error: 'Error checking data' });
// //         } else {
// //             if (checkResult.length === 0) {
// //                 // No matching row found, return an error
// //                 res.json({ error: 'No data found for the specified ID' });
// //             } else {
// //                 // Row exists, proceed with the update
// //                 let sqlUpdate = 'UPDATE footerhome SET ';
// //                 const updateParams = [];
// //                 if (link1 !== null) {
// //                     sqlUpdate += 'link1 = ?, ';
// //                     updateParams.push(link1);
// //                 }
// //                 if (link2 !== null) {
// //                     sqlUpdate += 'link2 = ?, ';
// //                     updateParams.push(link2);
// //                 }
// //                 if (link3 !== null) {
// //                     sqlUpdate += 'link3 = ?, ';
// //                     updateParams.push(link3);
// //                 }
// //                 if (social1 !== null) {
// //                     sqlUpdate += 'social1 = ?, ';
// //                     updateParams.push(social1);
// //                 }
// //                 if (social2 !== null) {
// //                     sqlUpdate += 'social2 = ?, ';
// //                     updateParams.push(social2);
// //                 }
// //                 if (social3 !== null) {
// //                     sqlUpdate += 'social3 = ?, ';
// //                     updateParams.push(social3);
// //                 }
// //                 sqlUpdate = sqlUpdate.slice(0, -2); // Remove the last comma and space

// //                 sqlUpdate += ' WHERE id = ?';
// //                 updateParams.push(id);

// //                 db.query(sqlUpdate, updateParams, (updateErr, updateResult) => {
// //                     if (updateErr) {
// //                         console.log(updateErr);
// //                         res.json({ error: 'Error updating data' });
// //                     } else {
// //                         console.log(updateResult);
// //                         res.json({ id, link1, link2, link3, social1, social2, social3 });
// //                     }
// //                 });
// //             }
// //         }
// //     });
// // };

// module.exports={add,get,update,deleteFooterHome}


const db=require("../config/config")


const add = async (req, res) => {
const {link}=req.body
const socialmedia=req.files['socialmedia'][0].filename

  // Insert the user's data and image into the database.
  const sqlInsert = "INSERT INTO footerhome (link,socialmedia) VALUES (?, ?)";
  db.query(sqlInsert, [link ,socialmedia], (err, result) => {
    if (err) {
      console.error('Error inserting data: ' + err.message);
      return res.json({ message: "Error" });
    }
    return res.json({ status: "success" });
  });
};


const get = async (req, res) => {
    const sqlSelect = 'SELECT * FROM footerhome';
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




const deleteFooterHome=async(req,res)=>{
    const id=req.params.id
    const sqlDelete="DELETE FROM footerhome WHERE id = ? ";
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
    
//     const link = req.body.link;
//     const socialmedia = req.files["socialmedia"][0].filename;

//     // Check if the row with the specified 'id' exists
//     const checkSql = 'SELECT * FROM footerhome WHERE id = ?';
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
//                 const sqlUpdate = 'UPDATE footerhome SET link = ?, socialmedia = ?  WHERE id = ?';
//                 db.query(sqlUpdate, [link, socialmedia, id], (updateErr, updateResult) => {
//                     if (updateErr) {
//                         console.log(updateErr);
//                         res.json({ error: 'Error updating data' });
//                     } else {
//                         console.log(updateResult);
//                         res.json({ id,link,socialmedia});
//                     }
//                 });
//             }
//         }
//     });
// };
const update = async (req, res) => {
    const id = req.params.id;
    const link = req.body.link;
 

    let socialmedia = ''; // Initialize socialmedia variable

    // Check if the 'socialmedia' file exists in the request
    if (req.files && req.files['socialmedia'] && req.files['socialmedia'][0]) {
        socialmedia = req.files['socialmedia'][0].filename; // If socialmedia exists, update the variable
    }

    // Check if 'socialmedia' value is empty
    if (!socialmedia) {
        // If 'socialmedia' value is not updated, only update the text fields
        const checkSql = 'SELECT socialmedia FROM footerhome WHERE id = ?';
        db.query(checkSql, [id], (checkErr, checkResult) => {
            if (checkErr) {
                console.log(checkErr);
                res.json({ error: 'Error checking data' });
            } else {
                if (checkResult.length === 0) {
                    res.json({ error: 'No data found for the specified ID' });
                } else {
                    const currentsocialmedia = checkResult[0].socialmedia;

                    // Update only the text fields without changing the socialmedia
                    const sqlUpdateText = 'UPDATE footerhome SET link = ? WHERE id = ?';
                    db.query(sqlUpdateText, [link,id], (updateErr, updateResult) => {
                        if (updateErr) {
                            console.log(updateErr);
                            res.json({ error: 'Error updating text data' });
                        } else {
                            console.log(updateResult);
                            res.json({ id, link,socialmedia: currentsocialmedia });
                        }
                    });
                }
            }
        });
    } else {
        // If 'socialmedia' is updated or a new socialmedia is provided, proceed with the update
        const sqlUpdateAll = 'UPDATE footerhome SET link = ?,socialmedia = ? WHERE id = ?';
        db.query(sqlUpdateAll, [link, socialmedia, id], (updateErr, updateResult) => {
            if (updateErr) {
                console.log(updateErr);
                res.json({ error: 'Error updating data' });
            } else {
                console.log(updateResult);
                res.json({ id, link,socialmedia });
            }
        });
    }
};

module.exports={add,get,update,deleteFooterHome}