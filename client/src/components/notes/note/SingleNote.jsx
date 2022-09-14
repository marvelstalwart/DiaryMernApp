import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Clear';
import {useSelector, useDispatch } from 'react-redux';
import { deleteEntry, reset } from '../../../features/entries/entrySlice';
import {toast, ToastContainer} from 'react-toastify'
export default function SingleNote() {
    const [toggle, setToggle] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    const note = location.state.note
    const dispatch = useDispatch();
    const {isLoading, isError, message, isSuccess} = useSelector((state)=> state.entries)
   
    useEffect(()=> {
        if (isSuccess) {
            console.log(location.state.newContent)
        }
      


    },[isLoading, isError, message, isSuccess, dispatch])
   
        
    const deleteHandler = () => {  
         dispatch(deleteEntry(note._id))
         navigate('/')
         

    }
  return (
    <div className=' w-full bg-blue-100 h-screen pt-7  overflow-y-auto'>
      <div className='p-1 flex items-center font-medium text-[12px] justify-between '><div className='text-white w-fit h-5 px-4 bg-dark-purple rounded-md '><h1 className=' text-[11px]'>{note.category}</h1></div>  
        <div className='flex gap-x-2 font-bold'>
            <div onClick={()=> navigate(`/edit/${note._id}`, {state: {note}})} className='cursor-pointer'><Edit fontSize='13px'/>Edit</div>
            <div onClick={()=>{setToggle(true)}} className='cursor-pointer'><Delete color="error" fontSize='13px'  />Delete</div>
            </div>
        </div>
        <div className='bg-white w-full min-h-screen relative rounded-3xl  pt-2'>
        <div className='font-bold text-lg px-3 md:px-4'>{note.title}</div>
        <div className='w-full border-b-2 border-gray-100'></div>
        <div className='px-3 md:px-4 overflow-y-auto'> <div dangerouslySetInnerHTML={{__html: location.state.newContent ? location.state.newContent : note.content}}/></div>
        
        </div>
        {/* Popup */}
        

{toggle && 
<div id="popup-modal" tabindex="-1" className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center" aria-hidden="true">
    <div className="relative p-4 w-full max-w-md h-full mx-auto top-[30%] md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-dark-purple border-2 border-gray-400">
            <button  onClick={()=> setToggle(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
                <svg aria-hidden="true" className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this entry?</h3>
                <button onClick={deleteHandler} data-modal-toggle="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                    Yes, I'm sure
                </button>
                <button  onClick={()=> setToggle(false)} data-modal-toggle="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
            </div>
        </div>
    </div>
</div>

}

        </div>
  )
}
