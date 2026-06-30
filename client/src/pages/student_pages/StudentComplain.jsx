import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const StudentComplain = () => {
  const { id } = useParams();

  const [menu, setMenu] = useState([]);
  const [flag, setFlag] = useState(true);
  const [formData, setFormData] = useState({
    comment: "",
    rating: ""
  });

  //Fetching from backend///////////////////////
  const [attenDance, setAttenDance] = useState({
    breakfast: 0,
    lunch: 0,
    dinner: 0
  });
  const [totalAttendance, setTotalAttendance] = useState({
    breakfast: 0,
    lunch: 0,
    dinner: 0
  });
  const [myRating, setMyRating] = useState(0);
  const [todayAverageRating, setTodayAverageRating] = useState(0);
  const [weeklyAverageRating, setWeeklyAverageRating] = useState(0);
  const [myTodayFeedback, setMyTodayFeedback] = useState("");
  const [myWeekFeedback, setMyWeekFeedback] = useState([]);
  const [todayFeedback, setTodayFeedback] = useState([]);
  const [weekFeedback, setWeekFeedback] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/student/mess/${id}`
        );

        if (res.data.success) {
          setMenu(res.data.menu);

          setAttenDance(res.data.attendance || {
            breakfast: 0,
            lunch: 0,
            dinner: 0,
          });

          setMyRating(res.data.myRating?.rating || 0);
          setTodayAverageRating(res.data.todayAverageRating?.avg_rating || 0);
          setWeeklyAverageRating(res.data.weeklyAverageRating?.avg_rating || 0);
          setMyTodayFeedback(res.data.myTodayFeedback?.message || "");
          setMyWeekFeedback(res.data.myWeekFeedback || []);
          setTodayFeedback(res.data.todayFeedback || []);
          setWeekFeedback(res.data.weekFeedback || []);
          setTotalAttendance(res.data.totalAttendance || {
            breakfast: 0,
            lunch: 0,
            dinner: 0
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchMenu();
  }, [id, flag]);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const tomorrow = new Date(
    Date.now() + 24 * 60 * 60 * 1000
  ).toLocaleDateString("en-US", {
    weekday: "long",
  });

  const todayMenu = menu.filter(
    (item) => item.week_day === today
  );

  const tomorrowMenu = menu.filter(
    (item) => item.week_day === tomorrow
  );

  // Single place that talks to the POST endpoint. Called directly from
  // user actions (button clicks / form submit) instead of being driven
  // by a useEffect tied to `flag`, which used to fire on every mount
  // and on every refetch with stale/empty data.
  const submitData = async (payload) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/student/mess/${id}`,
        payload
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      // refetch menu/state after the save completes
      setFlag((f) => !f);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitData({ formData });
  };

  const handleAttendance = (meal, status) => {
    submitData({ attendence: [meal, status] });
  };

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      {/* Today's Menu */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        Today's Menu ({today})
      </h1>

      {todayMenu.map((meal) => (
        <div
          key={meal.id}
          className="border rounded-lg p-4 mb-4 shadow"
        >
          <h2 className="text-xl font-semibold mb-2 text-green-400">
            {meal.meal}
          </h2>

          <ul className="list-disc pl-5">
            <li>{meal.item1}</li>
            <li>{meal.item2}</li>
            <li>{meal.item3}</li>
            <li>{meal.item4}</li>
            <li>{meal.item5}</li>
          </ul>
        </div>
      ))}

      <div className="min-h-screen bg-black flex justify-center items-center p-6">
        <form onSubmit={handleSubmit} className="bg-gray-900 text-white w-full max-w-lg p-8 rounded-xl shadow-lg">

          <h1 className="text-3xl font-bold text-center mb-8">
            Mess Feedback
          </h1>

          {/* Rating */}
          <div className="mb-6">
            <label className="block mb-2 text-lg font-medium">
              Rate Today's Food
            </label>

            <select onChange={handleChange}
              name="rating"
              value={formData.rating}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none"
            >
              <option value="">Select Rating</option>
              <option value="1">⭐ 1 - Poor</option>
              <option value="2">⭐⭐ 2 - Fair</option>
              <option value="3">⭐⭐⭐ 3 - Good</option>
              <option value="4">⭐⭐⭐⭐ 4 - Very Good</option>
              <option value="5">⭐⭐⭐⭐⭐ 5 - Excellent</option>
            </select>
          </div>

          {/* Comment */}
          <div className="mb-6">
            <label className="block mb-2 text-lg font-medium">
              Comment
            </label>

            <textarea onChange={handleChange}
              name="comment"
              value={formData.comment}
              rows="5"
              placeholder="Write your feedback..."
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg text-lg font-semibold"
          >
            Submit Feedback
          </button>

        </form>
      </div>

      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-5xl mx-auto space-y-8">

          {/* Your Feedback */}
          <div className="bg-gray-900 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-green-400">
              My Feedback
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">My Ratings</h3>
                <p className="text-gray-300">{myRating}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">My Comments</h3>
                <p className="text-gray-300 bg-gray-800 p-3 rounded-lg">
                  {myTodayFeedback}
                </p>
              </div>
            </div>
          </div>

          {/* Community Comments */}
          <div className="bg-gray-900 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">
              Student Comments
            </h2>

            <div className="space-y-4">
              {todayFeedback.length > 0 ? (
                todayFeedback.map((fb, idx) => (
                  <div key={idx} className="bg-gray-800 p-4 rounded-lg">
                    <p className="text-gray-200">{fb.message}</p>
                    <div className="mt-2 text-sm text-gray-400">{fb.name}</div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No comments yet today.</p>
              )}
            </div>
          </div>

          {/* Weekly Average Rating */}
          <div className="bg-gray-900 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">
              Mess Report
            </h2>

            <div className="grid grid-cols-2 gap-6">

              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold">
                 Last Week Average Rating
                </h3>
                <p className="text-yellow-400 text-xl font-bold">
                  ⭐ {weeklyAverageRating}
                </p>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold">
                  Total attendance for:
                </h3>
                <p className="text-yellow-400 text-xl font-bold">
                  Breakfast: {totalAttendance.breakfast}
                  <br />
                  Lunch: {totalAttendance.lunch}
                  <br />
                  Dinner: {totalAttendance.dinner}
                  <br />
                </p>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold">
                  My Attendance:
                </h3>
                <p className="text-yellow-400 text-xl font-bold">
                  Breakfast: {attenDance.breakfast}
                  <br />
                  Lunch: {attenDance.lunch}
                  <br />
                  Dinner: {attenDance.dinner}
                  <br />
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Tomorrow's Menu */}
      <h1 className="text-3xl font-bold mt-10 mb-6 text-center">
        Tomorrow's Menu ({tomorrow})
      </h1>

      {tomorrowMenu.map((meal) => (
        <div
          key={meal.id}
          className="border rounded-lg p-4 mb-4 shadow"
        >
          <h2 className="text-xl font-semibold mb-2 text-blue-400">
            {meal.meal}
          </h2>

          <ul className="list-disc pl-5">
            <li>{meal.item1}</li>
            <li>{meal.item2}</li>
            <li>{meal.item3}</li>
            <li>{meal.item4}</li>
            <li>{meal.item5}</li>
          </ul>
          <div className="flex justify-center">
            <h1 className="bg-purple-700 text-white font-bold py-2 px-4 m-5">Attendence</h1>

            <button
              onClick={() => handleAttendance(meal.meal, 1)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-5"
            >
              Yes
            </button>
            <button
              onClick={() => handleAttendance(meal.meal, 0)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-5"
            >
              No
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentComplain;