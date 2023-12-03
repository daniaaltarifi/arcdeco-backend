const db = require("../config/config.js")
const dotenv=require("dotenv")
dotenv.config(".env");
const SECRETTOKEN=process.env.SECRETTOKEN 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const salt = 10;
const signUp = async (req, res) => {
    const sql = "INSERT INTO login (`name`,`email`,`password`,`role`) VALUES (?)"
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json({ Error: "Error hashing password" })
        const values = [
            req.body.name,
            req.body.email,
            hash,
            "user" // Set a default role for new users

        ]
        db.query(sql, [values], (err, result) => {
            if (err) return res.json({ Error: "inserting data error in server" })
            return res.json({ Status: "Succses" })
        })
    })

}
const login = async (req, res) => {
    const sql = 'SELECT * FROM login WHERE email = ? ';
    db.query(sql, [req.body.email], (err, data) => {
        if (err) {
            return res.json({ Error: "Login error in server" })
        }
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) return res.json({ Error: "Password compare error" })
                if (response) {
                    const { name, role } = data[0];
                    const token=jwt.sign({name,role},SECRETTOKEN,{expiresIn:"1d"})
                    res.cookie('token',token)
                    return res.json({ Status: "Succses", role  })
                }
                else {
                    return res.json({Status:"Faield",Error:"Incoorect Password", role: null })
                }
            })
        }
        else {
            return res.json({message:"Email Not Found", Error: "No email exists" })
        }
    })
}
const logout=async(req,res)=>{
    res.clearCookie('token')
    return  res.json({Status:"Success"})
}
module.exports = { signUp, login ,logout}