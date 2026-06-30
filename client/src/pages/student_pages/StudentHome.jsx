import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
const StudentHome = () => {

  const {id}=useParams();

  const nevigate=useNavigate();
  return (
    <>
    <div className='bg-black h-screen w-screen'>
        <button onClick={()=>nevigate(`/student/mess/${id}`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-5">
  Mess
</button>
<button onClick={()=>nevigate(`/student/complain/${id}`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-5">
  Complain
</button>

<button onClick={()=>nevigate("/student/academics")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-5">
  academics
</button>

<button onClick={()=>nevigate("/Opinion")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-5">
  Opinions
</button>
    </div>
    </>
  )
}

export default StudentHome