import db from '../config/db.js';

export const login = (req, res) => {
  const { reg_no, password } = req.body;

  const sql = 'SELECT * FROM student_login WHERE reg_no = ? AND password = ?';

  db.query(sql, [reg_no, password], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length > 0) {
      return res.json({
        success: true,
        student: result[0],
      });
    }

    res.status(401).json({
      success: false,
      message: 'Invalid Credentials',
    });
  });
};