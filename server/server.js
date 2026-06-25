import express from 'express'
import mysql from 'mysql2'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const app=express();
const PORT=3000
app.use(express.json())
app.use(cors())

//Connecting database

const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.SQLP,
    database: 'student_media'
})

db.connect((err)=>{
    if(err){
        console.log("Database connection failed!",err);
        return;
    }
    console.log("database connected successfully!")
})

app.get("/",(req,res)=>{
    res.send("Hello!")
})

app.post("/student/login", (req, res) => {
  const { reg_no, password } = req.body;
//console.log(req.body)
  const sql =
    "SELECT * FROM student_login WHERE reg_no = ? AND password = ?";

  db.query(sql, [reg_no, password], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length > 0) {
      res.json({
        success: true,
        student: result[0],
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
  });
});

///////////////////////////////////////////////


app.get("/student/mess/:id",(req,res)=>{
    const userId=req.params.id;
    console.log(`Id: ${userId}`)

    const sql = `
    SELECT m.*
    FROM Student s
    JOIN Mess_Menu m
    ON s.hall_no = m.hall_no
    WHERE s.reg_no = ?
    AND m.week_day = DAYNAME(CURDATE())
  `;

  db.query(sql,[userId],(err,result)=>{
    if(err) return res.status(500).json(err)

      res.json(result);
  })
})

app.listen(PORT,()=>{
    console.log(`app is running on ${PORT}`)
})