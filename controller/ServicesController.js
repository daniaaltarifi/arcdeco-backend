const db=require("../config/config")

const add = async (req, res) => {
    console.log(req.body); // Log the request body to see what data is received

    const { title, content} = req.body;
   
  
    // Insert the user's data and image into the database.
    const sqlInsert = "INSERT INTO services (title, content) VALUES (?, ?)";
    db.query(sqlInsert, [title, content], (err, result) => {
      if (err) {
        console.error('Error inserting data: ' + err.message);
        return res.json({ message: "Error" });
      }
      return res.json({ status: "success" });
    });
  };
  
  
  

const get = async (req, res) => {
    const sqlSelect = 'SELECT * FROM services';
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




const deleteServices=async(req,res)=>{
    const id=req.params.id
    const sqlDelete="DELETE FROM services WHERE id = ? ";
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
const update = async (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const content = req.body.content;
    

    // Check if the row with the specified 'id' exists
    const checkSql = 'SELECT * FROM services WHERE id = ?';
    db.query(checkSql, [id], (checkErr, checkResult) => {
        if (checkErr) {
            console.log(checkErr);
            res.json({ error: 'Error checking data' });
        } else {
            if (checkResult.length === 0) {
                // No matching row found, return an error
                res.json({ error: 'No data found for the specified ID' });
            } else {
                // Row exists, proceed with the update
                const sqlUpdate = 'UPDATE services SET title = ?,content = ?  WHERE id = ?';
                db.query(sqlUpdate, [title, content, id], (updateErr, updateResult) => {
                    if (updateErr) {
                        console.log(updateErr);
                        res.json({ error: 'Error updating data' });
                    } else {
                        console.log(updateResult);
                        res.json({ id,title,content});
                    }
                });
            }
        }
    });
};


module.exports={add,get,update,deleteServices}