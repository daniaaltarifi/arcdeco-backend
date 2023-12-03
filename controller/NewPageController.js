const db=require('../config/config.js')
const add= async(req,res)=>{
    const { title, path,nav} = req.body;
// Insert the user's data and image into the database.
const sqlInsert = "INSERT INTO newpage (title, path, nav) VALUES (?, ?, ?)";
db.query(sqlInsert, [title, path, nav], (err, result) => {
  if (err) {
    console.error('Error inserting data: ' + err.message);
    return res.json({ message: "Error" });
  }
  return res.json({ status: "success" });
});
}
const get = async (req, res) => {
    const sqlSelect = 'SELECT * FROM newpage';
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
const getbyid = async (req, res) => {
    const id = req.params.id; // Access the 'id' parameter from the request

    const sqlSelect = 'SELECT * FROM newpage WHERE path = ?';
    db.query(sqlSelect, [id], (err, result) => { // Pass the 'id' as a parameter value
        if (err) {
            console.log(err);
            res.json({ error: "Error fetching data" });
        } else {
            console.log(result);
            if (result.length > 0) {
                const singleResult = result[0]; // Extract the first element
                res.json(singleResult); // Send the single object as response
            } else {
                res.json({}); // Send an empty object if no data found
            }
        }
    });
};

const deleteNewPage = async (req, res) => {
    const id = req.params.id;
    
    // Check if the ID exists
    const sqlSelect = "SELECT * FROM newpage WHERE id = ?";
    db.query(sqlSelect, [id], (err, rows) => {
        if (err) {
            console.log(err);
            res.json("Error checking ID existence");
        } else {
            if (rows.length > 0) {
                // If the ID exists, proceed with deletion
                const sqlDelete = "DELETE FROM newpage WHERE id = ? ";
                db.query(sqlDelete, [id], (deleteErr, result) => {
                    if (deleteErr) {
                        console.log(deleteErr);
                        res.json("Error deleting entry");
                    } else {
                        console.log(result);
                        res.json("Deleted Successfully");
                    }
                });
            } else {
                // If the ID does not exist, return a message
                res.json("ID does not exist");
            }
        }
    });
};
const update = async(req,res)=>{
    const { title, path, nav} = req.body;
    const id = req.params.id;
    const sqlUpdate = "UPDATE newpage SET title =?, path =?, nav =? WHERE id =?";
    db.query(sqlUpdate, [title, path, nav, id ], (err, result) => {
        if (err) {
            console.error('Error updating data:'+ err.message);
            return res.json({ message: "Error" });
        }
        return res.json({ status: "success" });
        console.log(result)
    });
}

module.exports ={add,get,getbyid,deleteNewPage,update}