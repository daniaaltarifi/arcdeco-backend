const add = async (req, res) => {
    const { title, subtitle, content } = req.body;
    const video = req.files['video'][0].filename;
    const contactVideos = req.files['contact_video'].map((file) => file.filename);
  
    // Insert the user's data into the home table.
    const sqlInsertHome = "INSERT INTO home (title, subtitle, content, video) VALUES (?, ?, ?, ?)";
    db.query(sqlInsertHome, [title, subtitle, content, video], (err, result) => {
      if (err) {
        console.error('Error inserting home data: ' + err.message);
        return res.json({ message: "Error" });
      }
  
      const homeId = result.insertId; // Get the ID of the newly inserted home record
  
      // Insert the contact videos into the contact_videos table.
      const sqlInsertContactVideos = "INSERT INTO contact_videos (home_id, filename) VALUES ?";
      const contactVideoValues = contactVideos.map((filename) => [homeId, filename]);
  
      db.query(sqlInsertContactVideos, [contactVideoValues], (err, result) => {
        if (err) {
          console.error('Error inserting contact videos: ' + err.message);
          return res.json({ message: "Error" });
        }
        return res.json({ status: "success" });
      });
    });
  };
  