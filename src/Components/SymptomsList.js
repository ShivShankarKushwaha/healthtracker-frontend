import React, { useEffect, useState } from 'react'
function SymptomsList()
{
    const [list, setlist] = useState({ symptom: '', note: '', date: '' });
    const [editingdata,seteditingdata]=useState({...list,cured:false,id:''});
    const [buttontext, setbuttontext] = useState('Add');
    const [error, seterror] = useState('');
    const [refreshlist, setrefreshlist] = useState(false);
    const [allnotes, setallnote] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertcolor, setalertcolor] = useState("bg-green-500");
    const [alerttext, setalerttext] = useState('');
    async function addnote()
    {
        if (!list.symptom) {
            return seterror('*symptoms are necessary');
        }
        if (buttontext !== 'Add') {
            updatedata(list);
            return;
        }
        setbuttontext('Processing..');
        console.log('list data sent', list);
        let data = await fetch( '/addnote', { method: 'POST', credentials: 'include', body: new URLSearchParams(list) });
        if (data.status !== 200) {
            seterror('note not added')
            console.log('Note not added');
        }
        else {
            data = await data.json();
            console.log(data);
        }
        setrefreshlist(!refreshlist);
        setlist({ symptom: '', note: '', date: '' })
        setbuttontext('Add');
    }
    useEffect(() =>
    {
        async function getnotes()
        {
            var datafound = document.getElementById('datafound');
            if (datafound) {
                datafound.innerText = "Processing...";
            }
            // let data = await fetch(url + "/getnotes", {credentials: 'include' });
            let data = await fetch("/getnotes", {credentials: 'include' });
            console.log('data',data);
            if (data.status != 200) {
                data = await data.json();
                console.log('No Symptom Found', data);
                if (datafound) {
                    datafound.innerText = '';
                }
                return;
            }
            data = await data.json();
            // if(data.length==0 && datafound)
            if(data.length==0 && datafound)
            {
                datafound.innerText = 'No Symptom Found';
            }
            console.log('before setting setallnote', data);
            setallnote(data);
            console.log('allnotes', allnotes);
            console.log('after setting setallnote', data);
        }
        getnotes();
    }, [refreshlist]);
    // }, []);
    async function onDelete(id)
    {
        let data = await fetch( '/deletenote', { method: 'POST', credentials: 'include', body: new URLSearchParams({ id: id }) });
        if (data.status === 200) {
            setalertcolor('bg-green-500');
            setShowAlert(true);
            setalerttext('Data successfully deleted');
            setrefreshlist(!refreshlist);
            setTimeout(() =>
            {
                setShowAlert(false);
            }, 3000);
            setbuttontext('Add');
        }
        else {
            setrefreshlist(!refreshlist);
            setalertcolor('bg-red-500');
            setShowAlert(true);
            setTimeout(() =>
            {
                setShowAlert(false);
            }, 3000);
            setalerttext('Oops! data not deleted');
        }
    }
    async function onEdit(obj)
    {
        if(obj.date)
        {
            obj.date = new Date(obj.date);
            obj.date = (obj.date).toISOString().split('T')[0];
            console.log('date is setting:', obj.date);
        }
        setlist(obj);
        seteditingdata({...list,cured:obj.cured,id:obj._id});
        console.log('inside onedit',editingdata);
        setbuttontext("Update");
    }
    async function updatedata(data)
    {
        console.log('sending edited data:', data);
        data.id=data._id;
        if(!data.date)
        {
            data.date="";
        }
        // seteditingdata({...editingdata,note:list.note,symptom:list.symptom,date:list.date})
        // console.log('updating data',editingdata);
        let res = await fetch( '/updatedata', { method: 'POST', credentials: 'include', body: new URLSearchParams(data) });
        if (res.status === 200) {
            setalertcolor('bg-green-500');
            setShowAlert(true);
            setalerttext('Data successfully Updated');
            setrefreshlist(!refreshlist);
            setTimeout(() =>
            {
                setShowAlert(false);
            }, 3000);
            setlist({ note: '', date: '', symptom: '' });
        }
        else
        {
            setalertcolor('bg-red-500');
            setShowAlert(true);
            setalerttext('Data Not Updated');
            setrefreshlist(!refreshlist);
            setTimeout(() =>
            {
                setShowAlert(false);
            }, 3000);
            res=await res.json();
            console.log(res);
        }
        setbuttontext('Add');
    }
    return (
        <div>
            <div className='lg:w-3/4 mx-auto shadow-xl drop-shadow-lg shadow-slate-100 border-2 border-gray-100 lg:border-transparent lg:my-10 lg:p-5 py-2 flex flex-col justify-center items-center'>
                <h1 className='text-center text-xl'>Add Your Symptoms</h1>
                <input className='border-2 border-slate-100 p-2 lg:text-lg lg:w-3/4 w-full lg:m-5 my-5  outline-none' type="text" placeholder='Enter Symptoms' value={list.symptom} onChange={(e) => { setlist({ ...list, symptom: e.target.value }); seterror('') }} />
                <textarea onChange={(e) => { setlist({ ...list, note: e.target.value }) }} value={list.note} className='resize-none outline-none border-2 border-slate-100 lg:w-3/4 w-full h-40 p-2' placeholder='Explain symptoms (if):'></textarea>
                <div className='flex flex-row justify-evenly items-center border-0 border-slate-100 lg:w-3/4 p-5'>
                    <h1>Starting date of your symptoms</h1>
                    <input className='lg:px-5 py-2' type="date" value={list.date} onChange={(e) => { setlist({ ...list, date: e.target.value }); console.log(list.date) }} />
                </div>
                <p className='p-4 text-red-300'>{error}</p>
                <button type='submit' className="bg-gradient-to-tr from-blue-500 to-blue-900 hover:scale-105 transform transition duration-200 ease-in-out shadow-lg rounded-lg text-white font-bold py-3 px-6" onClick={() =>
                { addnote() }}>{buttontext}</button>
            </div>
            {allnotes.length === 0 ? <div id='datafound' className='font-bold text-xl text-gray-600 m-5'> No Symptom Found</div> : null}
            <div className='flex  flex-wrap w-full justify-evenly items-center'>
                {allnotes.map((data, index) => 
                {
                    let editdata = data;
                    let extractdate = new Date(data.date);
                    extractdate = extractdate.toLocaleDateString();
                    return (
                        <div key={index} className="max-w-xs flex flex-col min-w-[23rem] rounded overflow-hidden shadow-lg">
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{data.symptom}</div>
                                <p className="text-gray-700 text-base">Descrition: {data.note}</p>
                                {data.date?<p className="text-gray-700 text-base">Starting Date: {extractdate}</p>:null}
                                <p className="text-gray-700 text-base">Cured:{data.cured ? "Yes" : "No"}</p>
                            </div>
                            <div className="px-6 py-4">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" 
                                    onClick={() => onEdit(editdata)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => onDelete(data._id)}
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

export default SymptomsList;