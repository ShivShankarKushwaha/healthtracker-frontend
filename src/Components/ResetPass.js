import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function ResetPass() {
    const [password,setpassword]=useState({password:'',cnfrmpassword:''});
    const [showAlert, setShowAlert] = useState(false);
    const [alertcolor, setalertcolor] = useState("green");
    const [alerttext, setalerttext] = useState('');
    const navigate =useNavigate();

    function alertfunction(text, color)
    {
        setShowAlert(true);
        setalerttext(text);
        setalertcolor(color);
        setTimeout(() =>
        {
            setShowAlert(false);
        }, 3000);
    }
    async function resettingpassword()
    {
        let reg1 = /[a-z]/;
        let reg2 = /[A-Z]/;
        let reg3 = /[0-9]/;
        var specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        let pass = password.password;
        if (pass.length < 6 || !reg1.test(pass) || !reg2.test(pass) || !reg3.test(pass) || !specialCharRegex.test(pass)) {
            alertfunction('*password must contain at least 1 upper,1 lower, 1 number , 1 special character and length more than 5','red')
            
            return;
        }
        if (password.password != password.cnfrmpassword) {
            alertfunction("*password , confirm password did not match",'red');
            return;
        }
        fetch("/resetpassword",{method:'POST',body:new URLSearchParams({password:password.password})})
        .then(responce=>
            {
                if(responce.status===200)
                {
                    alertfunction('Password updated successfully','green');
                    setTimeout(() => {
                        navigate('/profile');
                    }, 1000);
                }
                else
                {
                    alertfunction('Password not updated','red');
                }
                return responce.json()
            })
            .then(result=>{console.log(result);})
            .catch(err=>{console.log(err);})
    }
  return (
    <div className='min-h-[75vh] flex flex-col justify-center items-center gap-5'>
        <div className='w-1/2 border-0 h-full flex flex-col justify-center mx-auto gap-7'>
            <h1 className='text-3xl font-extralight text-[blue] reset'>Reset Password</h1>
            <input className='border-2 border-slate-300 p-1 text-lg rounded outline-slate-400' type="password" onChange={(e)=>{setpassword({...password,password:e.target.value})}} placeholder='Enter Password' />
            <input className='border-2 border-slate-300 p-1 text-lg rounded outline-slate-400' type="password" onChange={(e)=>{setpassword({...password,cnfrmpassword:e.target.value})}} placeholder='Confirm Password' />
            <button className='p-2 text-xl bg-gradient-to-br from-blue-400 to-violet-400 text-white shadow-sm hover:shadow-violet-900 rounded' onClick={()=>{resettingpassword()}}>Reset</button>
        </div>
          {showAlert && (
              <div className={"fixed bottom-0 left-0 right-0  text-white p-4 flex justify-between bg-" + alertcolor + "-500"}>
                  <div>{alerttext}</div>
                  <button
                      className="ml-4 bg-white text-green-500 px-2 py-1 rounded hover:bg-green-100"
                      onClick={() => { setShowAlert(false); }}
                  >
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                      >
                          <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                          />
                      </svg>
                  </button>
              </div>
          )}
    </div>
  )
}

export default ResetPass;