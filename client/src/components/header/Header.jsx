import React, { useState } from "react"
import AppsIcon from '@mui/icons-material/Apps';
import CloseIcon from '@mui/icons-material/Close';
export default function Header() {

    const [expanded, setExpanded] = useState(false);
    return (

        <div className="px-5 text-white w-full bg-cyan-500 flex h-16 justify-between items-center">
            <h1 className="font-medium">MEMORIES</h1>
            <div>

            </div>
            <div onClick={()=> setExpanded(!expanded)} className="cursor-pointer md:hidden">
                <AppsIcon/>
            </div>
            
            <div className="hidden md:block">
                <ul className=" flex space-x-4 font-medium">
                <li className="hover:cursor-pointer">
                    Link 1
                </li>
                <li className="hover:cursor-pointer">
                    Link 2
                </li>
                <li className="hover:cursor-pointer" >
                    Link 3
                </li>
            </ul>
            </div>
            
            
            <div className={`transition-all  duration-150 ease-in bg-white text-black h-full absolute right-0 top-0 ${expanded ? 'w-40 opacity-100'  : 'w-0 opacity-0'}`}>
                
                 <div className="justify-start text-black hover:cursor-pointer" onClick={()=> setExpanded(!expanded)}><CloseIcon/></div>
                
                
            <ul className="my-10 space-y-4 ">
                <li className="hover:cursor-pointer">
                    Link 1
                </li>
                <li className="hover:cursor-pointer">
                    Link 2
                </li>
                <li className="hover:cursor-pointer" >
                    Link 3
                </li>
            </ul>

            </div>
              
        </div>
    )
}