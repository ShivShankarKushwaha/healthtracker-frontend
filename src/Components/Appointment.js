import React, { useEffect, useState } from 'react';

function GetAppointment()
{
    const [rappointment, setrappointment] = useState({date: '',time: 'morning',message: '',});
    const [showAlert,setShowAlert]=useState(false);
    const [alertcolor,setalertcolor]=useState('');
    const [alerttext,setalerttext]=useState('');
    const [appointmentarr,setappointmentarr]=useState([]);
    const [updatelist,setupdatelist]=useState(true);

    function alertfunction(text,color)
    {
        setShowAlert(true);
        setalerttext(text);
        setalertcolor(color);
        setTimeout(() =>
        {
            setShowAlert(false);
        }, 3000);   
    }

    async function requestappointment(e)
    {
        e.preventDefault(); 
        const { date, time, message } = rappointment;
        if(!date || !time)
        {
            alertfunction('Date and time required', 'bg-red-500');
        }
        else
        {
            let checkdate =new Date(date);
            let currentdate =new Date();
            if(checkdate<currentdate)
            {
                alertfunction('Please select upcoming dates','bg-red-500')
                return;
            }
            console.log('today',currentdate,'appointment',checkdate);
            let monthsDifference = (checkdate.getFullYear() - currentdate.getFullYear()) * 12 + (checkdate.getMonth() - currentdate.getMonth());
            if (monthsDifference > 3) {
                return alertfunction('Select upcoming Date, less than 3 months', 'bg-red-500');
            }
            let data = await fetch("/requestappointment",{method:'POST',credentials:'include',body:new URLSearchParams(rappointment)});
            if(data.status===200)
            {
                setupdatelist(!updatelist);
                setTimeout(() => {
                    setupdatelist(!updatelist);
                }, 1000);
                alertfunction('Appointment successfully requested','bg-green-500');
            }
            else
            {
                alertfunction('Appointment not requested','bg-red-500');
            }
            console.log('Requested Appointment:', { date, time, message });
        }
    }
    async function appointmentlist()
    {
        let data = await fetch('/appointmentlist',{credentials:'include'});
        if(data.status!=200)
        {
            console.log('data not found');
        }
        else
        {
            data = await data.json();
            setappointmentarr(data);
            console.log('appointment data is : ',data);
        }
    }
    function deleteappointment(id)
    {
        fetch("/deleteappointment",{method:'post',body:new URLSearchParams({id:id})})
        .then(responce=>{setupdatelist(!updatelist);responce.json()})
        .then(result=>{console.log(result);})
    }
    useEffect(()=>
    {
        appointmentlist();
    }, [updatelist])
    return (
        <div className="min-h-screen p-5 flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-1/2">
                <h2 className="text-2xl font-semibold mb-4">Get an Appointment</h2>
                <form onSubmit={requestappointment}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                            Select Date:
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            className="w-full px-3 py-2 border rounded-lg"
                            value={rappointment.date}
                            onChange={(e) =>
                            {
                                setrappointment({ ...rappointment, date: e.target.value });
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
                            Select Time:
                        </label>
                        <select
                            id="time"
                            name="time"
                            className="w-full px-3 py-2 border rounded-lg"
                            value={rappointment.time}
                            onChange={(e) =>
                            {
                                setrappointment({ ...rappointment, time: e.target.value });
                            }}
                        >
                            <option value="morning">Morning</option>
                            <option value="afternoon">Afternoon</option>
                            <option value="evening">Evening</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                            Message (Optional):
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows="4"
                            className="w-full px-3 py-2 border rounded-lg"
                            value={rappointment.message}
                            onChange={(e) =>
                            {
                                setrappointment({ ...rappointment, message: e.target.value });
                            }}
                        ></textarea>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Request Appointment
                        </button>
                    </div>
                </form>
            </div>
            <div className='w-full my-5 border-0 flex justify-center items-center flex-wrap gap-4'>
                {/* <div className='w-[30%] border-0 flex flex-col justify-center p-2 drop-shadow-lg min-h-[10rem] bg-gradient-to-bl from-fuchsia-200 to-red-300 text-violet-600 text-left from-30% to-70% '>
                    <h1><span className='text-blue-500'>Date requested:</span>  12/23/34</h1>
                    <h1> <span className='text-blue-500'>Time:</span> Morning</h1>
                    <h1> <span className='text-blue-500'>message:</span>  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum, accusantium.</h1>
                    <h1><span className='text-blue-500'>Scheduled:</span>No</h1>
                </div> */}
                {
                    appointmentarr.map((item,index)=>
                    {
                        let extractdate = new Date(item.date);
                        item.date = extractdate.toLocaleDateString();
                        return (<div className='lg:w-[30%] w-full border-0 flex flex-col justify-center p-2 shadow-md shadow-green-500 drop-shadow-lg min-h-[10rem] bg-gradient-to-bl from-green-200 to-green-300 text-violet-600 text-left from-30% to-70% '>
                            <h1><span className='text-blue-500'>Date requested:</span>  {item.date}</h1>
                            <h1> <span className='text-blue-500'>Time:</span> {item.time}</h1>
                            <h1> <span className='text-blue-500'>message:</span> {item.message?item.message:"<<no message>>"} </h1>
                            <h1><span className='text-blue-500'>Scheduled:</span>{item.status?"Yes":"No"}</h1>
                            <button className="bg-red-500 w-fit text-white px-4 py-2 rounded-lg hover:bg-red-600" onClick={()=>{deleteappointment(item._id)}}>Delete</button>
                        </div>)
                    })
                }
            </div>
            {showAlert && (
                <div className={"fixed bottom-0 left-0 right-0  text-white p-4 flex justify-between " + alertcolor}>
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
    );
}

export default GetAppointment;
