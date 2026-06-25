import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentLogin = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    reg_no: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    console.log(formData);

    try{
     const res= await axios.post(`http://localhost:3000/student/login`, formData);

     if(res.data.success){
      navigate(`/student/home/${formData.reg_no}`)
     }
    }
    catch(error){
      console.log(error)
    }
    
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          Student Login
        </h1>

        <div className="mb-4">
          <label className="block mb-2">Registration Number</label>
          <input
            type="text"
            name="reg_no"
            value={formData.reg_no}
            onChange={handleChange}
            placeholder="Enter Registration Number"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Password"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default StudentLogin;