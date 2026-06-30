import { query } from '../config/db.js';
import {
  menuSql,
  attendanceSql,
  totalAttendanceSql,
  myRatingSql,
  todayAvgRatingSql,
  weekAvgRatingSql,
  myTodayFeedbackSql,
  myWeekFeedbackSql,
  todayFeedbackSql,
  weekFeedbackSql,
  insertAttendanceSql,
  insertRatingSql,
  insertFeedbackSql,
} from '../queries/messQueries.js';

const firstOrNull = (rows) => (rows.length > 0 ? rows[0] : null);

export const getMessDashboard = async (req, res) => {
  const reg_no = req.params.id;

  try {
    // Independent queries run in parallel instead of one-after-another.
    const [
      menu,
      attendance,
      totalAttendance,
      myRating,
      todayAvg,
      weekAvg,
      myTodayFeedback,
      myWeekFeedback,
      todayFeedback,
      weekFeedback,
    ] = await Promise.all([
      query(menuSql, [reg_no]),
      query(attendanceSql, [reg_no]),
      query(totalAttendanceSql),
      query(myRatingSql, [reg_no]),
      query(todayAvgRatingSql),
      query(weekAvgRatingSql),
      query(myTodayFeedbackSql, [reg_no]),
      query(myWeekFeedbackSql, [reg_no]),
      query(todayFeedbackSql),
      query(weekFeedbackSql),
    ]);

    res.json({
      success: true,
      menu,
      attendance: firstOrNull(attendance),
      totalAttendance: firstOrNull(totalAttendance),
      myRating: firstOrNull(myRating),
      todayAverageRating: firstOrNull(todayAvg),
      weeklyAverageRating: firstOrNull(weekAvg),
      myTodayFeedback: firstOrNull(myTodayFeedback),
      myWeekFeedback,
      todayFeedback,
      weekFeedback,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateMessDashboard = async (req, res) => {
  const reg_no = req.params.id;
  const { attendence, formData } = req.body;

  try {
    // Attendance — only act on a properly-formed [meal, status] pair.
    // This guards against the old bug where an empty/undefined attendence
    // value was silently treated as truthy and written as a "dinner" row.
    if (Array.isArray(attendence) && attendence.length === 2) {
      const [meal, status] = attendence;
      const columnByMeal = {
        Breakfast: 'breakfast',
        Lunch: 'lunch',
        Dinner: 'dinner',
      };
      const column = columnByMeal[meal];

      if (column && (status === 0 || status === 1)) {
        await query(insertAttendanceSql(column), [reg_no, status]);
      }
    }

    // Rating
    if (formData && formData.rating) {
      await query(insertRatingSql, [reg_no, formData.rating]);
    }

    // Feedback
    if (formData && formData.comment && formData.comment.trim() !== '') {
      await query(insertFeedbackSql, [reg_no, formData.comment]);
    }

    res.json({
      success: true,
      message: 'Data saved successfully.',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Failed to save data.' });
  }
};