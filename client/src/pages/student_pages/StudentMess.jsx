import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const StudentMess = () => {
  const { id } = useParams();

  const [menu, setMenu] = useState([]);
  const[attendence,setAttendence]=useState([]);
  const[flag,setFlag]=useState(true);
  const[formData,setFormData]=useState({
    comment: "",
    rating:""
  })

useEffect(() => {
  const fetchMenu = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/student/mess/${id}`
      );

      if (res.data.success) {
        setMenu(res.data.menu);
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchMenu();
}, [id]);

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

  //Function for not attendence and feedback
useEffect(()=>{
   const attendenceAndFeedback=async ()=>{
      try {
    const response = await axios.post(
      `http://localhost:3000/student/mess/${id}`,
      {
        attendence: attendence,
        formData: formData

      }
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Request completed");
  }
   }

   attendenceAndFeedback();
},[flag])

const handleChange= (e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
}

const handleSubmit = (e) => {
    e.preventDefault();
    setFlag(!flag);
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
          <p className="text-gray-300">⭐⭐⭐⭐☆ (4/5)</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">My Comments</h3>
          <p className="text-gray-300 bg-gray-800 p-3 rounded-lg">
            The food quality was good today. The dinner was especially delicious.
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

        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-200">
            The breakfast was really good today.
          </p>
          <div className="mt-2 text-sm text-gray-400">
            👍 12 &nbsp;&nbsp; 👎 1
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-200">
            Rice was overcooked during lunch.
          </p>
          <div className="mt-2 text-sm text-gray-400">
            👍 8 &nbsp;&nbsp; 👎 0
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-200">
            Please include more fruits in breakfast.
          </p>
          <div className="mt-2 text-sm text-gray-400">
            👍 15 &nbsp;&nbsp; 👎 2
          </div>
        </div>

      </div>
    </div>

    {/* Weekly Average Rating */}
    <div className="bg-gray-900 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">
        Weekly Mess Report
      </h2>

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">
            Date Range
          </h3>
          <p className="text-gray-300">
            21 Jul 2026 - 27 Jul 2026
          </p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">
            Average Rating
          </h3>
          <p className="text-yellow-400 text-xl font-bold">
            ⭐ 4.3 / 5
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

        <button onClick={()=>{
            setFlag(!flag);
            setAttendence([meal.meal,1]);
        }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-5">
          Yes
        </button>
        <button onClick={()=>{
          setFlag(!flag)
          setAttendence([meal.meal,0])
        }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-5">
          No
        </button>
        </div>
      </div>
    ))}
  </div>
);
};

export default StudentMess;