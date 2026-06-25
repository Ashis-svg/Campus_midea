import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import StudentRegister from './pages/student_pages/StudentRegister';
import StudentLogin from './pages/student_pages/StudentLogin';
import AdminRegister from './pages/admin_pages/AdminRegister';
import AdminLogin from './pages/admin_pages/AdminLogin';
import StudentHome from './pages/student_pages/StudentHome';
import Error from './pages/Error'
import StudentMess from './pages/student_pages/StudentMess';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Error/>}/>
        <Route path="/" element={<Home />} />

        <Route path="/student/register" element={<StudentRegister />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/home/:id" element={<StudentHome/>} />

        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path='/student/mess/:id' element={<StudentMess/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;