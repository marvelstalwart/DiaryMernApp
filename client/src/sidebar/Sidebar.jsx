import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NoteIcon from '@mui/icons-material/Note';
import Add from '@mui/icons-material/AddCircle';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Note from '@mui/icons-material/Note';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NotesIcon from '@mui/icons-material/Notes';
import FolderIcon from '@mui/icons-material/Folder';
import LogoutIcon from '@mui/icons-material/Logout';
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import { logout, reset } from '../features/auth/authSlice';
import { life, work, school } from '../features/entries/entrySlice';
import {Link, useNavigate} from 'react-router-dom';

export default function Sidebar() {
  let navigate = useNavigate()
  const dispatch = useDispatch()

  const [expanded, setExpanded] = useState(false)
  
  const [folderExpanded, setFolderExpanded] = useState(false)
  const [mobile, setMobile] = useState(false)
  
  const Menus = [
    {title: "New"}
  ]

 

  
  const onLogout= ()=> {
    dispatch(logout())
    dispatch(reset())
    navigate('/sign-in')
  } 

  useEffect(() => {
    if (window.innerWidth < 720) {
      setExpanded(false)
      setMobile(true)
    } else {
      setExpanded(true)
      setMobile(false)
    }
     
  
   },[])

  return (
   
    <>
    <div className=''>

    
    <div className={`${expanded ? "w-72": "w-20"} h-screen 
    p-5 pt-8 
    duration-300
    bg-dark-purple relative static `}>
      {!mobile && <KeyboardArrowLeftIcon onClick={()=> setExpanded(!expanded)}className={`absolute 
      bg-white z-20 cursor-pointer rounded-full
      -right-3 top-11 w-7 border-2 border-dark-purple ${!expanded && 'rotate-180'}`}/>}
     <div className=' flex gap-x-4 items-center'>
      <div className={`${expanded && "rotate-[360deg]"}`}><NoteIcon className={`cursor-pointer duration-300 
        bg-[#1da1f2] rounded p-0.5 text-white `} fontSize='large'/></div>
    
    <Link to='/entries'><h1 className={`text-white origin-left 
    ${!expanded && "scale-0 "}
    font-medium text-xl
    duration-300 break-normal`}>Diary</h1></Link>
    </div> 
    <ul className='pt-6 bg-dark-purple relative z-10'>
    <Link to='/new-entry'><li className='text-gray-300 text-sm flex items-center
    gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md'>
      <Add className='text-white'fontSize='medium'/>
      <span className={`${!expanded && 'scale-0'} text-[17px] origin-left duration-200`}>New</span>
    </li></Link>

    <Link to='/entries'><li className='mt-4  text-gray-300 text-sm flex items-center
    gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md'>
      <NotesIcon className='text-white'fontSize='medium'/>
      <span className={`${!expanded && 'scale-0'} text-[17px] origin-left duration-200`}>All</span>
    </li></Link>
   
    <li className='text-gray-300 text-sm flex items-center
    gap-x-4 mt-4 cursor-pointer p-2 hover:bg-light-white rounded-md'>
      <StarPurple500Icon className='text-white'fontSize='medium'/>
      <span className={`${!expanded && 'scale-0'} text-[17px] origin-left duration-200`}>Starred</span>
      
    </li>
   
    
    <li  onClick={ ()=> setFolderExpanded(!folderExpanded)} className='text-gray-300 text-sm flex items-center
    gap-x-4 mt-4 cursor-pointer p-2 relative hover:bg-light-white rounded-md'>
       <FolderIcon className='text-white 'fontSize='medium'/>
      
      <span className={`${!expanded && 'scale-0'} text-[17px] origin-left duration-200`}>Folders</span>
    { expanded && <KeyboardArrowDownIcon  className={`absolute ${folderExpanded && 'rotate-180'} right-0 top-50`}/>  
    }
    
    </li>
    </ul>
    {expanded && <ul className={` transition-all z-5 ease-in text-gray-300 text-left pl-10 ${folderExpanded? 'mt-2': 'mt-[-120px]'} duration-500 `}>
   <li onClick={()=>dispatch(life())}  className='p-2 hover:bg-light-white hover:cursor-pointer rounded-md'>Life</li>
   <li  onClick={()=>dispatch(work())} className='p-2 hover:bg-light-white hover:cursor-pointer rounded-md'>Work</li>
    <li  onClick={()=>dispatch(school())} className='p-2 hover:bg-light-white hover:cursor-pointer rounded-md'>School</li>
    </ul>
    } 

      <div onClick={onLogout} className=' relative text-gray-300 text-sm flex items-center
    gap-x-4 mt-4 cursor-pointer p-2 hover:bg-light-white rounded-md'>
      <LogoutIcon  className='text-white'fontSize='medium'/>
      <span className={`${!expanded && 'scale-0 '} text-[17px] origin-left duration-200`}>Logout</span>
      
    </div>
    
   
  
    </div>
    </div>
   </>
  )
}
