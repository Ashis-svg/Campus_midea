// All raw SQL for the student/mess endpoints lives here, so the
// controller can stay focused on flow/logic instead of long template strings.

export const menuSql = `
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

export const attendanceSql = `
  SELECT breakfast, lunch, dinner
  FROM mess_attendance
  WHERE reg_no = ?
  AND attendance_date = CURDATE();
`;

export const totalAttendanceSql = `
  SELECT
      IFNULL(SUM(breakfast), 0) AS breakfast,
      IFNULL(SUM(lunch), 0) AS lunch,
      IFNULL(SUM(dinner), 0) AS dinner
  FROM mess_attendance
  WHERE attendance_date = CURDATE();
`;

export const myRatingSql = `
  SELECT rating
  FROM mess_rating
  WHERE reg_no = ?
  AND rating_date = CURDATE();
`;

export const todayAvgRatingSql = `
  SELECT ROUND(AVG(rating),2) AS avg_rating
  FROM mess_rating
  WHERE rating_date = CURDATE();
`;

export const weekAvgRatingSql = `
  SELECT ROUND(AVG(rating),2) AS avg_rating
  FROM mess_rating
  WHERE rating_date BETWEEN DATE_SUB(CURDATE(), INTERVAL 6 DAY)
                        AND CURDATE();
`;

export const myTodayFeedbackSql = `
  SELECT message
  FROM mess_feedback
  WHERE reg_no = ?
  AND message_date = CURDATE();
`;

export const myWeekFeedbackSql = `
  SELECT message, message_date
  FROM mess_feedback
  WHERE reg_no = ?
  AND message_date BETWEEN DATE_SUB(CURDATE(), INTERVAL 6 DAY)
                       AND CURDATE()
  ORDER BY message_date DESC;
`;

export const todayFeedbackSql = `
  SELECT
  s.name,
  f.message
  FROM mess_feedback f
  JOIN student s
  ON f.reg_no = s.reg_no
  WHERE f.message_date = CURDATE()
  ORDER BY f.id DESC;
`;

export const weekFeedbackSql = `
  SELECT
      s.name,
      f.message,
      f.message_date
  FROM mess_feedback f
  JOIN student s
  ON f.reg_no = s.reg_no
  WHERE f.message_date BETWEEN DATE_SUB(CURDATE(), INTERVAL 6 DAY)
   AND CURDATE()
  ORDER BY f.message_date DESC, f.id DESC;
`;

export const insertAttendanceSql = (column) => `
  INSERT INTO mess_attendance
  (reg_no, attendance_date, ${column})
  VALUES (?, CURDATE(), ?)
  ON DUPLICATE KEY UPDATE
  ${column} = VALUES(${column});
`;

export const insertRatingSql = `
  INSERT INTO mess_rating
  (reg_no, rating_date, rating)
  VALUES (?, CURDATE(), ?)
  ON DUPLICATE KEY UPDATE
  rating = VALUES(rating);
`;

export const insertFeedbackSql = `
  INSERT INTO mess_feedback
  (reg_no, message, message_date)
  VALUES (?, ?, CURDATE())
  ON DUPLICATE KEY UPDATE
  message = VALUES(message);
`;