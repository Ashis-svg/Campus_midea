import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold mb-6">
        Smart Campus Management System
      </h1>

      <button
        onClick={() => navigate("/student/register")}
        className="bg-blue-500 text-white px-6 py-2 rounded"
      >
        Student Register
      </button>

      <button
        onClick={() => navigate("/student/login")}
        className="bg-green-500 text-white px-6 py-2 rounded"
      >
        Student Login
      </button>

      <button
        onClick={() => navigate("/admin/register")}
        className="bg-purple-500 text-white px-6 py-2 rounded"
      >
        Admin Register
      </button>

      <button
        onClick={() => navigate("/admin/login")}
        className="bg-red-500 text-white px-6 py-2 rounded"
      >
        Admin Login
      </button>
    </div>
  );
};

export default Home;