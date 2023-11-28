import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
function Profile(props)
{
  const navigate = useNavigate();
  let [user, setuser] = useState({ name: "", email: "" });
  useEffect(() =>
  {
    async function getuserdata()
    {
      let data = await fetch('/userdata');
      console.log('data',data);
      if (data.status == 200) {
        data = await data.json();
        console.log('userdata',data);
        setuser({ name: data.name, email: data.email })
      }
      else {
        // props.fun('Log In');
        // navigate("/login");
        data =await data.json();
        console.log('data in profile',data);
      }
    }
    getuserdata();
  }, []);
  function loginhandle()
  {
    if (props.data != "Log In") {
      fetch('/logout', { credentials: 'include' })
        .then(responce => responce.json())
        .then(result =>
        {
          setuser('');
          props.fun("Log In");
          console.log('successfully Logged Out');
        })
    }
    navigate('/login')
  }
  return (
    <div className='w-full lg:border-2 h-96'>
      <table className='flex flex-col justify-around items-center w-full h-full'>
        <h1 className='font-["Bricolage Grotesque"]  lg:text-3xl text-blue-700'>Welcome <span id='profilename' className='lg:text-6xl  font-extrabold lg:m-10'>{user.name}</span></h1>
        <tbody className='border-0 lg:w-1/2 flex flex-col justify-center'>
          <tr className='w-full text-xl text-cyan-800 border-2 p-2'>User Details</tr>
          <tr className='w-full flex justify-around  border-2 p-2'>
            <td>Name</td>
            <td>{user?.name}</td>
          </tr>
          <tr className='flex justify-around  border-2 p-2'>
            <td>Email</td>
            <td>{user?.email}</td>
          </tr>
        </tbody>
        <Button className="block lg:hidden bg-gradient-to-tr from-blue-500 to-blue-900 scale-75 hover:scale-90 transform transition duration-200 ease-in-out lg:shadow-md rounded-lg text-white font-thin lg:py-3 lg:px-4 lg:text-xl " onClick={() => { loginhandle(); }}>
          {props.data}
        </Button>
        <h1 onClick={() => { navigate("/resetpass") }} className='shadow-sm p-2 text-lg cursor-pointer bg-slate-300'>Reset Password</h1>
      </table>
    </div>
  )
}

export default Profile;