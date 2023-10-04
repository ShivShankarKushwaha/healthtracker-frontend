import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
function OTPpage(props) {
    const navigate =useNavigate();
    const [otp,setotp] =useState('');
    const [errormessage,seterrormessage] =useState('');
    async function submitotp()
    {
        let data = await fetch('/verifyotp',{method:'POST',credentials:'include',body:new URLSearchParams({otp:otp})});
        if(data.status===200)
        {
            data = await data.json();
            console.log(data);
            props.fun('Log Out');
            navigate('/dashboard');
        }
        else
        {
            data =await data.json();
            console.log(data);
            seterrormessage('Otp Not Verified!');
        }
    }
  return (
    <div>
        <div className='w-full lg:h-[40rem] flex flex-col lg:flex-row justify-center lg:items-start items-center'>
            <div className='lg:w-1/2 flex flex-col justify-start items-center'>
                <h1 className='text-xl font-semibold lg:mt-40 lg:m-10'>Enter Sent Otp to Mail</h1>
                <input onClick={(e)=>{seterrormessage('');}} onChange={(e)=>{setotp(e.target.value)}} className='border-2 lg:w-1/2 border-slate-300 outline-none p-2 m-2' type="text" value={otp} />
                {errormessage && <p>{errormessage}</p>}
                <button onClick={submitotp} className='m-10 bg-gradient-to-br from-slate-400 to-gray-700 p-2 text-white font-semibold shadow-md shadow-slate-700 active:shadow-none'>Submit</button>
                <button className='underline text-xl font-serif'>Resend OTP</button>
            </div>
            <div className='lg:w-1/2  overflow-hidden h-full'>
                <img src="./otp.png" alt="" />
            </div>
        </div>
    </div>
  )
}

export default OTPpage;