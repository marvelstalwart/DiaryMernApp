import React, {useEffect} from 'react'
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import Note from './note/Note';
import { useState } from 'react';
import Hourglass from '@mui/icons-material/HourglassEmpty';
import { useSelector, useDispatch } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import ModeIcon from '@mui/icons-material/Mode';
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import empty from '../../assets/img/empty.png'
import BounceLoader from "react-spinners/BounceLoader"
import Refresh from '@mui/icons-material/Refresh';
import { getEntries, reset, life, work, school, search } from '../../features/entries/entrySlice';

export default function Notes() {
    const {user} = useSelector((state)=> state.auth)
    const {todayEntries, yesterdayEntries, twoDaysOld,thisWeek,lastWeek, thisMonth,lastMonth,earlier, entries, folder, isLoading, isError, message, isSuccess} =useSelector((state)=> state.entries) 
    
    const dispatch= useDispatch();
    let navigate = useNavigate()
    const [searchingFor, setSearchingFor] = useState()
    const date = new Date().getTime()

    useEffect(()=> {

        if(isError) {
            toast.error(message)
        }

            console.log(date)

        if (!user) {
            navigate('/sign-in')
        }

       
        dispatch(getEntries());
       
        if (searchingFor) {
            todayEntries.filter((entry)=>
            entry.content.toLowerCase().includes(searchingFor)
            )
        }    
       
        return ()=> {
            dispatch(reset())
        }

    },[user, searchingFor, navigate, isError, message, dispatch ])
   
    
    const handleChange =(e)=> {
        e.preventDefault()
        setSearchingFor(e.target.value)


    }

  return (
    
    isLoading? 
    <div className='h-screen  flex items-center mx-auto w-20'>
        <BounceLoader color='#081A51'/>
    </div>
    
    :
 <div className=' h-screen w-screen bg-blue-100 relative overflow-y-auto'>
        
        {entries.length> 0?<>
            <div className='w-full relative'>
                
        {/* <input onChange={handleChange} className=" z-50 bg-dark-purple bg-opacity-10 w-full rounded-md flex  p-4  h-10 outline-0 " type="text" placeholder='Search'/>
            {searchingFor && 
            <div className='relative'> <div className='w-full  items-center border-2 border-gray-300 justify-center flex h-auto bg-white absolute top-0 z-50 rounded-br-md rounded-bl-md'>
            <SearchIcon/><p className='p-2 text-xs overflow-y-auto'>Searching for '{searchingFor}'</p>
        </div></div>
           } */}
        </div>  
        
        <div className='mx-auto  relative '>
           
            {/* <div className='text-gray-400 text-2xl md:text-3xl absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'>
            <TextSnippetIcon className='text-gray-400' fontSize='inherit'/>
            <h1  >No Notes Yet</h1>
            </div> */}
                <div className='w-full mb-2  '>
                    <div className='text-dark-purple w-full flex justify-center'>
                        <div className=' mt-5'>
                            <div className=' text-5xl text-center p-10 bg-dark-purple w-full rounded-lg bg-opacity-10'>
                            <div className='flex justify-center items-center'>
                                 <div className='cursor-pointer font-bold' >{folder}
                                </div>
                                 {/* <div className='text-sm '>({entries && entries.length})</div> */}
                                 </div>
                                <div className='flex items-center gap-x-4 text-sm justify-center font-medium'>
                                    <div onClick={()=>{dispatch(work())}}className='cursor-pointer'>Work </div>
                                    <div >|</div>
                                    <div className='cursor-pointer' onClick={()=>{dispatch(life()); }}>Life </div>
                                    <div>|</div>
                                    <div className='cursor-pointer' onClick={()=>{dispatch(school());}}>School</div>
                                    </div>
                            </div>
                        </div>
                    </div> 
                </div>
               
            <div className=' h-full  bg-gray-100 p-2 rounded-xl'>
            { 
             todayEntries  &&    
             <div>
           <div className='flex  justify-between items-center font-bold text-dark-purple'><div>Today{todayEntries.length> 0 &&`(${todayEntries.length})`}</div> <Refresh onClick={()=> {navigate(0)}} className='rounded-full text-white bg-dark-purple p-1 '/></div>
            {
             todayEntries.length > 0 ?   todayEntries.map((note, index)=> {
                    return <div  onClick ={()=> {
                        navigate(`/entry/${note._id}`, {
                          state: {
                            note
                          }
                        })
    
                       }} ><Note note={note}  key={index}/></div>
                }) :
                <div>Nothing for today...</div>
            }
            </div>  } 
            {
                 yesterdayEntries  &&    
                 <div>
               <div className=' font-bold text-dark-purple'>Yesterday{yesterdayEntries.length> 0 && `(${yesterdayEntries.length})`}</div>
                {
                 yesterdayEntries.length > 0 ?   yesterdayEntries.map((note, index)=> {
                        return <div  onClick ={()=> {
                            navigate(`/entry/${note._id}`, {
                              state: {
                                note
                              }
                            })
        
                           }} ><Note note={note}  key={index}/></div>
                    }) :
                    <div>Nothing yesterday...</div>
                }
                </div>
            }
             {
                 twoDaysOld  &&    
                 <div>
               <div className=' font-bold text-dark-purple'>Two Days Ago{twoDaysOld.length> 0 && `(${twoDaysOld.length})`}</div>
                {
                 twoDaysOld.length > 0 ?   twoDaysOld.map((note, index)=> {
                        return <div  onClick ={()=> {
                            navigate(`/entry/${note._id}`, {
                              state: {
                                note
                              }
                            })
        
                           }} ><Note note={note}  key={index}/></div>
                    }) :
                    <div>Nothing to see...</div>
                }
                </div>
            }
            {
                 thisWeek && todayEntries.length === 0 &&yesterdayEntries.length === 0 && twoDaysOld &&    
                 <div>
               <div className=' font-bold text-dark-purple'>This Week</div>
                {
                 thisWeek.length > 0 ?   thisWeek.map((note, index)=> {
                        return <div  onClick ={()=> {
                            navigate(`/entry/${note._id}`, {
                              state: {
                                note
                              }
                            })
        
                           }} ><Note note={note}  key={index}/></div>
                    }) :
                    <div>Nothing to see...</div>
                }
                </div>
            }
             {
                 lastWeek && todayEntries.length === 0 &&yesterdayEntries.length === 0 &&    
                 <div>
               <div className=' font-bold text-dark-purple'>Last Week</div>
                {
                 lastWeek.length > 0 ?   lastWeek.map((note, index)=> {
                        return <div  onClick ={()=> {
                            navigate(`/entry/${note._id}`, {
                              state: {
                                note
                              }
                            })
        
                           }} ><Note note={note}  key={index}/></div>
                    }) :
                    <div>Nothing to see...</div>
                }
                </div>
            }
            {
                 thisMonth && todayEntries.length === 0 &&yesterdayEntries.length === 0 && twoDaysOld.length === 0 &&   
                 <div>
               <div className=' font-bold text-dark-purple'>This Month</div>
                {
                 thisMonth.length > 0 ?   thisMonth.map((note, index)=> {
                        return <div  onClick ={()=> {
                            navigate(`/entry/${note._id}`, {
                              state: {
                                note
                              }
                            })
        
                           }} ><Note note={note}  key={index}/></div>
                    }) :
                    <div>No entries.</div>
                }
                </div>
            }
            {
                 lastMonth && todayEntries.length === 0 &&yesterdayEntries.length === 0 && twoDaysOld.length === 0 &&   
                 <div>
               <div className=' font-bold text-dark-purple'>Last Month</div>
                {
                 lastMonth.length > 0 ?   lastMonth.map((note, index)=> {
                        return <div  onClick ={()=> {
                            navigate(`/entry/${note._id}`, {
                              state: {
                                note
                              }
                            })
        
                           }} ><Note note={note}  key={index}/></div>
                    }) :
                    <div>No entries.</div>
                }
                </div>
            }
         
           </div>
        </div>
        {/* <div className='absolute bottom-0 right-0 p-4 text-white rounded-full bg-dark-purple cursor-pointer'>
               <Link to='/new-entry'> <ModeIcon fontSize='large'></ModeIcon></Link>
        </div> */}

        </> :
            <div className='w-full '><div className=' text-gray-600 h-screen flex justify-center items-center flex-col'>
               <img className='max-w-xs md:max-w-md lg:max-w-lg z-[1]' src={empty}/>
              <Link to="new-entry"><div className='text-dark-purple font-bold text-center'>Start your journey</div></Link> 
              
                </div>        
            </div>

                }
        
          
        </div>
  )
}
