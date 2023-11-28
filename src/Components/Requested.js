import React, { useEffect, useState } from 'react'

function Requested()
{
    const [allrequest, setallrequest] = useState([]);
    const [refreshrequest,setrefreshrequest]=useState(false);
    useEffect(() =>
    {
        fetch("/allrequested")
            .then(responce => responce.json())
            .then(result =>
            {
                console.log(result);
                setallrequest(result);
            })
    }, [refreshrequest])
    function Accepting(id,email)
    {
        console.log(id,email);
        fetch("/acceptingrequest",{method:'POST',body:new URLSearchParams({id:id,email:email})})
        .then(responce=>
            {
                if(responce.status===200)
                {
                    console.log('accepted');
                    setrefreshrequest(!refreshrequest);
                }
                else
                {
                    console.log('not accepted');
                }
                return responce.json()
            })
        .then(result=>
            {
                console.log(result);
            })
    }
    return (
        <div className='w-full min-h-screen h-full flex flex-col justify-start items-center gap-5'>
            <div className='w-1/2 flex-col justify-center items-center'>
                <h1 className='font-serif text-xl text-green-500'>Showing all the requested appointments</h1>
            </div>
            <div className='flex flex-wrap justify-center items-center gap-3'>
                {allrequest.length > 0 && allrequest.map((item, index) =>
                {
                    let extractdate = new Date(item.date);
                    extractdate = extractdate.toLocaleDateString();
                    return(
                        <div key={index} className="max-w-xs min-h-[15rem] flex flex-col min-w-[23rem] rounded overflow-hidden shadow-lg">
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{item.email}</div>
                                <p className="text-gray-700 text-base">{item.message}</p>
                                <p className="text-gray-700 text-base">{extractdate}</p>
                                <p className="text-gray-700 text-base">{item.time}</p>
                            </div>
                            <div className="px-6 py-4 flex justify-center gap-4">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => Accepting(item._id,item.email)}
                                >
                                    Accept
                                </button>
                                {/* <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                // onClick={() => onDelete(data._id)}
                                >
                                    Reject
                                </button> */}
                            </div>
                        </div>

                    )

                })}
            </div>
        </div>
    )
}

export default Requested;