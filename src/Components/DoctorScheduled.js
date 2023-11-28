import React, { useEffect, useState } from 'react'

function DoctorScheduled()
{
  const [showAlert, setShowAlert] = useState(false);
  const [alertcolor, setalertcolor] = useState('');
  const [alerttext, setalerttext] = useState('');
  const [scheduled, setscheduled] = useState([]);
  const [updatelist, setupdatelist] = useState(true);
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
  function removeappointment(id,email)
  {
    fetch("/removeappointment",{method:'post',body:new URLSearchParams({id:id,email:email})})
    .then(responce=>
      {
        if(responce.status===200)
        {
          alertfunction('Appoitment removed successfully','bg-green-500');
          setupdatelist(!updatelist);
        }
        else
        {
          alertfunction('Appointment not removed','bg-red-500');
        }
        return responce.json()
      })
      .then(result=>{console.log('remove appointment result',result);})
      .catch(err=>{console.log(err);})
  }
  useEffect(()=>
  {
    fetch("/allscheduled").then(responce=>responce.json()).then(result=>{console.log(result);setscheduled(result)}).catch(err=>{console.log(err);})
  },[updatelist])
  return (
    <div className='w-full min-h-screen h-full flex flex-col justify-start items-center gap-5'>
      <div className='w-1/2 flex-col justify-center items-center'>
        <h1 className='font-serif text-xl'>Here you can find all scheduled appointments</h1>
      </div>
      <div className='flex flex-wrap justify-center items-center gap-3'>
        {scheduled.length > 0 && scheduled.map((item, index) =>
        {
          let extractdate = new Date(item.date);
          extractdate = extractdate.toLocaleDateString();
          return (
            <div key={index} className="max-w-xs min-h-[10rem] flex flex-col min-w-[23rem] rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{item.email}</div>
                <p className="text-gray-700 text-base">{item.message}</p>
                <p className="text-gray-700 text-base">{extractdate}</p>
                <p className="text-gray-700 text-base">{item.time}</p>
              </div>
              <div className="px-6 py-4 flex justify-center gap-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                // onClick={() => onDelete(data._id)}
                >
                  Rescheduled
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => removeappointment(item._id,item.email)}
                >
                  Delete
                </button>
              </div>
            </div>

          )

        })}
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
  )
}

export default DoctorScheduled;