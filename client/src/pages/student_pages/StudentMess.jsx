import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const StudentMess = () => {
  const { id } = useParams();

  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/student/mess/${id}`
        );

        setMenu(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMenu();
  }, [id]);

  return (
    <div className="p-6 bg-black text-white h-screen">
      <h1 className="text-2xl font-bold mb-6">Today's Menu</h1>

      {menu.map((meal) => (
        <div
          key={meal.id}
          className="border rounded-lg p-4 mb-4 shadow"
        >
          <h2 className="text-xl font-semibold mb-2">
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
    </div>
  );
};

export default StudentMess;