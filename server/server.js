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
//STUDENT/MESS SECTION

app.get("/student/mess/:id", (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT m.*
    FROM student s
    JOIN mess_menu m
      ON s.hall_no = m.hall_no
    WHERE s.reg_no = ?
      AND m.week_day IN (
        DAYNAME(CURDATE()),
        DAYNAME(DATE_ADD(CURDATE(), INTERVAL 1 DAY))
      )
    ORDER BY
      FIELD(
        m.week_day,
        DAYNAME(CURDATE()),
        DAYNAME(DATE_ADD(CURDATE(), INTERVAL 1 DAY))
      ),
      FIELD(
        m.meal,
        'Breakfast',
        'Lunch',
        'Dinner'
      );
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    res.json({
      success: true,
      menu: result,
    });
  });
});

app.post("/student/mess/:id", (req, res) => {
  const reg_no = req.params.id;
  const { attendence, formData } = req.body;

  // Attendance
  if (attendence) {
    const meal = attendence[0];   // Breakfast/Lunch/Dinner
    const status = attendence[1]; // 0 or 1

    let column = "";

    if (meal === "Breakfast") column = "breakfast";
    else if (meal === "Lunch") column = "lunch";
    else column = "dinner";

    const attendanceSql = `
        INSERT INTO mess_attendance
        (reg_no, attendance_date, ${column})
        VALUES (?, CURDATE(), ?)
        ON DUPLICATE KEY UPDATE
        ${column} = VALUES(${column});
    `;

    db.query(attendanceSql, [reg_no, status], (err) => {
        if (err) console.log(err);
    });
}
  // Rating
 if (formData.rating) {

    const ratingSql = `
        INSERT INTO mess_rating
        (reg_no, rating_date, rating)
        VALUES (?, CURDATE(), ?)
        ON DUPLICATE KEY UPDATE
        rating = VALUES(rating);
    `;

    db.query(ratingSql, [reg_no, formData.rating], (err) => {
        if (err) console.log(err);
    });
}

  // Feedback
  if (formData.comment && formData.comment.trim() !== "") {

    const feedbackSql = `
        INSERT INTO mess_feedback
        (reg_no, message, message_date)
        VALUES (?, ?, CURDATE())
        ON DUPLICATE KEY UPDATE
        message = VALUES(message);
    `;

    db.query(feedbackSql, [reg_no, formData.comment], (err) => {
        if (err) console.log(err);
    });
}

  res.json({
    success: true,
    message: "Data saved successfully."
  });
});

app.listen(PORT,()=>{
    console.log(`app is running on ${PORT}`)
})